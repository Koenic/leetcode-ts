import { describe, expect, it } from "vitest";
import { constructGridLayout } from "./grid-matching-graph.js";

describe("it should create 2d grids based on only edges", () => {
  it("should create 1d grids", () => {
    expect(
      constructGridLayout(5, [
        [0, 1],
        [1, 3],
        [2, 3],
        [2, 4],
      ]),
    ).toEqual([[4, 2, 3, 1, 0].reverse()]);
  });

  it("should create 2d grids", () => {
    expect(
      constructGridLayout(4, [
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 3],
      ]),
    ).toEqual([
      [1, 0],
      [3, 2],
    ]);
  });

  it("should work for larger grids", () => {
    expect(
      constructGridLayout(9, [
        [0, 1],
        [0, 4],
        [0, 5],
        [1, 7],
        [2, 3],
        [2, 4],
        [2, 5],
        [3, 6],
        [4, 6],
        [4, 7],
        [6, 8],
        [7, 8],
      ]),
    ).toEqual([
      [5, 0, 1],
      [2, 4, 7],
      [3, 6, 8],
    ]);
  });

  it("should not run out of memory", () => {
    expect(
      constructGridLayout(6, [
        [0, 1],
        [0, 2],
        [0, 4],
        [1, 3],
        [2, 5],
        [3, 4],
        [4, 5],
      ]),
    ).toEqual([
      [3, 1],
      [4, 0],
      [5, 2],
    ]);
  });
});
