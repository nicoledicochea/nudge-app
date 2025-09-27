# Nudge - Product Requirements Document

## Executive Summary

**Mission:** Transform the challenging journey of building healthy habits into a gentle, encouraging, and sustainable experience through personalized nudges, progress celebration, and kind guidance.

**Vision:** Gentle nudges toward your best self - where small changes create lasting wellness through support, not pressure.

**Core Philosophy:** Progress over perfection. Small nudges, big changes. Gentle guidance, never judgment.

## Product Overview

### Target Users

- **General Wellness:** Individuals wanting better eating habits, portion control, and mindful living
- **Weight Management:** People seeking sustainable approaches without restrictive dieting
- **Post-Diet Recovery:** Users recovering from diet culture or restrictive eating patterns
- **Bariatric Support:** Pre-op and post-op bariatric surgery patients (specialized track)
- **Mindful Living:** Anyone wanting to build conscious, intentional daily habits

### Key Value Propositions

- **Gentle Approach:** Supportive nudges that encourage rather than pressure or shame
- **Visual Simplicity:** No calorie counting or food weighing - intuitive visual portion logging
- **Universal Flexibility:** Portion shapes work with any food, any cuisine, any lifestyle
- **AI Companionship:** Personal guide that learns your patterns and provides contextual support
- **Habit Formation:** Focus on building sustainable behaviors rather than quick fixes
- **Adaptive Support:** Personalized experience that adjusts to your goals and stage of journey

## Core Features & User Stories

### 1. User Onboarding & Personalization

**User Stories:**

- As a new user, I want to share what brings me to Nudge so the app can provide appropriate support
- As a user, I want to indicate my wellness goals (general health, weight management, bariatric support) so I receive relevant guidance
- As a bariatric user, I want to specify my surgery stage so I get medically appropriate suggestions
- As a user, I want to set my personal preferences and restrictions so recommendations fit my lifestyle

**Technical Requirements:**

- Gentle onboarding flow with empathetic language
- User goal selection with conditional feature sets
- Optional bariatric-specific settings (surgery type, phase, date)
- Preference management for food restrictions and personal goals

### 2. RAG-Powered AI Chat Interface (Primary Feature)

**User Stories:**

- As a user, I want to chat with an AI companion that remembers my patterns and provides personalized advice
- As a user, I want to ask questions about my health journey and get encouraging, evidence-based responses
- As a user, I want the AI to proactively offer gentle nudges based on my recent activity
- As a user, I want to log activities through natural language ("I had a palm-size chicken breast")
- As a bariatric user, I want the AI to understand my specific needs and restrictions

**RAG Implementation:**

- **Personal Context:** User's meal logs, symptoms, preferences, progress patterns
- **General Knowledge:** Nutrition science, mindful eating principles, wellness research
- **Specialized Knowledge:** Bariatric surgery guidelines, post-op nutrition protocols
- **Behavioral Science:** Habit formation research, gentle behavior change techniques

**Chat Capabilities:**

- Natural language meal logging with automatic portion recognition
- Contextual wellness advice based on user patterns
- Gentle problem-solving for challenges ("I'm struggling with water intake")
- Progress celebration and encouragement
- Educational content delivery in conversational format

### 3. Visual Plate Logger

**User Stories:**

- As a user, I want to log meals using visual portion shapes instead of measuring food
- As a user, I want to use universal portion references that work with any food
- As a user, I want to tap a portion shape and choose where to place it on my plate
- As a user, I want instant, encouraging feedback on my meal balance
- As a user, I want to remove portions from my plate if I made a mistake

**Universal Portion Shape Library:**

- **Palm Size:** Standard protein portions
- **Ping Pong Ball:** Small portions (eggs, nuts)
- **Fist:** Vegetables, larger portions
- **Cupped Hands:** Leafy greens, salads
- **Smartphone:** Starchy carbohydrates
- **Ice Cream Scoop:** Scoopable foods (yogurt, rice, etc.)
- **Hockey Puck:** Thick items (bagels, bread)
- **Quarter:** Very small portions (crackers)
- **Shot Glass:** Liquid supplements, small soft foods
- **Coffee Mug:** Soups, protein shakes
- **Thumb Tip:** Small fat portions (oils)
- **Golf Ball:** Larger fat portions (nuts, avocado)

