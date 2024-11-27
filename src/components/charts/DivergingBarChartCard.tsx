import { IVariablesImpact } from "@/utils/matrix-calculations";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import DivergingBarChart from "./DivergingBarChart";

interface IProps {
  variablesImpacts: IVariablesImpact[];
}

function DivergingBarChartCard({ variablesImpacts }: IProps) {
  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Diverging bar chart</CardTitle>
      </CardHeader>
      <CardContent>
        <DivergingBarChart
          variables={variablesImpacts.map((x) => x.variable)}
          activeSums={variablesImpacts?.map((x) => x.activeSum) ?? []}
          passiveSums={variablesImpacts?.map((x) => x.passiveSum) ?? []}
        />
      </CardContent>
    </Card>
  );
}

export default DivergingBarChartCard;
