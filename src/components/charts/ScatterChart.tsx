import { ICsvVariable } from "@/types/csv-types";
import Chart from "chart.js/auto";

import { useEffect, useRef } from "react";

interface IProps {
  variablesImpacts: {
    variable: ICsvVariable;
    activeSum: number;
    passiveSum: number;
  }[];
}

const ScatterChart = ({ variablesImpacts }: IProps) => {
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

    const myChart = new Chart(ctx!, {
      type: "scatter",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
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
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: 8,
            hoverRadius: 12,
          },
        },
      },
    });

    // Cleanup function to destroy chart instance
    return () => {
      myChart.destroy();
    };
  }, [variablesImpacts]);

  return (
    <div className="max-w-[800px] max-h-[400px]">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default ScatterChart;
