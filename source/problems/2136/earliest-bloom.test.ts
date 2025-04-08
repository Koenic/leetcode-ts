import { describe, expect, it } from "vitest";
import { earliestFullBloom } from "./earliest-bloom.js";

describe("It should find the optimal bloom time", () => {
  it("should work for the test example", () => {
    expect(earliestFullBloom([1, 4, 3], [2, 3, 1])).toEqual(9);
  });
  it("should work for the test example 2", () => {
    expect(earliestFullBloom([1, 2, 3, 2], [2, 1, 2, 1])).toEqual(9);
  });
  it("should work for the test example 3", () => {
    expect(earliestFullBloom([1], [1])).toEqual(2);
  });

  it("should work when the grow time is equal", () => {
    expect(
      earliestFullBloom(
        [3, 11, 29, 4, 4, 26, 26, 12, 13, 10, 30, 19, 27, 2, 10],
        [10, 13, 22, 17, 18, 15, 21, 11, 24, 14, 18, 23, 1, 30, 6],
      ),
    ).toEqual(227);
  });
});
