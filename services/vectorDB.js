const { ChromaClient } = require('chromadb');
const OpenAI = require('openai');

class VectorDBService {
  constructor() {
    this.client = new ChromaClient();
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.collectionName = 'nudge_user_data';
    this.collection = null;
  }

  async initialize() {
    try {
      // Try to get existing collection
      this.collection = await this.client.getCollection({
        name: this.collectionName
      });
      console.log('Connected to existing ChromaDB collection');
    } catch (error) {
      // Create new collection if doesn't exist
      this.collection = await this.client.createCollection({
        name: this.collectionName,
        metadata: { "hnsw:space": "cosine" }
      });
      console.log('Created new ChromaDB collection');
    }
  }

  async addMealLog(mealData) {
    // Convert meal to searchable text
    const mealText = `Meal logged by user ${mealData.userId}: ${mealData.portions.map(p => 
      `${p.shape} portion of ${p.category}`
    ).join(', ')}. User feedback: ${mealData.feedback || 'none'}. Time: ${mealData.timestamp}`;
    
    try {
      // Generate embedding
      const embedding = await this.openai.embeddings.create({
        model: "text-embedding-3-small",
        input: mealText,
      });

      // Store in ChromaDB
      await this.collection.add({
        ids: [`meal_${mealData.id}_${Date.now()}`],
        embeddings: [embedding.data[0].embedding],
        documents: [mealText],
        metadatas: [{ 
          type: 'meal_log',
          userId: mealData.userId.toString(),
          timestamp: mealData.timestamp,
          mealId: mealData.id.toString()
        }]
      });

      console.log('Meal added to vector database');
    } catch (error) {
      console.error('Error adding meal to vector DB:', error);
    }
  }

  async addCheckIn(checkInData) {
    const checkInText = `User ${checkInData.userId} check-in: wellness level ${checkInData.wellnessLevel}/10, symptoms: ${checkInData.symptoms.join(', ') || 'none'}, mood: ${checkInData.mood || 'not specified'}. Time: ${checkInData.timestamp}`;
    
    try {
      const embedding = await this.openai.embeddings.create({
        model: "text-embedding-3-small",
        input: checkInText,
      });

      await this.collection.add({
        ids: [`checkin_${checkInData.id}_${Date.now()}`],
        embeddings: [embedding.data[0].embedding],
        documents: [checkInText],
        metadatas: [{ 
          type: 'check_in',
          userId: checkInData.userId.toString(),
          timestamp: checkInData.timestamp,
          checkinId: checkInData.id.toString()
        }]
      });

      console.log('Check-in added to vector database');
    } catch (error) {
      console.error('Error adding check-in to vector DB:', error);
    }
  }

  async searchRelevantContext(query, userId, limit = 3) {
    try {
      // Generate embedding for user query
      const queryEmbedding = await this.openai.embeddings.create({
        model: "text-embedding-3-small", 
        input: query,
      });

      // Search for similar content for this user
      const results = await this.collection.query({
        queryEmbeddings: [queryEmbedding.data[0].embedding],
        nResults: limit,
        where: { userId: userId.toString() }
      });

      return results.documents[0] || [];
    } catch (error) {
      console.error('Error searching vector DB:', error);
      return [];
    }
  }
}

module.exports = VectorDBService;