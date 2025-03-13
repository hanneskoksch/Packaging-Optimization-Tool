import { IVariablesImpact } from "@/utils/matrix-builder";
import { ChartOptions } from "chart.js/auto";
import { Scatter } from "react-chartjs-2";
import { backgroundImagePlugin } from "./ScatterChartPlugins";

interface IProps {
  showImpactAreas: boolean;
  variablesImpacts: IVariablesImpact[];
}

const ScatterChart = ({ showImpactAreas, variablesImpacts }: IProps) => {
  // Calculate min/max values for both axes
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

  const options: ChartOptions<"scatter"> = {
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
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.x} passive, ${context.parsed.y} active`;
          },
        },
      },
      legend: {
        display: false,
      },
      // Using the custom chartjs plugin options
      // see https://www.chartjs.org/docs/latest/general/options.html#plugin-options
      background: {
        showBackgroundImage: showImpactAreas,
      },
    },
    elements: {
      point: {
        radius: 6,
        hoverRadius: 8,
      },
    },
  };

  return (
    <Scatter options={options} data={data} plugins={[backgroundImagePlugin]} />
  );
};

export default ScatterChart;
