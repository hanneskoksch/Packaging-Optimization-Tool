import "chart.js/auto";
import { ChartOptions } from "chart.js/auto";
import { BigNumber } from "mathjs";
import { Line } from "react-chartjs-2";
interface IProps {
  vectors: BigNumber[][];
  variables: string[] | number[];
  maintainAspectRatio?: boolean;
}

function ProgressionLineChart({
  vectors,
  variables,
  maintainAspectRatio = true,
}: IProps) {
  const labels = vectors.map((_, index) => `Round ${index}`);

  const data = {
    labels: labels,
    datasets: variables.map((variable, variableIndex) => ({
      label: variable.toString(),
      data: vectors.map((vector) => {
        return vector[variableIndex].toNumber();
      }),
    })),
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: maintainAspectRatio,
    plugins: {
      legend: {
        display: true,
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
    <div className="max-w-[800px] max-h-[400px]">
      <Line data={data} options={options} id={vectors.toString()} />
    </div>
  );
}

export default ProgressionLineChart;
