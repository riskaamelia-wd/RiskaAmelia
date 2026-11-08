import { test, expect } from "@playwright/test";
for (const [width, height] of [
  [360, 667],
  [360, 900],
  [768, 900],
  [1440, 900],
]) {
  test(`project guide stays visible and clear at ${width}×${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "The creations", exact: true })
      .click();
    const guide = page.getByRole("button", {
      name: "Follow the cat to The notebook",
    });
    await expect(guide).toBeVisible();
    await expect(guide).toBeInViewport({ ratio: 1 });
    const box = await guide.boundingBox();
    expect(box && box.width >= (width >= 768 ? 100 : 70)).toBe(true);
    const action = await page
      .getByRole("link", { name: "Explore this project" })
      .boundingBox();
    const tabs = await page
      .getByRole("group", { name: "Choose a project" })
      .boundingBox();
    for (const other of [action, tabs]) {
      expect(
        box &&
          other &&
          (box.x + box.width <= other.x ||
            other.x + other.width <= box.x ||
            box.y + box.height <= other.y ||
            other.y + other.height <= box.y),
      ).toBe(true);
    }
    await page.screenshot({
      path: `test-results/project-cat-${width}-${height}.png`,
    });
    await guide.click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Thoughts that",
    );
  });
}
