// import { Link, useLocation } from "wouter"; 
// import { Building2, ExternalLink, Github, Linkedin, CheckCircle2 } from "lucide-react";
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";

// export function CandidateCard({ candidate, index }) {
//   const getPlatformIcon = (platform) => {
//     switch (platform?.toLowerCase()) {
//       case "github":
//         return <Github className="w-4 h-4" />;
//       case "linkedin":
//         return <Linkedin className="w-4 h-4" />;
//       default:
//         return <ExternalLink className="w-4 h-4" />;
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.1, duration: 0.4 }}
//       className="group bg-card hover:bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
//     >
//       <div className="absolute top-0 right-0 p-4">
//         <div className="bg-secondary/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2 border border-border/50">
//           <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
//             Match
//           </span>
//           <span
//             className={cn(
//               "text-sm font-bold",
//               candidate.relevanceScore && candidate.relevanceScore > 80
//                 ? "text-green-600"
//                 : "text-primary"
//             )}
//           >
//             {candidate.relevanceScore ?? "?"}%
//           </span>
//         </div>
//       </div>

//       <div className="flex flex-col h-full">
//         <div className="mb-4">
//           <h3 className="text-lg font-bold font-display text-foreground group-hover:text-primary transition-colors">
//             {candidate.name || "Unknown"}
//           </h3>
//           <p className="text-muted-foreground text-sm font-medium flex items-center gap-1.5 mt-1">
//             <Building2 className="w-3.5 h-3.5" />
//             {candidate.company || "Open to work"}
//           </p>
//           <p className="text-sm text-foreground/80 mt-1">{candidate.role || "—"}</p>
//         </div>

//         <div className="flex-1">
//           <div className="flex flex-wrap gap-2 mb-6">
//             {candidate.skills?.slice(0, 4).map((skill, i) => (
//               <span
//                 key={i}
//                 className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary/5 text-primary border border-primary/10"
//               >
//                 {skill}
//               </span>
//             ))}

//             {candidate.skills && candidate.skills.length > 4 && (
//               <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-muted text-muted-foreground">
//                 +{candidate.skills.length - 4} more
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
//           <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
//             {getPlatformIcon(candidate.platform)}
//             {candidate.platform || "Unknown"}
//           </span>

//           <a
//             href={candidate.profileUrl || "#"}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
//           >
//             View Profile <ExternalLink className="w-3.5 h-3.5" />
//           </a>
//         </div>
//       </div>

//       {/* Visual background decoration */}
//       <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-tl from-primary/5 to-transparent rounded-full blur-2xl group-hover:from-primary/10 transition-all duration-500" />
//     </motion.div>
//   );
// }

// CandidateCard.jsx – improved version

// import { motion } from "framer-motion";
// import { Building2, ExternalLink, Github, Linkedin, MapPin, Star } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function CandidateCard({ candidate, index }) {
//   const getPlatformIcon = (platform) => {
//     const lower = (platform || "").toLowerCase();
//     if (lower.includes("github")) return <Github className="w-5 h-5 text-gray-800" />;
//     if (lower.includes("linkedin")) return <Linkedin className="w-5 h-5 text-[#0A66C2]" />;
//     return <ExternalLink className="w-5 h-5 text-gray-500" />;
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 24 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
//       className={cn(
//         "group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800",
//         "overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300",
//         "hover:-translate-y-1 hover:border-primary/40 dark:hover:border-primary/50"
//       )}
//     >
//       {/* Match badge – more elegant */}
//       <div className="absolute top-4 right-4 z-10">
//         <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full border border-gray-200/80 dark:border-gray-700/80 shadow-sm">
//           <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
//             Match
//           </span>
//           <span
//             className={cn(
//               "text-sm font-bold px-1.5",
//               candidate.relevanceScore >= 85
//                 ? "text-emerald-600"
//                 : candidate.relevanceScore >= 70
//                 ? "text-amber-600"
//                 : "text-gray-600 dark:text-gray-400"
//             )}
//           >
//             {candidate.relevanceScore ?? "—"}%
//           </span>
//         </div>
//       </div>

//       <div className="p-6 flex flex-col h-full">
//         {/* Avatar + name + role (very important) */}
//         <div className="flex items-start gap-4 mb-5">
//           {candidate.avatarUrl ? (
//             <img
//               src={candidate.avatarUrl}
//               alt={candidate.name}
//               className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 dark:border-gray-800 shadow-sm"
//             />
//           ) : (
//             <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-gray-500 font-medium">
//               {candidate.name?.[0]?.toUpperCase() || "?"}
//             </div>
//           )}

