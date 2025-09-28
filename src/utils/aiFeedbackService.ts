import { PortionData } from '@/types/portion';
import { analyzeMeal, MealAnalysis } from './mealAnalysis';
import { useState, useEffect } from 'react';

export interface AIFeedbackRequest {
  portions: PortionData[];
  timeOfDay?: string;
  userGoals?: string[];
  recentMeals?: any[]; // For RAG context
  userPreferences?: any;
}

export interface AIFeedbackResponse {
  feedback: string;
}

/**
 * Generate AI-powered meal feedback using RAG context
 */
export const generateAIFeedback = async (request: AIFeedbackRequest): Promise<AIFeedbackResponse> => {
  try {
    // Analyze the current meal
    const analysis = analyzeMeal(request.portions, request.timeOfDay);
    
    // Build RAG context
    const ragContext = buildRAGContext(analysis, request);
    
    // Call your AI API
    const aiResponse = await callAIAPI(ragContext);
    
    // Parse and structure the response
    return { feedback: aiResponse.trim() };
    
  } catch (error) {
    console.error('AI feedback generation failed:', error);
    
    // Return gentle fallback
    return generateFallbackFeedback(request.portions);
  }
};

/**
 * Build comprehensive context for RAG-powered AI
 */
const buildRAGContext = (analysis: MealAnalysis, request: AIFeedbackRequest) => {
  const { mealCharacteristics, aiContext } = analysis;
  
  const context = {
    // Current meal analysis
    currentMeal: {
      description: aiContext.plateDescription,
      balanceStatus: aiContext.balanceStatus,
      balanceScore: analysis.balanceScore,
      totalPortions: analysis.totalPortions,
      categories: analysis.categoryCounts,
      celebrationPoints: aiContext.celebrationPoints,
      improvements: aiContext.gentleImprovements,
    },
    
    // User context
    userContext: {
      goals: request.userGoals || [],
      timeOfDay: request.timeOfDay || getCurrentTimeOfDay(),
      preferences: request.userPreferences || {},
    },
    
    // Recent history for patterns (RAG)
    recentHistory: {
      meals: request.recentMeals || [],
      patterns: analyzeRecentPatterns(request.recentMeals || []),
    },
    
    // Guidance parameters
    responseGuidelines: {
      tone: 'gentle and encouraging',
      maxLength: '2 sentences',
      focus: mealCharacteristics.isEmpty ? 'invitation' : 'celebration + gentle guidance',
      avoidWords: ['should', 'must', 'lacking', 'bad', 'wrong'],
      preferWords: ['great', 'wonderful', 'gentle', 'nourishing', 'balanced'],
    }
  };
  
  return context;
};

/**
 * Call your AI API with structured context
 */
const callAIAPI = async (context: any): Promise<string> => {
  const systemPrompt = `You are Nudge, a gentle wellness companion. Analyze the meal context and provide encouraging feedback.

PERSONALITY:
- Always encouraging, never critical
- Celebrate what they did well first
- Gentle suggestions, not demands
- Use warm, supportive language
- Keep responses to 1-2 sentences max

RESPONSE FORMAT:
Provide feedback that follows this pattern:
1. Celebration/acknowledgment of effort
2. Gentle suggestion if appropriate
3. End with encouragement

CURRENT MEAL CONTEXT:
${JSON.stringify(context, null, 2)}

Respond with gentle, personalized feedback based on this context.`;

  // Make your API call here - replace with your actual implementation
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`, // Your auth implementation
    },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'Please provide gentle feedback for this meal.' }
      ],
      context: context // Pass RAG context
    })
  });
  
  if (!response.ok) {
    throw new Error(`AI API failed: ${response.status}`);
  }
  
  const data = await response.json();
  return data.message || data.response || '';
};

/**
 * Generate fallback feedback when AI is unavailable
 */
const generateFallbackFeedback = (portions: PortionData[]): AIFeedbackResponse => {
  const analysis = analyzeMeal(portions);
  
  return {
    feedback: analysis.suggestions[0] || "Your plate looks nourishing!",
  };
};

/**
 * Analyze patterns from recent meals for RAG context
 */
const analyzeRecentPatterns = (recentMeals: any[]) => {
  if (!recentMeals || recentMeals.length === 0) {
    return { patterns: [], insights: [] };
  }
  
  // Analyze patterns like:
  // - Consistent protein intake
  // - Vegetable frequency
  // - Meal timing
  // - Balance trends
  
  return {
    patterns: [
      // "consistent_protein",
      // "increasing_vegetables", 
      // "good_meal_timing"
    ],
    insights: [
      // "User has been consistent with protein",
      // "Vegetable intake has improved over last week"
    ]
  };
};

/**
 * Get current time of day for context
 */
const getCurrentTimeOfDay = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 10) return 'breakfast';
  if (hour < 14) return 'lunch';
  if (hour < 18) return 'afternoon-snack';
  if (hour < 22) return 'dinner';
  return 'evening-snack';
};

/**
 * Get auth token - replace with your implementation
 */
const getAuthToken = (): string => {
  // Replace with your actual auth token retrieval
  return localStorage.getItem('authToken') || '';
};

// Real-time feedback hook for React components
export const useRealtimeAIFeedback = (portions: PortionData[]) => {
  const [feedback, setFeedback] = useState<AIFeedbackResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const generateFeedback = async () => {
      if (portions.length === 0) {
        setFeedback({
          feedback: "Add some portion blocks to your plate to get personalized feedback!",  
        });
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await generateAIFeedback({ portions });
        setFeedback(result);
      } catch (err) {
        setError('Failed to generate feedback');
        setFeedback(generateFallbackFeedback(portions));
      } finally {
        setIsLoading(false);
      }
    };
    
    // Debounce feedback generation
    const timer = setTimeout(generateFeedback, 500);
    return () => clearTimeout(timer);
    
  }, [portions]);
  
  return { feedback, isLoading, error };
};