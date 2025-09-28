import React from 'react';
import usePlateState from '@/hooks/usePlateState';
import { useAIFeedback } from '@/hooks/useAIFeedback';
import PortionShapeGallery from '@/components/PortionShapeGallery';
import CategorySelectionModal from '@/components/CategorySelectionModal';
import PlateVisualization from '@/components/PlateVisualization';
import { AIFeedbackBox } from '@/components/AIFeedbackBox';
import SaveMealButton from '@/components/SaveMealButton';
import '../styles/VisualPlateLogger.css';

const VisualPlateLogger: React.FC = () => {
  const {
    portions,
    selectedShape,
    showCategoryModal,
    addPortion,
    removePortion,
    selectShape,
    closeCategoryModal,
  } = usePlateState();

  const {
    feedback,
    isLoading,
    generateFeedback,
  } = useAIFeedback();

  const handleSaveMeal = async () => {
    if (portions.length > 0) {
      await generateFeedback(portions);
    }
  };

  return (
    <div 
      data-testid="visual-plate-logger"
      className="visual-plate-logger"
    >
      {/* Header */}
      <div className="header">
        <h1 className="title">
          Visual Plate Logger
        </h1>
        <p className="date">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Plate Visualization */}
      <div className="section">
        <h2 className="section-title">
          Your Meal Plate
        </h2>
        <PlateVisualization 
          portions={portions}
          onRemovePortion={removePortion}
        />
      </div>

      {/* Portion Shape Gallery */}
      <div className="section">
        <h2 className="section-title">
          Portion Shapes
        </h2>
        <PortionShapeGallery onSelectShape={selectShape} />
      </div>

      {/* AI Feedback */}
      <div className="section">
        <AIFeedbackBox 
          feedback={feedback}
          isLoading={isLoading}
        />
      </div>

      {/* Save Meal Button */}
      <div className="section">
        <SaveMealButton 
          onSave={handleSaveMeal}
          disabled={portions.length === 0}
          isLoading={isLoading}
        />
      </div>

      {/* Category Selection Modal */}
      {showCategoryModal && selectedShape && (
        <CategorySelectionModal
          selectedShape={selectedShape}
          onSelectCategory={(category) => {
            addPortion(selectedShape, category);
            closeCategoryModal();
          }}
          onClose={closeCategoryModal}
        />
      )}
    </div>
  );
};

export default VisualPlateLogger;
