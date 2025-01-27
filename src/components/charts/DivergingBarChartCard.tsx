import { IVariablesImpact } from "@/utils/matrix-builder";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import DivergingBarChart from "./DivergingBarChart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hourglass, Minus, Plus, Rocket, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface IProps {
  variablesImpacts: IVariablesImpact[];
}

function DivergingBarChartCard({ variablesImpacts }: IProps) {
  const [activeTab, setActiveTab] = useState<
    "all" | "rocket" | "hourglass" | "lightning"
  >("all");

  const [barChartHighlightThreshhold, setBarChartHighlightThreshhold] =
    useState(5);

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Diverging bar chart</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="account"
          className="w-[400px]"
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "all" | "rocket" | "hourglass" | "lightning")
          }
        >
          <div className="flex items-center space-x-4 mb-4">
            <TabsList>
              <TabsTrigger value="all">
                <p>Show all</p>
              </TabsTrigger>
              <TabsTrigger value="rocket" className="space-x-2">
                <p>Show</p>
                <Rocket size={16} />
              </TabsTrigger>
              <TabsTrigger value="hourglass" className="space-x-2">
                <p>Show</p>
                <Hourglass size={16} />
              </TabsTrigger>
              <TabsTrigger value="lightning" className="space-x-2">
                <p>Show</p>
                <Zap size={16} />
              </TabsTrigger>
            </TabsList>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <div className={`flex ${activeTab === "all" && "invisible"}`}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() =>
                      setBarChartHighlightThreshhold(
                        barChartHighlightThreshhold - 1,
                      )
                    }
                    disabled={barChartHighlightThreshhold <= 1}
                  >
                    <Minus />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-xl font-bold tracking-tighter">
                      {"> "}
                      {barChartHighlightThreshhold}
                    </div>
                    <div className="text-[0.70rem] uppercase text-muted-foreground">
                      Threshold
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() =>
                      setBarChartHighlightThreshhold(
                        barChartHighlightThreshhold + 1,
                      )
                    }
                    disabled={barChartHighlightThreshhold >= 400}
                  >
                    <Plus />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
        <DivergingBarChart
          variables={variablesImpacts.map((x) => x.variable)}
          activeSums={variablesImpacts?.map((x) => x.activeSum) ?? []}
          passiveSums={variablesImpacts?.map((x) => x.passiveSum) ?? []}
          showData={activeTab}
          highlightThreshold={barChartHighlightThreshhold}
        />
      </CardContent>
    </Card>
  );
}

export default DivergingBarChartCard;
