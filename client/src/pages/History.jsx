import { useAnalyses } from "@/hooks/use-analysis";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarClock, ArrowRight, FileText } from "lucide-react";
import { format } from "date-fns";

export default function History() {
  const { data: analyses, isLoading } = useAnalyses();

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Analysis History</h1>
          <p className="text-muted-foreground mt-2">Review previous job descriptions and their candidate matches.</p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {analyses?.map((analysis) => (
              <Link key={analysis.id} href={`/analysis/${analysis.id}`}>
                <Card className="group p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/20 bg-card">
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                            <CalendarClock className="w-3.5 h-3.5" />
                            {analysis.createdAt ? format(new Date(analysis.createdAt), 'PPP p') : 'Unknown date'}
                          </span>
                        </div>
                        <h3 className="font-semibold text-foreground truncate pr-4">
                          {analysis.extractedRoles && analysis.extractedRoles.length > 0 
                            ? analysis.extractedRoles.join(", ") 
                            : "Untitled Analysis"}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-1 group-hover:text-foreground/80 transition-colors">
                          {analysis.jobDescription}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <span className="text-sm font-semibold mr-2">View Results</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}

            {(!analyses || analyses.length === 0) && (
              <div className="text-center py-24 bg-muted/20 rounded-3xl border border-dashed border-border">
                <div className="inline-flex p-4 rounded-full bg-muted mb-4">
                  <CalendarClock className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">No history yet</h3>
                <p className="text-muted-foreground max-w-sm mx-auto mt-2 mb-6">
                  Start by analyzing your first job description to find candidates.
                </p>
                <Link href="/">
                  <a className="inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 py-2">
                    Start Analysis
                  </a>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
