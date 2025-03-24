import { describe, expect, test } from "vitest";
import { hasSameDigits, pascalsTriangleLineMod10 } from "./has-same-digits.js";

describe("calculate the nth line of pascals triangle", () => {
  test("it should calculate the second line of pascals triangle", () => {
    expect(pascalsTriangleLineMod10(2)).toEqual([1, 2, 1]);
  });
  test("it should calculate the seventh line of pascals triangle", () => {
    expect(pascalsTriangleLineMod10(7)).toEqual([1, 7, 1, 5, 5, 1, 7, 1]);
  });
});

describe("has same digits function", () => {
  test("It shoudld return true when the final two digits are the same", () => {
    expect(hasSameDigits("3902")).toEqual(true);
  });
  test("It should return false when the final two digits are not the same", () => {
    expect(hasSameDigits("34789")).toEqual(false);
  });
});
