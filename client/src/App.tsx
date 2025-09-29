import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Import main components
import TouchInterface from "@/components/TouchInterface";

// Import component examples for preview
import LogoExample from "@/components/examples/Logo";
import ServiceCardExample from "@/components/examples/ServiceCard";
import NavigationBarExample from "@/components/examples/NavigationBar";
import StatusDisplayExample from "@/components/examples/StatusDisplay";
import TouchInterfaceExample from "@/components/examples/TouchInterface";

function Router() {
  return (
    <Switch>
      {/* Main Tan & Co CRM Interface */}
      <Route path="/" component={TouchInterfaceExample} />
      
      {/* Component Examples for Development/Preview */}
      <Route path="/examples/logo" component={LogoExample} />
      <Route path="/examples/service-card" component={ServiceCardExample} />
      <Route path="/examples/navigation" component={NavigationBarExample} />
      <Route path="/examples/status" component={StatusDisplayExample} />
      <Route path="/examples/touch-interface" component={TouchInterfaceExample} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-slate-900 text-white">
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
