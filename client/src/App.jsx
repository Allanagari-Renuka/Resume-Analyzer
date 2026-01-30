// src/App.jsx
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes"; // ← added for theme
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AnalysisResult from "@/pages/AnalysisResult";
import History from "@/pages/History";
import Layout from "@/components/Layout"; // assuming you have Layout

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/analysis/:id" component={AnalysisResult} />
      <Route path="/history" component={History} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    // Wrap everything in ThemeProvider
    <ThemeProvider
      attribute="class"           // adds 'dark' class to <html>
      defaultTheme="system"       // respects user's OS preference
      enableSystem                // auto system theme
      disableTransitionOnChange   // prevents flash on theme switch
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Layout>                    
            <Router />
          </Layout>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;