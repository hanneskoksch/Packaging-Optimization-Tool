import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ReactECharts, ReactEChartsProps } from "@/lib/React-ECharts";
import { BigNumber } from "mathjs";
import { useState } from "react";

interface IProps {
  vectors: BigNumber[][];
  variables: string[] | number[];
}

function MatrixHeatMapDiagramm({ vectors, variables }: IProps) {
  const [showCustomColorSchema, setShowCustomColorSchema] = useState(false);

  const rounds = Array.from(Array(vectors.length).keys());

  const data: number[][] = vectors.flatMap((vector, index) => {
    return vector.map((value, innerIndex) => {
      return [index, innerIndex, value.toNumber()];
    });
  });

  const minimalValue = Math.min(
    ...vectors.flat().map((value) => value.toNumber()),
  );
  const maximalValue = Math.max(
    ...vectors.flat().map((value) => value.toNumber()),
  );
  const maximalAbsolutValue = Math.max(
    Math.abs(minimalValue),
    Math.abs(maximalValue),
  );

  const option: ReactEChartsProps["option"] = {
    tooltip: {
      show: true,
      position: "top",
    },
    grid: {
      height: "80%",
      top: "10%",
    },
    xAxis: {
      type: "category",
      data: rounds,
      show: false,
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: "category",
      data: variables,
      inverse: true,
      axisLabel: {
        show: true,
        interval: 0, // show all labels
        formatter: (value) => value,
      },
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      show: false,
      min: showCustomColorSchema ? -maximalAbsolutValue : minimalValue,
      max: showCustomColorSchema ? maximalAbsolutValue : maximalValue,
      calculable: true,
      inRange: showCustomColorSchema
        ? {
            color: ["#FF0000", "#FFFFFF", "#00FF00"],
          }
        : undefined,
      orient: "horizontal",
      left: "center",
      bottom: "5%", // position of the legend moved down
    },
    series: [
      {
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
      <ReactECharts
        key={showCustomColorSchema ? "custom" : "default"}
        option={option}
      />
      <div className="flex items-center space-x-2 mb-4">
        <Switch
          id="show-areas"
          onCheckedChange={() =>
            setShowCustomColorSchema(!showCustomColorSchema)
          }
        />
        <Label htmlFor="show-areas">Show custom color schema</Label>
      </div>
    </div>
  );
}

export default MatrixHeatMapDiagramm;
