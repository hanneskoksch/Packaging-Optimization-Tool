import { BigNumber, det } from "mathjs";
import { Badge } from "@/components/ui/badge";

interface IProps {
  matrix: BigNumber[][];
}

function Determinant({ matrix }: IProps) {
  // Calculate the determinant
  const determinant = det(matrix);

  // if is zero or near zero
  if (determinant !== 0 && Math.abs(determinant) > 1e-10) {
    // Matrix is invertible
    return (
      <div>
        <Badge variant="outline">
          Matrix is invertible. Determinant: {determinant.toString()}
        </Badge>
      </div>
    );
  } else {
    // Matrix is not invertible
    return (
      <div>
        <Badge variant="destructive">
          Matrix is not invertible. Determinant: {determinant.toString()}
        </Badge>
      </div>
    );
  }
}

export default Determinant;
