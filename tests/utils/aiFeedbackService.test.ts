import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { 
  generateAIFeedback, 
  useRealtimeAIFeedback,
  type AIFeedbackRequest,
  type AIFeedbackResponse
} from '../../src/utils/aiFeedbackService';
import { PortionData } from '../../src/types/portion';

// Mock fetch globally
global.fetch = vi.fn();

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('aiFeedbackService utility', () => {
  const mockPortions: PortionData[] = [
    {
      id: '1',
      shape: 'palm',
      category: 'protein',
      position: { x: 0, y: 0 },
      timestamp: '2025-09-27T10:00:00Z'
    },
    {
      id: '2',
      shape: 'fist',
      category: 'veggie',
      position: { x: 0, y: 0 },
      timestamp: '2025-09-27T10:01:00Z'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue('mock-auth-token');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('generateAIFeedback', () => {
    it('generates feedback successfully', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          message: 'Great job on including protein and vegetables!'
        })
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      const request: AIFeedbackRequest = {
        portions: mockPortions,
        timeOfDay: 'lunch'
      };

      const result = await generateAIFeedback(request);

      expect(result).toEqual({
        feedback: 'Great job on including protein and vegetables!'
      });
      expect(global.fetch).toHaveBeenCalledWith('/api/chat', expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-auth-token'
        }),
        body: expect.stringContaining('"portions"')
      }));
    });

    it('handles API errors gracefully', async () => {
      const mockResponse = {
        ok: false,
        status: 500
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      const request: AIFeedbackRequest = {
        portions: mockPortions
      };

      const result = await generateAIFeedback(request);

      expect(result.feedback).toBeDefined();
      expect(typeof result.feedback).toBe('string');
      expect(result.feedback.length).toBeGreaterThan(0);
    });

    it('handles network errors gracefully', async () => {
      (global.fetch as any).mockRejectedValue(new Error('Network error'));

      const request: AIFeedbackRequest = {
        portions: mockPortions
      };

      const result = await generateAIFeedback(request);

      expect(result.feedback).toBeDefined();
      expect(typeof result.feedback).toBe('string');
      expect(result.feedback.length).toBeGreaterThan(0);
    });

    it('generates fallback feedback for empty portions', async () => {
      const request: AIFeedbackRequest = {
        portions: []
      };

      const result = await generateAIFeedback(request);

      expect(result.feedback).toContain('Add some portion blocks');
    });

    it('includes user context in request', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          message: 'Feedback with context'
        })
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      const request: AIFeedbackRequest = {
        portions: mockPortions,
        timeOfDay: 'breakfast',
        userGoals: ['weight_loss', 'muscle_gain'],
        userPreferences: { vegetarian: true }
      };

      await generateAIFeedback(request);

      const fetchCall = (global.fetch as any).mock.calls[0];
      const requestBody = JSON.parse(fetchCall[1].body);
      
      expect(requestBody.context.userContext.goals).toEqual(['weight_loss', 'muscle_gain']);
      expect(requestBody.context.userContext.timeOfDay).toBe('breakfast');
      expect(requestBody.context.userContext.preferences).toEqual({ vegetarian: true });
    });

    it('handles different response formats', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          response: 'Alternative response format'
        })
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      const request: AIFeedbackRequest = {
        portions: mockPortions
      };

      const result = await generateAIFeedback(request);

      expect(result.feedback).toBe('Alternative response format');
    });
  });

  describe('useRealtimeAIFeedback hook', () => {
    it('initializes with default feedback for empty portions', () => {
      const { result } = renderHook(() => useRealtimeAIFeedback([]));

      expect(result.current.feedback?.feedback).toContain('Add some portion blocks');
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });

    it('generates feedback when portions are provided', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          message: 'Great balanced meal!'
        })
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useRealtimeAIFeedback(mockPortions));

      // Wait for the debounced effect to trigger
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 600));
      });

      expect(result.current.feedback?.feedback).toBe('Great balanced meal!');
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });

    it('handles loading state correctly', async () => {
      let resolvePromise: (value: any) => void;
      const promise = new Promise(resolve => {
        resolvePromise = resolve;
      });
      
      (global.fetch as any).mockReturnValue(promise);

      const { result } = renderHook(() => useRealtimeAIFeedback(mockPortions));

      // Wait for the debounced effect to trigger
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 600));
      });

      expect(result.current.isLoading).toBe(true);

      // Resolve the promise
      await act(async () => {
        resolvePromise!({
          ok: true,
          json: vi.fn().mockResolvedValue({
            message: 'Feedback received'
          })
        });
      });

      expect(result.current.isLoading).toBe(false);
    });

    it('handles errors gracefully', async () => {
      (global.fetch as any).mockRejectedValue(new Error('API Error'));

      const { result } = renderHook(() => useRealtimeAIFeedback(mockPortions));

      // Wait for the debounced effect to trigger
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 600));
      });

      expect(result.current.error).toBe('Failed to generate feedback');
      expect(result.current.feedback?.feedback).toBeDefined();
      expect(result.current.isLoading).toBe(false);
    });

    it('debounces feedback generation', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          message: 'Feedback'
        })
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      const { result, rerender } = renderHook(
        ({ portions }) => useRealtimeAIFeedback(portions),
        { initialProps: { portions: mockPortions } }
      );

      // Trigger multiple rapid updates
      rerender({ portions: mockPortions });
      rerender({ portions: mockPortions });
      rerender({ portions: mockPortions });

      // Wait for debounce
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 600));
      });

      // Should only call fetch once due to debouncing
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('updates feedback when portions change', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          message: 'Updated feedback'
        })
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      const { result, rerender } = renderHook(
        ({ portions }) => useRealtimeAIFeedback(portions),
        { initialProps: { portions: [] } }
      );

      // Change portions
      rerender({ portions: mockPortions });

      // Wait for debounce
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 600));
      });

      expect(result.current.feedback?.feedback).toBe('Updated feedback');
    });
  });

  describe('time of day detection', () => {
    it('detects breakfast time correctly', async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2025-09-27T08:00:00Z'));

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          message: 'Breakfast feedback'
        })
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      const request: AIFeedbackRequest = {
        portions: mockPortions
      };

      await generateAIFeedback(request);

      const fetchCall = (global.fetch as any).mock.calls[0];
      const requestBody = JSON.parse(fetchCall[1].body);
      
      expect(requestBody.context.userContext.timeOfDay).toBe('breakfast');

      vi.useRealTimers();
    });

    it('detects lunch time correctly', async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2025-09-27T12:00:00Z'));

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({
          message: 'Lunch feedback'
        })
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      const request: AIFeedbackRequest = {
        portions: mockPortions
      };

      await generateAIFeedback(request);

      const fetchCall = (global.fetch as any).mock.calls[0];
      const requestBody = JSON.parse(fetchCall[1].body);
      
      expect(requestBody.context.userContext.timeOfDay).toBe('lunch');

      vi.useRealTimers();
    });
  });
});