**Plate Visualization:**

- **Protein (Right half):** Sage green color scheme
- **Vegetables (Top left quarter):** Forest green color scheme
- **Carbohydrates (Bottom left quarter):** Warm amber color scheme
- **Healthy Fats (Small bottom center section):** Coral color scheme

**AI Feedback System:**

- Encouraging, never critical language
- Focus on balance and nourishment rather than restriction
- Personalized suggestions based on user goals and patterns
- Celebration of progress and good choices

### 4. Mindful Eating & Wellness Practices

**User Stories:**

- As a user, I want a gentle eating timer to practice mindful eating
- As a user, I want reminders to slow down and check in with my body during meals
- As a user, I want simple hydration tracking that celebrates progress
- As a bariatric user, I want hydration reminders that respect the no-drinking-with-meals rule

**Features:**

- **Mindful Eating Timer:** 30-minute gentle timer with soft halfway reminder
- **Hydration Tracking:** Tap-to-log water intake with encouraging progress visualization
- **Meal Spacing:** Smart reminders for appropriate meal timing
- **Body Check-ins:** Gentle prompts to assess hunger, fullness, and satisfaction

### 5. Proactive Wellness Check-ins

**User Stories:**

- As a user, I want to quickly log how I'm feeling so the app can provide personalized support
- As a user, I want gentle suggestions based on my current physical and emotional state
- As a user, I want the app to recognize patterns in my wellness and offer insights
- As a user, I want encouragement when I'm struggling and celebration when I'm thriving

**Check-in Components:**

- **Wellness Slider:** Simple 1-10 scale for overall feeling
- **Symptom Tracking:** Gentle options for physical symptoms (nauseous, energized, etc.)
- **Mood Context:** Optional emotional state sharing
- **Personalized Response:** AI-generated suggestions based on patterns and current state

**AI Response System:**

- Context-aware suggestions that consider time of day, recent meals, and patterns
- Gentle problem-solving for challenges
- Proactive support for potential issues
- Celebration of self-awareness and check-in consistency

## Advanced Features (Phase 2 & 3)

### 7. The Why Wall - Personal Motivation Board (Phase 2)

**User Stories:**

- As a user, I want a private space to store personal motivations that remind me why I'm building healthy habits
- As a user, I want to add photos, quotes, and achievements that inspire me during challenging moments
- As a user, I want to quickly access my motivations when I'm struggling or need encouragement
- As a user, I want the AI to gently reference my personal motivations in conversations

**Visual Design:**

- **Pinterest-inspired Layout:** Clean, responsive grid displaying motivation cards
- **Content Cards:** Each motivator displayed as distinct card (photos with captions, text quotes, achievements)
- **Simple Interaction:** Tap to enlarge, easy "Add to Wall" button for new content
- **Private & Personal:** Completely user-controlled space with no judgment or tracking

**Technical Requirements:**

- Image upload and storage functionality
- Text input with rich formatting options
- Grid layout with responsive design
- Integration with chat AI for contextual motivation references
- Privacy-focused data storage (user owns all content)

### 8. Non-Scale Victories Tracker (Phase 2)

**User Stories:**

- As a user, I want to celebrate progress that isn't related to weight or appearance
- As a user, I want to log meaningful achievements like energy levels, mood improvements, or habit consistency
- As a user, I want to see a feed of my victories to recognize progress during difficult times
- As a user, I want the AI to celebrate and reference my non-scale victories

**Victory Categories:**

- **Energy & Mood:** "Had energy to play with my kids," "Felt confident today"
- **Habit Achievements:** "Ate mindfully for a whole week," "Drank enough water 5 days straight"
- **Body Appreciation:** "Noticed my strength during a walk," "Appreciated what my body can do"
- **Social & Emotional:** "Enjoyed a meal out without anxiety," "Listened to my hunger cues"

