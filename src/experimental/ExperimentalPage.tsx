import { Separator } from "@/components/ui/separator";
import InverseMatrix from "./inverse-matrix/InverseMatrix";
import MatrixVectorMultiplication from "./matrix-vector-multiplication/MatrixVectorMultiplication";
import { MatrixBuilder } from "@/utils/matrix-builder";
import BruteForceCalculations from "./brute-force-calculations/BruteForceCalculations";
import InverseMatrix5x5 from "./inverse-matrix-5x5/InverseMatrix";
import SnapshotManager from "./snapshot-manager/SnapshotManager";

interface IProps {
  matrix: MatrixBuilder | null;
}

function ExperimentalPage({ matrix }: IProps) {
  return (
    <div className="mt-10">
      <h2 className="font-semibold">Matrix multiplication over n rounds</h2>
      <MatrixVectorMultiplication matrix={matrix} />
      <Separator className="my-10" />
      <h2 className="font-semibold">Inverse matrix</h2>
      <InverseMatrix importMatrix={matrix} />
      <Separator className="my-10" />
      <h2 className="font-semibold">Inverse matrix 5x5</h2>
      <InverseMatrix5x5 />
      <Separator className="my-10" />
      <h2 className="font-semibold">
        Brute force calculations (work in progress 🚧)
      </h2>
      <BruteForceCalculations />
      <SnapshotManager />
    </div>
  );
}

export default ExperimentalPage;
