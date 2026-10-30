
import { useState } from "react";
import { Hero } from "@/components/Hero";
import { CarbonForm, CarbonFormData } from "@/components/CarbonForm";
import { Dashboard } from "@/components/Dashboard";
import { predictCarbonFootprint } from "@/lib/mlPredictor";
import { Leaf } from "lucide-react";
import earthCartoon from "@/assets/earth-cartoon.png";

type AppState = "hero" | "form" | "dashboard";

type EmissionsBreakdown = {
  transportation: number;
  electricity: number;
  diet: number;
  waste: number;
  lifestyle: number;
};

type DashboardFormData = CarbonFormData & {
  emissions_breakdown: EmissionsBreakdown;
};

type Results = {
  prediction: number;
  formData: DashboardFormData;
  suggestions: string[];
};

const Index = () => {
  const [state, setState] = useState<AppState>("hero");
  const [isCalculating, setIsCalculating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [results, setResults] = useState<Results | null>(null);

  const handleGetStarted = () => {
    setState("form");

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleFormSubmit = async (data: CarbonFormData) => {
    setIsCalculating(true);
    setErrorMessage("");

    try {
      // Get the monthly carbon footprint prediction.
      const prediction = await predictCarbonFootprint(data);

      if (!Number.isFinite(prediction) || prediction < 0) {
        throw new Error(
          "Invalid prediction received. Please check your input and try again."
        );
      }

      // Calculate category-wise emissions from the total prediction.
      // These percentages are estimates, not separate ML predictions.
      const emissions_breakdown: EmissionsBreakdown = {
        transportation: prediction * 0.27,
        electricity: prediction * 0.29,
        diet: prediction * 0.26,
        waste: prediction * 0.05,
        lifestyle: prediction * 0.13,
      };

      const suggestions = [
        "Consider using renewable energy to reduce your footprint",
        "Try reducing meat consumption to lower environmental impact",
        "Use public transportation or carpool when possible",
        "Minimize water usage and fix any leaks",
        "Shop locally and reduce online orders",
      ];

      // Important: Dashboard reads emissions_breakdown from formData.
      setResults({
        prediction,
        formData: {
          ...data,
          emissions_breakdown,
        },
        suggestions,
      });

      setState("dashboard");

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Failed to calculate carbon footprint:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to calculate your carbon footprint. Please try again."
      );
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setState("form");
    setResults(null);
    setErrorMessage("");

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Decorative Vines */}
      <div className="vine-decoration vine-left" />
      <div className="vine-decoration vine-right" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Leaf className="w-6 h-6 text-primary" />
            </div>

            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EcoTrack
            </span>
          </div>

          {state !== "hero" && (
            <button
              type="button"
              onClick={() => setState("hero")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Home
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {state === "hero" && (
          <Hero onGetStarted={handleGetStarted} />
        )}

        {state === "form" && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6 animate-float">
                <img
                  src={earthCartoon}
                  alt="Happy Earth with nature"
                  className="w-64 h-48 object-contain drop-shadow-lg"
                />
              </div>

              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Calculate Your Impact
              </h2>

              <p className="text-lg text-muted-foreground">
                Answer a few questions about your lifestyle to get your
                personalized carbon footprint.
              </p>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700"
              >
                {errorMessage}
              </div>
            )}

            <CarbonForm
              onSubmit={handleFormSubmit}
              isCalculating={isCalculating}
            />
          </div>
        )}

        {state === "dashboard" && results && (
          <div className="max-w-6xl mx-auto">
            <Dashboard
              prediction={results.prediction}
              formData={results.formData}
              suggestions={results.suggestions}
              onReset={handleReset}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t mt-16 py-12 bg-gradient-to-b from-muted/50 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Every Action Counts
              </h3>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Small changes in our daily habits can create a massive
                positive impact on our planet. Start your journey today! 🌍
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-background/60 rounded-lg border border-primary/20">
                <div className="text-3xl font-bold text-primary mb-1">
                  25kg
                </div>
                <div className="text-sm text-muted-foreground">
                  CO₂ absorbed by 1 tree/month
                </div>
              </div>

              <div className="text-center p-4 bg-background/60 rounded-lg border border-primary/20">
                <div className="text-3xl font-bold text-accent mb-1">
                  40%
                </div>
                <div className="text-sm text-muted-foreground">
                  Reduction via carpooling
                </div>
              </div>

              <div className="text-center p-4 bg-background/60 rounded-lg border border-primary/20">
                <div className="text-3xl font-bold text-primary mb-1">
                  30%
                </div>
                <div className="text-sm text-muted-foreground">
                  Savings with renewables
                </div>
              </div>
            </div>

            {/* Credits */}
            <div className="text-center text-sm text-muted-foreground border-t pt-6">
              <p className="mb-2">
                Emission factors sourced from{" "}
                <span className="font-semibold">EPA</span>,{" "}
                <span className="font-semibold">CarbonFootprint.com</span>,
                and <span className="font-semibold">FAO</span>
              </p>

              <p className="text-xs opacity-75">
                © 2025 EcoTrack · Making sustainability accessible for everyone
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
