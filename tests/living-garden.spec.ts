import { test, expect } from "@playwright/test";
import { writeFile } from "node:fs/promises";
for (const width of [360, 768, 1440]) {
  test(`living exhibition is usable at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 360 ? 667 : 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "The creations" })
      .click();
    await expect(
      page.getByRole("group", { name: "Choose a project" }).getByRole("button"),
    ).toHaveCount(7);
    const artwork = page.getByRole("link", {
      name: "Open Pringwulung project",
    });
    await expect(artwork).toBeVisible();
    await page.getByRole("button", { name: "Previous project" }).click();
    await expect(
      page.getByRole("heading", { name: "GoFit", exact: true }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Next project" }).click();
    await expect(
      page.getByRole("heading", { name: "Pringwulung", exact: true }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Discover CMS OPENDATA" }).focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("button", { name: "Discover CMS OPENDATA" }),
    ).toHaveAttribute("aria-pressed", "true");
    const exhibition = await page.locator(".living-exhibition").boundingBox();
    const navigation = await page.getByRole("navigation").boundingBox();
    expect(
      exhibition &&
        navigation &&
        (exhibition.x + exhibition.width <= navigation.x ||
          exhibition.y + exhibition.height <= navigation.y ||
          navigation.x + navigation.width <= exhibition.x ||
          navigation.y + navigation.height <= exhibition.y),
    ).toBe(true);
    const action = page.getByRole("link", { name: "Explore this project" });
    const box = await action.boundingBox();
    expect(
      box && box.y > 0 && box.y + box.height < (width === 360 ? 537 : 850),
    ).toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({ path: `test-results/living-garden-${width}.png` });
    await expect(page.locator(".reflection-artwork")).toHaveCSS(
      "view-transition-name",
      "project-cover-cms-opendata",
    );
    await action.click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "CMS OPENDATA",
    );
    await expect(page.locator(".project-detail-artwork > div")).toHaveCSS(
      "view-transition-name",
      "project-cover-cms-opendata",
    );
    await page.screenshot({ path: `test-results/living-detail-${width}.png` });
  });
}
test("pointer depth has a reduced-motion fallback", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const depth = page.locator(".painting-presence");
  await page.mouse.move(1250, 650);
  await expect
    .poll(() => depth.evaluate((node) => getComputedStyle(node).transform))
    .not.toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(depth).toHaveCSS("transform", "none");
});

test("arrival has stable layout and records a local production baseline", async ({
  page,
}, testInfo) => {
  await page.addInitScript(() => {
    let cls = 0;
    let lcp = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!Reflect.get(entry, "hadRecentInput"))
          cls += Number(Reflect.get(entry, "value"));
      }
      Reflect.set(window, "gardenCLS", cls);
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) lcp = entry.startTime;
      Reflect.set(window, "gardenLCP", lcp);
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });
  await page.goto("/");
  await expect(page.locator(".painting-presence")).toHaveCSS(
    "clip-path",
    "inset(0%)",
  );
  const metrics = await page.evaluate(() => ({
    cls: Number(Reflect.get(window, "gardenCLS") ?? 0),
    lcpMs: Number(Reflect.get(window, "gardenLCP") ?? 0),
    fcpMs:
      performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0,
  }));
  expect(metrics.cls).toBeLessThan(0.1);
  await writeFile(
    "test-results/living-performance.json",
    JSON.stringify(metrics, null, 2),
  );
  await testInfo.attach("local-production-metrics", {
    body: JSON.stringify(metrics),
    contentType: "application/json",
  });
});
