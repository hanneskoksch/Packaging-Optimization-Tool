import { expect, test } from "vitest";
import { rowDataToInteractions, rowDataToVariables } from "./csv-parser";
import { ICsvInteraction, ICsvVariable } from "@/types/csv-types";

const csvTestRowsVariables = [
  [
    "Sustainability",
    "Category",
    "ID Variable",
    "Variable",
    "Variable source",
    "Variable source",
    "Variable source",
    "Variable source",
    "Description",
    "Description source",
    "Country",
    "Packaged product",
  ],
  [
    "Ecologic",
    "Packaging material",
    "45",
    "Use of recycled materials",
    "(Liu et al. 2023)",
    "(Lopez-Aguilar et al. 2022)",
    "",
    "",
    "Beschreibt den Einsatz von Rezyklat, z.B. recycelter Faserstoff oder Kunststoff",
    "(eigene Beschreibung)",
    "none",
    "none",
  ],
];

const csvTestRowInteraction = [
  [
    "From ID Variable",
    "From Variable",
    "To ID Variable",
    "To Variable",
    "Value",
    "Value (Höhe selbst definiert)",
    "Source ",
    "Erklärung",
  ],
  [
    "45",
    "Use of recycled materials",
    "16",
    "Protective performance",
    "-",
    "-1",
    "(Liu et al. 2023)",
    "Der Einsatz von Rezyklat (recycleter Faserstoff od…aher könnte es die Schutzfunktion verschlechtern.",
  ],
];

const expectedVariable: ICsvVariable[] = [
  {
    sustainability: ["Ecologic"],
    category: "Packaging material",
    id: 45,
    variable: "Use of recycled materials",
    variableSource: ["Liu et al. 2023", "Lopez-Aguilar et al. 2022"],
    description:
      "Beschreibt den Einsatz von Rezyklat, z.B. recycelter Faserstoff oder Kunststoff",
    descriptionSource: "(eigene Beschreibung)",
    country: "none",
    packagedProduct: "none",
  },
];

const expectedInteraction: ICsvInteraction[] = [
  {
    variableId: 45,
    variable: "Use of recycled materials",
    impactVariableId: 16,
    impactVariable: "Protective performance",
    value: "-",
    valueSelfDefined: -1,
    source: "(Liu et al. 2023)",
    description:
      "Der Einsatz von Rezyklat (recycleter Faserstoff od…aher könnte es die Schutzfunktion verschlechtern.",
  },
];

test("CSV Parser - Variables with empty row at the end", () => {
  const result = rowDataToVariables([...csvTestRowsVariables, [""]]);
  expect(result).toEqual(expectedVariable);
});

test("CSV Parser - Variables", () => {
  const result = rowDataToVariables(csvTestRowsVariables);
  expect(result).toEqual(expectedVariable);
});

test("CSV Parser - Interactions with empty row at the end", () => {
  const result = rowDataToInteractions([...csvTestRowInteraction, [""]]);
  expect(result).toEqual(expectedInteraction);
});

test("CSV Parser - Interactions", () => {
  const result = rowDataToInteractions(csvTestRowInteraction);
  expect(result).toEqual(expectedInteraction);
});
