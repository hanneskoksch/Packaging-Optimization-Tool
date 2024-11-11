import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import Upload from "./components/upload/Upload";
import CheckData from "./components/check-data/CheckData";

export function App() {
  const [variables, setVariables] = useState<null | string[][]>();
  const [interactions, setInteractions] = useState<null | string[][]>();

  return (
    <div className="m-4">
      <Tabs defaultValue="upload">
        <TabsList className="grid grid-cols-3 w-[600px]">
          <TabsTrigger value="upload">1. Upload CSV</TabsTrigger>
          <TabsTrigger value="check">2. Check data</TabsTrigger>
          <TabsTrigger value="matrix">3. Matrix</TabsTrigger>
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
        <TabsContent value="matrix">Matrix Component</TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
