import React from 'react';
import { Loader2 } from 'lucide-react';
import '../styles/SaveMealButton.css';

interface SaveMealButtonProps {
  onSave: () => void;
  disabled: boolean;
  isLoading: boolean;
}

const SaveMealButton: React.FC<SaveMealButtonProps> = ({ 
  onSave, 
  disabled, 
  isLoading 
}) => {
  return (
    <button
      onClick={onSave}
      disabled={disabled || isLoading}
      className="save-meal-button"
    >
      <div className="button-content">
        {isLoading ? (
          <>
            <Loader2 className="loading-icon" />
            <span>Saving...</span>
          </>
        ) : (
          <span>Save Meal</span>
        )}
      </div>
    </button>
  );
};

export default SaveMealButton;
