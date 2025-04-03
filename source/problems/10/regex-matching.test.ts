import { describe, expect, test } from "vitest";
import { isMatch } from "./regex-matching.js";

describe("it should match simple regexes", () => {
  test("testcase1", () => {
    expect(isMatch("aa", "a")).toBe(false);
  });
  test("testcase2", () => {
    expect(isMatch("aa", "a*")).toBe(true);
  });
  test("testcase3", () => {
    expect(isMatch("ab", ".*")).toBe(true);
  });

  test("addtional tests 1", () => {
    expect(isMatch("aaaaaaaaaabbbaaaaaaaa", "aaa.*bbb.*a*")).toBe(true);
  });
  test("addtional tests 2", () => {
    expect(isMatch("abcd", "ab.*.*.*.*.*.*.*.*.*.*cd")).toBe(true);
  });
  test("more addtional tests 3", () => {
    expect(isMatch("abcd", "a*b*c*d*")).toBe(true);
  });
  test("more addtional tests 4", () => {
    expect(isMatch("a", "a*b*")).toBe(true);
  });
  test("more addtional tests 5", () => {
    expect(isMatch("a", "a*b*c")).toBe(false);
  });
  test("more addtional tests 6", () => {
    expect(isMatch("a", "a.*a")).toBe(false);
  });
  test("more addtional tests 7", () => {
    expect(isMatch("aaaaaaaaaaaaaaaaaaab", "a*a*a*a*a*a*a*a*a*a*")).toBe(false);
  });
});
