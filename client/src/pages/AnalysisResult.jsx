import { useParams, Link } from "wouter";
import { useAnalysis } from "@/hooks/use-analysis";
import { CandidateCard } from "@/components/CandidateCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Briefcase, GraduationCap, Code2, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalysisResult() {
  const { id } = useParams();
  const { data, isLoading, error } = useAnalysis(Number(id));

  if (isLoading) {
    return (
      <>
        <div className="space-y-8 animate-pulse">
          <div className="h-8 w-1/3 bg-muted rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
          </div>
          <div className="h-10 w-1/4 bg-muted rounded-lg mt-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-64 rounded-2xl" />
            ))}
          </div>
        </div>
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        <div className="text-center py-20">
          <h2 className="text-2xl font-display font-bold text-foreground">Analysis not found</h2>
          <p className="text-muted-foreground mt-2">The requested analysis could not be retrieved.</p>
          <Link href="/">
            <Button variant="link" className="mt-4 text-primary">Go back home</Button>
          </Link>
        </div>
      </>
    );
  }

  const { analysis, candidates } = data;

  return (
    <>
      <div className="space-y-10">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/80">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Analysis Results</h1>
            <p className="text-sm text-muted-foreground">Generated from your job description</p>
          </div>
        </div>

        {/* Analysis Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border shadow-sm flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Code2 className="w-24 h-24 rotate-12" />
            </div>
            <div className="flex items-center gap-3 mb-4 text-primary">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground">Extracted Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.extractedSkills?.map((skill, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
                  {skill}
                </span>
              ))}
              {(!analysis.extractedSkills || analysis.extractedSkills.length === 0) && (
                <span className="text-muted-foreground text-sm">No specific skills detected</span>
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl p-6 border border-border shadow-sm flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Briefcase className="w-24 h-24 -rotate-12" />
            </div>
            <div className="flex items-center gap-3 mb-4 text-accent">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground">Target Roles</h3>
            </div>
            <div className="space-y-2">
              {analysis.extractedRoles?.map((role, i) => (
                <div key={i} className="text-sm font-medium text-foreground bg-accent/5 px-3 py-2 rounded-lg border border-accent/10">
                  {role}
                </div>
              ))}
               {(!analysis.extractedRoles || analysis.extractedRoles.length === 0) && (
                <span className="text-muted-foreground text-sm">No specific roles detected</span>
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl p-6 border border-border shadow-sm flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <GraduationCap className="w-24 h-24 rotate-6" />
            </div>
            <div className="flex items-center gap-3 mb-4 text-orange-500">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground">Experience Level</h3>
            </div>
            <div className="mt-auto">
              <p className="text-2xl font-bold font-display text-foreground">
                {analysis.experienceLevel || "Not specified"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Based on requirements analysis</p>
            </div>
          </motion.div>
        </div>

        {/* Candidates Grid */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-foreground">Top Candidates</h2>
              <p className="text-sm text-muted-foreground">Found {candidates.length} potential matches based on relevance score</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate, i) => (
              <CandidateCard key={candidate.id} candidate={candidate} index={i} />
            ))}
          </div>
          
          {candidates.length === 0 && (
            <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
              <p className="text-muted-foreground">No candidates found matching these criteria.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
