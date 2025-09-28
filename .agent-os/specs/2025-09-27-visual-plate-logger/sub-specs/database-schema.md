# Database Schema

This is the database schema implementation for the spec detailed in @.agent-os/specs/2025-09-27-visual-plate-logger/spec.md

## Changes

### Existing meal_logs Table Modification
The existing `meal_logs` table already has a `portions` JSONB field that can store the visual portion data. No schema changes are required.

### Current Schema
```sql
CREATE TABLE IF NOT EXISTS meal_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  portions JSONB DEFAULT '[]',
  ai_feedback TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Specifications

### Portions JSONB Structure
The `portions` field will store an array of portion objects with the following structure:

```json
[
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
  }
]
```

### AI Feedback Storage
The existing `ai_feedback` TEXT field will store the AI-generated meal suggestions:

```sql
-- Example AI feedback
"Looks like a balanced meal! Consider adding more non-starchy vegetables next time for extra fiber and fullness."
```

## Rationale

### JSONB for Portions
- **Flexibility**: JSONB allows for easy addition of new portion shapes and properties without schema migrations
- **Performance**: PostgreSQL JSONB provides efficient querying and indexing capabilities
- **Simplicity**: Single field stores all portion data, reducing complexity
- **Future-Proof**: Easy to extend with additional portion metadata (size, color, etc.)

### No Schema Changes Required
- **Existing Infrastructure**: The current `meal_logs` table already supports the required data structure
- **Backward Compatibility**: Existing meal logs continue to work without modification
- **Rapid Development**: No database migrations needed, allowing for faster feature implementation

### Data Integrity
- **Foreign Key Constraints**: `user_id` maintains referential integrity with users table
- **JSONB Validation**: Application-level validation ensures proper portion data structure
- **Timestamp Tracking**: `created_at` provides audit trail for meal logging
