// src/types/ai.ts
import { PortionData } from './portion';

/**
 * Request structure for AI feedback generation
 */
export interface AIFeedbackRequest {
  portions: PortionData[];
  timeOfDay?: string;
  userGoals?: string[];
  recentMeals?: any[];
  userPreferences?: any;
}

/**
 * Response structure from AI feedback service
 */
export interface AIFeedbackResponse {
  feedback: string;
  encouragement?: string;
  suggestion?: string;
  celebrationEmoji?: string;
}

/**
 * Detailed characteristics of a meal for AI analysis
 */
export interface MealCharacteristics {
  hasProtein: boolean;
  hasVegetables: boolean;
  hasCarbs: boolean;
  hasFats: boolean;
  isEmpty: boolean;
  isWellBalanced: boolean;
  dominantCategory: string | null;
  portionVariety: number;
  timeOfDay?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

/**
 * Structured context for AI to generate personalized responses
 */
export interface AIContext {
  plateDescription: string;
  balanceStatus: 'excellent' | 'good' | 'fair' | 'needs-improvement' | 'empty';
  celebrationPoints: string[];
  gentleImprovements: string[];
  contextualFactors: {
    totalPortions: number;
    categorySpread: number;
    balanceScore: number;
  };
}

/**
 * Enhanced meal analysis with AI context
 */
export interface MealAnalysis {
  totalPortions: number;
  categoryCounts: Record<string, number>;
  balanceScore: number;
  suggestions: string[];
  mealCharacteristics: MealCharacteristics;
  aiContext: AIContext;
}

/**
 * Loading states for AI operations
 */
export interface AIFeedbackState {
  feedback: AIFeedbackResponse | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Chat message structure for AI conversations
 */
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

/**
 * Context for RAG-enhanced AI responses
 */
export interface RAGContext {
  currentMeal: {
    description: string;
    balanceStatus: string;
    balanceScore: number;
    totalPortions: number;
    categories: Record<string, number>;
    celebrationPoints: string[];
    improvements: string[];
  };
  userContext: {
    goals: string[];
    timeOfDay: string;
    preferences: any;
  };
  recentHistory: {
    meals: any[];
    patterns: string[];
  };
  responseGuidelines: {
    tone: string;
    maxLength: string;
    focus: string;
    avoidWords: string[];
    preferWords: string[];
  };
}