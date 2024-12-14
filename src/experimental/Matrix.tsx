import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { IMatrix } from "./calculations";

interface IProps {
  matrix: IMatrix;
  variables: string[];
  name?: string;
  onVariableSelected?: (variableIndex: number) => void;
}

function Matrix({ matrix, variables, name, onVariableSelected }: IProps) {
  const roundIfDouble = (value: number | null) => {
    if (value === null) return value;
    // Überprüfen, ob es sich um eine Ganzzahl handelt
    if (Number.isInteger(value)) {
      return value;
    }
    // Runde auf zwei Nachkommastellen
    return Number(value.toFixed(2));
  };

  return (
    <div>
      <Table className="max-w-10 border table-fixed text-center">
        <TableCaption>{name}</TableCaption>
        <TableBody>
          <TableRow>
            {onVariableSelected && <TableCell className="w-10 h-10 border" />}
            <TableCell className="w-10 h-10 border" />
            {variables.map((variable, index) => (
              <TableCell key={index} className="w-10 h-10 border font-bold">
                {variable}
              </TableCell>
            ))}
          </TableRow>
          {matrix.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {onVariableSelected && (
                <TableCell className="w-10 h-10 border">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-4 w-4 shrink-0 rounded-full"
                    onClick={() => {
                      if (
                        onVariableSelected === null ||
                        onVariableSelected === undefined
                      )
                        return;
                      onVariableSelected(rowIndex);
                    }}
                  >
                    <Plus />
                    <span className="sr-only">Increase</span>
                  </Button>
                </TableCell>
              )}
              <TableCell className="w-10 h-10 border font-bold">
                {variables[rowIndex]}
              </TableCell>
              {row.map((value, colIndex) => (
                <TableCell
                  className={`w-10 h-10 border ${value === null && "bg-gray-200"}`}
                  key={colIndex}
                >
                  {roundIfDouble(value)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Matrix;
