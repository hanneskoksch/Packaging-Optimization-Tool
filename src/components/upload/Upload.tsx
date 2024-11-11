import { useEffect } from "react";
import { usePapaParse } from "react-papaparse";

interface UploadProps {
  setVariables: (data: string[][]) => void;
  setInteractions: (data: string[][]) => void;
}

export default function Upload({ setVariables, setInteractions }: UploadProps) {
  const { readString } = usePapaParse();

  useEffect(() => {
    const handleReadString = async (
      fileName: string,
      callback: (data: string[][]) => void,
    ) => {
      const csvData = await fetch(fileName);
      const csvString = await csvData.text();

      readString(csvString, {
        worker: true,
        complete: (results) => {
          console.log("---------------------------");
          console.log(results.data);
          console.log("---------------------------");
          callback(results.data as string[][]);
        },
      });
    };
    handleReadString("/Variablen.csv", setVariables);
    handleReadString("/Wechselwirkungen.csv", setInteractions);
  }, [readString, setInteractions, setVariables]);

  if (!setVariables || !setInteractions) {
    return <div>Loading</div>;
  }

  return <div>CSV files loaded</div>;
}
