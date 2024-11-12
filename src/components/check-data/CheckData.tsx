import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICsvInteraction, ICsvVariable } from "@/types/csv-types";

interface IProps {
  variables: ICsvVariable[];
  interactions: ICsvInteraction[];
}

function CheckData({ variables, interactions }: IProps) {
  return (
    <Tabs defaultValue="variables">
      <TabsList className="grid w-[300px] grid-cols-2">
        <TabsTrigger value="variables">Variables</TabsTrigger>
        <TabsTrigger value="interactions">Interactions</TabsTrigger>
      </TabsList>
      <TabsContent value="variables">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sustainability</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Id</TableHead>
              <TableHead>Variable</TableHead>
              <TableHead>Variable Source</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Description Source</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Packaged Product</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variables.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{row.sustainability.join("/")}</TableCell>
                <TableCell className="italic">{row.category}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.variable}</TableCell>
                <TableCell>
                  <ul className="list-disc">
                    {row.variableSource.map((source, index) => (
                      <li key={index}>{source}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.descriptionSource}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.packagedProduct}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value="interactions">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Variable Id</TableHead>
              <TableHead>Variable</TableHead>
              <TableHead>Impact Variable Id</TableHead>
              <TableHead>Impact Variable</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Value Self Defined</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interactions.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{row.variableId}</TableCell>
                <TableCell>{row.variable}</TableCell>
                <TableCell>{row.impactVariableId}</TableCell>
                <TableCell>{row.impactVariable}</TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell>{row.valueSelfDefined}</TableCell>
                <TableCell>{row.source}</TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  );
}

export default CheckData;
