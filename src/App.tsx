import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TopBar } from "@/components/Layout/TopBar";
import { Footer } from "@/components/Layout/Footer";
import { Projects } from "./pages/Projects";
import { Simple } from "./pages/Simple";
import { Advanced } from "./pages/Advanced";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "@/hooks/useLanguage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
            <TopBar />
            <div className="flex-1 flex flex-col pt-topbar overflow-visible">
              <Routes>
                <Route path="/" element={<Projects />} />
                <Route path="/project/:id" element={<Simple />} />
                <Route path="/project/:id/advanced" element={<Advanced />} />
                {/* Redirect bare ID to proper project route */}
                <Route path="/:id" element={<Simple />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
