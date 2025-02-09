import { BigNumber } from "mathjs";
import Chart, { ChartOptions } from "chart.js/auto";
import { useEffect, useRef } from "react";

interface IProps {
  vectors: BigNumber[][];
  variables: string[] | number[];
}

function ProgressionLineChart({ vectors, variables }: IProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const labels = vectors.map((_, index) => `Round ${index}`);

    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");

    const data = {
      labels: labels,
      datasets: variables.map((variable, variableIndex) => ({
        label: variable.toString(),
        data: vectors.map((vector) => {
          return vector[variableIndex].toNumber();
        }),
      })),
    };

    const options: ChartOptions = {
      responsive: true,
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

    const myChart = new Chart(ctx!, {
      type: "line",
      data: data,
      options: options,
    });

    // Cleanup function to destroy chart instance
    return () => {
      myChart.destroy();
    };
  }, [variables, vectors]);

  return (
    <div className="max-w-[800px] max-h-[400px]">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default ProgressionLineChart;
