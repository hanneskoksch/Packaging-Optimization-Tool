import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { bignumber, BigNumber } from "mathjs";
import { useEffect, useState } from "react";

interface IProps {
  name?: string;
  variables: string[] | number[];
  values: BigNumber[];
  onVectorChange?: (updatedVector: BigNumber[]) => void;
}

/// Variables show as first column and values as second column
function EditableVector({ name, variables, values, onVectorChange }: IProps) {
  const [editableVector, setEditableVector] =
    useState<(string | BigNumber)[]>(values);

  useEffect(() => {
    setEditableVector(values);
  }, [values]);

  const [editMode, setEditMode] = useState(false);

  const handleSave = () => {
    // Wenn der Edit-Modus beendet wird, parse die Werte
    const parsedVector = editableVector.map((value) => {
      // Ersetze Komma mit Punkt und parse als Zahl
      const valueWithDot = value.toString().replace(",", ".");
      return isNaN(parseFloat(valueWithDot))
        ? bignumber(0)
        : bignumber(parseFloat(valueWithDot));
    });

    setEditableVector(parsedVector);
    onVectorChange?.(parsedVector); // Falls eine externe Matrixänderung gewünscht ist
  };

  const handleValueChange = (index: number, newValue: string) => {
    // Einfach den neuen Wert im State als String speichern (für Edit Mode)
    const updatedVector = [...editableVector];
    updatedVector[index] = newValue;
    setEditableVector(updatedVector);
  };

  return (
    <div>
      <Table className="border table-auto text-center">
        <TableCaption>{name}</TableCaption>
        <TableBody>
          {variables.map((variable, index) => (
            <TableRow key={index}>
              <TableCell className="border font-bold">{variable}</TableCell>

              <TableCell className={`border`}>
                {editMode ? (
                  <input
                    type="text"
                    value={editableVector[index]?.toString()}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    className="w-20 text-center border-none outline-none"
                    pattern="^[0-9]*[.,]?[0-9]+$" // Akzeptiert Zahlen mit Punkt oder Komma
                    inputMode="decimal"
                  />
                ) : (
                  <div className="truncate w-20">
                    {editableVector[index]?.toString()}
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {onVectorChange ? (
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
      ) : null}
    </div>
  );
}

export default EditableVector;
