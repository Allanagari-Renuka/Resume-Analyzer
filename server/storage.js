import { db } from "./db.js";
import { jobAnalyses, candidates } from "../shared/schema.js";
import { eq, desc } from "drizzle-orm";

// export class DatabaseStorage {
//   async createJobAnalysis(analysis) {
//     const [result] = await db.insert(jobAnalyses).values(analysis).returning();
//     return result;
//   }

//   async getJobAnalysis(id) {
//     const [result] = await db.select().from(jobAnalyses).where(eq(jobAnalyses.id, id));
//     return result;
//   }

//   async getAllJobAnalyses() {
//     return await db.select().from(jobAnalyses).orderBy(desc(jobAnalyses.createdAt));
//   }

//   async createCandidate(candidate) {
//     const [result] = await db.insert(candidates).values(candidate).returning();
//     return result;
//   }

//   async getCandidatesByAnalysisId(analysisId) {
//     return await db.select().from(candidates).where(eq(candidates.jobAnalysisId, analysisId));
//   }
// }
// In-memory storage for mock data
class InMemoryStorage {
  constructor() {
    this.jobAnalyses = [];
    this.candidates = [];
    this.analysisId = 0;
    this.candidateId = 0;
  }

  async createJobAnalysis(analysis) {
    const id = ++this.analysisId;
    const result = {
      id,
      ...analysis,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.jobAnalyses.push(result);
    return result;
  }

  async getJobAnalysis(id) {
    return this.jobAnalyses.find((a) => a.id === id);
  }

  async getAllJobAnalyses() {
    return this.jobAnalyses.sort((a, b) => b.createdAt - a.createdAt);
  }

  async createCandidate(candidate) {
    const id = ++this.candidateId;
    const result = {
      id,
      ...candidate,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.candidates.push(result);
    return result;
  }

  async getCandidatesByAnalysisId(analysisId) {
    return this.candidates.filter((c) => c.jobAnalysisId === analysisId);
  }
}

export const storage = new InMemoryStorage();

//export const storage = new DatabaseStorage();
