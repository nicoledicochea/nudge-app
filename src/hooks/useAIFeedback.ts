import { useState, useCallback } from 'react';
import { PortionData } from '@/types/portion';

const useAIFeedback = () => {
  const [aiFeedback, setAiFeedback] = useState<string>(
    'Add some portion blocks to your plate to get personalized feedback!'
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateFeedback = useCallback(async (portions: PortionData[]) => {
    if (portions.length === 0) {
      setAiFeedback('Add some portion blocks to your plate to get personalized feedback!');
      return;
    }

    setIsLoading(true);

    try {
      // Count portions by category
      const categoryCounts = portions.reduce((acc, portion) => {
        acc[portion.category] = (acc[portion.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Generate feedback based on portion balance
      let feedback = '';
      const totalPortions = portions.length;

      if (totalPortions === 1) {
        feedback = 'Great start! Consider adding more variety to your meal for better balance.';
      } else if (totalPortions === 2) {
        feedback = 'Nice progress! Adding a vegetable or protein could help round out your meal.';
      } else if (totalPortions >= 3) {
        if (categoryCounts.veggie && categoryCounts.protein && categoryCounts.carb) {
          feedback = 'Looks like a balanced meal! You\'ve included protein, vegetables, and carbs.';
        } else if (categoryCounts.veggie >= 2) {
          feedback = 'Excellent vegetable choices! Consider adding some protein for satiety.';
        } else if (categoryCounts.protein >= 2) {
          feedback = 'Great protein selection! Adding more vegetables would provide extra nutrients.';
        } else {
          feedback = 'Nice variety! Consider adding more vegetables for extra fiber and fullness.';
        }
      }

      // Add gentle encouragement
      if (totalPortions >= 4) {
        feedback += ' You\'re doing great with portion awareness!';
      }

      setAiFeedback(feedback);
    } catch (error) {
      console.error('Error generating AI feedback:', error);
      setAiFeedback('Feedback not available right now. Apologies for the inconvenience.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    aiFeedback,
    isLoading,
    generateFeedback,
  };
};

export default useAIFeedback;
