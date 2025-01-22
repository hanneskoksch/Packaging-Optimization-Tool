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
  showData: "all" | "rocket" | "hourglass" | "lightning";
  highlightThreshold: number;
}

const DivergingBarChart = ({
  variables,
  passiveSums,
  activeSums,
  showData,
  highlightThreshold,
}: IProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const PASSIVE_COLOR = "#9B2524";
  const PASSIVE_COLOR_FADED = "#EDD4D3";
  const ACTIVE_COLOR = "#0070C0";
  const ACTIVE_COLOR_FADED = "#D2E3F3";

  useEffect(() => {
    const getPassiveColor = () => {
      if (showData === "all") return PASSIVE_COLOR;
      if (showData === "rocket") {
        return activeSums.map((sum) => {
          return sum > highlightThreshold ? PASSIVE_COLOR : PASSIVE_COLOR_FADED;
        });
      }
      if (showData === "hourglass") {
        return passiveSums.map((sum) => {
          return sum > highlightThreshold ? PASSIVE_COLOR : PASSIVE_COLOR_FADED;
        });
      }
      if (showData === "lightning") {
        return activeSums.map((sum, index) => {
          return sum > highlightThreshold &&
            passiveSums[index] > highlightThreshold
            ? PASSIVE_COLOR
            : PASSIVE_COLOR_FADED;
        });
      }
    };

    const getActiveColor = () => {
      if (showData === "all") return ACTIVE_COLOR;
      if (showData === "rocket") {
        return activeSums.map((sum) => {
          return sum > highlightThreshold ? ACTIVE_COLOR : ACTIVE_COLOR_FADED;
        });
      }
      if (showData === "hourglass") {
        return passiveSums.map((sum) => {
          return sum > highlightThreshold ? ACTIVE_COLOR : ACTIVE_COLOR_FADED;
        });
      }
      if (showData === "lightning") {
        return activeSums.map((sum, index) => {
          return sum > highlightThreshold &&
            passiveSums[index] > highlightThreshold
            ? ACTIVE_COLOR
            : ACTIVE_COLOR_FADED;
        });
      }
    };

    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");

    const data = {
      labels: variables.map(
        (variable) => `${variable.variable} (${variable.id})`,
      ),
      datasets: [
        {
          label: "Being impacted (passive)", // Passive sum
          data: passiveSums.map((sum) => -sum), // Negative values for left
          backgroundColor: getPassiveColor(),
        },
        {
          label: "Impacting (active)", // Active sum
          data: activeSums, // Positive values for right
          backgroundColor: getActiveColor(),
        },
      ],
    };

    const myChart = new Chart(ctx!, {
      type: "bar",
      data: data,
      options: {
        animation: false,
        indexAxis: "y", // Horizontal chart
        responsive: true,
        plugins: {
          legend: {
            position: "bottom", // Legend below the chart
            labels: {
              // Ensure legend labels always use the non-faded colors
              generateLabels: (chart) => {
                const datasetColors = [PASSIVE_COLOR, ACTIVE_COLOR];
                return chart.data.datasets.map((dataset, i) => ({
                  text: dataset.label ?? "",
                  fillStyle: datasetColors[i], // Use non-faded colors for the legend
                  hidden: !chart.isDatasetVisible(i),
                  lineCap: "butt",
                  lineDash: [],
                  lineDashOffset: 0,
                  lineJoin: "miter",
                  strokeStyle: datasetColors[i],
                  pointStyle: "rect",
                }));
              },
            },
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
  }, [variables, passiveSums, activeSums, showData, highlightThreshold]);

  const diagramHeight = variables.length * 50;

  return (
    <div className={`relative h-[${diagramHeight}px] max-w-[800px]`}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default DivergingBarChart;
