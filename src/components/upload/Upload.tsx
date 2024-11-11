import { ICsvInteraction, ICsvVariable } from "@/types/csv-types";
import { rowDataToInteractions, rowDataToVariables } from "@/utils/csv-parser";
import { useEffect } from "react";
import { usePapaParse } from "react-papaparse";

interface IProps {
  variables: ICsvVariable[] | null;
  setVariables: (data: ICsvVariable[]) => void;
  interactions: ICsvInteraction[] | null;
  setInteractions: (data: ICsvInteraction[]) => void;
}

export default function Upload({
  variables,
  setVariables,
  interactions,
  setInteractions,
}: IProps) {
  const { readString } = usePapaParse();

  useEffect(() => {
    const handleReadString = async (
      fileName: string,
      callback: (rows: unknown[]) => void,
    ) => {
      const csvData = await fetch(fileName);
      const csvString = await csvData.text();

      readString(csvString, {
        worker: true,
        complete: (results) => {
          // console.log("---------------------------");
          // console.log(results.data);
          // console.log("---------------------------");
          callback(results.data);
        },
      });
    };

    const parseVariables = async () => {
      const callback = (variablesRows: unknown[]) => {
        setVariables(rowDataToVariables(variablesRows));
      };
      await handleReadString("/Variablen.csv", callback);
    };

    const parseInteractions = async () => {
      const callback = (interactionsRows: unknown[]) => {
        setInteractions(rowDataToInteractions(interactionsRows));
      };
      await handleReadString("/Wechselwirkungen.csv", callback);
    };

    parseVariables();
    parseInteractions();
  }, [readString, setInteractions, setVariables]);

  if (!variables || !interactions) {
    return <div>Loading...</div>;
  }

  return <div>CSV files loaded</div>;
}