//           <div className="flex-1 min-w-0">
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">
//               {candidate.name || "Unknown Developer"}
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-0.5">
//               {candidate.role || "Software Engineer"}
//             </p>
//             <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-1">
//               <Building2 className="w-3.5 h-3.5" />
//               <span>{candidate.company || "Open to opportunities"}</span>
//               {candidate.location && (
//                 <>
//                   <span className="mx-1">·</span>
//                   <MapPin className="w-3.5 h-3.5" />
//                   <span>{candidate.location}</span>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Skills */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {candidate.skills?.slice(0, 5).map((skill, i) => (
//             <span
//               key={i}
//               className="px-2.5 py-1 bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary-foreground text-xs font-medium rounded-full border border-primary/20 dark:border-primary/30"
//             >
//               {skill}
//             </span>
//           ))}
//           {candidate.skills?.length > 5 && (
//             <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full">
//               +{candidate.skills.length - 5}
//             </span>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
//           <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//             {getPlatformIcon(candidate.platform)}
//             <span className="font-medium">{candidate.platform || "Platform"}</span>
//             {candidate.followers && (
//               <span className="flex items-center gap-1 text-xs">
//                 <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
//                 {candidate.followers}
//               </span>
//             )}
//           </div>

//           <a
//             href={candidate.profileUrl || "#"}
//             target="_blank"
//             rel="noopener noreferrer"
//             className={cn(
//               "inline-flex items-center gap-2 text-sm font-semibold",
//               "text-primary hover:text-primary/80 transition-colors"
//             )}
//           >
//             View Profile
//             <ExternalLink className="w-4 h-4" />
//           </a>
//         </div>
//       </div>

//       {/* Subtle gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
//     </motion.div>
//   );
// }

// src/components/ui/CandidateCard.jsx
import { motion } from "framer-motion";
import { Building2, ExternalLink, Github, Linkedin, MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function CandidateCard({ candidate, index }) {
  const getPlatformIcon = (platform) => {
    const lower = (platform || "").toLowerCase();
    if (lower.includes("github")) {
      return <Github className="w-5 h-5 text-foreground" />;
    }
    if (lower.includes("linkedin")) {
      return <Linkedin className="w-5 h-5 text-[#0A66C2] dark:text-[#4dabf7]" />;
    }
    return <ExternalLink className="w-5 h-5 text-muted-foreground" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      className={cn(
        "group relative bg-card rounded-2xl border border-border overflow-hidden",
        "shadow-sm hover:shadow-xl transition-all duration-300",
        "hover:-translate-y-1 hover:border-primary/40 dark:hover:border-primary/50"
      )}
    >
      {/* Match badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/90 dark:bg-background/80 backdrop-blur-md rounded-full border border-border shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Match
          </span>
          <span
            className={cn(
              "text-sm font-bold px-1.5",
              candidate.relevanceScore >= 85
                ? "text-emerald-600 dark:text-emerald-400"
                : candidate.relevanceScore >= 70
                ? "text-amber-600 dark:text-amber-400"
                : "text-muted-foreground"
            )}
          >
            {candidate.relevanceScore ?? "—"}%
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col h-full">
        {/* Avatar + Name + Role */}
        <div className="flex items-start gap-4 mb-5">
          {candidate.avatarUrl ? (
            <img
              src={candidate.avatarUrl}
              alt={candidate.name || "Candidate"}
              className="w-14 h-14 rounded-full object-cover border-2 border-border shadow-sm"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium text-xl">
              {candidate.name?.[0]?.toUpperCase() || "?"}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {candidate.name || "Unknown Developer"}
            </h3>
            <p className="text-sm text-muted-foreground font-medium mt-0.5">
              {candidate.role || "Software Engineer"}
            </p>
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground mt-1">
              <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{candidate.company || "Open to opportunities"}</span>
              {candidate.location && (
                <>
                  <span className="mx-1">·</span>
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{candidate.location}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {candidate.skills?.slice(0, 5).map((skill, i) => (
            <span
              key={i}
              className="px-2.5 py-1 bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary-foreground text-xs font-medium rounded-full border border-primary/20 dark:border-primary/30"
            >
              {skill}
            </span>
          ))}
          {candidate.skills?.length > 5 && (
            <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
              +{candidate.skills.length - 5}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            {getPlatformIcon(candidate.platform)}
            <span className="font-medium">{candidate.platform || "Platform"}</span>
            {candidate.followers && (
              <span className="flex items-center gap-1 text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {candidate.followers}
              </span>
            )}
          </div>

          <a
            href={candidate.profileUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md px-2 py-1"
            )}
          >
            View Profile
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}