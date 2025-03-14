import { create } from "zustand";
import { ExperimentalState } from "./experimental-page-store";

interface Snapshot {
  id: number;
  state: ExperimentalState;
  name: string;
  date: Date;
}

interface SnapshotState {
  isExpanded: boolean;
  toggleExpand: () => void;
  snapshots: Snapshot[];
  addSnapshot: (state: ExperimentalState) => void;
  updateSnapshotName: (id: number, name: string) => void;
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
        {
          id: prev.snapshots.length + 1,
          name: `Snapshot ${prev.snapshots.length + 1}`,
          state,
          date: new Date(),
        },
      ],
    })),

  updateSnapshotName: (id, name) =>
    set((prev) => ({
      snapshots: prev.snapshots.map((snapshot) =>
        snapshot.id === id ? { ...snapshot, name } : snapshot,
      ),
    })),
}));
