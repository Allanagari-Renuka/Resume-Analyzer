import { Jobs } from "openai/resources/fine-tuning/jobs/jobs.js";

export default function Home() {
  return (
    <div className="space-y-10">
      
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Find the perfect candidate in seconds.
        </h1>
        <p className="text-muted-foreground mt-4">
          Paste your job description below...
        </p>
      </div>

      {/* Job Description Form */}
      <Jobs />

    </div>
  );
}
