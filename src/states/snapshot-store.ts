import { create } from "zustand";
import { ExperimentalState } from "./experimental-page-store";

interface Snapshot {
  id: number;
  state: ExperimentalState;
  date: Date;
}

interface SnapshotState {
  isExpanded: boolean;
  toggleExpand: () => void;
  snapshots: Snapshot[];
  addSnapshot: (state: ExperimentalState) => void;
}

export const useSnapshotStore = create<SnapshotState>((set) => ({
  isExpanded: false,

  toggleExpand: () =>
    set((prev) => ({
      isExpanded: !prev.isExpanded,
    })),
  snapshots: [],

  addSnapshot: (state) =>
    set((prev) => ({
      snapshots: [
        ...prev.snapshots,
        { id: prev.snapshots.length + 1, state, date: new Date() },
      ],
    })),
}));
