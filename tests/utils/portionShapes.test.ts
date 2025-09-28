import { describe, it, expect } from 'vitest';
import { PORTION_SHAPES, SHAPE_LABELS, CATEGORY_LABELS, CATEGORY_COLORS } from '../../src/utils/portionShapes';
import { PortionShape } from '../../src/types/portion';

describe('portionShapes utility', () => {
  describe('PORTION_SHAPES', () => {
    it('contains all 12 portion shapes', () => {
      expect(PORTION_SHAPES).toHaveLength(12);
    });

    it('contains expected portion shapes', () => {
      const expectedShapes: PortionShape[] = [
        'palm',
        'ping_pong_ball',
        'fist',
        'cupped_hands',
        'smartphone',
        'ice_cream_scoop',
        'hockey_puck',
        'quarter',
        'shot_glass',
        'coffee_mug',
        'thumb_tip',
        'golf_ball'
      ];

      expectedShapes.forEach(shape => {
        expect(PORTION_SHAPES).toContain(shape);
      });
    });

    it('has no duplicate shapes', () => {
      const uniqueShapes = new Set(PORTION_SHAPES);
      expect(uniqueShapes.size).toBe(PORTION_SHAPES.length);
    });
  });

  describe('SHAPE_LABELS', () => {
    it('has labels for all portion shapes', () => {
      PORTION_SHAPES.forEach(shape => {
        expect(SHAPE_LABELS[shape]).toBeDefined();
        expect(typeof SHAPE_LABELS[shape]).toBe('string');
        expect(SHAPE_LABELS[shape].length).toBeGreaterThan(0);
      });
    });

    it('has correct labels for specific shapes', () => {
      expect(SHAPE_LABELS.palm).toBe('Palm');
      expect(SHAPE_LABELS.ping_pong_ball).toBe('Ping Pong Ball');
      expect(SHAPE_LABELS.fist).toBe('Fist');
      expect(SHAPE_LABELS.cupped_hands).toBe('Cupped Hands');
      expect(SHAPE_LABELS.smartphone).toBe('Smartphone');
      expect(SHAPE_LABELS.ice_cream_scoop).toBe('Ice Cream Scoop');
      expect(SHAPE_LABELS.hockey_puck).toBe('Hockey Puck');
      expect(SHAPE_LABELS.quarter).toBe('Quarter');
      expect(SHAPE_LABELS.shot_glass).toBe('Shot Glass');
      expect(SHAPE_LABELS.coffee_mug).toBe('Coffee Mug');
      expect(SHAPE_LABELS.thumb_tip).toBe('Thumb Tip');
      expect(SHAPE_LABELS.golf_ball).toBe('Golf Ball');
    });
  });

  describe('CATEGORY_LABELS', () => {
    it('has labels for all food categories', () => {
      const categories = ['protein', 'carb', 'veggie', 'fat'];
      
      categories.forEach(category => {
        expect(CATEGORY_LABELS[category]).toBeDefined();
        expect(typeof CATEGORY_LABELS[category]).toBe('string');
        expect(CATEGORY_LABELS[category].length).toBeGreaterThan(0);
      });
    });

    it('has correct labels for specific categories', () => {
      expect(CATEGORY_LABELS.protein).toBe('Protein');
      expect(CATEGORY_LABELS.carb).toBe('Carb');
      expect(CATEGORY_LABELS.veggie).toBe('Vegetable');
      expect(CATEGORY_LABELS.fat).toBe('Fat');
    });
  });

  describe('CATEGORY_COLORS', () => {
    it('has colors for all food categories', () => {
      const categories = ['protein', 'carb', 'veggie', 'fat'];
      
      categories.forEach(category => {
        expect(CATEGORY_COLORS[category]).toBeDefined();
        expect(typeof CATEGORY_COLORS[category]).toBe('string');
        expect(CATEGORY_COLORS[category].length).toBeGreaterThan(0);
      });
    });

    it('has correct color classes for specific categories', () => {
      expect(CATEGORY_COLORS.protein).toBe('bg-protein');
      expect(CATEGORY_COLORS.carb).toBe('bg-carbs');
      expect(CATEGORY_COLORS.veggie).toBe('bg-vegetables');
      expect(CATEGORY_COLORS.fat).toBe('bg-fats');
    });
  });
});
