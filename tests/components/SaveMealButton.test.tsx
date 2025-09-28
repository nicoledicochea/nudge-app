import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SaveMealButton from '../../src/components/SaveMealButton';

describe('SaveMealButton', () => {
  const mockOnSave = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders save meal button', () => {
    render(<SaveMealButton onSave={mockOnSave} disabled={false} isLoading={false} />);
    
    expect(screen.getByText('Save Meal')).toBeInTheDocument();
  });

  it('calls onSave when clicked', () => {
    render(<SaveMealButton onSave={mockOnSave} disabled={false} isLoading={false} />);
    
    const button = screen.getByText('Save Meal');
    fireEvent.click(button);
    
    expect(mockOnSave).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<SaveMealButton onSave={mockOnSave} disabled={true} isLoading={false} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('shows loading state when isLoading is true', () => {
    render(<SaveMealButton onSave={mockOnSave} disabled={false} isLoading={true} />);
    
    expect(screen.getByText('Saving...')).toBeInTheDocument();
  });

  it('has proper styling with teal background', () => {
    render(<SaveMealButton onSave={mockOnSave} disabled={false} isLoading={false} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('save-meal-button');
  });
});
