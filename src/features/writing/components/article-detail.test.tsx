import { describe, expect, mock, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import type { Article } from "../types/article";
const FIXTURE: Article = {
  slug: "test-note",
  title: "Fixture note",
  date: "2026-11-08",
  summary: "Test summary",
  paragraphs: ["Plain text <script>alert(1)</script>"],
};
mock.module("../content", () => ({
  ARTICLES: [],
  getArticle: (slug: string) => (slug === FIXTURE.slug ? FIXTURE : undefined),
}));
const { ArticleDetail } = await import("./ArticleDetail");
describe("article detail", () => {
  test("renders dated plain text and escapes markup", () => {
    const html = renderToStaticMarkup(<ArticleDetail slug="test-note" />);
    expect(html).toContain("Fixture note");
    expect(html).toContain('dateTime="2026-11-08"');
    expect(html).toContain("&lt;script&gt;");
    expect(html).not.toContain("<script>");
  });
  test("unknown slugs use the Next not-found boundary", () => {
    expect(() =>
      renderToStaticMarkup(<ArticleDetail slug="missing" />),
    ).toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });
});
