import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Matrix from "./Matrix";
import { MoveRight } from "lucide-react";
import VectorProgression from "./VectorProgression";
import { useCallback, useEffect, useState } from "react";
import { calculateVectorProgression } from "./calculations";
import MatrixHeatMapDiagramm from "./MatrixHeatMapDiagramm";
import { MatrixBuilder } from "@/utils/matrix-builder";
import { Button } from "@/components/ui/button";
import { BigNumber, equal } from "mathjs";
import StartingVector from "./StartingVector";
import ProgressionLineChart from "./ProgressionLineChart";
import { useExperimentalPageStore } from "@/states/experimental-page-store";
interface IProps {
  matrix: MatrixBuilder | null;
}

export interface ITraceCalculationHoverData {
  variableIndex: number | null;
  vectorIndex: number | null;
}

function MatrixVectorMultiplication({ matrix }: IProps) {
  const { sampleMatrix, setSampleMatrix } = useExperimentalPageStore();

  const { sampleVector, setSampleVector } = useExperimentalPageStore();
  const { onImportMatrix } = useExperimentalPageStore();

  const { variableNames, variableIds } = useExperimentalPageStore();

  const { roundsToCalculate, setRoundsToCalculate } =
    useExperimentalPageStore();

  const { calculatedVectors, setCalculatedVectors } =
    useExperimentalPageStore();

  const [traceCalculationHoverData, setTraceCalculationHoverData] =
    useState<ITraceCalculationHoverData>({
      variableIndex: null,
      vectorIndex: null,
    });

  const onStartCalculation = useCallback(
    (newVector: BigNumber[]) => {
      const newVectors = calculateVectorProgression(
        newVector,
        sampleMatrix,
        roundsToCalculate,
      );
      setCalculatedVectors(newVectors);
    },
    [sampleMatrix, roundsToCalculate, setCalculatedVectors],
  );

  const onIncreaseVariable = (index: number) => {
    const newVector = [...sampleVector];
    newVector[index] = newVector[index].plus(0.1);
    setSampleVector(newVector);
    onStartCalculation(newVector);
  };

  const onDecreaseVariable = (index: number) => {
    const newVector = [...sampleVector];
    newVector[index] = newVector[index].minus(0.1);
    setSampleVector(newVector);
    onStartCalculation(newVector);
  };

  useEffect(() => {
    // Only calculate if the vector has changed (has non zero values)
    const isEqual = sampleVector.every((value) => equal(value, 0));
    if (!isEqual) {
      onStartCalculation(sampleVector);
    } else {
      setCalculatedVectors(null);
    }
  }, [onStartCalculation, sampleVector, setCalculatedVectors]);

  return (
    <div className="m-10 flex space-x-16 items-center">
      <div className="flex space-x-8 items-top">
        <div className="space-y-4">
          <Matrix
            matrix={sampleMatrix}
            traceCalculationHoverData={traceCalculationHoverData}
            variableIds={variableNames}
            name="M (Effects)"
            onMatrixChange={setSampleMatrix}
          />
          <Button
            variant="outline"
            disabled={matrix === null}
            onClick={() => onImportMatrix(matrix!)}
          >
            Use matrix from step 3
          </Button>
        </div>
        <StartingVector
          name="V (Values)"
          variables={variableIds}
          values={sampleVector}
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
