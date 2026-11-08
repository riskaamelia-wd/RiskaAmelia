const CHAPTER_COUNT = 5;
export function getChapterIndex(progress: number) {
  return Math.max(
    0,
    Math.min(CHAPTER_COUNT - 1, Math.floor(progress * CHAPTER_COUNT)),
  );
}
export function getChapterScrollTop(
  index: number,
  documentHeight: number,
  viewportHeight: number,
) {
  if (index === 0) return 0;
  const scrollRange = Math.max(0, documentHeight - viewportHeight);
  return Math.round(scrollRange * ((index + 0.2) / CHAPTER_COUNT));
}
