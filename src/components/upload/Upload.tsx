/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICsvInteraction, ICsvVariable } from "@/types/csv-types";
import { rowDataToInteractions, rowDataToVariables } from "@/utils/csv-parser";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { useCSVReader } from "react-papaparse";
import { Button } from "../ui/button";

interface IProps {
  setVariables: (data: ICsvVariable[]) => void;
  setInteractions: (data: ICsvInteraction[]) => void;
}

export default function CSVUpload({ setVariables, setInteractions }: IProps) {
  const { CSVReader } = useCSVReader();

  const [zoneHoverVariables, setZoneHoverVariables] = useState(false);
  const [zoneHoverInteractions, setZoneHoverInteractions] = useState(false);

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-semibold">Upload CSV Files</h1>

      {/* Variables Dropzone */}
      <div>
        <h2 className="text-lg font-medium">Variables CSV</h2>
        <CSVReader
          onUploadAccepted={(results: any) => {
            setVariables(rowDataToVariables(results.data));
            setZoneHoverVariables(false);
          }}
          onDragOver={(event: DragEvent) => {
            event.preventDefault();
            setZoneHoverVariables(true);
          }}
          onDragLeave={(event: DragEvent) => {
            event.preventDefault();
            setZoneHoverVariables(false);
          }}
        >
          {({
            getRootProps,
            acceptedFile,
            ProgressBar,
            getRemoveFileProps,
            // Remove,
          }: any) => (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                zoneHoverVariables
                  ? "border-gray-500 bg-gray-100"
                  : "border-gray-300"
              }`}
            >
              {acceptedFile ? (
                <>
                  <div className="flex items-center space-x-3 justify-center">
                    <p className="text-sm font-medium">{acceptedFile.name}</p>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      {...getRemoveFileProps()}
                    >
                      <X />
                    </Button>
                  </div>
                  <div className="w-full mt-2">
                    <ProgressBar />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center space-y-3">
                  <Upload size={32} className="text-gray-500" />
                  <p>
                    Drag & drop your Variables CSV file here, or click to
                    upload.
                  </p>
                </div>
              )}
            </div>
          )}
        </CSVReader>
      </div>

      {/* Interactions Dropzone */}
      <div>
        <h2 className="text-lg font-medium">Interactions CSV</h2>
        <CSVReader
          onUploadAccepted={(results: any) => {
            setInteractions(rowDataToInteractions(results.data));
            setZoneHoverInteractions(false);
          }}
          onDragOver={(event: DragEvent) => {
            event.preventDefault();
            setZoneHoverInteractions(true);
          }}
          onDragLeave={(event: DragEvent) => {
            event.preventDefault();
            setZoneHoverInteractions(false);
          }}
        >
          {({
            getRootProps,
            acceptedFile,
            ProgressBar,
            getRemoveFileProps,
          }: any) => (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                zoneHoverInteractions
                  ? "border-gray-500 bg-gray-100"
                  : "border-gray-300"
              }`}
            >
              {acceptedFile ? (
                <>
                  <div className="flex items-center space-x-3 justify-center">
                    <p className="text-sm font-medium">{acceptedFile.name}</p>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      {...getRemoveFileProps()}
                    >
                      <X />
                    </Button>
                  </div>
                  <div className="w-full mt-2">
                    <ProgressBar />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center space-y-3">
                  <Upload size={32} className="text-gray-500" />
                  <p>
                    Drag & drop your Interactions CSV file here, or click to
                    upload.
                  </p>
                </div>
              )}
            </div>
          )}
        </CSVReader>
      </div>
    </div>
  );
}
