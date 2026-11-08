import { expect, test } from "bun:test";
import { getChapterIndex, getChapterScrollTop } from "./chapter-progress";
test("chapters follow the scroll progress without out-of-range indexes", () => {
  expect(
    [-0.1, 0, 0.21, 0.41, 0.61, 0.81, 1, 1.2].map(getChapterIndex),
  ).toEqual([0, 0, 1, 2, 3, 4, 4, 4]);
});
test("navigation positions stay within the chapter rather than on a boundary", () => {
  expect(getChapterScrollTop(0, 6000, 1000)).toBe(0);
  expect(getChapterScrollTop(2, 6000, 1000)).toBe(2200);
  expect(getChapterScrollTop(4, 6000, 1000)).toBe(4200);
});
