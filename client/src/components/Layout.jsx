// import { useEffect, useState } from "react";
// import { Link, useLocation } from "wouter";
// import { LayoutDashboard, History, Briefcase, Sun, Moon, Clock } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useTheme } from "@/hooks/use-theme";

// export default function Layout({ children }) {
//   const [location] = useLocation();
//   const { theme, toggleTheme } = useTheme();
//   const [time, setTime] = useState(() => new Date());

//   // Update local time periodically
//   useEffect(() => {
//     const interval = setInterval(() => setTime(new Date()), 30 * 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const navItems = [
//     { href: "/", label: "New Analysis", icon: LayoutDashboard },
//     { href: "/history", label: "History", icon: History },
//   ];

//   return (
//     <div className="min-h-screen bg-background text-foreground flex flex-col">
//       {/* Top Navbar */}
//       <header className="sticky top-0 z-30 w-full border-b border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//           {/* Brand */}
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md shadow-primary/20">
//               <Briefcase className="w-5 h-5 text-primary-foreground" />
//             </div>
//             <span className="hidden sm:block font-display font-semibold tracking-tight">Resume Analyzer</span>
//           </div>

//           {/* Nav links */}
//           <nav className="hidden md:flex items-center gap-1">
//             {navItems.map((item) => {
//               const isActive = location === item.href;
//               return (
//                 <Link key={item.href} href={item.href}>
//                   <div
//                     className={cn(
//                       "inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
//                       isActive
//                         ? "bg-primary/10 text-primary"
//                         : "text-muted-foreground hover:bg-accent hover:text-foreground"
//                     )}
//                   >
//                     <item.icon className="w-4 h-4" />
//                     <span>{item.label}</span>
//                   </div>
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Right controls: time + theme */}
//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//               <Clock className="w-4 h-4" />
//               <span>
//                 {time.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
//                 {" • "}
//                 {time.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
//               </span>
//             </div>
//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-lg hover:bg-accent transition-colors"
//               aria-label="Toggle theme"
//             >
//               {theme === "dark" ? (
//                 <Sun className="w-5 h-5 text-yellow-500" />
//               ) : (
//                 <Moon className="w-5 h-5 text-black" />
//               )}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Body */}
//       <div className="flex-1 flex flex-col md:flex-row">
//         {/* Sidebar (kept for wider screens without time) */}
//         <aside
//           className={cn(
//             "hidden md:block md:w-64 bg-card border-r border-border md:h-[calc(100vh-4rem)] md:sticky md:top-16 overflow-y-auto",
//             "shadow-sm z-20 transition-all duration-300"
//           )}
//         >
//           <nav className="p-4 space-y-1.5">
//             {navItems.map((item) => {
//               const isActive = location === item.href;
//               return (
//                 <Link key={item.href} href={item.href}>
//                   <div
//                     className={cn(
//                       "group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
//                       isActive
//                         ? "bg-primary/10 text-primary shadow-sm"
//                         : "text-muted-foreground hover:bg-accent hover:text-foreground"
//                     )}
//                   >
//                     <item.icon
//                       className={cn(
//                         "w-5 h-5 shrink-0 transition-colors",
//                         isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
//                       )}
//                     />
//                     <span>{item.label}</span>
//                   </div>
//                 </Link>
//               );
//             })}
//           </nav>

//           <div className="mt-6 mx-4 mb-4">
//             <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-5 border border-primary/10">
//               <h4 className="font-semibold text-sm text-foreground mb-2">
//                 <span className="text-primary">Pro Tip</span>
//               </h4>
//               <p className="text-xs text-muted-foreground leading-relaxed">
//                 Include specific skills, years of experience, and tech stack in job descriptions for the most accurate candidate matches.
//               </p>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto bg-gradient-to-b from-background to-background/80">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, History, Briefcase, Sun, Moon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

export default function Layout({ children }) {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { href: "/", label: "New Analysis", icon: LayoutDashboard },
    { href: "/history", label: "History", icon: History },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      
      {/* 🔥 Clean Top Navbar Only */}
      <header className="sticky top-0 z-30 w-full border-b border-border bg-card/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md shadow-primary/20">
              <Briefcase className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight">
              Resume Analyzer
            </span>
          </div>

          {/* Center Nav Links */}
          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>
                {time.toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                {" • "}
                {time.toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Only */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>

    </div>
  );
}
