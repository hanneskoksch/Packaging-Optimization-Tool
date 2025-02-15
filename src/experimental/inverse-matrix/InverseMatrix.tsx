import Matrix from "@/experimental/matrix-vector-multiplication/Matrix";
import { bignumber, BigNumber, inv, matrix, multiply } from "mathjs";
import { useState } from "react";
import EditableVector from "./EditableVector";
import { multiplyVectorMatrix } from "../matrix-vector-multiplication/calculations";

function InverseMatrix() {
  const [sampleMatrix, setSampleMatrix] = useState<BigNumber[][]>([
    [bignumber(1), bignumber(0.2), bignumber(0.3)],
    [bignumber(0.1), bignumber(1), bignumber(0.2)],
    [bignumber(0.3), bignumber(-0.1), bignumber(1)],
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sampleMatrixNotInvertible = [
    [bignumber(1), bignumber(2), bignumber(3)],
    [bignumber(2), bignumber(4), bignumber(6)],
    [bignumber(3), bignumber(6), bignumber(9)],
  ];

  const [vector, setVector] = useState([
    bignumber(0.03),
    bignumber(-0.01),
    bignumber(0.1),
  ]);

  const variableNames = ["V1", "V2", "V3"];

  const inversedMatrixValues = inv(
    matrix(sampleMatrix),
  ).toArray() as BigNumber[][];
  const resultVector = (
    multiply(vector, inversedMatrixValues) as BigNumber[]
  ).map((value) => bignumber(value.toFixed(10)));

  return (
    <div className="m-10 flex space-x-16 items-top">
      <Matrix
        matrix={sampleMatrix}
        variableIds={variableNames}
        name="Start matrix"
        onMatrixChange={setSampleMatrix}
      />
      <Matrix
        matrix={inversedMatrixValues}
        variableIds={variableNames}
        name="Inverted matrix"
        onMatrixChange={() => {}}
      />

      <EditableVector
        name="Vector (goal)"
        variables={variableNames}
        values={vector}
        onVectorChange={setVector}
      />

      <EditableVector
        name="Vector (result)"
        variables={variableNames}
        values={resultVector}
      />

      <EditableVector
        name="Vector (actual)"
        variables={variableNames}
        values={multiplyVectorMatrix(resultVector, sampleMatrix) as BigNumber[]}
      />
    </div>
  );
}

export default InverseMatrix;
