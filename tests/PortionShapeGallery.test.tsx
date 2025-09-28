import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PortionShapeGallery from '@/components/PortionShapeGallery';
import { PORTION_SHAPES, SHAPE_LABELS } from '@/utils/portionShapes';

describe('PortionShapeGallery', () => {
  it('renders all 12 portion shapes', () => {
    const mockOnSelectShape = vi.fn();
    render(<PortionShapeGallery onSelectShape={mockOnSelectShape} />);
    
    PORTION_SHAPES.forEach(shape => {
      expect(screen.getByText(SHAPE_LABELS[shape])).toBeInTheDocument();
    });
  });

  it('calls onSelectShape when a shape is clicked', () => {
    const mockOnSelectShape = vi.fn();
    render(<PortionShapeGallery onSelectShape={mockOnSelectShape} />);
    
    const palmButton = screen.getByText('Palm');
    fireEvent.click(palmButton);
    
    expect(mockOnSelectShape).toHaveBeenCalledWith('palm');
  });

  it('has proper touch-friendly sizing', () => {
    const mockOnSelectShape = vi.fn();
    render(<PortionShapeGallery onSelectShape={mockOnSelectShape} />);
    
    const shapeButtons = screen.getAllByRole('button');
    shapeButtons.forEach(button => {
      expect(button).toHaveClass('portion-shape');
    });
  });

  it('displays shapes in a grid layout', () => {
    const mockOnSelectShape = vi.fn();
    render(<PortionShapeGallery onSelectShape={mockOnSelectShape} />);
    
    const gallery = screen.getByTestId('portion-shape-gallery');
    expect(gallery).toHaveClass('grid', 'grid-cols-3', 'gap-3');
  });
});
