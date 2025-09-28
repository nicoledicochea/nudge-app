import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import usePlateState from '@/hooks/usePlateState';
import { PortionShape, FoodCategory } from '@/types/portion';

describe('usePlateState', () => {
  it('initializes with empty state', () => {
    const { result } = renderHook(() => usePlateState());
    
    expect(result.current.portions).toEqual([]);
    expect(result.current.selectedShape).toBeNull();
    expect(result.current.showCategoryModal).toBe(false);
  });

  it('selects a shape and shows category modal', () => {
    const { result } = renderHook(() => usePlateState());
    
    act(() => {
      result.current.selectShape('palm');
    });
    
    expect(result.current.selectedShape).toBe('palm');
    expect(result.current.showCategoryModal).toBe(true);
  });

  it('adds a portion and closes modal', () => {
    const { result } = renderHook(() => usePlateState());
    
    act(() => {
      result.current.selectShape('fist');
    });
    
    act(() => {
      result.current.addPortion('fist', 'veggie');
    });
    
    expect(result.current.portions).toHaveLength(1);
    expect(result.current.portions[0].shape).toBe('fist');
    expect(result.current.portions[0].category).toBe('veggie');
    expect(result.current.showCategoryModal).toBe(false);
    expect(result.current.selectedShape).toBeNull();
  });

  it('removes a portion by id', () => {
    const { result } = renderHook(() => usePlateState());
    
    // Add a portion first
    act(() => {
      result.current.selectShape('golf_ball');
    });
    
    act(() => {
      result.current.addPortion('golf_ball', 'fat');
    });
    
    const portionId = result.current.portions[0].id;
    
    act(() => {
      result.current.removePortion(portionId);
    });
    
    expect(result.current.portions).toHaveLength(0);
  });

  it('closes category modal without adding portion', () => {
    const { result } = renderHook(() => usePlateState());
    
    act(() => {
      result.current.selectShape('ice_cream_scoop');
    });
    
    expect(result.current.showCategoryModal).toBe(true);
    
    act(() => {
      result.current.closeCategoryModal();
    });
    
    expect(result.current.showCategoryModal).toBe(false);
    expect(result.current.selectedShape).toBeNull();
  });

  it('generates unique ids for portions', () => {
    const { result } = renderHook(() => usePlateState());
    
    act(() => {
      result.current.addPortion('palm', 'protein');
    });
    
    act(() => {
      result.current.addPortion('fist', 'veggie');
    });
    
    expect(result.current.portions).toHaveLength(2);
    expect(result.current.portions[0].id).not.toBe(result.current.portions[1].id);
  });
});
