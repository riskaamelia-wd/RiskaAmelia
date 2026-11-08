import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const width of [360, 768, 1440]) {
  for (const route of ["projects", "writing"]) {
    test(`${route} stays inside the painting at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${route}`);
      await expect(page.locator(".painting-page-art")).toHaveCSS(
        "position",
        "fixed",
      );
      await expect(page.locator(".painting-page-art img")).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Back to the painting", exact: true }),
      ).toHaveAttribute("href", `/#${route}`);
      await expect(
        page.getByRole("navigation").getByRole("link", {
          name: route === "projects" ? "Projects" : "Writing",
          exact: true,
        }),
      ).toHaveAttribute("aria-current", "page");
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
        path: `test-results/${route}-painting-${width}.png`,
        fullPage: true,
      });
      await page
        .getByRole("link", { name: "Back to the painting", exact: true })
        .click();
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        route === "projects" ? "Ideas, taking" : "Thoughts that",
      );
    });
  }
}
