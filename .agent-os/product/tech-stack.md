# Technical Stack

## Application Framework
- **Backend:** Node.js 18+ (LTS) with Express.js 5.1+
- **Frontend:** React 18+ with TypeScript
- **Build Tool:** Vite 5.0+ for fast development and builds

## Database System
- **Primary Database:** PostgreSQL 17+ (Railway hosting)
- **Vector Database:** ChromaDB 3.0+ (local development) → Pinecone (production)
- **ORM/Query Builder:** Native pg driver with custom service layer

## JavaScript Framework
- **Frontend:** React 18+ with hooks for state management
- **Backend:** Node.js with Express framework
- **Language:** TypeScript for frontend, JavaScript ES6+ for backend

## Import Strategy
- **Frontend:** Node (npm packages)
- **Backend:** Node (CommonJS modules)

## CSS Framework
- **Styling:** TailwindCSS 4.0+ with custom design tokens
- **Design System:** Custom gentle design system with soft, rounded styling
- **Color Palette:** Sage green, warm cream, muted coral

## UI Component Library
- **Components:** Custom React components with gentle, accessible design
- **Icons:** Lucide React components
- **Typography:** Inter Rounded or similar friendly sans-serif

## Fonts Provider
- **Primary:** Inter Rounded (Google Fonts)
- **Fallback:** System fonts for accessibility

## Icon Library
- **Icons:** Lucide React (consistent, accessible iconography)
- **Style:** Rounded, friendly icons matching brand personality

## Application Hosting
- **Current:** Railway (development and staging)
- **Planned:** Digital Ocean App Platform (production scaling)

## Database Hosting
- **Primary:** Railway PostgreSQL
- **Vector DB:** ChromaDB (local) → Pinecone (production)
- **Backups:** Daily automated backups

## Asset Hosting
- **Current:** Railway static file serving
- **Planned:** Amazon S3 with CloudFront CDN

## Deployment Solution
- **Current:** Railway automatic deployments
- **Planned:** GitHub Actions CI/CD with Digital Ocean

## Code Repository URL
- **Repository:** https://github.com/nicoledicochea/nudge-app
- **Version Control:** Git with GitHub
- **Branching:** Feature branch workflow

## AI & Machine Learning Stack
- **Chat Model:** Google Gemini Pro (cost-effective, gentle responses)
- **Embeddings:** OpenAI text-embedding-3-small
- **RAG Implementation:** Custom service layer with context management

## Authentication & Security
- **Authentication:** JWT tokens with bcryptjs password hashing
- **Security:** CORS enabled, environment variable configuration
- **Data Protection:** Secure user data handling with encryption

## PWA Features
- **Service Worker:** Offline functionality and caching
- **Push Notifications:** Gentle, supportive notifications
- **Mobile-First:** Responsive design optimized for smartphones
- **Installation:** Add to home screen capability

## Development Environment
- **Node Version:** 18+ LTS
- **Package Manager:** npm
- **Development Server:** nodemon for auto-restart
- **Environment:** dotenv for configuration
- **Linting:** ESLint with custom rules
- **Testing:** Jest (planned)

## Performance & Scalability
- **API Response Time:** < 2 seconds target
- **Chat Response Time:** < 2 seconds target
- **App Load Time:** < 2 seconds target
- **Uptime:** 99.9% availability target
- **Caching:** Redis (planned for production)
- **CDN:** CloudFront for static assets

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

### Frontend Dependencies (Planned)
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

## Technology Decisions

### Why Node.js/Express?
- **Rapid Development:** Fast iteration for MVP
- **JavaScript Ecosystem:** Rich package ecosystem
- **AI Integration:** Excellent support for AI APIs
- **Team Familiarity:** Common technology stack

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

### Why PostgreSQL?
- **Reliability:** Proven database for user data
- **JSONB Support:** Flexible schema for user preferences
- **Scalability:** Handles growth from startup to enterprise
- **Railway Integration:** Seamless hosting and management
