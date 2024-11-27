import { useMemo, useState } from "react";
import DivergingBarChartCard from "./components/charts/DivergingBarChartCard";
import ScatterChartCard from "./components/charts/ScatterChartCard";
import CheckData from "./components/check-data/CheckData";
import MatrixTable from "./components/matrix/MatrixTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import Upload from "./components/upload/Upload";
import { ICsvInteraction, ICsvVariable } from "./types/csv-types";
import { getVariablesImpacts } from "./utils/matrix-calculations";

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
          <TabsTrigger value="diagrams">4. Diagrams</TabsTrigger>
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
        <TabsContent value="diagrams">
          {variablesImpacts ? (
            <div className="flex space-x-3 mt-8">
              <DivergingBarChartCard variablesImpacts={variablesImpacts} />
              <ScatterChartCard variablesImpacts={variablesImpacts} />
            </div>
          ) : (
            <div>Upload a CSV file first.</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
