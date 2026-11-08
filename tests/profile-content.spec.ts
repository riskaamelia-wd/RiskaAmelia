import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const width of [360, 1440]) {
  test(`LinkedIn profile remains readable at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about");
    await expect(
      page.getByRole("img", { name: "Riska Amelia", exact: true }),
    ).toHaveAttribute("src", /riska-portrait/);
    await expect(
      page.getByRole("heading", { name: "Experience", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("PT. Klakklik Inovasi Digital", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Universitas Indraprasta PGRI (UNINDRA)", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Source: LinkedIn" }),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/riskamelia/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    await page.screenshot({
      path: `test-results/about-${width}.png`,
      fullPage: true,
    });
  });
}

test("verified projects have real detail routes and source attribution", async ({
  page,
  request,
}) => {
  await page.goto("/projects");
  for (const [slug, title] of [
    ["simdiklat", "SIMDIKLAT"],
    ["simfoni", "SIMFONI"],
    ["musrenbangkom", "MUSRENBANGKOM"],
    ["classy", "Classy"],
    ["gofit", "GoFit"],
  ]) {
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
    expect((await request.get(`/projects/${slug}`)).status()).toBe(200);
  }
  await page
    .getByRole("link")
    .filter({
      has: page.getByRole("heading", { name: "SIMDIKLAT", exact: true }),
    })
    .click();
  await expect(
    page.getByRole("link", { name: "Source: LinkedIn" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Visit website" })).toHaveCount(
    0,
  );
});

for (const width of [360, 1440]) {
  test(`SIMDIKLAT has a readable multi-paragraph discussion at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/projects/simdiklat");
    const discussion = page.locator(".project-discussion");
    await expect(
      discussion.getByRole("heading", {
        name: "Understanding the legacy system",
      }),
    ).toBeVisible();
    await expect(
      discussion.getByRole("heading", {
        name: "Implementation and integrations",
      }),
    ).toBeVisible();
    await expect(
      discussion.getByRole("heading", { name: "Data and performance" }),
    ).toBeVisible();
    await expect(discussion.locator("p")).toHaveCount(5);
    await expect(discussion).toContainText("SIJULE, PINTAR, SIMPEG, and BSrE");
    await expect(discussion).toContainText("wireframes");
    await expect(discussion).not.toContainText("6,000,000");
    await discussion
      .getByRole("heading", { name: "Data and performance" })
      .scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `test-results/project-discussion-${width}.png`,
    });
    await expect(
      page.getByRole("link", { name: "Source: LinkedIn" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}
