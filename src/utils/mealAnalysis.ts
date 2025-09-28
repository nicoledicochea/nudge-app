import { PortionData } from '@/types/portion';

export interface MealAnalysis {
  totalPortions: number;
  categoryCounts: Record<string, number>;
  balanceScore: number;
  suggestions: string[];
}

export const analyzeMeal = (portions: PortionData[]): MealAnalysis => {
  const totalPortions = portions.length;
  
  // Count portions by category
  const categoryCounts = portions.reduce((acc, portion) => {
    acc[portion.category] = (acc[portion.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate balance score (0-100)
  let balanceScore = 0;
  // const expectedCategories = ['protein', 'veggie', 'carb', 'fat'];
  const presentCategories = Object.keys(categoryCounts).length;
  
  if (presentCategories >= 3) {
    balanceScore = 80;
  } else if (presentCategories === 2) {
    balanceScore = 60;
  } else if (presentCategories === 1) {
    balanceScore = 40;
  }

  // Generate suggestions
  const suggestions: string[] = [];
  
  if (totalPortions === 0) {
    suggestions.push('Add some portion blocks to your plate to get personalized feedback!');
  } else if (totalPortions === 1) {
    suggestions.push('Great start! Consider adding more variety to your meal for better balance.');
  } else if (totalPortions === 2) {
    suggestions.push('Nice progress! Adding a vegetable or protein could help round out your meal.');
  } else if (totalPortions >= 3) {
    if (categoryCounts.veggie && categoryCounts.protein && categoryCounts.carb) {
      suggestions.push('Looks like a balanced meal! You\'ve included protein, vegetables, and carbs.');
    } else if (categoryCounts.veggie >= 2) {
      suggestions.push('Excellent vegetable choices! Consider adding some protein for satiety.');
    } else if (categoryCounts.protein >= 2) {
      suggestions.push('Great protein selection! Adding more vegetables would provide extra nutrients.');
    } else {
      suggestions.push('Nice variety! Consider adding more vegetables for extra fiber and fullness.');
    }
  }

  return {
    totalPortions,
    categoryCounts,
    balanceScore,
    suggestions,
  };
};

export const generateMealFeedback = (portions: PortionData[]): string => {
  const analysis = analyzeMeal(portions);
  
  if (analysis.suggestions.length === 0) {
    return 'Add some portion blocks to your plate to get personalized feedback!';
  }
  
  let feedback = analysis.suggestions[0];
  
  // Add gentle encouragement for larger meals
  if (analysis.totalPortions >= 4) {
    feedback += ' You\'re doing great with portion awareness!';
  }
  
  return feedback;
};
