import { Input } from "@/components/ui/input";
import Vector from "./Vector";
import { Label } from "@/components/ui/label";
import Matrix from "./Matrix";
import { MoveRight } from "lucide-react";
import VectorProgression from "./VectorProgression";
import { useState } from "react";
import { multiplyVectorMatrix } from "./calculations";
import MatrixHeatMapDiagramm from "./MatrixHeatMapDiagramm";
import { MatrixBuilder } from "@/utils/matrix-calculations";
import { Button } from "@/components/ui/button";
import { bignumber, BigNumber } from "mathjs";

interface IProps {
  matrix: MatrixBuilder | null;
}

function SecondApproach({ matrix }: IProps) {
  const [sampleMatrix, setSampleMatrix] = useState<BigNumber[][]>([
    [bignumber(1), bignumber(0.2), bignumber(0.3)],
    [bignumber(0.1), bignumber(1), bignumber(0.2)],
    [bignumber(0.3), bignumber(-0.1), bignumber(1)],
  ]);

  const initialVectorReset: BigNumber[] = [
    bignumber(0),
    bignumber(0),
    bignumber(0),
  ];
  const [initialVector, setInitialVector] = useState(initialVectorReset);

  const variableNames = ["V1", "V2", "V3"];

  const [dataImported, setDataImported] = useState(false);

  const [roundsToCalculate, setRoundsToCalculate] = useState<number>(5);

  const [calculatedVectors, setCalculatedVectors] = useState<
    BigNumber[][] | null
  >(null);

  const calculateVectors = (index: number, value: number) => {
    const newVector = [...initialVector];
    newVector[index] = newVector[index].plus(value);
    setInitialVector(newVector);

    const newVectors = [newVector];
    for (let i = 0; i < roundsToCalculate; i++) {
      const latestVector = newVectors[newVectors.length - 1];
      const newVector = multiplyVectorMatrix(latestVector, sampleMatrix);
      newVectors.push(newVector);
    }
    setCalculatedVectors(newVectors);
  };

  return (
    <div className="m-10 flex space-x-16 items-center">
      <div className="flex space-x-8 items-top">
        <div className="space-y-4">
          <Matrix
            matrix={sampleMatrix}
            variableIds={
              dataImported
                ? matrix!.getVariables().map((variable) => variable.id)
                : variableNames
            }
            name="M (Effects)"
            onMatrixChange={setSampleMatrix}
          />
          <Button
            variant="outline"
            disabled={matrix === null}
            onClick={() => {
              setDataImported(true);
              setSampleMatrix(matrix!.getMatrixValuesOnly());
              setInitialVector(matrix!.getVariables().map(() => bignumber(0)));
            }}
          >
            Use matrix from step 3
          </Button>
        </div>
        <Vector
          name="V (Values)"
          variables={
            dataImported
              ? matrix!.getVariables().map((variable) => variable.id)
              : variableNames
          }
          values={initialVector}
          onVariableSelected={calculateVectors}
        />
        <div className="w-full max-w-sm space-y-2">
          <Label htmlFor="rounds">Rounds to calculate</Label>
          <Input
            type="number"
            id="rounds"
            placeholder="Rounds"
            value={roundsToCalculate}
            onChange={(e) => setRoundsToCalculate(parseInt(e.target.value))}
          />
        </div>

        {calculatedVectors !== null && (
          <>
            <MoveRight className="size-28" />
            <div className="space-y-8">
              <VectorProgression
                vectors={calculatedVectors}
                variables={
                  dataImported
                    ? matrix!.getVariables().map((variable) => variable.id)
                    : variableNames
                }
              />
              <MatrixHeatMapDiagramm
                vectors={calculatedVectors}
                variables={
                  dataImported
                    ? matrix!.getVariables().map((variable) => variable.id)
                    : variableNames
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SecondApproach;
