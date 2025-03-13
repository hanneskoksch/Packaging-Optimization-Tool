import Matrix from "@/experimental/matrix-vector-multiplication/Matrix";
import { bignumber, BigNumber, inv, matrix, multiply } from "mathjs";
import EditableVector from "./EditableVector";
import { multiplyVectorMatrix } from "../matrix-vector-multiplication/calculations";
import Determinant from "../Determinant";
import { Button } from "@/components/ui/button";
import { MatrixBuilder } from "@/utils/matrix-builder";
import { useExperimentalPageStore } from "@/states/experimental-page-store";

interface IProps {
  importMatrix: MatrixBuilder | null;
}

function InverseMatrix({ importMatrix }: IProps) {
  const { sampleMatrix, setSampleMatrix } = useExperimentalPageStore();

  const { sampleVectorInverse, setSampleVectorInverse } =
    useExperimentalPageStore();

  const { variableNames, onImportMatrix } = useExperimentalPageStore();

  const inversedMatrixValues = inv(
    matrix(sampleMatrix),
  ).toArray() as BigNumber[][];

  const resultVector = (
    multiply(sampleVectorInverse, inversedMatrixValues) as BigNumber[]
  ).map((value) => bignumber(value.toFixed(10)));

  return (
    <div>
      <p className="text-sm">
        Trying out an approach that uses an{" "}
        <a href="https://en.wikipedia.org/wiki/Invertible_matrix">
          inverted matrix
        </a>{" "}
        to calculate the input vector (result) by providing the desired outcome
        vector (goal).
        <br />
        The goal then can be calculated with the original matrix in a single
        step (Rounds to calculate = 1).
      </p>
      <div className="m-10 flex space-x-16 items-top">
        <Matrix
          matrix={sampleMatrix}
          variableIds={variableNames}
          name="Start matrix"
          onMatrixChange={setSampleMatrix}
        />
        <div className="space-y-4">
          <Matrix
            matrix={inversedMatrixValues}
            variableIds={variableNames}
            name="Inverted matrix"
          />
          <Determinant matrix={sampleMatrix} />
        </div>

        <EditableVector
          name="Vector (goal)"
          variables={variableNames}
          values={sampleVectorInverse}
          onVectorChange={setSampleVectorInverse}
        />

        <EditableVector
          name="Vector (result)"
          variables={variableNames}
          values={resultVector}
        />

        <EditableVector
          name="Vector (actual)"
          variables={variableNames}
          values={
            multiplyVectorMatrix(resultVector, sampleMatrix) as BigNumber[]
          }
        />
      </div>
      <Button
        variant="outline"
        disabled={importMatrix === null}
        onClick={() => onImportMatrix(importMatrix!)}
      >
        Use matrix from step 3
      </Button>
    </div>
  );
}

export default InverseMatrix;
