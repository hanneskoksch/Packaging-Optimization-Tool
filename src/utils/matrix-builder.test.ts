import { expect, test } from "vitest";
import { MatrixBuilder } from "./matrix-builder";
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

test("MatrixBuilder - Only matrix values", () => {
  const matrixBuilder = new MatrixBuilder(variables, interactions);
  const matrixValuesOnly = matrixBuilder.getMatrixValuesOnly();

  expect(matrixValuesOnly).toStrictEqual([
    [1, -1, 2],
    [1, 1, 0],
    [0, 0, 1],
  ]);
});

test("MatrixBuilder - Calculation of active and passive sums", () => {
  const matrixBuilder = new MatrixBuilder(variables, interactions);
  const impacts = matrixBuilder.getVariablesImpacts();

  expect(impacts).toStrictEqual([
    { variable: variables[0], activeSum: 3, passiveSum: 1 },
    { variable: variables[1], activeSum: 1, passiveSum: 1 },
    { variable: variables[2], activeSum: 0, passiveSum: 2 },
  ]);
});

test("MatrixBuilder - Matrix with ids and sums", () => {
  const matrixBuilder = new MatrixBuilder(variables, interactions);
  const fullMatrix = matrixBuilder.getMatrix();

  expect(fullMatrix).toStrictEqual([
    [null, { value: 45 }, { value: 69 }, { value: 17 }],
    [{ value: 45 }, { value: 1 }, { value: -1 }, { value: 2 }],
    [{ value: 69 }, { value: 1 }, { value: 1 }, null],
    [{ value: 17 }, null, null, { value: 1 }],
  ]);
});
