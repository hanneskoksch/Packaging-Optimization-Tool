interface ICsvVariable {
  sustainability: string[];
  category: string;
  id: number;
  variable: string;
  variableSource: string[];
  description: string;
  descriptionSource: string;
  country: string;
  packagedProduct: string;
}

interface ICsvInteraction {
  variableId: number;
  variable: string;
  impactVariableId: number;
  impactVariable: string;
  value: string;
  valueSelfDefined: number;
  source: string;
  description: string;
}

export type { ICsvVariable, ICsvInteraction };
