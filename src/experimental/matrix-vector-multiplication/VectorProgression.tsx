import { BigNumber } from "mathjs";
import Vector from "./Vector";
import { ITraceCalculationHoverData } from "./MatrixVectorMultiplication";

interface IProps {
  vectors: BigNumber[][];
  matrix: BigNumber[][];
  variables: string[] | number[];
  traceCalculationHoverData: ITraceCalculationHoverData;
  onHoverCallback?: ({
    variableIndex,
    vectorIndex,
  }: ITraceCalculationHoverData) => void;
}

function VectorProgression({
  vectors,
  matrix,
  variables,
  traceCalculationHoverData,
  onHoverCallback,
}: IProps) {
  return (
    <div className="flex space-x-1 items-top mr-5">
      {vectors.map((vector, index) => (
        <Vector
          key={index}
          highlighted={index + 1 === traceCalculationHoverData?.vectorIndex}
          name={`V${index}`}
          variables={variables}
          values={vector}
          lastVectorValues={vectors[index - 1]}
          matrix={matrix}
          onHoverCallback={
            onHoverCallback &&
            ((variableIndex) =>
              onHoverCallback({
                variableIndex: variableIndex,
                vectorIndex: variableIndex !== null ? index : null,
              }))
          }
        />
      ))}
    </div>
  );
}

export default VectorProgression;
