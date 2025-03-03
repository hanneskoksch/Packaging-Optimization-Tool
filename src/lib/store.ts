import { create } from "zustand";
import { ApplicationState } from "./state";

export const useStore = create<ApplicationState>()((set) => ({
  roundsToCalculate: 5,
  setRoundsToCalculate: (newRoundsToCalculate) =>
    set(() => ({ roundsToCalculate: newRoundsToCalculate })),
}));
