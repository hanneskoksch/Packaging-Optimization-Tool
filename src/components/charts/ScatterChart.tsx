import { IVariablesImpact } from "@/utils/matrix-calculations";
import Chart, { ChartOptions } from "chart.js/auto";
import { useEffect, useRef } from "react";
import { backgroundImageArePlugin } from "./ScatterChartPlugins";

interface IProps {
  showImpactAreas: boolean;
  variablesImpacts: IVariablesImpact[];
}

const ScatterChart = ({ showImpactAreas, variablesImpacts }: IProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");

    // Berechne gemeinsame Min/Max-Werte für beide Achsen
    const allXValues = variablesImpacts.map((impact) => impact.passiveSum);
    const allYValues = variablesImpacts.map((impact) => impact.activeSum);
    const maxValue = Math.max(...allXValues, ...allYValues);

    const data = {
      datasets: variablesImpacts.map((impact) => ({
        label: impact.variable.variable,
        data: [{ x: impact.passiveSum, y: impact.activeSum }],
        backgroundColor: "#0070C0",
      })),
    };

    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
      animation: false,
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: {
            display: true,
            text: "Being impacted (passive)",
          },
          max: maxValue + 1,
          ticks: {
            stepSize: 1,
          },
          grid: {
            display: !showImpactAreas,
          },
        },
        y: {
          type: "linear",
          position: "left",
          title: {
            display: true,
            text: "Impacting others (active)",
          },
          max: maxValue + 1,
          ticks: {
            stepSize: 1,
          },
          grid: {
            display: !showImpactAreas,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      elements: {
        point: {
          radius: 6,
          hoverRadius: 8,
        },
      },
    };

    const myChart = new Chart(ctx!, {
      type: "scatter",
      data: data,
      options: options,
      plugins: showImpactAreas ? [backgroundImageArePlugin] : [],
    });

    // Cleanup function to destroy chart instance
    return () => {
      myChart.destroy();
    };
  }, [variablesImpacts, showImpactAreas]);

  return (
    <div className="max-w-[800px] max-h-[400px]">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default ScatterChart;
