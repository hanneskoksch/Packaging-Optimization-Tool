import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
  lastVectorValues?: BigNumber[];
  highlighted?: boolean;
  matrix?: BigNumber[][];
  onVariableSelected?: (variableIndex: number, value: number) => void;
  onHoverCallback?: (variableIndex: number | null) => void;
}

/// Variables show as first column and values as second column
function Vector({
  name,
  variables,
  values,
  lastVectorValues,
  highlighted,
  matrix,
  onVariableSelected,
  onHoverCallback,
}: IProps) {
  const matrixColumn = (index: number) => matrix?.map((row) => row[index]);

  return (
    <div>
      <Table className="border table-auto text-center">
        <TableCaption>{name}</TableCaption>
        <TableBody>
          {variables.map((variable, index) => (
            <TableRow key={index}>
              <TableCell className="border font-bold p-0">
                <div className="p-2">{variable}</div>
              </TableCell>
              <TableCell
                className={`border ${highlighted && "bg-yellow-200"} hover:bg-green-200 p-0`}
              >
                <HoverCard
                  openDelay={10} // open new hove card slightly delayed after closing the previous one without delay
                  closeDelay={0}
                  onOpenChange={
                    onHoverCallback &&
                    ((variableIndex) =>
                      onHoverCallback(variableIndex ? index : null))
                  }
                >
                  <HoverCardTrigger asChild>
                    <div className="p-2">{values[index].toString()}</div>
                  </HoverCardTrigger>
                  <HoverCardContent asChild sideOffset={50}>
                    {lastVectorValues && matrix && (
                      <div className="inline">
                        {lastVectorValues.map((value, i) => (
                          <div key={i} className="inline">
                            <p className="inline p-1 rounded-md bg-yellow-200">
                              {value.toString()}
                            </p>
                            <p className="inline p-1 rounded-md">*</p>
                            <p className="inline p-1 rounded-md bg-blue-200">
                              {matrixColumn(index)![i]?.toString()}
                            </p>
                            {i < lastVectorValues.length - 1 && (
                              <p className="inline p-1">+</p>
                            )}
                          </div>
                        ))}
                        <p className="inline p-1 rounded-md">=</p>
                        <p className="inline p-1 rounded-md bg-green-200">
                          <b>{values[index].toString()}</b>
                        </p>
                      </div>
                    )}
                  </HoverCardContent>
                </HoverCard>
              </TableCell>

              {onVariableSelected && (
                <>
                  <TableCell className="border">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-4 w-4 shrink-0 rounded-full"
                      onClick={() => {
                        if (!onVariableSelected) return;
                        onVariableSelected(index, -0.1);
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
                        if (!onVariableSelected) return;
                        onVariableSelected(index, 0.1);
                      }}
                    >
                      <Plus />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Vector;
