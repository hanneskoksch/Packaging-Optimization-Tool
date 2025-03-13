import { ChartData, ChartOptions } from "chart.js";
import { ICsvVariable } from "@/types/csv-types";
import { Bar } from "react-chartjs-2";
import { HighlightFilter } from "./DivergingBarChartCard";

interface IProps {
  variables: ICsvVariable[];
  passiveSums: number[];
  activeSums: number[];
  highlightFilter: HighlightFilter;
  highlightThreshold: number;
}

const DivergingBarChart = ({
  variables,
  passiveSums,
  activeSums,
  highlightFilter,
  highlightThreshold,
}: IProps) => {
  const PASSIVE_COLOR = "#9B2524";
  const PASSIVE_COLOR_FADED = "#EDD4D3";
  const ACTIVE_COLOR = "#0070C0";
  const ACTIVE_COLOR_FADED = "#D2E3F3";

  const getPassiveColor = () => {
    if (highlightFilter === "all") return passiveSums.map(() => PASSIVE_COLOR);
    if (highlightFilter === "active") {
      return activeSums.map((sum) =>
        sum > highlightThreshold ? PASSIVE_COLOR : PASSIVE_COLOR_FADED,
      );
    }
    if (highlightFilter === "passive") {
      return passiveSums.map((sum) =>
        sum > highlightThreshold ? PASSIVE_COLOR : PASSIVE_COLOR_FADED,
      );
    }
    if (highlightFilter === "activeAndPassive") {
      return activeSums.map((sum, index) =>
        sum > highlightThreshold && passiveSums[index] > highlightThreshold
          ? PASSIVE_COLOR
          : PASSIVE_COLOR_FADED,
      );
    }
  };

  const getActiveColor = () => {
    if (highlightFilter === "all") return activeSums.map(() => ACTIVE_COLOR);
    if (highlightFilter === "active") {
      return activeSums.map((sum) =>
        sum > highlightThreshold ? ACTIVE_COLOR : ACTIVE_COLOR_FADED,
      );
    }
    if (highlightFilter === "passive") {
      return passiveSums.map((sum) =>
        sum > highlightThreshold ? ACTIVE_COLOR : ACTIVE_COLOR_FADED,
      );
    }
    if (highlightFilter === "activeAndPassive") {
      return activeSums.map((sum, index) =>
        sum > highlightThreshold && passiveSums[index] > highlightThreshold
          ? ACTIVE_COLOR
          : ACTIVE_COLOR_FADED,
      );
    }
  };

  const data: ChartData<"bar"> = {
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

  const options: ChartOptions<"bar"> = {
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
              datasetIndex: i, // Required for legend click handling
            }));
          },
        },
      },
      tooltip: {
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

  return <Bar options={options} data={data} />;
};

export default DivergingBarChart;
