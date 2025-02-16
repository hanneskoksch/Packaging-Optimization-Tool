import { useState } from "react";
import Matrix from "../matrix-vector-multiplication/Matrix";
import { bignumber, BigNumber } from "mathjs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { calculateVectorProgression } from "../matrix-vector-multiplication/calculations";
import ProgressionLineChart from "../matrix-vector-multiplication/ProgressionLineChart";

function BruteForceCalculations() {
  const [sampleMatrix, setSampleMatrix] = useState<BigNumber[][]>([
    [bignumber(1), bignumber(0.2), bignumber(0.3)],
    [bignumber(0.1), bignumber(1), bignumber(0.2)],
    [bignumber(0.3), bignumber(-0.1), bignumber(1)],
  ]);
  const variableNames = ["V1", "V2", "V3"];

  const [roundsToCalculate, setRoundsToCalculate] = useState<number>(5);

  // generate all possible combinations of input vectors
  const values = [bignumber(0), bignumber(-0.1), bignumber(0.1)];
  const combinations: BigNumber[][] = [];
  for (const a of values) {
    for (const b of values) {
      for (const c of values) {
        combinations.push([a, b, c]);
      }
    }
  }

  // calculate all possible results
  const results = combinations.map((combination) =>
    calculateVectorProgression(combination, sampleMatrix, roundsToCalculate),
  );

  return (
    <div>
      <p className="text-sm">
        Trying out an approach that uses brute force calculations. Every
        possible input vector with the number elements of{" "}
        <code>[-0.1, 0, 0.1]</code> is used to calculate n rounds to compare all
        results against the desired outcome vector and other requirements.
      </p>
      <div className="m-10 flex space-x-16 items-top">
        <Matrix
          matrix={sampleMatrix}
          variableIds={variableNames}
          name="Start matrix"
          onMatrixChange={setSampleMatrix}
        />
        <div className="w-full max-w-sm space-y-2">
          <Label htmlFor="rounds">Rounds to calculate</Label>
          <Input
            type="number"
            id="rounds"
            placeholder="Rounds"
            value={roundsToCalculate}
            className="w-20"
            onChange={(e) => setRoundsToCalculate(parseInt(e.target.value))}
          />
        </div>
      </div>
      {results.map((result, index) => (
        <div key={index} className="mb-10">
          <p>
            <strong>Input vector:</strong> {combinations[index].join(", ")}
          </p>
          <div className="flex space-x-4">
            {result.map((vector, round) => (
              <div key={round}>
                <p>
                  <strong>Round {round}:</strong>
                </p>
                <p>{vector.map((num) => num.toFixed(2)).join(", ")}</p>
              </div>
            ))}
          </div>
          <ProgressionLineChart
            vectors={result}
            variables={variableNames}
            maintainAspectRatio={false}
          />
        </div>
      ))}
    </div>
  );
}

export default BruteForceCalculations;
