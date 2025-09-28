import React from 'react';
import { PortionShape } from '@/types/portion';
import { SHAPE_LABELS } from '@/utils/portionShapes';
import { 
  Hand, 
  Circle, 
  Smartphone, 
  Coffee, 
  Target
} from 'lucide-react';

interface PortionIconProps {
  shape: PortionShape;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SHAPE_ICONS: Record<PortionShape, React.ComponentType<{ className?: string; style?: React.CSSProperties, title?: string }>> = {
  palm: Hand,
  ping_pong_ball: Circle,
  fist: Hand,
  cupped_hands: Hand,
  smartphone: Smartphone,
  ice_cream_scoop: Target,
  hockey_puck: Circle,
  quarter: Circle,
  shot_glass: Coffee,
  coffee_mug: Coffee,
  thumb_tip: Hand,
  golf_ball: Circle,
};

const SIZE_CLASSES = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

const PortionIcon: React.FC<PortionIconProps> = ({ 
  shape, 
  className = '', 
  size = 'md' 
}) => {
  const IconComponent = SHAPE_ICONS[shape];
  const sizeClass = SIZE_CLASSES[size];
  
  return (
    <IconComponent 
      className={`${sizeClass} ${className}`}
      title={SHAPE_LABELS[shape]}
    />
  );
};

export default PortionIcon;
