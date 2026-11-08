import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const width of [360, 768, 1440]) {
  test(`painted gallery keeps real projects accessible at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/projects");
    const gallery = page.getByRole("list", { name: "Project gallery" });
    await expect(gallery.getByRole("listitem")).toHaveCount(7);
    await expect(
      gallery.getByText("Painted cover study", { exact: true }),
    ).toHaveCount(7);
    const images = gallery.locator("img");
    await expect(images).toHaveCount(7);
    for (let index = 0; index < 7; index += 1) {
      const image = images.nth(index);
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (node) =>
              node instanceof HTMLImageElement &&
              node.complete &&
              node.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    expect(
      new Set(
        await images.evaluateAll((nodes) =>
          nodes.map((node) => node.getAttribute("src")),
        ),
      ).size,
    ).toBe(5);
    if (width >= 768)
      await expect(page.getByRole("navigation")).toHaveCSS("position", "fixed");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: `test-results/project-gallery-${width}.png`,
      fullPage: true,
    });
    await page.screenshot({
      path: `test-results/project-gallery-${width}-viewport.png`,
    });
    const link = gallery.getByRole("link").filter({
      has: page.getByRole("heading", { name: "SIMDIKLAT", exact: true }),
    });
    await expect(link).toHaveAttribute("href", "/projects/simdiklat");
    await link.click();
    await expect(
      page.getByRole("heading", {
        name: "Understanding the legacy system",
        exact: true,
      }),
    ).toBeVisible();
  });
}

test("a failed decorative cover keeps the project label and link available", async ({
  page,
}) => {
  await page.route("**/_next/image?*", (route) =>
    route.request().url().includes("flower-study")
      ? route.abort()
      : route.continue(),
  );
  await page.goto("/projects");
  const project = page
    .getByRole("list", { name: "Project gallery" })
    .getByRole("link")
    .filter({
      has: page.getByRole("heading", { name: "Classy", exact: true }),
    });
  await project.scrollIntoViewIfNeeded();
  await expect(project.getByRole("img")).toHaveAttribute("role", "img");
  await project.click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Classy");
});

test("CMS OPENDATA opens its owner-supplied project story", async ({
  page,
}) => {
  await page.goto("/projects");
  await page
    .getByRole("list", { name: "Project gallery" })
    .getByRole("link")
    .filter({
      has: page.getByRole("heading", { name: "CMS OPENDATA", exact: true }),
    })
    .click();
  await expect(page).toHaveURL(/\/projects\/cms-opendata$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "CMS OPENDATA",
  );
  await expect(
    page.getByRole("heading", { name: "Datasets and DataHub integration" }),
  ).toBeVisible();
  await expect(page.getByText("My role:")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Source: LinkedIn" }),
  ).toHaveCount(0);
});

test("Pringwulung links to its live village website", async ({ page }) => {
  await page.goto("/projects/pringwulung");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Pringwulung",
  );
  await expect(
    page.getByRole("link", { name: "Visit website" }),
  ).toHaveAttribute("href", "https://pringwulung.id/");
  await expect(
    page.getByRole("heading", {
      name: "Public services and community information",
    }),
  ).toBeVisible();
});
