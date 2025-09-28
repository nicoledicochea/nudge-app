import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PlateVisualization from '../../src/components/PlateVisualization';
import { PortionData } from '../../src/types/portion';

describe('PlateVisualization', () => {
  const mockOnRemovePortion = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders four food category sections', () => {
    render(<PlateVisualization portions={[]} onRemovePortion={mockOnRemovePortion} />);
    
    expect(screen.getByText('Protein')).toBeInTheDocument();
    expect(screen.getByText('Vegetables')).toBeInTheDocument();
    expect(screen.getByText('Carbs')).toBeInTheDocument();
    expect(screen.getByText('Fats')).toBeInTheDocument();
  });

  it('displays portions in their respective categories', () => {
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

    render(<PlateVisualization portions={portions} onRemovePortion={mockOnRemovePortion} />);
    
    expect(screen.getByText('Palm')).toBeInTheDocument();
    expect(screen.getByText('Fist')).toBeInTheDocument();
  });

  it('calls onRemovePortion when a portion is clicked', () => {
    const portions: PortionData[] = [
      {
        id: '1',
        shape: 'golf_ball',
        category: 'fat',
        position: { x: 0, y: 0 },
        timestamp: '2025-09-27T10:00:00Z'
      }
    ];

    render(<PlateVisualization portions={portions} onRemovePortion={mockOnRemovePortion} />);
    
    const portionButton = screen.getByText('Golf Ball');
    fireEvent.click(portionButton);
    
    expect(mockOnRemovePortion).toHaveBeenCalledWith('1');
  });

  it('uses flexbox layout for portion positioning', () => {
    render(<PlateVisualization portions={[]} onRemovePortion={mockOnRemovePortion} />);
    
    const proteinSection = screen.getByTestId('protein-section');
    expect(proteinSection).toHaveClass('plate-section', 'protein-section');
  });

  it('shows empty state when no portions are added', () => {
    render(<PlateVisualization portions={[]} onRemovePortion={mockOnRemovePortion} />);
    
    const proteinSection = screen.getByTestId('protein-section');
    expect(proteinSection).toHaveTextContent('Add portions here');
  });
});
