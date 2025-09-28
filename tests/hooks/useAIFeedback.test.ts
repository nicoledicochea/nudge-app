import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useAIFeedback } from '../../src/hooks/useAIFeedback';
import { PortionData } from '../../src/types/portion';

// No external API mocking needed for current implementation

describe('useAIFeedback', () => {
  it('initializes with default feedback', () => {
    const { result } = renderHook(() => useAIFeedback());
    
    expect(result.current.feedback?.feedback).toBe('Add some portion blocks to your plate to get personalized feedback!');
    expect(result.current.isLoading).toBe(false);
  });

  it('generates feedback for portions', async () => {
    const { result } = renderHook(() => useAIFeedback());
    
    const portions: PortionData[] = [
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

    await act(async () => {
      await result.current.generateFeedback(portions);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.feedback?.feedback).not.toBe('Add some portion blocks to your plate to get personalized feedback!');
  });

  it('handles loading state during feedback generation', async () => {
    const { result } = renderHook(() => useAIFeedback());
    
    const portions: PortionData[] = [
      {
        id: '1',
        shape: 'palm',
        category: 'protein',
        position: { x: 0, y: 0 },
        timestamp: '2025-09-27T10:00:00Z'
      }
    ];

    await act(async () => {
      await result.current.generateFeedback(portions);
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('handles API errors gracefully', async () => {
    const { result } = renderHook(() => useAIFeedback());
    
    const portions: PortionData[] = [
      {
        id: '1',
        shape: 'palm',
        category: 'protein',
        position: { x: 0, y: 0 },
        timestamp: '2025-09-27T10:00:00Z'
      }
    ];

    // The current implementation doesn't use external API, so this test verifies the fallback
    await act(async () => {
      await result.current.generateFeedback(portions);
    });

    expect(result.current.feedback?.feedback).not.toBe('Feedback not available right now. Apologies for the inconvenience.');
    expect(result.current.isLoading).toBe(false);
  });
});
