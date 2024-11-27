import { useMemo, useState } from "react";
import CheckData from "./components/check-data/CheckData";
import DivergingBarChart from "./components/charts/DivergingBarChart";
import MatrixTable from "./components/matrix/MatrixTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import Upload from "./components/upload/Upload";
import { ICsvInteraction, ICsvVariable } from "./types/csv-types";
import { getVariablesImpacts } from "./utils/matrix-calculations";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

export function App() {
  const [variables, setVariables] = useState<null | ICsvVariable[]>(null);
  const [interactions, setInteractions] = useState<null | ICsvInteraction[]>(
    null,
  );

  const variablesImpacts = useMemo(() => {
    if (!variables || !interactions) return;
    return getVariablesImpacts(variables, interactions);
  }, [variables, interactions]);

  return (
    <div className="m-4">
      <Tabs defaultValue="upload">
        <TabsList className="grid grid-cols-4 w-[600px]">
          <TabsTrigger value="upload">1. Upload CSV</TabsTrigger>
          <TabsTrigger value="check">2. Check data</TabsTrigger>
          <TabsTrigger value="matrix">3. Matrix</TabsTrigger>
          <TabsTrigger value="diagram">4. Diagram</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <Upload
            setVariables={setVariables}
            setInteractions={setInteractions}
          />
        </TabsContent>
        <TabsContent value="check">
          {variables && interactions ? (
            <CheckData variables={variables} interactions={interactions} />
          ) : (
            <div>Upload a CSV file first.</div>
          )}
        </TabsContent>
        <TabsContent value="matrix">
          {variables && interactions ? (
            <MatrixTable variables={variables} interactions={interactions} />
          ) : (
            <div>Upload a CSV file first.</div>
          )}
        </TabsContent>
        <TabsContent value="diagram">
          {variablesImpacts ? (
            <Card className="w-[800px] mt-8">
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
          ) : (
            <div>Upload a CSV file first.</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
