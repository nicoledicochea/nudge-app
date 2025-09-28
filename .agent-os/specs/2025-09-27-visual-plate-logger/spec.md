# Spec Requirements Document

> Spec: Visual Plate Logger
> Created: 2025-09-27

## Overview

Implement a visual plate logger that allows users to log a single meal per session using universal portion shapes (palm, fist, ping pong ball, etc.) instead of calorie counting. This feature will provide an intuitive, mobile-first interface for meal logging that aligns with Nudge's gentle, non-judgmental approach to wellness tracking. This is the foundational meal logging experience that will be enhanced with multiple meals per day and historical review in future phases.

## User Stories

### Visual Meal Logging

As a Nudge user, I want to log my meals using visual portion shapes, so that I can track my food intake without the stress of calorie counting or food weighing.

When I open the Visual Plate Logger, I see a plate divided into four color-coded sections (Protein, Vegetables, Carbs, Fats). I can tap on any of the twelve available portion shapes from the gallery below. After selecting a shape, a popup appears asking me to categorize it as "Protein", "Carb", "Veggie", or "Fat". Once I make my selection, the portion appears in the appropriate colored section of my plate, auto-positioned next to existing portions. I can add multiple portions to build my complete meal visualization for this single meal session. I can also tap on any added portion to remove it from my plate.

### AI-Powered Meal Feedback

As a Nudge user, I want to receive gentle, encouraging feedback about my meal choices, so that I can make informed decisions without feeling judged or pressured.

After I've added portions to my plate and clicked "Save Meal", the AI analyzes my meal composition based on the portion categories and provides gentle feedback in a dedicated "AI Suggestion" area on the page. The feedback focuses on the balance of protein, vegetables, carbs, and fats, offering gentle recommendations for improvement, such as "Looks like a balanced meal! Consider adding more vegetables next time for extra fiber and fullness." If I haven't added any portions yet, the feedback will say "Add some portion blocks to your plate to get personalized feedback!" If AI feedback fails, I'll see "Feedback not available right now. Apologies for the inconvenience." This feedback helps me understand my meal patterns while maintaining the supportive, non-judgmental tone that defines the Nudge experience.

## Spec Scope

1. **Visual Plate Interface** - Mobile-first plate visualization with four color-coded sections for different food categories
2. **Portion Shape Gallery** - Twelve universal portion shapes (Palm, Ping Pong Ball, Fist, Cupped Hands, Smartphone, Ice Cream Scoop, Hockey Puck, Quarter, Shot Glass, Coffee Mug, Thumb Tip, Golf Ball) with tap-to-add functionality
3. **Category Selection Popup** - Modal that appears after shape selection to categorize portions as Protein, Carb, Veggie, or Fat
4. **Portion Management** - Tap-to-remove portions, auto-positioning with flexbox layout, flexible plate sections that expand with more portions
5. **AI Feedback Integration** - Dedicated "AI Suggestion" area that updates when "Save Meal" is clicked, with error handling and offline support
6. **Meal Saving** - "Save Meal" button that triggers AI feedback generation and stores visual meal data via existing `/api/meals/log` endpoint

## Out of Scope

- **Multiple meals per day** - Single meal logging per session only (planned for Phase 2)
- **Historical meal review** - No calendar view or date browsing (planned for Phase 2)
- **Meal type selection** - No breakfast/lunch/dinner/snack categorization (planned for Phase 2)
- **Daily meal summaries** - No daily overview or weekly patterns (planned for Phase 3)
- Advanced portion customization (resizing, rotating shapes)
- Photo-based meal logging
- Nutritional information display
- Portion shape editing after placement
- Offline functionality for this feature

## Expected Deliverable

1. **Functional Visual Plate Logger** - Users can successfully log meals by tapping portion shapes, categorizing them, and seeing them appear on the color-coded plate
2. **AI Feedback System** - Users receive gentle, encouraging feedback about their meal balance based on portion categories after logging portions
3. **Mobile-Optimized Experience** - The interface works seamlessly on mobile devices with touch-friendly interactions and responsive design
