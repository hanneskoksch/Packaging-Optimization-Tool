import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Minus, Plus } from "lucide-react";
import { BigNumber } from "mathjs";

interface IProps {
  name?: string;
  variables: string[] | number[];
  values: BigNumber[];
  onIncreaseVariable: (variableIndex: number) => void;
  onDecreaseVariable: (variableIndex: number) => void;
}

/// Variables show as first column and values as second column
function StartingVector({
  name,
  variables,
  values,
  onIncreaseVariable,
  onDecreaseVariable,
}: IProps) {
  return (
    <div>
      <Table className="border table-auto text-center">
        <TableCaption>{name}</TableCaption>
        <TableBody>
          {variables.map((variable, index) => (
            <TableRow key={index}>
              <TableCell className="border font-bold">{variable}</TableCell>
              <TableCell className="border">
                {values[index].toString()}
              </TableCell>

              <TableCell className="border">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-4 w-4 shrink-0 rounded-full"
                  onClick={() => {
                    onDecreaseVariable(index);
                  }}
                >
                  <Minus />
                  <span className="sr-only">Increase</span>
                </Button>
              </TableCell>
              <TableCell className="border">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-4 w-4 shrink-0 rounded-full"
                  onClick={() => {
                    onIncreaseVariable(index);
                  }}
                >
                  <Plus />
                  <span className="sr-only">Increase</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default StartingVector;
