import Vector from "./Vector";

interface IProps {
  vectors: number[][];
}

function VectorProgression({ vectors }: IProps) {
  return (
    <div className="flex space-x-8 items-top">
      {vectors.map((vector, index) => (
        <Vector
          key={index}
          name={`V${index}`}
          variables={["V1", "V2", "V3"]}
          values={vector}
        />
      ))}
    </div>
  );
}

export default VectorProgression;
