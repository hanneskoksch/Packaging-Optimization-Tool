import { bignumber } from "mathjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const reviveMathBigNumbers = (obj: any): any => {
  if (typeof obj === "object" && obj !== null) {
    if (obj.mathjs === "BigNumber" && obj.value !== undefined) {
      return bignumber(obj.value);
    }
    return Array.isArray(obj)
      ? obj.map(reviveMathBigNumbers)
      : Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            reviveMathBigNumbers(value),
          ]),
        );
  }
  return obj;
};
