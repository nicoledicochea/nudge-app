import { PortionData } from '@/types/portion';

export interface MealAnalysis {
  totalPortions: number;
  categoryCounts: Record<string, number>;
  balanceScore: number;
  suggestions: string[];
  // New properties for AI context
  mealCharacteristics: MealCharacteristics;
  aiContext: AIContext;
}

export interface MealCharacteristics {
  hasProtein: boolean;
  hasVegetables: boolean;
  hasCarbs: boolean;
  hasFats: boolean;
  isEmpty: boolean;
  isWellBalanced: boolean;
  dominantCategory: string | null;
  portionVariety: number;
  timeOfDay?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface AIContext {
  plateDescription: string;
  balanceStatus: 'excellent' | 'good' | 'fair' | 'needs-improvement' | 'empty';
  celebrationPoints: string[];
  gentleImprovements: string[];
  contextualFactors: {
    totalPortions: number;
    categorySpread: number;
    balanceScore: number;
  };
}

export interface PlateComposition {
  protein: number;
  vegetables: number;
  carbs: number;
  fats: number;
  totalPortions: number;
  balance: number;
}

/**
 * Enhanced meal analysis with AI context generation
 */
export const analyzeMeal = (portions: PortionData[], timeOfDay?: string): MealAnalysis => {
  const totalPortions = portions.length;
  
  // Count portions by category
  const categoryCounts = portions.reduce((acc, portion) => {
    acc[portion.category] = (acc[portion.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate balance score (enhanced)
  const balanceScore = calculateEnhancedBalance(portions);
  
  // Generate meal characteristics
  const mealCharacteristics = generateMealCharacteristics(portions, categoryCounts, timeOfDay);
  
  // Generate AI context
  const aiContext = generateAIContext(portions, categoryCounts, balanceScore, mealCharacteristics);
  
  // Generate fallback suggestions (used when AI is unavailable)
  const suggestions = generateFallbackSuggestions(mealCharacteristics, categoryCounts);

  return {
    totalPortions,
    categoryCounts,
    balanceScore,
    suggestions,
    mealCharacteristics,
    aiContext,
  };
};

/**
 * Generate detailed meal characteristics for AI context
 */
const generateMealCharacteristics = (
  portions: PortionData[], 
  categoryCounts: Record<string, number>,
  timeOfDay?: string
): MealCharacteristics => {
  const hasProtein = (categoryCounts.protein || 0) > 0;
  const hasVegetables = (categoryCounts.veggie || 0) > 0;
  const hasCarbs = (categoryCounts.carb || 0) > 0;
  const hasFats = (categoryCounts.fat || 0) > 0;
  const isEmpty = portions.length === 0;
  
  // Determine if well balanced (3+ categories with reasonable distribution)
  const presentCategories = Object.keys(categoryCounts).length;
  const isWellBalanced = presentCategories >= 3 && portions.length >= 3;
  
  // Find dominant category
  let dominantCategory: string | null = null;
  let maxCount = 0;
  Object.entries(categoryCounts).forEach(([category, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantCategory = category;
    }
  });
  
  return {
    hasProtein,
    hasVegetables,
    hasCarbs,
    hasFats,
    isEmpty,
    isWellBalanced,
    dominantCategory,
    portionVariety: presentCategories,
    timeOfDay: timeOfDay as any,
  };
};

/**
 * Generate structured context for AI feedback
 */
const generateAIContext = (
  portions: PortionData[],
  categoryCounts: Record<string, number>,
  balanceScore: number,
  characteristics: MealCharacteristics
): AIContext => {
  // Generate plate description
  const plateDescription = generatePlateDescription(portions, categoryCounts);
  
  // Determine balance status
  const balanceStatus = getBalanceStatus(balanceScore, characteristics);
  
  // Generate celebration points
  const celebrationPoints = generateCelebrationPoints(characteristics, categoryCounts);
  
  // Generate gentle improvements
  const gentleImprovements = generateGentleImprovements(characteristics, categoryCounts);
  
  return {
    plateDescription,
    balanceStatus,
    celebrationPoints,
    gentleImprovements,
    contextualFactors: {
      totalPortions: portions.length,
      categorySpread: characteristics.portionVariety,
      balanceScore,
    },
  };
};

/**
 * Generate human-readable plate description
 */
const generatePlateDescription = (portions: PortionData[], categoryCounts: Record<string, number>): string => {
  if (portions.length === 0) return "empty plate";
  
  const descriptions: string[] = [];
  
  Object.entries(categoryCounts).forEach(([category, count]) => {
    if (count > 0) {
      const categoryName = category === 'veggie' ? 'vegetables' : category;
      descriptions.push(`${count} ${categoryName} portion${count > 1 ? 's' : ''}`);
    }
  });
  
  return descriptions.join(', ');
};

/**
 * Determine balance status for AI context
 */
const getBalanceStatus = (balanceScore: number, characteristics: MealCharacteristics): AIContext['balanceStatus'] => {
  if (characteristics.isEmpty) return 'empty';
  if (balanceScore >= 80) return 'excellent';
  if (balanceScore >= 65) return 'good';
  if (balanceScore >= 45) return 'fair';
  return 'needs-improvement';
};

/**
 * Generate celebration points for AI to highlight
 */
const generateCelebrationPoints = (
  characteristics: MealCharacteristics,
  categoryCounts: Record<string, number>
): string[] => {
  const points: string[] = [];
  
  if (characteristics.hasProtein) {
    points.push(`included ${categoryCounts.protein} protein portion${categoryCounts.protein > 1 ? 's' : ''}`);
  }
  
  if (characteristics.hasVegetables) {
    points.push(`added ${categoryCounts.veggie} vegetable portion${categoryCounts.veggie > 1 ? 's' : ''}`);
  }
  
  if (characteristics.isWellBalanced) {
    points.push('created a well-balanced plate');
  }
  
  if (characteristics.portionVariety >= 3) {
    points.push('included variety across food groups');
  }
  
  return points;
};

/**
 * Generate gentle improvement suggestions for AI context
 */
const generateGentleImprovements = (
  characteristics: MealCharacteristics,
  categoryCounts: Record<string, number>
): string[] => {
  const improvements: string[] = [];
  
  if (!characteristics.hasProtein) {
    improvements.push('adding some protein for sustained energy');
  }
  
  if (!characteristics.hasVegetables) {
    improvements.push('including vegetables for extra nutrients');
  }
  
  if (characteristics.dominantCategory === 'carb' && categoryCounts.carb > 2) {
    improvements.push('balancing with more protein or vegetables');
  }
  
  if (characteristics.portionVariety === 1) {
    improvements.push('adding variety from other food groups');
  }
  
  return improvements;
};

/**
 * Enhanced balance calculation with more nuanced scoring
 */
const calculateEnhancedBalance = (platePortions: PortionData[]): number => {
  if (platePortions.length === 0) return 0;
  
  const categoryCounts = platePortions.reduce((acc, portion) => {
    acc[portion.category] = (acc[portion.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const presentCategories = Object.keys(categoryCounts).length;
  const totalPortions = platePortions.length;
  
  // Base score for category variety
  let varietyScore = 0;
  if (presentCategories >= 4) varietyScore = 30;
  else if (presentCategories === 3) varietyScore = 25;
  else if (presentCategories === 2) varietyScore = 15;
  else if (presentCategories === 1) varietyScore = 5;
  
  // Distribution score (how well balanced the portions are)
  const idealRatios = { protein: 0.25, veggie: 0.35, carb: 0.30, fat: 0.10 };
  let distributionScore = 0;
  
  Object.entries(idealRatios).forEach(([category, idealRatio]) => {
    const actualRatio = (categoryCounts[category] || 0) / totalPortions;
    const deviation = Math.abs(actualRatio - idealRatio);
    distributionScore += Math.max(0, (1 - deviation * 1.5)) * 15; // 15 points per category max
  });
  
  // Portion count bonus (reasonable total portions)
  let portionBonus = 0;
  if (totalPortions >= 3 && totalPortions <= 6) portionBonus = 10;
  else if (totalPortions >= 2) portionBonus = 5;
  
  return Math.min(100, Math.round(varietyScore + distributionScore + portionBonus));
};

/**
 * Generate fallback suggestions when AI is unavailable
 */
const generateFallbackSuggestions = (
  characteristics: MealCharacteristics,
  categoryCounts: Record<string, number>
): string[] => {
  if (characteristics.isEmpty) {
    return ['Add some portion blocks to your plate to get personalized feedback!'];
  }
  
  if (characteristics.isWellBalanced) {
    return ['Your plate looks beautifully balanced! Great work including variety. 🌱'];
  }
  
  if (!characteristics.hasProtein && !characteristics.hasVegetables) {
    return ['Great start! Consider adding some protein and vegetables for a more nourishing meal.'];
  }
  
  if (!characteristics.hasProtein) {
    return ['Nice choices! Adding some protein could help you feel satisfied longer.'];
  }
  
  if (!characteristics.hasVegetables) {
    return ['Looking good! Some vegetables would add great nutrients and fiber.'];
  }
  
  return ['You\'re doing great with portion awareness! Keep up the gentle progress.'];
};

// Keep existing functions for backward compatibility
export const generateMealFeedback = (portions: PortionData[]): string => {
  const analysis = analyzeMeal(portions);
  return analysis.suggestions[0] || 'Your plate looks great!';
};

export const calculateBalance = (platePortions: PortionData[]): number => {
  return calculateEnhancedBalance(platePortions);
};

export const analyzePlateComposition = (platePortions: PortionData[]): PlateComposition => {
  return {
    protein: platePortions.filter(p => p.category === 'protein').length,
    vegetables: platePortions.filter(p => p.category === 'veggie').length,
    carbs: platePortions.filter(p => p.category === 'carb').length,
    fats: platePortions.filter(p => p.category === 'fat').length,
    totalPortions: platePortions.length,
    balance: calculateEnhancedBalance(platePortions)
  };
};