import { useEffect, useRef, useState } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
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
  const chartInstance = useRef<Chart | null>(null);
  const [initialRender, setInitialRender] = useState(true);

  const PASSIVE_COLOR = "#9B2524";
  const PASSIVE_COLOR_FADED = "#EDD4D3";
  const ACTIVE_COLOR = "#0070C0";
  const ACTIVE_COLOR_FADED = "#D2E3F3";

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    const getPassiveColor = () => {
      if (showData === "all") return PASSIVE_COLOR;
      if (showData === "rocket") {
        return activeSums.map((sum) =>
          sum > highlightThreshold ? PASSIVE_COLOR : PASSIVE_COLOR_FADED,
        );
      }
      if (showData === "hourglass") {
        return passiveSums.map((sum) =>
          sum > highlightThreshold ? PASSIVE_COLOR : PASSIVE_COLOR_FADED,
        );
      }
      if (showData === "lightning") {
        return activeSums.map((sum, index) =>
          sum > highlightThreshold && passiveSums[index] > highlightThreshold
            ? PASSIVE_COLOR
            : PASSIVE_COLOR_FADED,
        );
      }
    };

    const getActiveColor = () => {
      if (showData === "all") return ACTIVE_COLOR;
      if (showData === "rocket") {
        return activeSums.map((sum) =>
          sum > highlightThreshold ? ACTIVE_COLOR : ACTIVE_COLOR_FADED,
        );
      }
      if (showData === "hourglass") {
        return passiveSums.map((sum) =>
          sum > highlightThreshold ? ACTIVE_COLOR : ACTIVE_COLOR_FADED,
        );
      }
      if (showData === "lightning") {
        return activeSums.map((sum, index) =>
          sum > highlightThreshold && passiveSums[index] > highlightThreshold
            ? ACTIVE_COLOR
            : ACTIVE_COLOR_FADED,
        );
      }
    };

    const data = {
      labels: variables.map(
        (variable) => `${variable.variable} (${variable.id})`,
      ),
      datasets: [
        {
          label: "Being impacted (passive)", // Passive sum
          data: passiveSums.map((sum) => -sum), // Negative values for left side
          backgroundColor: getPassiveColor(),
        },
        {
          label: "Impacting (active)", // Active sum
          data: activeSums, // Positive values for right side
          backgroundColor: getActiveColor(),
        },
      ],
    };

    const options: ChartOptions = {
      animation: {
        duration: initialRender ? 1000 : 0, // Initial animation only once
      },
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
              }));
            },
          },
        },
        tooltip: {
          animation: { duration: 400 }, // Keep tooltip animation
          callbacks: {
            labelColor: (context) => {
              const datasetIndex = context.datasetIndex;
              return {
                borderColor: "transparent",
                backgroundColor:
                  datasetIndex === 0 ? PASSIVE_COLOR : ACTIVE_COLOR,
              };
            },
            label: (tooltipItem) => {
              const value = Number(tooltipItem.raw);
              return `${tooltipItem.dataset.label}: ${Math.abs(value)}`; // Show only absolute values (values were negated for passive sums on left side)
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
          stacked: true,
        },
      },
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx!, {
      type: "bar",
      data,
      options,
    });

    setInitialRender(false); // Animation only on initial render

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variables]); // `passiveSums`, `activeSums`, `showData` change does not require re-render

  const diagramHeight = variables.length * 50;

  return (
    <div className={`relative h-[${diagramHeight}px] max-w-[800px]`}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default DivergingBarChart;
