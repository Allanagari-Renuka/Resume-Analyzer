import { useState } from "react";
import { useLocation } from "wouter";
import { useCreateAnalysis } from "@/hooks/use-analysis";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const { mutate, isPending } = useCreateAnalysis();
  const [_, setLocation] = useLocation();

  const handleAnalyze = () => {
    if (!jobDescription.trim()) return;
    
    mutate({ jobDescription }, {
      onSuccess: (data) => {
        setLocation(`/analysis/${data.analysis.id}`);
      }
    });
  };

  return (
    <>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Recruitment
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
            Find the perfect candidate <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              in seconds.
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Paste your job description below and let our AI extract key requirements and find the best matching talent across platforms.
          </p>
        </div>

        <Card className="p-1.5 bg-card/50 backdrop-blur-xl border border-border shadow-2xl shadow-primary/5 rounded-3xl overflow-hidden">
          <div className="bg-background rounded-2xl border border-border/50 p-6 md:p-8">
            <label className="block text-sm font-semibold text-foreground mb-3 ml-1">
              Job Description
            </label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description here (e.g. 'Senior React Developer with 5+ years experience...')"
              className="min-h-[250px] resize-none text-base p-4 rounded-xl border-border bg-muted/30 focus:bg-background transition-all duration-300 focus:ring-4 focus:ring-primary/10"
            />
            
            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs text-muted-foreground hidden md:block">
                Supports plain text from LinkedIn, Indeed, or internal docs.
              </p>
              
              <Button
                onClick={handleAnalyze}
                disabled={isPending || !jobDescription.trim()}
                className="w-full md:w-auto px-8 py-6 rounded-xl font-semibold text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze & Find Candidates
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Feature Highlights - Visual Filler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {[
            { title: "Smart Extraction", desc: "AI identifies core skills and experience levels instantly." },
            { title: "Cross-Platform", desc: "Search across LinkedIn, GitHub, and professional networks." },
            { title: "Ranked Results", desc: "Candidates are scored by relevance to your specific needs." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="text-center p-4 rounded-xl hover:bg-white/50 transition-colors"
            >
              <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
