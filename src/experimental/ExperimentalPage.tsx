import { Separator } from "@/components/ui/separator";
import InverseMatrix from "./inverse-matrix/InverseMatrix";
import SecondApproach from "./matrix-vector-multiplication/MatrixVectorMultiplication";
import { MatrixBuilder } from "@/utils/matrix-builder";

interface IProps {
  matrix: MatrixBuilder | null;
}

function ExperimentalPage({ matrix }: IProps) {
  return (
    <div className="mt-10">
      <h2 className="font-semibold">Matrix multiplication over n rounds</h2>
      <SecondApproach matrix={matrix} />
      <Separator className="my-10" />
      <h2 className="font-semibold">Inverse matrix</h2>
      <InverseMatrix />
    </div>
  );
}

export default ExperimentalPage;
