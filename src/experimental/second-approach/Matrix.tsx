import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { useState } from "react";

type IMatrix = number[][];

interface IProps {
  originalMatrix?: IMatrix;
  matrix: IMatrix;
  variables: string[];
  name?: string;
  onVariableSelected?: (variableIndex: number) => void;
  onMatrixChange?: (updatedMatrix: IMatrix) => void;
}

function Matrix({
  matrix,
  variables,
  name,
  onVariableSelected,
  onMatrixChange,
}: IProps) {
  const [editableMatrix, setEditableMatrix] =
    useState<(string | number)[][]>(matrix);
  const [editMode, setEditMode] = useState(false);

  const handleValueChange = (
    rowIndex: number,
    colIndex: number,
    newValue: string,
  ) => {
    // Einfach den neuen Wert im State als String speichern (für Edit Mode)
    const updatedMatrix = [...editableMatrix];
    updatedMatrix[rowIndex][colIndex] = newValue;
    setEditableMatrix(updatedMatrix);
  };

  const handleSave = () => {
    // Wenn der Edit-Modus beendet wird, parse die Werte
    const parsedMatrix = editableMatrix.map((row) =>
      row.map((value) => {
        // Ersetze Komma mit Punkt und parse als Zahl
        const valueWithDot = value.toString().replace(",", ".");
        return isNaN(parseFloat(valueWithDot)) ? 0 : parseFloat(valueWithDot);
      }),
    );
    setEditableMatrix(parsedMatrix);
    onMatrixChange?.(parsedMatrix); // Falls eine externe Matrixänderung gewünscht ist
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
          {editableMatrix.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {onVariableSelected && (
                <TableCell className="w-10 h-10 border">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-4 w-4 shrink-0 rounded-full"
                    onClick={() => onVariableSelected?.(rowIndex)}
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
                <TableCell className="w-10 h-10 border" key={colIndex}>
                  {rowIndex === colIndex ? (
                    <div className="font-bold">{value}</div>
                  ) : editMode ? (
                    <input
                      type="text"
                      value={value.toString()}
                      onChange={(e) =>
                        handleValueChange(rowIndex, colIndex, e.target.value)
                      }
                      className="w-full text-center border-none outline-none"
                      pattern="^[0-9]*[.,]?[0-9]+$" // Akzeptiert Zahlen mit Punkt oder Komma
                      inputMode="decimal"
                    />
                  ) : (
                    <div>{value}</div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center space-x-2 mt-5">
        <Switch
          id="edit-mode-switch"
          checked={editMode}
          onCheckedChange={() => {
            setEditMode(!editMode);
            if (editMode) {
              // Beim Verlassen des Edit-Modus, werte parsen
              handleSave();
            }
          }}
        />
        <Label htmlFor="edit-mode-switch">
          {editMode ? "Deactivate to save changes" : "Activate edit mode"}
        </Label>
      </div>
    </div>
  );
}

export default Matrix;
