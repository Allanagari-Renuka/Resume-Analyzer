import { storage } from "./storage.js";
import { api } from "../shared/routes.js";
import { z } from "zod";
import { searchGithubCandidates } from "./registerRoutes.js";

function generateMockAnalysis(jobDescription) {
  const hasReact = jobDescription.toLowerCase().includes("react");
  const hasNode = jobDescription.toLowerCase().includes("node");
  const hasPython = jobDescription.toLowerCase().includes("python");
  const hasSql = jobDescription.toLowerCase().includes("sql");

  const skills = [];
  if (hasReact) skills.push("React");
  if (hasNode) skills.push("Node.js");
  if (hasPython) skills.push("Python");
  if (hasSql) skills.push("SQL");
  if (skills.length === 0) {
    skills.push("JavaScript", "Web Development", "API Design");
  }

  const roles = [
    "Full Stack Developer",
    "Backend Engineer",
    "Frontend Engineer",
    "Software Engineer",
  ];

  const experienceLevels = ["Junior", "Mid", "Senior"];

  return {
    extractedSkills: skills,
    extractedRoles: roles.slice(0, 2),
    experienceLevel: experienceLevels[Math.floor(Math.random() * experienceLevels.length)],
  };
}

function generateMockCandidates(count = 5) {
  const firstNames = [
    "Alex", "Jordan", "Casey", "Morgan", "Taylor",
    "Riley", "Cameron", "Avery", "Quinn", "Parker"
  ];
  const lastNames = [
    "Johnson", "Smith", "Williams", "Brown", "Jones",
    "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"
  ];
  const roles = [
    "Senior Developer", "Full Stack Engineer", "Frontend Engineer",
    "Backend Engineer", "Software Engineer", "Tech Lead"
  ];
  const companies = [
    "Google", "Microsoft", "Amazon", "Facebook", "Apple",
    "Netflix", "Uber", "Spotify", "GitHub", "GitLab"
  ];
  const platforms = ["LinkedIn", "GitHub"];
  const skillSets = [
    ["React", "JavaScript", "Node.js"],
    ["Python", "Django", "PostgreSQL"],
    ["TypeScript", "React", "AWS"],
    ["Vue.js", "Express", "MongoDB"],
    ["Angular", "Java", "Spring Boot"],
  ];

  const candidates = [];
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const role = roles[Math.floor(Math.random() * roles.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const skills = skillSets[Math.floor(Math.random() * skillSets.length)];
    const relevanceScore = Math.floor(Math.random() * 40) + 60; // 60-100

    const profileUrl = platform === "LinkedIn"
      ? `https://linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}`
      : `https://github.com/${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}`;

    candidates.push({
      name,
      role,
      company,
      skills,
      profileUrl,
      platform,
      relevanceScore,
    });
  }

  return candidates;
}

export async function registerRoutes(httpServer, app) {

  app.post(api.analysis.create.path, async (req, res) => {
    try {
      const { jobDescription } = api.analysis.create.input.parse(req.body);

      // Generate mock analysis instead of calling OpenAI
      const analysisResult = generateMockAnalysis(jobDescription);
      const mockCandidates = await searchGithubCandidates(
        analysisResult.extractedSkills
      );


      // Save Analysis
      const analysis = await storage.createJobAnalysis({
        jobDescription,
        extractedSkills: analysisResult.extractedSkills,
        extractedRoles: analysisResult.extractedRoles,
        experienceLevel: analysisResult.experienceLevel,
      });

      // Save Candidates
      const savedCandidates = await Promise.all(
        mockCandidates.map((c) =>
          storage.createCandidate({
            jobAnalysisId: analysis.id,
            name: c.name,
            role: c.role,
            company: c.company,
            skills: c.skills,
            profileUrl: c.profileUrl,
            platform: c.platform,
            relevanceScore: c.relevanceScore,
          })
        )
      );

      res.status(200).json({
        analysis,
        candidates: savedCandidates
      });

    } catch (err) {
      console.error("Analysis failed:", err);
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input" });
      } else {
        res.status(500).json({ message: "Analysis failed" });
      }
    }
  });

  app.get(api.analysis.list.path, async (req, res) => {
    const analyses = await storage.getAllJobAnalyses();
    res.json(analyses);
  });

  app.get(api.analysis.get.path, async (req, res) => {
    const id = Number(req.params.id);
    const analysis = await storage.getJobAnalysis(id);
    if (!analysis) {
      return res.status(404).json({ message: "Analysis not found" });
    }
    const candidates = await storage.getCandidatesByAnalysisId(id);
    res.json({ analysis, candidates });
  });

  return httpServer;
}