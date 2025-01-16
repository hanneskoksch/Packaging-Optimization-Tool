import { BigNumber } from "mathjs";
import Vector from "./Vector";

interface IProps {
  vectors: BigNumber[][];
  variables: string[] | number[];
}

function VectorProgression({ vectors, variables }: IProps) {
  return (
    <div className="flex space-x-1 items-top">
      {vectors.map((vector, index) => (
        <Vector
          key={index}
          name={`V${index}`}
          variables={variables}
          values={vector}
        />
      ))}
    </div>
  );
}

export default VectorProgression;
