import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CategorySelectionModal from '../../src/components/CategorySelectionModal';
import { PortionShape } from '../../src/types/portion';

describe('CategorySelectionModal', () => {
  const mockOnSelectCategory = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders modal with selected shape', () => {
    render(
      <CategorySelectionModal
        selectedShape="palm"
        onSelectCategory={mockOnSelectCategory}
        onClose={mockOnClose}
      />
    );
    
    expect(screen.getByText('Select Category for Palm')).toBeInTheDocument();
  });

  it('displays all four food categories', () => {
    render(
      <CategorySelectionModal
        selectedShape="fist"
        onSelectCategory={mockOnSelectCategory}
        onClose={mockOnClose}
      />
    );
    
    expect(screen.getByText('Protein')).toBeInTheDocument();
    expect(screen.getByText('Carb')).toBeInTheDocument();
    expect(screen.getByText('Vegetable')).toBeInTheDocument();
    expect(screen.getByText('Fat')).toBeInTheDocument();
  });

  it('calls onSelectCategory when a category is clicked', () => {
    render(
      <CategorySelectionModal
        selectedShape="golf_ball"
        onSelectCategory={mockOnSelectCategory}
        onClose={mockOnClose}
      />
    );
    
    const proteinButton = screen.getByText('Protein');
    fireEvent.click(proteinButton);
    
    expect(mockOnSelectCategory).toHaveBeenCalledWith('protein');
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <CategorySelectionModal
        selectedShape="ice_cream_scoop"
        onSelectCategory={mockOnSelectCategory}
        onClose={mockOnClose}
      />
    );
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('has proper accessibility attributes', () => {
    render(
      <CategorySelectionModal
        selectedShape="smartphone"
        onSelectCategory={mockOnSelectCategory}
        onClose={mockOnClose}
      />
    );
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
    expect(modal).toHaveAttribute('aria-modal', 'true');
  });
});
