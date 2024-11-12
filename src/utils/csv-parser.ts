import { ICsvInteraction, ICsvVariable } from "@/types/csv-types";

// disable eslint for unknown csv data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rowDataToVariables = (rows: any[]): ICsvVariable[] => {
  // remove the header row
  rows.shift();
  return rows.map((row) => ({
    sustainability: (row[0] as string)
      .split("/")
      // let all strings start with uppercase
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1)),
    category: row[1] as string,
    id: row[2] as number,
    variable: row[3] as string,
    variableSource: [row[4], row[5], row[6], row[7]]
      // only use rows if they are not empty
      .filter((s) => s)
      // remove all "(" and ")" from the strings
      .map((s) => s.replace(/[()]/g, "")) as string[],
    description: row[8] as string,
    descriptionSource: row[9] as string,
    country: row[10] as string,
    packagedProduct: row[11] as string,
  }));
};

// disable eslint for unknown csv data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rowDataToInteractions = (rows: any[]): ICsvInteraction[] => {
  // remove the header row
  rows.shift();
  return rows.map((row) => ({
    variableId: row[0] as number,
    variable: row[1] as string,
    impactVariableId: row[2] as number,
    impactVariable: row[3] as string,
    value: row[4] as string,
    valueSelfDefined: row[5] as number,
    source: row[6] as string,
    description: row[7] as string,
  }));
};

export { rowDataToInteractions, rowDataToVariables };
