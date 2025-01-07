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
import { getTailwindBgClass } from "./matrix-colors";

interface IProps {
  originalMatrix?: IMatrix;
  matrix: IMatrix;
  variables: string[];
  name?: string;
  onVariableSelected?: (variableIndex: number) => void;
}

function Matrix({
  originalMatrix,
  matrix,
  variables,
  name,
  onVariableSelected,
}: IProps) {
  const roundIfDouble = (value: number | null) => {
    if (value === null) return value;
    // Überprüfen, ob es sich um eine Ganzzahl handelt
    if (Number.isInteger(value)) {
      return value;
    }
    // Runde auf zwei Nachkommastellen
    return Number(value.toFixed(2));
  };

  const getColor = ([rowIndex, colIndex]: [number, number]) => {
    if (originalMatrix === undefined) return "";
    const originalValue = originalMatrix[rowIndex][colIndex];
    const newValue = matrix[rowIndex][colIndex];
    if (originalValue === null || newValue === null) return "";

    const scaledNewValue = Math.round(newValue * 100);
    const scaledOriginalValue = Math.round(originalValue * 100);
    const difference = (scaledNewValue - scaledOriginalValue) / 100;

    console.log(difference, getTailwindBgClass(difference));
    return getTailwindBgClass(difference);
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
                  className={`w-10 h-10 border ${value === null ? "bg-gray-200" : getColor([rowIndex, colIndex])}`}
                  key={colIndex}
                >
                  <div className="[text-shadow:-1px_-1px_0_#fff,_1px_-1px_0_#fff,_-1px_1px_0_#fff,_1px_1px_0_#fff]">
                    {roundIfDouble(value)}
                  </div>
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
