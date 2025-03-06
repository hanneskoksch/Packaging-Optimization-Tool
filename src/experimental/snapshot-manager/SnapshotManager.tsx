import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Upload, Camera, RotateCw, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { isBigNumber } from "mathjs";
import { reviveMathBigNumbers } from "./snapshot-manager-helper";
import { useSnapshotStore } from "@/states/snapshot-store";
import {
  ExperimentalState,
  useExperimentalPageStore,
} from "@/states/experimental-page-store";

// Zustand State Snapshot Manager
export default function SnapshotManager() {
  const store = useExperimentalPageStore();
  const { snapshots, addSnapshot } = useSnapshotStore();

  const { isExpanded, toggleExpand } = useSnapshotStore();

  const takeSnapshot = () => {
    addSnapshot(store);
  };

  const restoreSnapshot = (snapshot: ExperimentalState) => {
    useExperimentalPageStore.setState(snapshot);
  };

  const downloadSnapshot = (snapshot: ExperimentalState) => {
    const json = JSON.stringify(
      snapshot,
      (_, value) =>
        // Convert BigNumber to string for serialization
        isBigNumber(value)
          ? { mathjs: "BigNumber", value: value.toString() }
          : value,
      2,
    );

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `snapshot-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importSnapshot = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        let importedState = JSON.parse(e.target?.result as string);
        importedState = reviveMathBigNumbers(importedState);

        useExperimentalPageStore.setState(importedState);
        addSnapshot(importedState);
      } catch (error) {
        console.error("Error importing state:", error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 w-80 bg-white p-4 shadow-lg rounded-lg border border-gray-200"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header with Toggle Button */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <h3 className="text-lg font-semibold">Zustand Snapshots</h3>
        <motion.div
          animate={{ rotate: isExpanded ? 0 : -90 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Collapsible Content */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-xs">
          Take a snapshot of the state of the experimental page, jump back to
          it, download it, or import it.
        </p>
        {/* Snapshot Control Buttons */}
        <div className="flex gap-2 my-3">
          <Button size="sm" onClick={takeSnapshot} variant="default">
            <Camera /> Snapshot
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <Upload /> Import
          </Button>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="application/json"
            onChange={importSnapshot}
          />
        </div>

        {/* Snapshot List */}
        <div className="max-h-48 overflow-y-auto">
          {snapshots.length > 0 ? (
            snapshots.map(({ id, state, date }) => (
              <Card
                key={id}
                className="mb-2 py-0.5 px-2 flex justify-between items-center"
              >
                <CardContent className="p-1">
                  <p className="text-xs">
                    Snapshot {id} •{" "}
                    <span className="text-gray-500">
                      {date.toLocaleTimeString()}
                    </span>
                  </p>
                </CardContent>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => restoreSnapshot(state)}
                  >
                    <RotateCw className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => downloadSnapshot(state)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-xs text-gray-500">No snapshots yet.</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
