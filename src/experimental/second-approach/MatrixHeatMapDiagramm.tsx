import { ReactECharts, ReactEChartsProps } from "@/lib/React-ECharts";

interface IProps {
  vectors: number[][];
  variables: string[];
}

function MatrixHeatMapDiagramm({ vectors, variables }: IProps) {
  const rounds = Array.from(Array(vectors.length).keys());

  const data: number[][] = vectors.flatMap((vector, index) => {
    return vector.map((value, innerIndex) => {
      return [index, innerIndex, value];
    });
  });

  // use only index 2 from vectors for minimal value
  const minimalValue = Math.min(...vectors.map((vector) => vector[2]));
  const maximalValue = Math.max(...vectors.map((vector) => vector[2]));

  const option: ReactEChartsProps["option"] = {
    tooltip: {
      show: true,
      position: "top",
    },
    grid: {
      height: "50%",
      top: "10%",
    },
    xAxis: {
      type: "category",
      data: rounds,
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: "category",
      data: variables,
      inverse: true,
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      show: false,
      min: minimalValue,
      max: maximalValue,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "15%",
    },
    series: [
      {
        name: "Punch Card",
        type: "heatmap",
        data: data,
        label: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div>
      <ReactECharts option={option} />
    </div>
  );
}

export default MatrixHeatMapDiagramm;