**Features:**

- **Simple Logging:** Large, friendly "+ Log a Victory" button with easy text input
- **Chronological Feed:** Time-ordered display of achievements with dates
- **AI Integration:** Gentle celebration and pattern recognition in chat
- **Progress Recognition:** Identification of recurring themes and growth areas

**Technical Requirements:**

- Simple text input with optional categorization
- Chronological data storage and display
- Search and filtering capabilities
- Integration with chat AI for victory celebration and pattern analysis

### 9. Movement Journey Gamification (Phase 2)

**User Stories:**

- As a user, I want physical activity to feel like a rewarding journey rather than a chore
- As a user, I want to achieve small, manageable movement goals that build confidence
- As a user, I want to see visual progress that celebrates consistency over intensity
- As a user, I want movement suggestions that fit my current energy and ability level

**Gamification Elements:**

- **Visual Journey Path:** Winding path that fills with color as movement is logged
- **Movement Snacks:** Small, achievable goals (10-minute stretches, short walks, desk exercises)
- **Milestone Celebrations:** Gentle badges for consistency ("Moved 3 days this week," "Tried a new activity")
- **Adaptive Suggestions:** AI-powered activity recommendations based on mood, energy, and preferences

**Movement Categories:**

- **Gentle Stretches:** Desk stretches, morning mobility, bedtime relaxation
- **Mindful Movement:** Walking meditation, tai chi, gentle yoga
- **Daily Life Integration:** Taking stairs, parking farther, household activities
- **Energy Boosters:** Short dance sessions, marching in place, breathing exercises

**Technical Requirements:**

- Visual progress tracking with engaging animations
- Activity logging with time and type options
- Badge/milestone system with positive reinforcement
- Integration with chat AI for personalized movement suggestions
- Optional integration with fitness trackers and health apps

### 10. Smart Meal Planning & Recipe Suggestions (Phase 3)

**User Stories:**

- As a user, I want AI-generated meal suggestions based on my eating patterns and preferences
- As a user, I want recipes broken down into simple, manageable steps that reduce cooking overwhelm
- As a user, I want grocery lists that automatically exclude foods I dislike or can't tolerate
- As a user, I want proactive meal planning that prevents impulsive food choices

**Meal Planning Features:**

- **AI-Generated Meal Plans:** Personalized weekly planning based on user data, preferences, and goals
- **Recipe Simplification:** Two-step breakdown ("Prep" and "Cook") with clear time estimates
- **Dynamic Taste Profile:** User-editable list of disliked foods that automatically filters suggestions
- **Smart Shopping Lists:** AI-curated grocery lists with healthy substitution suggestions

**Proactive Features:**

- **Meal Prep Reminders:** Gentle nudges to prepare meals before hunger peaks
- **Ingredient-Based Suggestions:** Recommendations based on what users already have
- **Energy-Level Matching:** Meal complexity adjusted to user's reported energy and time availability
- **Nutritional Balance:** Automatic optimization for user's specific wellness goals

**Technical Requirements:**

- Recipe database with nutritional information
- User preference learning and storage
- Shopping list generation and management
- Integration with grocery delivery services (future enhancement)
- Meal timing optimization based on user patterns

### 11. Enhanced Safety & Emergency Features (Phase 3)

**User Stories:**

- As a user, I want quick access to emergency resources when I'm struggling with my wellness journey
- As a user, I want the app to recognize concerning patterns and provide appropriate support
- As a bariatric user, I want immediate access to my surgeon's contact information and post-op emergency guidelines
- As a user recovering from disordered eating, I want crisis resources readily available

**Safety Components:**

- **Emergency Contacts:** Quick access to healthcare providers, crisis hotlines, and support people
- **Pattern Recognition:** AI identification of concerning behaviors (restriction, binging, extreme mood changes)
- **Crisis Resources:** Immediate access to eating disorder hotlines, mental health support, and professional resources
- **Medical Guidelines:** Quick reference for symptoms requiring immediate medical attention

**Bariatric-Specific Safety:**

