import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeather } from "@/hooks/useWeather";
import { WeatherCards } from "@/components/dashboard/WeatherCards";
import { TemperatureChart } from "@/components/dashboard/TemperatureChart";
import { RainProbabilityChart } from "@/components/dashboard/RainProbabilityChart";
import { WeatherTable } from "@/components/dashboard/WeatherTable";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { ExportButtons } from "@/components/dashboard/ExportButtons";
import { useEffect } from "react";
import { initCollector } from "@/services/api";

export default function Dashboard() {
  const {
    current,
    history,
    loading: weatherLoading,
    refetch: refetchWeather,
  } = useWeather();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      initCollector(token);
      const timeout = setTimeout(() => {
        handleRefresh();
      }, 5000);

      return () => clearTimeout(timeout);
    } else {
      console.error("Token ausente");
    }
  }, []);

  const handleRefresh = () => {
    refetchWeather();
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        refetchWeather();
      },
      5 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, [refetchWeather]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard de Clima
            </h1>
            <p className="text-gray-600 mt-1">
              Monitoramento meteorológico em tempo real
            </p>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={weatherLoading}
            variant="outline"
            className="border-gray-300"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${weatherLoading ? "animate-spin" : ""}`}
            />
            Atualizar
          </Button>
        </div>

        {/* Weather Cards */}
        <WeatherCards data={current} loading={weatherLoading} />

        {/* Insights Section */}
        <InsightsSection />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TemperatureChart data={history} loading={weatherLoading} />
          <RainProbabilityChart data={history} loading={weatherLoading} />
        </div>

        {/* Weather Table */}
        <WeatherTable data={history} loading={weatherLoading} />

        {/* Export Buttons */}
        <div className="flex justify-center">
          <ExportButtons />
        </div>
      </div>
    </div>
  );
}
