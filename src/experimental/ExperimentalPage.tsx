import SecondApproach from "./second-approach/SecondApproach";
import { MatrixBuilder } from "@/utils/matrix-calculations";

interface IProps {
  matrix: MatrixBuilder | null;
}

function ExperimentalPage({ matrix }: IProps) {
  return (
    <div className="m-10 p-10">
      <h2 className="font-semibold">Second approach</h2>
      <SecondApproach matrix={matrix} />
    </div>
  );
}

export default ExperimentalPage;
