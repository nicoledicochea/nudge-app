import { useState } from 'react';
import { PortionData } from '../types/portion';
import { AIFeedbackResponse } from '../types/ai';
import { generateAIFeedback } from '../utils/aiFeedbackService';

/**
 * Hook for AI feedback on meal composition - triggered manually
 */
export const useAIFeedback = () => {
  const [feedback, setFeedback] = useState<AIFeedbackResponse | null>({
    feedback: "Add some portion blocks to your plate to get personalized feedback!",
  });
  const [isLoading, setIsLoading] = useState(false);

  const generateFeedback = async (portions: PortionData[]) => {
    setIsLoading(true);

    try {
      const result = await generateAIFeedback({ portions });
      setFeedback(result);
    } catch (err) {
      console.error('Failed to generate AI feedback:', err);
      
      // Set gentle fallback
      setFeedback({
        feedback: "Your plate looks great. Keep it up!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    feedback, 
    isLoading, 
    generateFeedback
  };
};