
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { AiAssistant } from "../components/ui/AiAssistant";
import { DashboardHero } from "../components/dashboard/DashboardHero";
import { TodaySummary } from "../components/dashboard/TodaySummary";
import { ActivityTracking } from "../components/dashboard/ActivityTracking";
import { MealPlan } from "../components/dashboard/MealPlan";
import { Goals } from "../components/dashboard/Goals";
import { Achievements } from "../components/dashboard/Achievements";
import { AIChatPreview } from "../components/dashboard/AIChatPreview";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pb-12">
        <DashboardHero />
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TodaySummary />
              <div className="mt-6">
                <ActivityTracking />
              </div>
              <div className="mt-6">
                <MealPlan />
              </div>
            </div>
            
            <div>
              <Goals />
              <div className="mt-6">
                <Achievements />
              </div>
              <div className="mt-6">
                <AIChatPreview />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default Dashboard;
