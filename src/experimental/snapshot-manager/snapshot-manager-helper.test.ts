import { describe, it, expect } from "vitest";
import { bignumber } from "mathjs";
import { reviveMathBigNumbers } from "@/experimental/snapshot-manager/snapshot-manager-helper";

describe("reviveMathBigNumbers", () => {
  it("should convert a simple BigNumber object", () => {
    const input = { mathjs: "BigNumber", value: "42.5" };
    const output = reviveMathBigNumbers(input);
    expect(output).toEqual(bignumber("42.5"));
  });

  it("should convert BigNumber objects in an array", () => {
    const input = [
      { mathjs: "BigNumber", value: "10" },
      { mathjs: "BigNumber", value: "-2.34" },
    ];
    const output = reviveMathBigNumbers(input);
    expect(output).toEqual([bignumber("10"), bignumber("-2.34")]);
  });

  it("should convert nested BigNumber objects", () => {
    const input = {
      a: { mathjs: "BigNumber", value: "1" },
      b: {
        c: { mathjs: "BigNumber", value: "99.99" },
      },
    };
    const output = reviveMathBigNumbers(input);
    expect(output).toEqual({
      a: bignumber("1"),
      b: { c: bignumber("99.99") },
    });
  });

  it("should not modify normal numbers", () => {
    const input = { value: 100 };
    const output = reviveMathBigNumbers(input);
    expect(output).toEqual({ value: 100 });
  });

  it("should not modify strings", () => {
    const input = { name: "Test", number: "123" };
    const output = reviveMathBigNumbers(input);
    expect(output).toEqual({ name: "Test", number: "123" });
  });

  it("should handle deeply nested structures", () => {
    const input = {
      x: [
        { mathjs: "BigNumber", value: "3.14" },
        { y: { mathjs: "BigNumber", value: "-0.99" } },
      ],
    };
    const output = reviveMathBigNumbers(input);
    expect(output).toEqual({
      x: [bignumber("3.14"), { y: bignumber("-0.99") }],
    });
  });

  it("should return null and undefined unchanged", () => {
    expect(reviveMathBigNumbers(null)).toBeNull();
    expect(reviveMathBigNumbers(undefined)).toBeUndefined();
  });

  it("should handle empty objects and arrays", () => {
    expect(reviveMathBigNumbers({})).toEqual({});
    expect(reviveMathBigNumbers([])).toEqual([]);
  });
});
