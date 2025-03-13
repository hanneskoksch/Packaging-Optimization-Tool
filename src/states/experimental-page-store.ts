import { BigNumber } from "mathjs";
import { create } from "zustand";
import { bignumber } from "mathjs";

export interface ExperimentalState {
  roundsToCalculate: number;
  setRoundsToCalculate: (newRoundsToCalculate: number) => void;
  sampleMatrix: BigNumber[][];
  setSampleMatrix: (newSampleMatrix: BigNumber[][]) => void;
  initialSampleVector: BigNumber[];
  sampleVector: BigNumber[];
  setSampleVector: (newSampleVector: BigNumber[]) => void;
  sampleVectorInverse: BigNumber[];
  setSampleVectorInverse: (newSampleVector: BigNumber[]) => void;
  sampleVectorInverse5x5: BigNumber[];
  setSampleVectorInverse5x5: (newSampleVector: BigNumber[]) => void;
  variableNames: string[];
  setVariableNames: (newVariableNames: string[]) => void;
  variableIds: string[] | number[];
  setVariableIds: (newVariableIds: string[] | number[]) => void;
}

export const useExperimentalPageStore = create<ExperimentalState>()((set) => ({
  roundsToCalculate: 5,
  setRoundsToCalculate: (newRoundsToCalculate) =>
    set(() => ({ roundsToCalculate: newRoundsToCalculate })),
  sampleMatrix: [
    [bignumber(1), bignumber(0.2), bignumber(0.3)],
    [bignumber(0.1), bignumber(1), bignumber(0.2)],
    [bignumber(0.3), bignumber(-0.1), bignumber(1)],
  ],
  setSampleMatrix: (newSampleMatrix) =>
    set(() => ({ sampleMatrix: newSampleMatrix })),
  initialSampleVector: [bignumber(0), bignumber(0), bignumber(0)],
  sampleVector: [bignumber(0), bignumber(0), bignumber(0)],
  setSampleVector: (newSampleVector) =>
    set(() => ({ sampleVector: newSampleVector })),
  sampleVectorInverse: [bignumber(0), bignumber(0), bignumber(0)],
  setSampleVectorInverse: (newSampleVectorInverse) =>
    set(() => ({ sampleVectorInverse: newSampleVectorInverse })),
  sampleVectorInverse5x5: [bignumber(0), bignumber(0), bignumber(0)],
  setSampleVectorInverse5x5: (newSampleVectorInverse5x5) =>
    set(() => ({ sampleVectorInverse5x5: newSampleVectorInverse5x5 })),
  variableNames: ["V1", "V2", "V3"],
  setVariableNames: (newVariableNames) =>
    set(() => ({ variableNames: newVariableNames })),
  variableIds: ["V1", "V2", "V3"],
  setVariableIds: (newVariableIds) =>
    set(() => ({ variableIds: newVariableIds })),
}));
