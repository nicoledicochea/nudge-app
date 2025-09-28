export type PortionShape = 
  | 'palm'
  | 'ping_pong_ball'
  | 'fist'
  | 'cupped_hands'
  | 'smartphone'
  | 'ice_cream_scoop'
  | 'hockey_puck'
  | 'quarter'
  | 'shot_glass'
  | 'coffee_mug'
  | 'thumb_tip'
  | 'golf_ball';

export type FoodCategory = 'protein' | 'carb' | 'veggie' | 'fat';

export interface PortionData {
  id: string;
  shape: PortionShape;
  category: FoodCategory;
  position: { x: number; y: number };
  timestamp: string;
}

export interface MealLogData {
  user_id: number;
  portions: PortionData[];
  ai_feedback: string;
  created_at: string;
}

export interface PlateState {
  portions: PortionData[];
  selectedShape: PortionShape | null;
  showCategoryModal: boolean;
  aiFeedback: string;
  isLoading: boolean;
}
