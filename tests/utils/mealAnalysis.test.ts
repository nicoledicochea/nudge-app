import { describe, it, expect } from 'vitest';
import { 
  analyzeMeal, 
  generateMealFeedback, 
  calculateBalance, 
  analyzePlateComposition,
  type MealAnalysis,
  type MealCharacteristics,
  type AIContext,
  type PlateComposition
} from '../../src/utils/mealAnalysis';
import { PortionData } from '../../src/types/portion';

describe('mealAnalysis utility', () => {
  const mockPortions: PortionData[] = [
    {
      id: '1',
      shape: 'palm',
      category: 'protein',
      position: { x: 0, y: 0 },
      timestamp: '2025-09-27T10:00:00Z'
    },
    {
      id: '2',
      shape: 'fist',
      category: 'veggie',
      position: { x: 0, y: 0 },
      timestamp: '2025-09-27T10:01:00Z'
    },
    {
      id: '3',
      shape: 'golf_ball',
      category: 'fat',
      position: { x: 0, y: 0 },
      timestamp: '2025-09-27T10:02:00Z'
    }
  ];

  const balancedPortions: PortionData[] = [
    {
      id: '1',
      shape: 'palm',
      category: 'protein',
      position: { x: 0, y: 0 },
      timestamp: '2025-09-27T10:00:00Z'
    },
    {
      id: '2',
      shape: 'fist',
      category: 'veggie',
      position: { x: 0, y: 0 },
      timestamp: '2025-09-27T10:01:00Z'
    },
    {
      id: '3',
      shape: 'cupped_hands',
      category: 'carb',
      position: { x: 0, y: 0 },
      timestamp: '2025-09-27T10:02:00Z'
    },
    {
      id: '4',
      shape: 'golf_ball',
      category: 'fat',
      position: { x: 0, y: 0 },
      timestamp: '2025-09-27T10:03:00Z'
    }
  ];

  describe('analyzeMeal', () => {
    it('analyzes empty meal correctly', () => {
      const analysis = analyzeMeal([]);
      
      expect(analysis.totalPortions).toBe(0);
      expect(analysis.categoryCounts).toEqual({});
      expect(analysis.balanceScore).toBe(0);
      expect(analysis.mealCharacteristics.isEmpty).toBe(true);
      expect(analysis.mealCharacteristics.isWellBalanced).toBe(false);
      expect(analysis.aiContext.balanceStatus).toBe('empty');
    });

    it('analyzes meal with portions correctly', () => {
      const analysis = analyzeMeal(mockPortions);
      
      expect(analysis.totalPortions).toBe(3);
      expect(analysis.categoryCounts).toEqual({
        protein: 1,
        veggie: 1,
        fat: 1
      });
      expect(analysis.balanceScore).toBeGreaterThan(0);
      expect(analysis.mealCharacteristics.isEmpty).toBe(false);
      expect(analysis.mealCharacteristics.hasProtein).toBe(true);
      expect(analysis.mealCharacteristics.hasVegetables).toBe(true);
      expect(analysis.mealCharacteristics.hasFats).toBe(true);
      expect(analysis.mealCharacteristics.hasCarbs).toBe(false);
    });

    it('identifies well-balanced meals', () => {
      const analysis = analyzeMeal(balancedPortions);
      
      expect(analysis.mealCharacteristics.isWellBalanced).toBe(true);
      expect(analysis.mealCharacteristics.portionVariety).toBe(4);
      expect(analysis.aiContext.balanceStatus).toBe('excellent');
    });

    it('generates appropriate suggestions', () => {
      const analysis = analyzeMeal(mockPortions);
      
      expect(analysis.suggestions).toBeDefined();
      expect(Array.isArray(analysis.suggestions)).toBe(true);
      expect(analysis.suggestions.length).toBeGreaterThan(0);
    });

    it('includes time of day in characteristics', () => {
      const analysis = analyzeMeal(mockPortions, 'breakfast');
      
      expect(analysis.mealCharacteristics.timeOfDay).toBe('breakfast');
    });

    it('generates AI context correctly', () => {
      const analysis = analyzeMeal(mockPortions);
      
      expect(analysis.aiContext).toBeDefined();
      expect(analysis.aiContext.plateDescription).toBeDefined();
      expect(analysis.aiContext.balanceStatus).toBeDefined();
      expect(analysis.aiContext.celebrationPoints).toBeDefined();
      expect(analysis.aiContext.gentleImprovements).toBeDefined();
      expect(analysis.aiContext.contextualFactors).toBeDefined();
    });
  });

  describe('generateMealFeedback', () => {
    it('generates feedback for empty meal', () => {
      const feedback = generateMealFeedback([]);
      
      expect(typeof feedback).toBe('string');
      expect(feedback.length).toBeGreaterThan(0);
      expect(feedback).toContain('Add some portion blocks');
    });

    it('generates feedback for balanced meal', () => {
      const feedback = generateMealFeedback(balancedPortions);
      
      expect(typeof feedback).toBe('string');
      expect(feedback.length).toBeGreaterThan(0);
    });

    it('generates feedback for unbalanced meal', () => {
      const feedback = generateMealFeedback(mockPortions);
      
      expect(typeof feedback).toBe('string');
      expect(feedback.length).toBeGreaterThan(0);
    });
  });

  describe('calculateBalance', () => {
    it('returns 0 for empty meal', () => {
      const balance = calculateBalance([]);
      expect(balance).toBe(0);
    });

    it('returns higher score for balanced meals', () => {
      const emptyBalance = calculateBalance([]);
      const mockBalance = calculateBalance(mockPortions);
      const balancedBalance = calculateBalance(balancedPortions);
      
      expect(mockBalance).toBeGreaterThan(emptyBalance);
      expect(balancedBalance).toBeGreaterThan(mockBalance);
    });

    it('returns score between 0 and 100', () => {
      const balance = calculateBalance(mockPortions);
      expect(balance).toBeGreaterThanOrEqual(0);
      expect(balance).toBeLessThanOrEqual(100);
    });
  });

  describe('analyzePlateComposition', () => {
    it('analyzes empty plate correctly', () => {
      const composition = analyzePlateComposition([]);
      
      expect(composition).toEqual({
        protein: 0,
        vegetables: 0,
        carbs: 0,
        fats: 0,
        totalPortions: 0,
        balance: 0
      });
    });

    it('analyzes plate with portions correctly', () => {
      const composition = analyzePlateComposition(mockPortions);
      
      expect(composition.protein).toBe(1);
      expect(composition.vegetables).toBe(1);
      expect(composition.carbs).toBe(0);
      expect(composition.fats).toBe(1);
      expect(composition.totalPortions).toBe(3);
      expect(composition.balance).toBeGreaterThan(0);
    });

    it('analyzes balanced plate correctly', () => {
      const composition = analyzePlateComposition(balancedPortions);
      
      expect(composition.protein).toBe(1);
      expect(composition.vegetables).toBe(1);
      expect(composition.carbs).toBe(1);
      expect(composition.fats).toBe(1);
      expect(composition.totalPortions).toBe(4);
      expect(composition.balance).toBeGreaterThan(0);
    });
  });

  describe('meal characteristics', () => {
    it('correctly identifies dominant category', () => {
      const proteinHeavyPortions: PortionData[] = [
        { id: '1', shape: 'palm', category: 'protein', position: { x: 0, y: 0 }, timestamp: '2025-09-27T10:00:00Z' },
        { id: '2', shape: 'fist', category: 'protein', position: { x: 0, y: 0 }, timestamp: '2025-09-27T10:01:00Z' },
        { id: '3', shape: 'golf_ball', category: 'fat', position: { x: 0, y: 0 }, timestamp: '2025-09-27T10:02:00Z' }
      ];

      const analysis = analyzeMeal(proteinHeavyPortions);
      expect(analysis.mealCharacteristics.dominantCategory).toBe('protein');
    });

    it('calculates portion variety correctly', () => {
      const analysis = analyzeMeal(mockPortions);
      expect(analysis.mealCharacteristics.portionVariety).toBe(3);
    });
  });

  describe('AI context generation', () => {
    it('generates appropriate plate description', () => {
      const analysis = analyzeMeal(mockPortions);
      
      expect(analysis.aiContext.plateDescription).toContain('protein');
      expect(analysis.aiContext.plateDescription).toContain('vegetable');
      expect(analysis.aiContext.plateDescription).toContain('fat');
    });

    it('generates celebration points', () => {
      const analysis = analyzeMeal(mockPortions);
      
      expect(Array.isArray(analysis.aiContext.celebrationPoints)).toBe(true);
      expect(analysis.aiContext.celebrationPoints.length).toBeGreaterThan(0);
    });

    it('generates gentle improvements', () => {
      const analysis = analyzeMeal(mockPortions);
      
      expect(Array.isArray(analysis.aiContext.gentleImprovements)).toBe(true);
      // Should suggest adding carbs since they're missing
      expect(analysis.aiContext.gentleImprovements.some(improvement => 
        improvement.includes('carb') || improvement.includes('variety') || improvement.includes('protein') || improvement.includes('vegetable')
      )).toBe(true);
    });

    it('calculates contextual factors correctly', () => {
      const analysis = analyzeMeal(mockPortions);
      
      expect(analysis.aiContext.contextualFactors.totalPortions).toBe(3);
      expect(analysis.aiContext.contextualFactors.categorySpread).toBe(3);
      expect(analysis.aiContext.contextualFactors.balanceScore).toBe(analysis.balanceScore);
    });
  });
});
