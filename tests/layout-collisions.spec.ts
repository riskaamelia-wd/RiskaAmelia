import { test, expect } from "@playwright/test";
import type { Locator } from "@playwright/test";
async function expectSeparate(first: Locator, second: Locator) {
  const a = await first.boundingBox();
  const b = await second.boundingBox();
  expect(a).not.toBeNull();
  expect(b).not.toBeNull();
  if (!a || !b) return;
  const overlaps =
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y;
  expect(overlaps).toBe(false);
}
for (const viewport of [
  { width: 1280, height: 720 },
  { width: 2576, height: 1408 },
  { width: 360, height: 667 },
]) {
  test(`route navigation keeps header clear at ${viewport.width} × ${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "The notebook" })
      .click();
    await page
      .getByRole("link", { name: "Open the notebook", exact: true })
      .click();
    const header = page.locator(".painting-page-header");
    const back = page.getByRole("heading", { level: 1 });
    await expect(back).toBeVisible();
    await expectSeparate(header, back);
    const headerBox = await header.boundingBox();
    const mainBox = await back.boundingBox();
    expect(
      mainBox && headerBox && mainBox.y >= headerBox.y + headerBox.height + 20,
    ).toBe(true);
    await page.screenshot({
      path: `test-results/writing-layout-${viewport.width}.png`,
      fullPage: true,
    });
  });
  test(`contact action never overlaps sound or footer at ${viewport.width} × ${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "A conversation" })
      .click();
    const content = page.locator(".journey-content");
    const sound = page.getByRole("button", {
      name: "Garden sound",
      exact: true,
    });
    await expect(
      page.getByRole("link", { name: "Say hello", exact: true }),
    ).toBeVisible();
    await expectSeparate(content, sound);
    await expectSeparate(page.locator(".journey-footer"), sound);
    await expectSeparate(content, page.locator(".journey-footer"));
    await page.screenshot({
      path: `test-results/contact-layout-${viewport.width}.png`,
    });
  });
}
