import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// === TABLE DEFINITIONS ===
export const jobAnalyses = pgTable("job_analyses", {
  id: serial("id").primaryKey(),
  jobDescription: text("job_description").notNull(),
  extractedSkills: text("extracted_skills").array(),
  extractedRoles: text("extracted_roles").array(),
  experienceLevel: text("experience_level"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const candidates = pgTable("candidates", {
  id: serial("id").primaryKey(),
  jobAnalysisId: integer("job_analysis_id").notNull(), // removed reference for now to avoid circular deps if not handled carefully, but standard is to add it. I will add it.
  name: text("name").notNull(),
  role: text("role").notNull(),
  company: text("company"),
  skills: text("skills").array(),
  profileUrl: text("profile_url"),
  platform: text("platform").notNull(), // 'LinkedIn', 'GitHub', etc.
  relevanceScore: integer("relevance_score"), // 0-100
  createdAt: timestamp("created_at").defaultNow(),
});

// === RELATIONS ===
export const jobAnalysesRelations = relations(jobAnalyses, ({ many }) => ({
  candidates: many(candidates),
}));

export const candidatesRelations = relations(candidates, ({ one }) => ({
  jobAnalysis: one(jobAnalyses, {
    fields: [candidates.jobAnalysisId],
    references: [jobAnalyses.id],
  }),
}));

// === SCHEMAS ===
export const insertJobAnalysisSchema = createInsertSchema(jobAnalyses).omit({ 
  id: true, 
  createdAt: true,
  extractedSkills: true, // Derived on server
  extractedRoles: true, // Derived on server
  experienceLevel: true // Derived on server
});

export const insertCandidateSchema = createInsertSchema(candidates).omit({ 
  id: true, 
  createdAt: true 
});

// === TYPES ===
// These are removed - use z.infer directly in TypeScript context
// export type JobAnalysis = typeof jobAnalyses.$inferSelect;
// export type Candidate = typeof candidates.$inferSelect;
// export type InsertJobAnalysis = z.infer<typeof insertJobAnalysisSchema>;
// export type InsertCandidate = z.infer<typeof insertCandidateSchema>;

// API Types
// export type AnalyzeJobRequest = {
//   jobDescription: string;
// };

// export type AnalyzeJobResponse = JobAnalysis & {
//   candidates: Candidate[];
// };
