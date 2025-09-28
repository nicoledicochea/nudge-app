// src/components/AIFeedbackBox.tsx
import React from 'react';
import { AIFeedbackResponse } from '../types/ai';
import '../styles/AIFeedbackBox.css';
import { Loader2, Sparkles } from 'lucide-react';

interface AIFeedbackBoxProps {
  feedback: AIFeedbackResponse | null;
  isLoading: boolean;
}

export const AIFeedbackBox: React.FC<AIFeedbackBoxProps> = ({ 
  feedback,
  isLoading,
}) => {

  return (
    <div 
      data-testid="ai-feedback-box"
      className="ai-feedback-box"
    >
      <div className="feedback-header">
        <Sparkles className="sparkles-icon" />
        <h3 className="feedback-title">
          AI Suggestion
        </h3>
      </div>
      
      <div className="feedback-content">
        {isLoading ? (
          <div className="loading-content">
            <Loader2 className="loading-icon" />
            <span>Generating feedback...</span>
          </div>
        ) : (
          <p>{feedback?.feedback}</p> 
        )}
      </div>
    </div>
  );
};