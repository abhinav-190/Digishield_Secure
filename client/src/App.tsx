import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import { useEffect } from "react";

// Add keyframes for data point animation
const addGlobalStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes dataPoint {
      0% {
        transform: translate(0, 0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translate(100px, 0);
        opacity: 0;
      }
    }
    
    .animate-dataPoint {
      animation: dataPoint 3s infinite linear;
    }
  `;
  document.head.appendChild(style);
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    addGlobalStyles();
    
    // Load fonts
    const jetbrainsMono = document.createElement('link');
    jetbrainsMono.rel = 'stylesheet';
    jetbrainsMono.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap';
    document.head.appendChild(jetbrainsMono);
    
    const inter = document.createElement('link');
    inter.rel = 'stylesheet';
    inter.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(inter);
    
    return () => {
      document.head.removeChild(jetbrainsMono);
      document.head.removeChild(inter);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
