import { expect, test } from "vitest";
import { MatrixBuilder } from "./matrix-builder";
import { ICsvInteraction, ICsvVariable } from "@/types/csv-types";
import { bignumber } from "mathjs";

const testVariables: ICsvVariable[] = [
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

const testInteractions: ICsvInteraction[] = [
  {
    variableId: 45,
    variable: "Use of recycled materials",
    impactVariableId: 69,
    impactVariable: "Recyclability",
    value: "",
    valueSelfDefined: -1,
    source: "Test source",
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

test("MatrixBuilder - Get matrix", () => {
  const matrixBuilder = new MatrixBuilder(testVariables, testInteractions);
  const fullMatrix = matrixBuilder.getMatrix();

  expect(fullMatrix).toStrictEqual([
    [bignumber(1), bignumber(-1), bignumber(2)],
    [bignumber(1), bignumber(1), bignumber(0)],
    [bignumber(0), bignumber(0), bignumber(1)],
  ]);
});

test("MatrixBuilder - Get matrix with sources", () => {
  const matrixBuilder = new MatrixBuilder(testVariables, testInteractions);
  const fullMatrix = matrixBuilder.getMatrixWithSources();

  expect(fullMatrix).toStrictEqual([
    [{ value: 1 }, { value: -1, source: "Test source" }, { value: 2 }],
    [{ value: 1 }, { value: 1 }, null],
    [null, null, { value: 1 }],
  ]);
});

test("MatrixBuilder - Get active sums", () => {
  const matrixBuilder = new MatrixBuilder(testVariables, testInteractions);
  const sums = matrixBuilder.getActiveSums();

  expect(sums).toStrictEqual([3, 1, 0]);
});

test("MatrixBuilder - Get passive sums", () => {
  const matrixBuilder = new MatrixBuilder(testVariables, testInteractions);
  const sums = matrixBuilder.getPassiveSums();

  expect(sums).toStrictEqual([1, 1, 2]);
});

test("MatrixBuilder - Get variable ids", () => {
  const matrixBuilder = new MatrixBuilder(testVariables, testInteractions);
  const ids = matrixBuilder.getVariableIds();

  expect(ids).toStrictEqual([45, 69, 17]);
});

test("MatrixBuilder - Get variables", () => {
  const matrixBuilder = new MatrixBuilder(testVariables, testInteractions);
  const variables = matrixBuilder.getVariables();

  expect(variables).toStrictEqual(testVariables);
});

test("MatrixBuilder - Get variables impact", () => {
  const matrixBuilder = new MatrixBuilder(testVariables, testInteractions);
  const impacts = matrixBuilder.getVariablesImpacts();

  expect(impacts).toStrictEqual([
    { variable: testVariables[0], activeSum: 3, passiveSum: 1 },
    { variable: testVariables[1], activeSum: 1, passiveSum: 1 },
    { variable: testVariables[2], activeSum: 0, passiveSum: 2 },
  ]);
});

test("MatrixBuilder - Get product of sums", () => {
  const matrixBuilder = new MatrixBuilder(testVariables, testInteractions);
  expect(matrixBuilder.getProductOfSums()).toStrictEqual([3, 1, 0]);
});

test("MatrixBuilder - Get quotients", () => {
  const matrixBuilder = new MatrixBuilder(testVariables, testInteractions);
  expect(matrixBuilder.getQuotients()).toStrictEqual([300, 100, 0]);
});

test("MatrixBuilder - Handles zero division in quotients", () => {
  const zeroDivisionInteractions: ICsvInteraction[] = [
    {
      variableId: 45,
      variable: "Use of recycled materials",
      impactVariableId: 69,
      impactVariable: "Recyclability",
      value: "",
      valueSelfDefined: 0,
      source: "",
      description: "",
    },
    {
      variableId: 45,
      variable: "Use of recycled materials",
      impactVariableId: 17,
      impactVariable: "Consumer perceptions",
      value: "",
      valueSelfDefined: 0,
      source: "",
      description: "",
    },
    {
      variableId: 69,
      variable: "Recyclability",
      impactVariableId: 45,
      impactVariable: "Use of recycled materials",
      value: "",
      valueSelfDefined: 0,
      source: "",
      description: "",
    },
  ];
  const matrixBuilderZeroDivision = new MatrixBuilder(
    testVariables,
    zeroDivisionInteractions,
  );
  const quotients = matrixBuilderZeroDivision.getQuotients();

  expect(quotients).toStrictEqual([0, 0, 0]);
});
