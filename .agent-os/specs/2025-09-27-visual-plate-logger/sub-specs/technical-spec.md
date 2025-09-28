# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-09-27-visual-plate-logger/spec.md

## Technical Requirements

### Frontend Components
- **VisualPlateLogger Component** - Main React component for the plate logging interface
- **PortionShapeGallery Component** - Grid display of twelve portion shapes with tap interactions
- **CategorySelectionModal Component** - Popup modal for selecting food category (Protein, Carb, Veggie, Fat)
- **PlateVisualization Component** - Color-coded plate with four flexible sections for different food categories using flexbox layout
- **AIFeedbackBox Component** - Dedicated area on the page displaying AI-generated meal suggestions
- **SaveMealButton Component** - Button that triggers meal saving and AI feedback generation

### UI/UX Specifications
- **Mobile-First Design** - Responsive layout optimized for smartphone screens
- **Touch-Friendly Interactions** - Minimum 44px touch targets for all interactive elements
- **Color-Coded Sections** - Protein (light red), Vegetables (light green), Carbs (light yellow), Fats (light orange)
- **Gentle Animations** - Soft transitions when adding portions to plate
- **Accessibility** - ARIA labels, keyboard navigation support, high contrast ratios

### Integration Requirements
- **Existing API Integration** - Extend `/api/meals/log` endpoint to handle visual portion data
- **AI Feedback Integration** - Connect to existing Gemini Pro chat system for portion category balance analysis triggered by "Save Meal" button
- **Error Handling** - Retry mechanism for AI feedback failures with fallback message "Feedback not available right now. Apologies for the inconvenience"
- **Offline Support** - PWA functionality for offline meal logging without AI feedback
- **State Management** - React hooks for managing plate state, selected portions, and AI feedback
- **Data Persistence** - Store portion data in existing PostgreSQL meal_logs table

### Performance Criteria
- **Load Time** - Plate logger interface loads within 2 seconds
- **Interaction Response** - Tap-to-add interactions respond within 200ms
- **AI Feedback** - Portion category balance analysis and suggestions generated within 3 seconds when "Save Meal" is clicked
- **Mobile Performance** - Smooth 60fps animations on mid-range mobile devices

### Data Structure
```javascript
// Portion data structure
{
  id: string,
  shape: 'palm' | 'ping_pong_ball' | 'fist' | 'cupped_hands' | 'smartphone' | 'ice_cream_scoop' | 'hockey_puck' | 'quarter' | 'shot_glass' | 'coffee_mug' | 'thumb_tip' | 'golf_ball',
  category: 'protein' | 'carb' | 'veggie' | 'fat',
  position: { x: number, y: number }, // Position on plate
  timestamp: string
}

// Meal log data structure
{
  user_id: number,
  portions: PortionData[],
  ai_feedback: string,
  created_at: timestamp
}
```

### Component Architecture
```
VisualPlateLogger/
├── components/
│   ├── PortionShapeGallery.jsx
│   ├── CategorySelectionModal.jsx
│   ├── PlateVisualization.jsx
│   ├── AIFeedbackBox.jsx
│   └── SaveMealButton.jsx
├── hooks/
│   ├── usePlateState.js
│   └── useAIFeedback.js
├── utils/
│   ├── portionShapes.js
│   └── mealAnalysis.js
└── styles/
    └── VisualPlateLogger.css
```
