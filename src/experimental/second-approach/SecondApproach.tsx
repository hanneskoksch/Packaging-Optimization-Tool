import { Input } from "@/components/ui/input";
import Vector from "./Vector";
import { Label } from "@/components/ui/label";
import { IMatrix } from "./calculations";
import Matrix from "./Matrix";

function SecondApproach() {
  const sampleMatrix: IMatrix = [
    [null, 2, 3],
    [0, null, 2],
    [3, -1, null],
  ];

  return (
    <div className="m-10 flex space-x-16 items-center">
      <div className="flex space-x-8 items-top">
        <Matrix
          matrix={sampleMatrix}
          variables={["V1", "V2", "V3"]}
          name="M (Effects)"
        />
        <Vector
          name="V (Values)"
          variables={["V1", "V2", "V3"]}
          values={[0, 0, 0]}
          onVariableSelected={() => {}}
        />
        <div className="w-full max-w-sm space-y-2">
          <Label htmlFor="rounds">Rounds to calculate</Label>
          <Input type="number" id="rounds" placeholder="Rounds" />
        </div>
      </div>
    </div>
  );
}

export default SecondApproach;
