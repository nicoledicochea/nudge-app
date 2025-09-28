import React from 'react';
import { PortionShape, FoodCategory } from '@/types/portion';
import { SHAPE_LABELS, CATEGORY_LABELS } from '@/utils/portionShapes';
import { X } from 'lucide-react';
import '../styles/CategorySelectionModal.css';

interface CategorySelectionModalProps {
  selectedShape: PortionShape;
  onSelectCategory: (category: FoodCategory) => void;
  onClose: () => void;
}

const CATEGORIES: FoodCategory[] = ['protein', 'carb', 'veggie', 'fat'];


const CategorySelectionModal: React.FC<CategorySelectionModalProps> = ({
  selectedShape,
  onSelectCategory,
  onClose,
}) => {
  const handleCategorySelect = (category: FoodCategory) => {
    onSelectCategory(category);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="modal-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className="modal-content">
        {/* Header */}
        <div className="modal-header">
          <h2 
            id="modal-title"
            className="modal-title"
          >
            Select Category for {SHAPE_LABELS[selectedShape]}
          </h2>
          <button
            onClick={onClose}
            className="close-button"
            aria-label="Close modal"
          >
            <X className="close-icon" />
          </button>
        </div>

        {/* Category Options */}
        <div className="category-grid">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`category-button ${category}-button`}
            >
              {CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>

        {/* Instructions */}
        <p className="instructions">
          Choose the food category that best matches your portion
        </p>
      </div>
    </div>
  );
};

export default CategorySelectionModal;
