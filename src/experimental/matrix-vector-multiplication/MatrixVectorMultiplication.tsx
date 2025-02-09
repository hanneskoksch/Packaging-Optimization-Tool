import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Matrix from "./Matrix";
import { MoveRight } from "lucide-react";
import VectorProgression from "./VectorProgression";
import { useState } from "react";
import { calculateVectorProgression } from "./calculations";
import MatrixHeatMapDiagramm from "./MatrixHeatMapDiagramm";
import { MatrixBuilder } from "@/utils/matrix-builder";
import { Button } from "@/components/ui/button";
import { bignumber, BigNumber } from "mathjs";
import StartingVector from "./StartingVector";
import ProgressionLineChart from "./ProgressionLineChart";

interface IProps {
  matrix: MatrixBuilder | null;
}

export interface ITraceCalculationHoverData {
  variableIndex: number | null;
  vectorIndex: number | null;
}

function MatrixVectorMultiplication({ matrix }: IProps) {
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

  const initialVariableNames = ["V1", "V2", "V3"];

  const [dataImported, setDataImported] = useState(false);
  const [variableIds, setVariableIds] = useState<string[] | number[]>(
    initialVariableNames,
  );
  const [variableNames, setVariableNames] = useState(initialVariableNames);

  const [roundsToCalculate, setRoundsToCalculate] = useState<number>(5);

  const [calculatedVectors, setCalculatedVectors] = useState<
    BigNumber[][] | null
  >(null);

  const [traceCalculationHoverData, setTraceCalculationHoverData] =
    useState<ITraceCalculationHoverData>({
      variableIndex: null,
      vectorIndex: null,
    });

  const onStartCalculation = (newVector: BigNumber[]) => {
    const newVectors = calculateVectorProgression(
      newVector,
      sampleMatrix,
      roundsToCalculate,
    );
    setCalculatedVectors(newVectors);
  };

  const onIncreaseVariable = (index: number) => {
    const newVector = [...initialVector];
    newVector[index] = newVector[index].plus(0.1);
    setInitialVector(newVector);
    onStartCalculation(newVector);
  };

  const onDecreaseVariable = (index: number) => {
    const newVector = [...initialVector];
    newVector[index] = newVector[index].minus(0.1);
    setInitialVector(newVector);
    onStartCalculation(newVector);
  };

  return (
    <div className="m-10 flex space-x-16 items-center">
      <div className="flex space-x-8 items-top">
        <div className="space-y-4">
          <Matrix
            matrix={sampleMatrix}
            traceCalculationHoverData={traceCalculationHoverData}
            variableIds={
              dataImported
                ? matrix!
                    .getVariables()
                    .map((variable) => `${variable.variable} (${variable.id})`)
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
              setVariableIds(
                matrix!.getVariables().map((variable) => variable.id),
              );
              setVariableNames(
                matrix!.getVariables().map((variable) => variable.variable),
              );
              setSampleMatrix(matrix!.getBigNumberMatrixValuesOnly());
              setInitialVector(matrix!.getVariables().map(() => bignumber(0)));
            }}
          >
            Use matrix from step 3
          </Button>
        </div>
        <StartingVector
          name="V (Values)"
          variables={variableIds}
          values={initialVector}
          onIncreaseVariable={onIncreaseVariable}
          onDecreaseVariable={onDecreaseVariable}
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
                matrix={sampleMatrix}
                vectors={calculatedVectors}
                variables={variableIds}
                onHoverCallback={({
                  variableIndex,
                  vectorIndex,
                }: ITraceCalculationHoverData) => {
                  setTraceCalculationHoverData({
                    variableIndex,
                    vectorIndex,
                  });
                }}
                traceCalculationHoverData={traceCalculationHoverData}
              />
              <MatrixHeatMapDiagramm
                vectors={calculatedVectors}
                variables={variableIds}
              />
              <ProgressionLineChart
                vectors={calculatedVectors}
                variables={variableNames}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MatrixVectorMultiplication;
