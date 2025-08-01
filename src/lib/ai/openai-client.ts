import OpenAI from 'openai';

// Initialize OpenAI client with API key from environment
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Export for use in other AI modules
export default openai;