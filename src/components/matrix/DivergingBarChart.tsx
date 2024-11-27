import { useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { ICsvVariable } from "@/types/csv-types";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

interface IProps {
  variables: ICsvVariable[];
  passiveSums: number[];
  activeSums: number[];
}

const DivergingBarChart = ({ variables, passiveSums, activeSums }: IProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");

    const data = {
      labels: variables.map((variable) => variable.variable),
      datasets: [
        {
          label: "Being impacted (passive)", // Passive sum
          data: passiveSums.map((sum) => -sum), // Negative values for left
          backgroundColor: "#9B2524",
        },
        {
          label: "Impacting (active)", // Active sum
          data: activeSums, // Positive values for right
          backgroundColor: "#0070C0",
        },
      ],
    };

    const myChart = new Chart(ctx!, {
      type: "bar",
      data: data,
      options: {
        indexAxis: "y", // Horizontal chart
        responsive: true,
        plugins: {
          legend: {
            position: "bottom", // Legend below the chart
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const value = Number(tooltipItem.raw);
                return `${tooltipItem.dataset.label}: ${Math.abs(value)}`; // Show only absolute values
              },
            },
          },
        },
        scales: {
          x: {
            display: false, // No x-axis
            beginAtZero: true,
            ticks: {
              callback: (value) => `${Math.abs(Number(value))}`, // Show only absolute values
            },
          },
          y: {
            stacked: true, // Bars of the same group on same height
          },
        },
      },
    });

    // Cleanup function to destroy chart instance
    return () => {
      myChart.destroy();
    };
  }, [variables, passiveSums, activeSums]);

  const diagramHeight = variables.length * 50;
  return (
    <div className={`relative h-[${diagramHeight}px] max-w-[800px]`}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default DivergingBarChart;