- **Surgeon Contact Information:** Prominent display of surgical team contacts
- **Post-Op Emergency Symptoms:** Clear list of symptoms requiring immediate medical attention
- **Dumping Syndrome Recognition:** Educational content and emergency response guidance
- **Nutritional Emergency:** Recognition of severe deficiency symptoms and appropriate responses

**General Wellness Safety:**

- **Mental Health Crisis:** Integration with crisis text lines and emergency mental health resources
- **Eating Disorder Support:** Quick access to NEDA hotline and other specialized resources
- **Medical Emergency:** Integration with emergency services and medical alert systems
- **Support Network Activation:** Quick messaging to designated support people during crises

**Technical Requirements:**

- Emergency contact management system
- Crisis resource database with local and national options
- Pattern recognition algorithms for concerning behaviors
- Integration with emergency services and crisis support systems
- Secure storage of medical information and emergency contacts

## Technical Architecture

### Frontend (React PWA)

- **Framework:** React with hooks for state management
- **Styling:** Tailwind CSS with custom gentle, rounded design system
- **PWA Features:** Service worker for offline functionality and gentle push notifications
- **Mobile-First:** Responsive design optimized for smartphone usage
- **Design System:** Soft shadows, rounded corners, gentle animations, calming color palette

### Backend Architecture

- **Runtime:** Node.js with Express framework
- **Database:** Railway PostgreSQL for user data and meal logs
- **Vector Database:** ChromaDB for RAG implementation (migrate to Pinecone for scale)
- **Authentication:** JWT tokens with secure user management
- **API Design:** RESTful APIs with gentle error handling and user-friendly responses

### RAG Implementation

- **Vector Storage:** ChromaDB for local development, Pinecone for production
- **Embeddings:** OpenAI text-embedding-3-small for context vectorization
- **Chat Model:** Google Gemini Pro for cost-effective, gentle responses

**Knowledge Sources:**
- Personal user data (meals, check-ins, preferences)
- General wellness and nutrition knowledge
- Mindful eating and habit formation research
- Bariatric surgery protocols and guidelines

### Data Architecture

**Users Collection:**
```javascript
{
  userId: string,
  profile: {
    goal: 'general' | 'weight-management' | 'bariatric',
    bariatricStage?: 'pre-op' | 'liquid' | 'soft' | 'regular',
    preferences: object,
    restrictions: array[string],
    personalWhy: array[object]
  }
}
```

**MealLogs Collection:**
```javascript
{
  logId: string,
  userId: string,
  timestamp: datetime,
  portions: [{
    shape: string,
    category: string,
    portionId: string
  }],
  feedback: {
    aiResponse: string,
    encouragement: string
  }
}
```

**CheckIns Collection:**
```javascript
{
  checkinId: string,
  userId: string,
  timestamp: datetime,
  wellnessLevel: number (1-10),
  symptoms: array[string],
  mood?: string,
  aiNudge: string
}
```

**Progress Collection:**
```javascript
{
  progressId: string,
  userId: string,
  date: date,
  habitsTracked: object,
  patterns: object,
  celebrations: array[string]
}
```
## Success Metrics

### User Engagement

- Daily active users with gentle, sustainable usage patterns
- Chat interactions per session (quality over quantity)
- Meal logging consistency (2+ meals/day target)
- Feature adoption rates across user segments

### Wellness Outcomes

- User-reported wellness improvements
- Habit consistency streaks
- Reduced anxiety around food choices (survey data)
- Increased mindful eating behaviors

### Technical Performance

- App load time < 2 seconds
- 99.9% uptime for supportive availability
- Real-time chat response < 2 seconds
- Cross-platform compatibility and gentle user experience

## User Personalization Matrix

### General Wellness Users

- **Focus:** Habit formation, mindful eating, balanced nutrition
- **AI Personality:** Encouraging wellness coach
- **Features:** All core features with general health education
- **Language:** "nourishment," "balance," "wellness journey"

### Weight Management Users

- **Focus:** Sustainable portion control, progress celebration, body positivity
- **AI Personality:** Supportive guide focused on non-scale victories
- **Features:** Enhanced progress tracking, gentle goal setting
- **Language:** "progress," "sustainable changes," "celebrating your body"

