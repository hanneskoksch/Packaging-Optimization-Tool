import { Input } from "@/components/ui/input";
import Vector from "./Vector";
import { Label } from "@/components/ui/label";
import Matrix from "./Matrix";
import { MoveRight } from "lucide-react";
import VectorProgression from "./VectorProgression";
import { useState } from "react";
import { multiplyVectorMatrix } from "./calculations";
import MatrixHeatMapDiagramm from "./MatrixHeatMapDiagramm";

function SecondApproach() {
  const sampleMatrix: number[][] = [
    [1, 0.2, 0.3],
    [0.1, 1, 0.2],
    [0.3, -0.1, 1],
  ];

  const initialVectorReset: number[] = [0, 0, 0];
  const [initialVector, setInitialVector] = useState(initialVectorReset);

  const variableNames = ["V1", "V2", "V3"];

  const [roundsToCalculate, setRoundsToCalculate] = useState<number>(0);

  const [calculatedVectors, setCalculatedVectors] = useState<number[][] | null>(
    null,
  );

  const calculateVectors = () => {
    const newVectors = [initialVector];
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
        <Matrix
          matrix={sampleMatrix}
          variables={variableNames}
          name="M (Effects)"
        />
        <Vector
          name="V (Values)"
          variables={variableNames}
          values={initialVector}
          onVariableSelected={(index: number) => {
            // set initial vector at index to 0.1
            const newVector = [...initialVectorReset];
            newVector[index] = 0.1;
            setInitialVector(newVector);
            calculateVectors();
          }}
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

        <MoveRight className="size-16" />
        {calculatedVectors !== null && (
          <div>
            <VectorProgression vectors={calculatedVectors} />
            <MatrixHeatMapDiagramm
              vectors={calculatedVectors}
              variables={variableNames}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SecondApproach;
