import React from 'react';
import { PortionShape } from '@/types/portion';
import { PORTION_SHAPES, SHAPE_LABELS } from '@/utils/portionShapes';
import PortionIcon from './PortionIcon';
import '../styles/PortionShapeGallery.css';

interface PortionShapeGalleryProps {
  onSelectShape: (shape: PortionShape) => void;
}


const PortionShapeGallery: React.FC<PortionShapeGalleryProps> = ({ onSelectShape }) => {
  return (
    <div 
      data-testid="portion-shape-gallery"
      className="portion-shape-gallery"
    >
      {PORTION_SHAPES.map((shape) => (
        <button
          key={shape}
          onClick={() => onSelectShape(shape)}
          className="portion-shape"
          aria-label={`Select ${SHAPE_LABELS[shape]} portion`}
        >
          <div className="shape-content">
            <PortionIcon shape={shape} className="shape-icon" size="md" />
            <span className="shape-label">
              {SHAPE_LABELS[shape]}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default PortionShapeGallery;
