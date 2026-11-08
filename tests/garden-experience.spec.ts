import { test, expect } from "@playwright/test";

test("painted cat guides visitors and project reflections open real work", async ({
  page,
}) => {
  await page.goto("/");
  const cat = page.locator(".cat-guide img");
  await expect(cat).toHaveAttribute("src", /monet-cat/);
  await expect
    .poll(() =>
      cat.evaluate(
        (image) =>
          image instanceof HTMLImageElement &&
          image.complete &&
          image.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await page
    .getByRole("button", { name: "Follow the cat to The person" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A person behind",
  );
  await page
    .getByRole("button", { name: "Follow the cat to The creations" })
    .click();
  await page.getByRole("button", { name: "Discover SIMFONI" }).click();
  await expect(
    page.getByRole("heading", { name: "SIMFONI", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore this project" }),
  ).toHaveAttribute("href", "/projects/simfoni");
  await page.getByRole("link", { name: "Explore this project" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("SIMFONI");
});

test("touching open water creates a bounded ripple pool and respects reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.mouse.click(1000, 600);
  await expect
    .poll(async () =>
      Number(
        await page
          .locator(".water-ripple")
          .first()
          .evaluate((e) => getComputedStyle(e).opacity),
      ),
    )
    .toBeGreaterThan(0);
  await expect(page.locator(".water-ripple")).toHaveCount(4);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".water-ripples")).toHaveCSS("display", "none");
});

test("garden sound is opt-in, toggles, and closes when leaving the journey", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const NativeAudioContext = window.AudioContext;
    const contexts: AudioContext[] = [];
    Object.defineProperty(window, "__gardenTestAudio", { value: contexts });
    window.AudioContext = class extends NativeAudioContext {
      constructor(options?: AudioContextOptions) {
        super(options);
        contexts.push(this);
      }
    };
  });
  await page.goto("/");
  const button = page.getByRole("button", {
    name: "Garden sound",
    exact: true,
  });
  await expect(button).toHaveAttribute("aria-pressed", "false");
  expect(
    await page.evaluate(() => Reflect.get(window, "__gardenTestAudio").length),
  ).toBe(0);
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "true");
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "false");
  expect(
    await page.evaluate(
      () => Reflect.get(window, "__gardenTestAudio")[0].state,
    ),
  ).toBe("suspended");
  await page
    .getByRole("link", { name: "Skip the journey — view projects" })
    .focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "SIMDIKLAT", exact: true }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(() => Reflect.get(window, "__gardenTestAudio")[0].state),
    )
    .toBe("closed");
});

test("unavailable audio leaves the painting usable", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "AudioContext", { value: undefined });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Garden sound", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Garden sound", exact: true }),
  ).toBeDisabled();
  await expect(page.getByRole("status")).toHaveText(
    "Garden sound is unavailable in this browser.",
  );
  await page.getByRole("button", { name: "Scroll into the painting" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A person behind",
  );
});

for (const height of [667, 900]) {
  test(`project reflection stays usable on a 360 × ${height} screen`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "The creations" })
      .click();
    await page.getByRole("button", { name: "Discover GoFit" }).click();
    const link = page.getByRole("link", { name: "Explore this project" });
    const box = await link.boundingBox();
    expect(box && box.y >= 0 && box.y + box.height < height - 130).toBe(true);
    await page.screenshot({
      path: `test-results/reflections-360-${height}.png`,
    });
    await link.click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("GoFit");
  });
}
