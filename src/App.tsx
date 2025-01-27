import { FlaskConical } from "lucide-react";
import { useMemo, useState } from "react";
import DivergingBarChartCard from "./components/charts/DivergingBarChartCard";
import ScatterChartCard from "./components/charts/ScatterChartCard";
import CheckData from "./components/check-data/CheckData";
import MatrixTable from "./components/matrix/MatrixTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import Upload from "./components/upload/Upload";
import ExperimentalPage from "./experimental/ExperimentalPage";
import { ICsvInteraction, ICsvVariable } from "./types/csv-types";
import {
  getVariablesImpacts,
  MatrixBuilder,
} from "./utils/matrix-builder";

export function App() {
  const [variables, setVariables] = useState<null | ICsvVariable[]>(null);
  const [interactions, setInteractions] = useState<null | ICsvInteraction[]>(
    null,
  );

  const matrix = useMemo(
    () =>
      variables !== null && interactions !== null
        ? new MatrixBuilder(variables, interactions)
        : null,
    [variables, interactions],
  );

  const variablesImpacts = useMemo(() => {
    if (!variables || !interactions) return;
    return getVariablesImpacts(variables, interactions);
  }, [variables, interactions]);

  return (
    <div className="m-4">
      <Tabs defaultValue="experimental">
        <TabsList className="grid grid-cols-5 w-[800px]">
          <TabsTrigger value="upload">1. Upload CSV</TabsTrigger>
          <TabsTrigger value="check">2. Check data</TabsTrigger>
          <TabsTrigger value="matrix">3. Matrix</TabsTrigger>
          <TabsTrigger value="diagrams">4. Diagrams</TabsTrigger>
          <TabsTrigger value="experimental">
            <div className="space-x-2 flex items-center">
              <p>5. Experimental</p>
              <FlaskConical size={15} />
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upload" asChild>
          <Upload
            setVariables={setVariables}
            setInteractions={setInteractions}
          />
        </TabsContent>
        <TabsContent value="check" asChild>
          {variables && interactions ? (
            <CheckData variables={variables} interactions={interactions} />
          ) : (
            <div>Upload a CSV file first.</div>
          )}
        </TabsContent>
        <TabsContent value="matrix" asChild>
          {variables && interactions ? (
            <MatrixTable variables={variables} interactions={interactions} />
          ) : (
            <div>Upload a CSV file first.</div>
          )}
        </TabsContent>
        <TabsContent value="diagrams" asChild>
          {variablesImpacts ? (
            <div className="flex space-x-3 mt-8">
              <DivergingBarChartCard variablesImpacts={variablesImpacts} />
              <ScatterChartCard variablesImpacts={variablesImpacts} />
            </div>
          ) : (
            <div>Upload a CSV file first.</div>
          )}
        </TabsContent>
        <TabsContent value="experimental" asChild>
          <ExperimentalPage matrix={matrix} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
