import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

interface IProps {
  name?: string;
  variables: string[];
  values: number[];
  onVariableSelected?: (variableIndex: number) => void;
}

/// Variables show as first column and values as second column
function Vector({ name, variables, values, onVariableSelected }: IProps) {
  return (
    <div>
      <Table className="max-w-10 border table-fixed text-center">
        <TableCaption>{name}</TableCaption>
        <TableBody>
          {variables.map((variable, index) => (
            <TableRow key={index}>
              <TableCell className="w-10 h-10 border font-bold">
                {variable}
              </TableCell>
              <TableCell className="w-10 h-10 border">
                {values[index]}
              </TableCell>
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
                      onVariableSelected(index);
                    }}
                  >
                    <Plus />
                    <span className="sr-only">Increase</span>
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Vector;
