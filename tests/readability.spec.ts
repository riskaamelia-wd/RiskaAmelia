import { test, expect } from "@playwright/test";
for (const width of [360, 1440]) {
  for (const route of ["/about", "/writing", "/projects/simdiklat"]) {
    test(`readable body text without a boxed overlay on ${route} at ${width}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const text = page.locator(".painting-page-main p").first();
      await expect(text).toBeVisible();
      expect(
        await text.evaluate((e) => parseFloat(getComputedStyle(e).fontSize)),
      ).toBeGreaterThanOrEqual(16);
      const wash = await page
        .locator(".painting-page-main")
        .evaluate((e) => getComputedStyle(e, "::before").backgroundImage);
      expect(wash).toBe("none");
      await page.screenshot({
        path: `test-results/readability-${route.replaceAll("/", "-")}-${width}.png`,
      });
    });
  }
}

test("project text fits above navigation on a small phone", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 667 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "The creations" })
    .click();
  await page.getByRole("button", { name: "Discover SIMDIKLAT" }).click();
  const text = page.locator(".reflection-story p").first();
  expect(
    await text.evaluate((e) => parseFloat(getComputedStyle(e).fontSize)),
  ).toBeGreaterThanOrEqual(16);
  const action = await page
    .getByRole("link", { name: "Explore this project" })
    .boundingBox();
  const navigation = await page.getByRole("navigation").boundingBox();
  expect(
    action && navigation && action.y + action.height + 8 <= navigation.y,
  ).toBe(true);
  await page.screenshot({
    path: "test-results/readability-project-small-phone.png",
  });
});
