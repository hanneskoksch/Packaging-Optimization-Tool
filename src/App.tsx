import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import Upload from "./components/Upload";

export function App() {
  return (
    <div className="m-4">
      <Tabs defaultValue="upload" className="w-[600px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">1. Upload CSV</TabsTrigger>
          <TabsTrigger value="check">2. Check data</TabsTrigger>
          <TabsTrigger value="matrix">3. Matrix</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <Upload />
        </TabsContent>
        <TabsContent value="check">Table Component</TabsContent>
        <TabsContent value="matrix">Matrix Component</TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
