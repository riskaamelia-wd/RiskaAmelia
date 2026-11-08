import { test, expect } from "@playwright/test";

test("the opening cat follows scroll and reverses with it", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const cat = page.locator(".cat-guide");
  await expect(cat).toBeVisible();
  const initial = await cat.evaluate(
    (node) => getComputedStyle(node).transform,
  );
  await page.evaluate(() => window.scrollTo(0, 500));
  await expect
    .poll(() => cat.evaluate((node) => getComputedStyle(node).transform))
    .not.toBe(initial);
  await page.screenshot({ path: "test-results/painted-scroll-cat.png" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect
    .poll(() => cat.evaluate((node) => getComputedStyle(node).transform))
    .toBe(initial);
});

test("each chapter has a composed scroll scene and a reduced-motion still", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const [name, selector] of [
    ["The person", ".garden-portrait"],
    ["A conversation", ".garden-lily-study"],
  ]) {
    await page
      .getByRole("navigation")
      .getByRole("link", { name, exact: true })
      .click();
    await expect(page.locator(selector)).toBeVisible();
    await expect(page.locator(selector)).toHaveCSS("transform", "none");
  }
});

test("painting pigments appear at chapter transitions and clean up for reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const canvas = page.locator(".painted-pigments");
  await expect(canvas).toHaveAttribute("data-ready", "true");
  await page.evaluate(() =>
    window.scrollTo(
      0,
      (document.querySelector(".painting-journey")!.clientHeight -
        innerHeight) *
        0.18,
    ),
  );
  await expect
    .poll(() =>
      canvas.evaluate((node) => {
        if (!(node instanceof HTMLCanvasElement)) return false;
        const pixels = node
          .getContext("2d")
          ?.getImageData(0, 0, node.width, node.height).data;
        return (
          pixels?.some((value, index) => index % 4 === 3 && value > 0) ?? false
        );
      }),
    )
    .toBe(true);
  await page.screenshot({ path: "test-results/painted-scroll-pigments.png" });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(canvas).toHaveCSS("display", "none");
  await expect(canvas).not.toHaveAttribute("data-ready");
});

test("gallery paintings follow scroll while their labels stay readable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/projects");
  const painting = page.locator(".project-painting-frame").first();
  const initial = await painting.evaluate(
    (node) => getComputedStyle(node).transform,
  );
  await page.mouse.wheel(0, 700);
  await expect
    .poll(() => painting.evaluate((node) => getComputedStyle(node).transform))
    .not.toBe(initial);
  await expect(
    page.getByRole("heading", { name: "Pringwulung", exact: true }),
  ).toBeVisible();
});

for (const width of [768, 1440]) {
  test(`portrait and closing paintings leave room for text at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    for (const [name, selector] of [
      ["The person", ".garden-portrait"],
      ["A conversation", ".garden-lily-study"],
    ]) {
      await page
        .getByRole("navigation")
        .getByRole("link", { name, exact: true })
        .click();
      await expect(page.locator(selector)).toBeVisible();
      const title = await page.getByRole("heading", { level: 1 }).boundingBox();
      const artwork = await page.locator(selector).boundingBox();
      expect(title && artwork && title.x + title.width <= artwork.x).toBe(true);
    }
  });
}
