# API Specification

This is the API specification for the spec detailed in @.agent-os/specs/2025-09-27-visual-plate-logger/spec.md

## Endpoints

### POST /api/meals/log

**Purpose:** Log a meal with visual portion data and receive AI feedback
**Parameters:** 
- `portions` (array): Array of portion objects with shape, category, and position data
- `user_id` (number): User ID from JWT token

**Request Body:**
```json
{
  "portions": [
    {
      "id": "portion_1234567890",
      "shape": "palm",
      "category": "protein",
      "position": {
        "x": 0.25,
        "y": 0.3
      },
      "timestamp": "2025-09-27T10:30:00Z"
    },
    {
      "id": "portion_1234567891",
      "shape": "fist",
      "category": "veggie",
      "position": {
        "x": 0.75,
        "y": 0.2
      },
      "timestamp": "2025-09-27T10:31:00Z"
    },
    {
      "id": "portion_1234567892",
      "shape": "hockey_puck",
      "category": "carb",
      "position": {
        "x": 0.3,
        "y": 0.7
      },
      "timestamp": "2025-09-27T10:32:00Z"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "meal": {
    "id": 123,
    "user_id": 456,
    "portions": [
      {
        "id": "portion_1234567890",
        "shape": "palm",
        "category": "protein",
        "position": {
          "x": 0.25,
          "y": 0.3
        },
        "timestamp": "2025-09-27T10:30:00Z"
      }
    ],
    "ai_feedback": "Looks like a balanced meal! Consider adding more vegetables next time for extra fiber and fullness.",
    "created_at": "2025-09-27T10:35:00Z"
  },
  "message": "Meal logged successfully! Your gentle progress continues."
}
```

**Errors:**
- `400 Bad Request`: Invalid portion data or missing required fields
- `401 Unauthorized`: Invalid or missing JWT token
- `500 Internal Server Error`: Database or AI service error

### GET /api/meals/recent

**Purpose:** Retrieve recent meal logs for the authenticated user
**Parameters:** 
- `limit` (optional, number): Number of recent meals to return (default: 10)

**Response:**
```json
{
  "success": true,
  "meals": [
    {
      "id": 123,
      "user_id": 456,
      "portions": [
        {
          "id": "portion_1234567890",
          "shape": "palm",
          "category": "protein",
          "position": {
            "x": 0.25,
            "y": 0.3
          },
          "timestamp": "2025-09-27T10:30:00Z"
        }
      ],
      "ai_feedback": "Looks like a balanced meal! Consider adding more vegetables next time for extra fiber and fullness.",
      "created_at": "2025-09-27T10:35:00Z"
    }
  ]
}
```

**Errors:**
- `401 Unauthorized`: Invalid or missing JWT token
- `500 Internal Server Error`: Database error

## Controllers

### Meal Logging Controller
- **Action:** `logMeal`
- **Business Logic:** 
  1. Validate portion data structure
  2. Store meal data in PostgreSQL
  3. Generate AI feedback using Gemini Pro based on portion category balance
  4. Return meal data with AI feedback
- **Error Handling:** Gentle error messages that maintain supportive tone

### Meal Retrieval Controller
- **Action:** `getRecentMeals`
- **Business Logic:**
  1. Authenticate user via JWT
  2. Query recent meals from database
  3. Return formatted meal data
- **Error Handling:** Standard error responses with user-friendly messages

## Purpose

### Meal Logging Integration
The existing `/api/meals/log` endpoint will be extended to handle visual portion data while maintaining backward compatibility with text-based meal logging. This allows the visual plate logger to integrate seamlessly with the existing meal tracking system.

### AI Feedback Integration
The meal logging endpoint will automatically generate AI feedback based on the portion category balance (protein, vegetables, carbs, fats), providing users with gentle, encouraging suggestions about their meal composition. This feedback is stored with the meal data for future reference.

### Data Consistency
Both endpoints maintain the existing data structure and error handling patterns, ensuring consistency across the application while adding new visual logging capabilities.
