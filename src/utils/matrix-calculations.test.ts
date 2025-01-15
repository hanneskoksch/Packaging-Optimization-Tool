import { expect, test } from "vitest";
import { getVariablesImpacts, MatrixBuilder } from "./matrix-calculations";
import { ICsvInteraction, ICsvVariable } from "@/types/csv-types";

// Test data
const variables: ICsvVariable[] = [
  {
    sustainability: ["Ecologic"],
    category: "Packaging material",
    id: 45,
    variable: "Use of recycled materials",
    variableSource: [],
    description: "",
    descriptionSource: "",
    country: "",
    packagedProduct: "",
  },
  {
    sustainability: ["Ecologic"],
    category: "End of life",
    id: 69,
    variable: "Recyclability",
    variableSource: [],
    description: "",
    descriptionSource: "",
    country: "",
    packagedProduct: "",
  },
  {
    sustainability: ["Social"],
    category: "Consumer–packaging interaction",
    id: 17,
    variable: "Consumer perceptions",
    variableSource: [],
    description: "",
    descriptionSource: "",
    country: "",
    packagedProduct: "",
  },
];

const interactions: ICsvInteraction[] = [
  {
    variableId: 45,
    variable: "Use of recycled materials",
    impactVariableId: 69,
    impactVariable: "Recyclability",
    value: "",
    valueSelfDefined: -1,
    source: "",
    description: "",
  },
  {
    variableId: 45,
    variable: "Use of recycled materials",
    impactVariableId: 17,
    impactVariable: "Consumer perceptions",
    value: "",
    valueSelfDefined: 2,
    source: "",
    description: "",
  },
  {
    variableId: 69,
    variable: "Recyclability",
    impactVariableId: 45,
    impactVariable: "Use of recycled materials",
    value: "",
    valueSelfDefined: 1,
    source: "",
    description: "",
  },
];

// Test für Matrix-Erstellung
test("MatrixBuilder - Matrix mit IDs und Summen", () => {
  const matrixBuilder = new MatrixBuilder(variables, interactions);
  const fullMatrix = matrixBuilder.getMatrixWithIdsAndSums();

  expect(fullMatrix).toStrictEqual([
    [null, { value: 45 }, { value: 69 }, { value: 17 }, null],
    [
      { value: 45 },
      null,
      { source: "", value: -1 },
      { source: "", value: 2 },
      { value: 3 },
    ],
    [{ value: 69 }, { source: "", value: 1 }, null, null, { value: 1 }],
    [{ value: 17 }, null, null, null, { value: 0 }],
    [null, { value: 1 }, { value: 1 }, { value: 2 }, null],
  ]);
});

test("MatrixBuilder - Nur Werte der Matrix", () => {
  const matrixBuilder = new MatrixBuilder(variables, interactions);
  const matrixValuesOnly = matrixBuilder.getMatrixValuesOnly();

  expect(matrixValuesOnly).toStrictEqual([
    [0, -1, 2],
    [1, 0, 0],
    [0, 0, 0],
  ]);
});

// Test für Active und Passive Summen
test("MatrixBuilder - Berechnung von Active und Passive Summen", () => {
  const impacts = getVariablesImpacts(variables, interactions);

  expect(impacts).toStrictEqual([
    { variable: variables[0], activeSum: 3, passiveSum: 1 },
    { variable: variables[1], activeSum: 1, passiveSum: 1 },
    { variable: variables[2], activeSum: 0, passiveSum: 2 },
  ]);
});
