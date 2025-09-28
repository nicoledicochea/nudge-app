# Nudge App - Tech Stack

## Context

This document defines the technology stack for the Nudge wellness app - a gentle, AI-powered companion for building healthy habits through personalized nudges and supportive guidance.

## Core Architecture

### Backend Stack
- **Runtime:** Node.js 18+ (LTS)
- **Framework:** Express.js 5.1+
- **Language:** JavaScript (ES6+)
- **Package Manager:** npm
- **API Design:** RESTful APIs with gentle error handling

### Database & Storage
- **Primary Database:** PostgreSQL 17+ (Railway hosting)
- **Vector Database:** ChromaDB 3.0+ (local development)
- **Production Vector DB:** Pinecone (for scale)
- **ORM/Query Builder:** Native pg driver with custom service layer
- **Database Hosting:** Railway PostgreSQL
- **Backups:** Daily automated backups

### AI & Machine Learning
- **Chat Model:** Google Gemini Pro (cost-effective, gentle responses)
- **Embeddings:** OpenAI text-embedding-3-small
- **Vector Search:** ChromaDB → Pinecone migration path
- **RAG Implementation:** Custom service layer with context management

### Authentication & Security
- **Authentication:** JWT tokens with bcryptjs password hashing
- **Security:** CORS enabled, environment variable configuration
- **Data Protection:** Secure user data handling with encryption

## Frontend Stack (Planned)

### Core Framework
- **Framework:** React 18+ with hooks
- **Build Tool:** Vite (fast development and builds)
- **Language:** TypeScript (for type safety)
- **Package Manager:** npm

### Styling & UI
- **CSS Framework:** TailwindCSS 4.0+
- **Design System:** Custom gentle design tokens
- **UI Components:** Custom components with soft, rounded styling
- **Icons:** Lucide React components
- **Typography:** Inter Rounded or similar friendly sans-serif
- **Color Palette:** Sage green, warm cream, muted coral

### PWA Features
- **Service Worker:** Offline functionality
- **Push Notifications:** Gentle, supportive notifications
- **Mobile-First:** Responsive design optimized for smartphones
- **Installation:** Add to home screen capability

## Development & Deployment

### Development Environment
- **Node Version:** 18+ LTS
- **Package Manager:** npm
- **Development Server:** nodemon for auto-restart
- **Environment:** dotenv for configuration
- **Linting:** ESLint with custom rules
- **Testing:** Jest (planned)

### Hosting & Infrastructure
- **Application Hosting:** Railway (current) → Digital Ocean App Platform (planned)
- **Database Hosting:** Railway PostgreSQL
- **CDN:** CloudFront (planned)
- **Asset Storage:** Amazon S3 (planned)
- **CI/CD:** GitHub Actions (planned)

### Environment Configuration
- **Development:** Local with Railway PostgreSQL
- **Staging:** Railway staging environment
- **Production:** Railway → Digital Ocean migration path

## Key Dependencies

### Backend Dependencies
```json
{
  "express": "^5.1.0",
  "cors": "^2.8.5",
  "dotenv": "^17.2.2",
  "bcryptjs": "^3.0.2",
  "jsonwebtoken": "^9.0.2",
  "pg": "^8.16.3",
  "@google/generative-ai": "^0.24.1",
  "openai": "^5.23.1",
  "chromadb": "^3.0.15"
}
```

### Planned Frontend Dependencies
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "vite": "^5.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^4.0.0",
  "lucide-react": "^0.400.0"
}
```

## RAG Implementation Architecture

### Vector Database Strategy
- **Development:** ChromaDB for local development and learning
- **Production:** Pinecone for scalable vector search
- **Migration Path:** Gradual migration as user base grows

### Knowledge Sources
- **Personal Context:** User meal logs, check-ins, preferences
- **General Knowledge:** Nutrition science, wellness research
- **Specialized Knowledge:** Bariatric surgery guidelines
- **Behavioral Science:** Habit formation research

### Embedding Strategy
- **Model:** OpenAI text-embedding-3-small
- **Context Window:** Optimized for conversational responses
- **Update Frequency:** Real-time for user data, periodic for knowledge base

## Performance & Scalability

### Performance Targets
- **API Response Time:** < 2 seconds
- **Chat Response Time:** < 2 seconds
- **App Load Time:** < 2 seconds
- **Uptime:** 99.9% availability

### Scalability Considerations
- **Database:** PostgreSQL with connection pooling
- **Vector Search:** ChromaDB → Pinecone migration
- **Caching:** Redis (planned for production)
- **CDN:** CloudFront for static assets

## Security & Privacy

### Data Protection
- **Encryption:** HTTPS everywhere
- **Password Security:** bcryptjs with salt rounds
- **JWT Security:** Secure token generation and validation
- **Environment Variables:** Secure configuration management

### Privacy Compliance
- **User Data:** Minimal data collection
- **Health Information:** HIPAA considerations for bariatric users
- **Data Retention:** User-controlled data deletion
- **Third-party Services:** Minimal external dependencies

## Development Workflow

### Code Quality
- **Linting:** ESLint with custom rules
- **Formatting:** Prettier (planned)
- **Testing:** Jest unit tests (planned)
- **Code Review:** GitHub pull request workflow

### Deployment Pipeline
- **Version Control:** Git with GitHub
- **CI/CD:** GitHub Actions (planned)
- **Environment Management:** Railway → Digital Ocean
- **Monitoring:** Application performance monitoring (planned)

## Future Considerations

### Phase 2 Enhancements
- **Mobile App:** React Native or Flutter
- **Wearable Integration:** Apple Health, Google Fit
- **Advanced AI:** Fine-tuned models for personalized responses
- **Community Features:** Gentle challenges and support groups

### Phase 3 Scaling
- **Microservices:** Service decomposition for scale
- **Advanced Analytics:** User behavior insights
- **Healthcare Integration:** Provider dashboard and reporting
- **Internationalization:** Multi-language support

## Technology Decisions

### Why Node.js/Express?
- **Rapid Development:** Fast iteration for MVP
- **JavaScript Ecosystem:** Rich package ecosystem
- **Team Familiarity:** Common technology stack
- **AI Integration:** Excellent support for AI APIs

### Why ChromaDB → Pinecone?
- **Learning Phase:** ChromaDB for understanding RAG concepts
- **Production Scale:** Pinecone for enterprise-grade vector search
- **Cost Efficiency:** Start simple, scale as needed
- **Migration Path:** Clear upgrade path without lock-in

### Why React PWA?
- **Cross-Platform:** Single codebase for web and mobile
- **Offline Support:** Service workers for reliability
- **Performance:** Fast loading and smooth interactions
- **User Experience:** Native app-like experience

This tech stack prioritizes rapid development, gentle user experience, and scalable AI integration while maintaining simplicity and developer productivity.
