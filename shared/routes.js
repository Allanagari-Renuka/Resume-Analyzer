import { z } from 'zod';
import { insertJobAnalysisSchema, jobAnalyses, candidates } from './schema.js';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  analysis: {
    create: {
      method: 'POST',
      path: '/api/analyze',
      input: z.object({ jobDescription: z.string() }),
      responses: {
        200: z.object({
          analysis: z.custom(),
          candidates: z.array(z.custom())
        }),
        500: errorSchemas.internal
      },
    },
    list: {
      method: 'GET',
      path: '/api/analyses',
      responses: {
        200: z.array(z.custom()),
      },
    },
    get: {
      method: 'GET',
      path: '/api/analyses/:id',
      responses: {
        200: z.object({
          analysis: z.custom(),
          candidates: z.array(z.custom())
        }),
        404: errorSchemas.notFound,
      },
    }
  }
};

// ============================================
// HELPER
// ============================================
export function buildUrl(path, params) {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
