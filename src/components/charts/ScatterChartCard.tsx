import { Switch } from "@/components/ui/switch";
import { IVariablesImpact } from "@/utils/matrix-calculations";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import ScatterChart from "./ScatterChart";

interface IProps {
  variablesImpacts: IVariablesImpact[];
}

function ScatterChartCard({ variablesImpacts }: IProps) {
  const [showImpactAreas, setshowImpactAreas] = useState(false);

  return (
    <Card className="size-fit">
      <CardHeader>
        <CardTitle>Scatter chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4 ">
          <Switch
            id="show-areas"
            onCheckedChange={() => setshowImpactAreas(!showImpactAreas)}
          />
          <Label htmlFor="show-areas">Show impact areas</Label>
        </div>
        <ScatterChart
          variablesImpacts={variablesImpacts}
          showImpactAreas={showImpactAreas}
        />
      </CardContent>
    </Card>
  );
}

export default ScatterChartCard;
