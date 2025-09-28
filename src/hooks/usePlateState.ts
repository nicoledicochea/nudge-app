import { useState, useCallback } from 'react';
import { PortionShape, FoodCategory, PortionData, PlateState } from '@/types/portion';

const usePlateState = () => {
  const [state, setState] = useState<PlateState>({
    portions: [],
    selectedShape: null,
    showCategoryModal: false,
    aiFeedback: 'Add some portion blocks to your plate to get personalized feedback!',
    isLoading: false,
  });

  const selectShape = useCallback((shape: PortionShape) => {
    setState(prev => ({
      ...prev,
      selectedShape: shape,
      showCategoryModal: true,
    }));
  }, []);

  const addPortion = useCallback((shape: PortionShape, category: FoodCategory) => {
    const newPortion: PortionData = {
      id: `portion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      shape,
      category,
      position: { x: 0, y: 0 }, // Auto-positioned by flexbox
      timestamp: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      portions: [...prev.portions, newPortion],
      selectedShape: null,
      showCategoryModal: false,
    }));
  }, []);

  const removePortion = useCallback((portionId: string) => {
    setState(prev => ({
      ...prev,
      portions: prev.portions.filter(portion => portion.id !== portionId),
    }));
  }, []);

  const closeCategoryModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedShape: null,
      showCategoryModal: false,
    }));
  }, []);

  return {
    portions: state.portions,
    selectedShape: state.selectedShape,
    showCategoryModal: state.showCategoryModal,
    addPortion,
    removePortion,
    selectShape,
    closeCategoryModal,
  };
};

export default usePlateState;
