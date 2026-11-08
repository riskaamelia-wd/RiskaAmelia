import { describe, expect, mock, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import type { Project } from "../types/project";
const FIXTURE: Project = {
  slug: "test-only",
  title: "Fixture project",
  summary: "Test content only",
  technologies: ["React"],
  sections: [
    {
      heading: "Process",
      body: "Verified fixture text.\n\nA separate contribution paragraph.",
    },
  ],
};
mock.module("../content", () => ({
  PROJECTS: [],
  getProject: (slug: string) => (slug === FIXTURE.slug ? FIXTURE : undefined),
}));
const { ProjectDetail } = await import("./ProjectDetail");
describe("project detail", () => {
  test("renders available case study sections and omits absent fields", () => {
    const html = renderToStaticMarkup(<ProjectDetail slug="test-only" />);
    expect(html).toContain("Fixture project");
    expect(html).toContain("Verified fixture text.");
    expect(html).toContain("A separate contribution paragraph.");
    expect(html).toContain('aria-labelledby="discussion-0"');
    expect(html).not.toContain("My role:");
    expect(html).not.toContain("Visit website");
  });
  test("unknown slugs use the Next not-found boundary", () => {
    expect(() =>
      renderToStaticMarkup(<ProjectDetail slug="missing" />),
    ).toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });
});
