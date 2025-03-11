import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICsvInteraction, ICsvVariable } from "@/types/csv-types";
import { MatrixBuilder } from "@/utils/matrix-builder";
import { useMemo, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface IProps {
  variables: ICsvVariable[];
  interactions: ICsvInteraction[];
}

function MatrixTable({ variables, interactions }: IProps) {
  const [showColors, setShowColors] = useState(false);

  const matrix = useMemo(
    () => new MatrixBuilder(variables, interactions).getMatrixWithIdsAndSums(),
    [variables, interactions],
  );

  const getTailwindColor = (value: number | null | undefined) => {
    value = Number(value);
    if (value === null || value === undefined) {
      return;
    } else if (value === 1) {
      return "bg-red-100";
    } else if (value === 2) {
      return "bg-red-200";
    } else if (value === 3) {
      return "bg-red-300";
    } else if (value === -1) {
      return "bg-green-100";
    } else if (value === -2) {
      return "bg-green-200";
    } else if (value === -3) {
      return "bg-green-300";
    }
  };

  return (
    <div>
      <Table className="text-xs mb-5 max-w-screen-lg">
        <TableHeader>
          <TableRow>
            <TableHead colSpan={5} />
            {variables.map((variable, index) => (
              <TableHead
                key={index}
                className="h-48 whitespace-nowrap align-bottom"
              >
                <div className="origin-bottom-left -rotate-[45deg] translate-x-[36px] w-[30px]">
                  <span className="border-b border-solid p-1">
                    {variable.variable}
                  </span>
                </div>
              </TableHead>
            ))}
            <TableHead className="h-48 whitespace-nowrap align-bottom font-bold">
              <div className="origin-bottom-left -rotate-[45deg] translate-x-[36px] w-[30px]">
                <span className="border-b border-solid p-1">Aktivsumme</span>
              </div>
            </TableHead>
            <TableHead className="h-48 whitespace-nowrap align-bottom font-bold">
              <div className="origin-bottom-left -rotate-[45deg] translate-x-[36px] w-[30px]">
                <span className="border-b border-solid p-1">Product</span>
              </div>
            </TableHead>
          </TableRow>

          <TableRow>
            <TableHead className="h-7 border">Sustainability</TableHead>
            <TableHead className="h-7 border">Category</TableHead>
            <TableHead className="h-7 border">Variable</TableHead>
            <TableHead className="h-7 border">Sources</TableHead>
            <TableHead className="h-7 border">ID</TableHead>
            {matrix[0].slice(1).map((matrixEntry, index) => {
              if (index === matrix[0].slice(1).length - 1) {
                return <TableHead key={index} className="h-7 border" />;
              } else {
                return (
                  <TableHead key={index} className="h-7 border text-center">
                    {matrixEntry?.value.toString()}
                  </TableHead>
                );
              }
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {variables.map((variable, index) => (
            <TableRow key={index}>
              <TableCell className="border py-1 whitespace-nowrap">
                {variable.sustainability}
              </TableCell>
              <TableCell className="border py-1 whitespace-nowrap">
                {variable.category}
              </TableCell>
              <TableCell className="border py-1 whitespace-nowrap">
                {variable.variable}
              </TableCell>
              <TableCell className="border py-1 whitespace-nowrap">
                {variable.variableSource.join(", ")}
              </TableCell>
              {matrix[index + 1].map((matrixEntry, index) => (
                <TableCell
                  key={index}
                  className={`border py-1  text-center ${showColors && index > 0 && index < matrix.length - 1 && getTailwindColor(matrixEntry?.value)}`}
                >
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <div>{matrixEntry?.value.toString()}</div>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      {matrixEntry?.source && (
                        <div className="text-xs">
                          <span className="font-bold">Source:</span>{" "}
                          {matrixEntry.source}
                        </div>
                      )}
                    </HoverCardContent>
                  </HoverCard>
                </TableCell>
              ))}
            </TableRow>
          ))}
          {/* Extra row for the passive sum of the variables */}
          <TableRow className="border-none">
            <TableCell
              className="text-right font-bold border-red-300 border-none"
              colSpan={5}
            >
              Passivsumme
            </TableCell>
            {matrix[matrix.length - 2]
              .slice(1, -2)
              .map((matrixEntry, index) => (
                <TableCell
                  key={index}
                  className="border border-t-2 border-t-black py-1 text-center"
                >
                  {matrixEntry?.value.toString()}
                </TableCell>
              ))}
          </TableRow>
          {/* Extra row for the quotient (active sum / passive sum) of the variables */}
          <TableRow className="border-none">
            <TableCell className="text-right font-bold" colSpan={5}>
              Q*100
            </TableCell>
            {matrix[matrix.length - 1]
              .slice(1, -2)
              .map((matrixEntry, index) => (
                <TableCell key={index} className="border py-1 text-center">
                  {matrixEntry?.value.toFixed().toString()}
                </TableCell>
              ))}
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex items-center space-x-2 mt-5">
        <Switch
          id="show-matrix-colors"
          onCheckedChange={() => setShowColors(!showColors)}
        />
        <Label htmlFor="show-matrix-colors">Show colors</Label>
      </div>
    </div>
  );
}

export default MatrixTable;
