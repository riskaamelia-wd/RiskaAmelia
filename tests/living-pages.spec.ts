import { test, expect } from "@playwright/test";
for (const width of [360, 1440]) {
  for (const route of [
    "/about",
    "/projects",
    "/writing",
    "/projects/cms-opendata",
  ]) {
    test(`living painting surrounds ${route} at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);
      await expect(page.locator(".painting-page-depth")).toHaveCSS(
        "transform",
        "none",
      );
      await expect(page.locator(".painting-page-progress")).toHaveCount(1);
      await expect(
        page.getByRole("link", { name: /Follow the cat to/ }),
      ).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({
        path: `test-results/living-page-${route.replaceAll("/", "-")}-${width}.png`,
      });
    });
  }
}
test("long project discussion has reading progress and a keyboard-accessible return", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/projects/cms-opendata");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const top = page.getByRole("button", {
    name: "Return to the top of this page",
  });
  await expect(top).toBeVisible();
  await top.focus();
  await page.keyboard.press("Enter");
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});
test("missing pages remain inside one living painting shell", async ({
  page,
}) => {
  await page.goto("/a-missing-garden-path");
  await expect(page.locator(".painting-page")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A little lost?",
  );
});

test("reading pages respond to the pointer and stop depth for reduced motion", async ({
  page,
}) => {
  await page.goto("/writing");
  const depth = page.locator(".painting-page-depth");
  await page.mouse.move(1000, 650);
  await expect
    .poll(() => depth.evaluate((node) => getComputedStyle(node).transform))
    .not.toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(depth).toHaveCSS("transform", "none");
});
