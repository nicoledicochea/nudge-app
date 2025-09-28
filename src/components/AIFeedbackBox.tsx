import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import '../styles/AIFeedbackBox.css';

interface AIFeedbackBoxProps {
  feedback: string;
  isLoading: boolean;
}

const AIFeedbackBox: React.FC<AIFeedbackBoxProps> = ({ feedback, isLoading }) => {
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
          <p>{feedback}</p>
        )}
      </div>
    </div>
  );
};

export default AIFeedbackBox;