### Post-Diet Recovery Users

- **Focus:** Healing relationship with food, intuitive eating, self-compassion
- **AI Personality:** Extra gentle, trauma-informed responses
- **Features:** Emphasis on feelings and satisfaction over metrics
- **Language:** "gentle," "healing," "listening to your body"

### Bariatric Support Users

- **Focus:** Surgery-specific guidelines, medical compliance, specialized nutrition
- **AI Personality:** Knowledgeable guide with medical awareness
- **Features:** Phase-specific recommendations, medical disclaimers, surgeon communication
- **Language:** "healing," "new chapter," "supporting your success"
## Development Roadmap

### Phase 1: Core Nudge Experience (4-6 weeks)

- Gentle onboarding with user goal selection
- Basic RAG-powered chat interface
- Visual plate logger with 6 core portion shapes
- Simple wellness check-ins
- Basic progress celebration

### Phase 2: Smart Nudges (4-6 weeks)

- Complete portion shape library (12 shapes)
- Advanced RAG with multi-source knowledge
- Mindful eating timer and hydration tracking
- Personalized AI responses based on user patterns
- Gentle push notification system
- The Why Wall - Personal Motivation Board
- Non-Scale Victories Tracker
- Movement Journey Gamification

### Phase 3: Advanced Personalization (6-8 weeks)

- Predictive wellness suggestions
- Advanced progress insights and pattern recognition
- Smart Meal Planning & Recipe Suggestions
- Enhanced Safety & Emergency Features
- Community features (optional gentle challenges)
- Healthcare provider integration
- Advanced bariatric support features

### Phase 4: Scale & Optimization (Ongoing)

- Performance optimizations for larger user base
- Advanced AI personalization and learning
- Integration with health apps and wearables
- Professional healthcare partnerships
- Evidence-based wellness research integration
## Risk Assessment & Mitigation

### Technical Risks

- **AI Response Quality:** Implement response validation and gentle language checking
- **RAG Context Accuracy:** Regular knowledge base updates and fact-checking
- **User Data Privacy:** Strong encryption and granular permission controls

### User Experience Risks

- **Over-Reliance on AI:** Encourage self-awareness and personal intuition
- **Gentle Approach Misinterpretation:** Clear communication about supportive, not medical, advice
- **Habit Formation Plateau:** Variety in nudges and celebration of micro-progress

### Business Risks

- **User Retention:** Focus on gentle, non-addictive engagement patterns
- **Market Differentiation:** Emphasize gentle approach vs. harsh tracking competitors
- **Medical Compliance:** Appropriate disclaimers and professional consultation encouragement
## Gentle Design Principles

### Visual Design

- Soft, rounded corners throughout the interface
- Calming color palette with sage greens, warm creams, and gentle corals
- Gentle animations that feel supportive, not jarring
- Generous white space to avoid overwhelming users
- Accessible typography that's easy to read and non-intimidating

### Interaction Design

- No harsh red colors for errors or warnings
- Gentle vibrations for notifications
- Positive reinforcement for all interactions
- Easy escape routes from any feature
- Forgiving input validation with helpful suggestions

### Content Strategy

- Encouraging language that celebrates attempts and progress
- Inclusive terminology that welcomes all body types and backgrounds
- Evidence-based information delivered conversationally
- Personal agency emphasized in all recommendations
- Hope and possibility woven throughout the experience

## Getting Started - Technical Implementation

This PRD provides the foundation for building Nudge as a gentle, AI-powered wellness companion. The technical stack emphasizes rapid development with ChromaDB for learning RAG concepts, Node.js/Express for familiar backend development, and React PWA for a modern, accessible user experience.

The app positions itself uniquely in the wellness space by prioritizing gentle guidance over harsh tracking, making it appealing to users seeking sustainable habit change without pressure or judgment.

Next steps involve setting up the development environment, implementing the basic RAG pipeline, and building the core chat interface that will serve as the heart of the Nudge experience.

