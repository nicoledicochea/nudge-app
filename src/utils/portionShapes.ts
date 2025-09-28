import { PortionShape } from '@/types/portion';

export const PORTION_SHAPES: PortionShape[] = [
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

export const SHAPE_LABELS: Record<PortionShape, string> = {
  palm: 'Palm',
  ping_pong_ball: 'Ping Pong Ball',
  fist: 'Fist',
  cupped_hands: 'Cupped Hands',
  smartphone: 'Smartphone',
  ice_cream_scoop: 'Ice Cream Scoop',
  hockey_puck: 'Hockey Puck',
  quarter: 'Quarter',
  shot_glass: 'Shot Glass',
  coffee_mug: 'Coffee Mug',
  thumb_tip: 'Thumb Tip',
  golf_ball: 'Golf Ball'
};

export const CATEGORY_LABELS: Record<string, string> = {
  protein: 'Protein',
  carb: 'Carb',
  veggie: 'Vegetable',
  fat: 'Fat'
};

export const CATEGORY_COLORS: Record<string, string> = {
  protein: 'bg-protein',
  carb: 'bg-carbs',
  veggie: 'bg-vegetables',
  fat: 'bg-fats'
};
