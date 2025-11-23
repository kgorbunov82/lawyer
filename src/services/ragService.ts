
import { legalKnowledgeBase, KnowledgeChunk } from '../data/legalKnowledge';

/**
 * Simple client-side retrieval mechanism.
 * In a production app, this would be a vector similarity search (embeddings).
 */
export const retrieveContext = (query: string): string => {
  const normalizedQuery = query.toLowerCase();
  
  // Score chunks based on keyword matches
  const scoredChunks = legalKnowledgeBase.map(chunk => {
    let score = 0;
    chunk.keywords.forEach(keyword => {
      if (normalizedQuery.includes(keyword.toLowerCase())) {
        score += 1;
      }
    });
    return { chunk, score };
  });

  // Filter chunks with at least one match and sort by score
  const relevantChunks = scoredChunks
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3) // Take top 3 most relevant chunks
    .map(item => item.chunk);

  if (relevantChunks.length === 0) {
    return "";
  }

  // Format context for the LLM
  return relevantChunks.map(c => `[ИСТОЧНИК: ${c.topic}]\n${c.content}`).join("\n\n");
};
