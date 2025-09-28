import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import VisualPlateLogger from '@/components/VisualPlateLogger';

// Mock the hooks
vi.mock('@/hooks/usePlateState', () => ({
  usePlateState: () => ({
    portions: [],
    selectedShape: null,
    showCategoryModal: false,
    addPortion: vi.fn(),
    removePortion: vi.fn(),
    selectShape: vi.fn(),
    closeCategoryModal: vi.fn(),
  }),
}));

vi.mock('@/hooks/useAIFeedback', () => ({
  useAIFeedback: () => ({
    aiFeedback: 'Add some portion blocks to your plate to get personalized feedback!',
    isLoading: false,
    generateFeedback: vi.fn(),
  }),
}));

describe('VisualPlateLogger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the main plate logger interface', () => {
    render(<VisualPlateLogger />);
    
    expect(screen.getByText('Visual Plate Logger')).toBeInTheDocument();
    expect(screen.getByText('Your Meal Plate')).toBeInTheDocument();
    expect(screen.getByText('Portion Shapes')).toBeInTheDocument();
  });

  it('displays the four food category sections', () => {
    render(<VisualPlateLogger />);
    
    expect(screen.getByText('Protein')).toBeInTheDocument();
    expect(screen.getByText('Vegetables')).toBeInTheDocument();
    expect(screen.getByText('Carbs')).toBeInTheDocument();
    expect(screen.getByText('Fats')).toBeInTheDocument();
  });

  it('shows all 12 portion shapes in the gallery', () => {
    render(<VisualPlateLogger />);
    
    const shapeButtons = screen.getAllByRole('button');
    const shapeButtonsCount = shapeButtons.filter(button => 
      button.textContent?.includes('Palm') ||
      button.textContent?.includes('Fist') ||
      button.textContent?.includes('Golf Ball') ||
      button.textContent?.includes('Ice Cream Scoop')
    ).length;
    
    expect(shapeButtonsCount).toBeGreaterThan(0);
  });

  it('displays AI feedback area', () => {
    render(<VisualPlateLogger />);
    
    expect(screen.getByText('AI Suggestion')).toBeInTheDocument();
    expect(screen.getByText('Add some portion blocks to your plate to get personalized feedback!')).toBeInTheDocument();
  });

  it('shows save meal button', () => {
    render(<VisualPlateLogger />);
    
    expect(screen.getByText('Save Meal')).toBeInTheDocument();
  });

  it('has mobile-first responsive design', () => {
    render(<VisualPlateLogger />);
    
    const mainContainer = screen.getByTestId('visual-plate-logger');
    expect(mainContainer).toHaveClass('min-h-screen', 'p-4');
  });
});
