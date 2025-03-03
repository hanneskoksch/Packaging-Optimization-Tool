import { create } from "zustand";
import { ExperimentalState } from "./state";
import { bignumber } from "mathjs";

export const useStore = create<ExperimentalState>()((set) => ({
  roundsToCalculate: 5,
  setRoundsToCalculate: (newRoundsToCalculate) =>
    set(() => ({ roundsToCalculate: newRoundsToCalculate })),
  matrixDataImported: false,
  setMatrixDataImported: (imported) =>
    set(() => ({ matrixDataImported: imported })),
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
  variableNames: ["V1", "V2", "V3"],
  setVariableNames: (newVariableNames) =>
    set(() => ({ variableNames: newVariableNames })),
  variableIds: ["V1", "V2", "V3"],
  setVariableIds: (newVariableIds) =>
    set(() => ({ variableIds: newVariableIds })),
}));
