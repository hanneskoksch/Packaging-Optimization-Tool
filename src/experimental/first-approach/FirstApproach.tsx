import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp, MoveRight } from "lucide-react";
import { useState } from "react";
import { calculateNewMatrix, IMatrix } from "./calculations";
import Matrix from "./Matrix";

function FirstApproach() {
  const sampleMatrix: IMatrix = [
    [null, 2, 3],
    [0, null, 2],
    [3, -1, null],
  ];

  const [newMatrix, setnewMatrix] = useState<IMatrix | null>(null);

  const onVariableSelected = (variableIndex: number) => {
    setnewMatrix(calculateNewMatrix(sampleMatrix, variableIndex));
  };

  const valueInterpretations = [
    [-3, 0.7],
    [-2, 0.8],
    [-1, 0.9],
    [0, 1],
    [1, 1.1],
    [2, 1.2],
    [3, 1.3],
  ];

  return (
    <div className="m-10 flex space-x-16 items-center">
      <Matrix
        matrix={sampleMatrix}
        variables={["V1", "V2", "V3"]}
        name="Ursprüngliche Matrix"
        onVariableSelected={onVariableSelected}
      />

      {newMatrix && (
        <>
          <div className="place-items-center text-gray-500">
            <MoveRight />
            <div className="flex items-center space-x-2">
              <p className="text-sm">Multiplikation mit Impact als 10%</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CircleHelp className="h-5 w-5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    {valueInterpretations.map(([value, interpretation]) => (
                      <div className="flex items-center" key={value}>
                        {value}
                        <MoveRight className="mx-3" />
                        {interpretation}
                      </div>
                    ))}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <Matrix
            originalMatrix={sampleMatrix}
            matrix={newMatrix}
            variables={["V1", "V2", "V3"]}
            name="Neue Matrix"
          />
        </>
      )}
    </div>
  );
}

export default FirstApproach;
