import React from 'react';
import { PortionData } from '@/types/portion';
import { SHAPE_LABELS } from '@/utils/portionShapes';
import PortionIcon from './PortionIcon';
import '../styles/PlateVisualization.css';

interface PlateVisualizationProps {
  portions: PortionData[];
  onRemovePortion: (portionId: string) => void;
}

const PlateVisualization: React.FC<PlateVisualizationProps> = ({
  portions,
  onRemovePortion,
}) => {
  const categories = [
    { key: 'protein', label: 'Protein' },
    { key: 'veggie', label: 'Vegetables' },
    { key: 'carb', label: 'Carbs' },
    { key: 'fat', label: 'Fats' },
  ];

  const getPortionsForCategory = (category: string) => {
    return portions.filter(portion => portion.category === category);
  };


  return (
    <div className="plate-container">
      <div className="plate-visual">
        <div className="plate-grid">
          {categories.map((category) => {
            const categoryPortions = getPortionsForCategory(category.key);
            
            return (
              <div
                key={category.key}
                data-testid={`${category.key}-section`}
                className={`plate-section ${category.key}-section`}
              >
                {/* Category label positioned at the top of each quadrant */}
                <div className={`category-section ${category.key}`}>
                  <h3 className="category-title">
                    {category.label}
                  </h3>
                </div>
                
                {/* Portion container */}
                <div className="portion-container">
                  {categoryPortions.length === 0 ? (
                    <div className="empty-state">
                      Add portions here
                    </div>
                  ) : (
                    categoryPortions.map((portion) => (
                      <button
                        key={portion.id}
                        onClick={() => onRemovePortion(portion.id)}
                        className={`portion-added portion-${portion.category}`}
                        title={`Remove ${SHAPE_LABELS[portion.shape]}`}
                      >
                        <PortionIcon shape={portion.shape} size="sm" className="text-white" />
                        <span className="portion-added-label">{SHAPE_LABELS[portion.shape]}</span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlateVisualization;
