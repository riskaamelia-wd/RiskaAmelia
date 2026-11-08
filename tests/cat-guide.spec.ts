import { test, expect } from "@playwright/test";

test("the opening uses a living cat rather than a framed painting", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".garden-portal")).toHaveCount(0);
  const cat = page.locator(".cat-guide img");
  await expect(cat).toHaveAttribute("src", /monet-cat-awake/);
  await expect
    .poll(() => cat.getAttribute("data-expression"), {
      timeout: 8000,
      intervals: [100],
    })
    .toBe("blink");
  await page
    .getByRole("button", { name: "Follow the cat to The person" })
    .click();
  await expect(cat).toHaveAttribute("data-expression", "meow");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A person behind",
  );
});

test("reduced motion keeps the cat still and voice is enabled by default", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Reflect.set(window, "catVoicePlays", []);
    HTMLMediaElement.prototype.play = async function (this: HTMLMediaElement) {
      Reflect.get(window, "catVoicePlays").push(this.src);
    };
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const voice = page.getByRole("button", { name: "Cat voice", exact: true });
  await expect(voice).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".cat-guide img")).toHaveAttribute(
    "data-expression",
    "awake",
  );
  expect(
    await page.evaluate(() => Reflect.get(window, "catVoicePlays").length),
  ).toBe(0);
  await voice.click();
  await expect(voice).toHaveAttribute("aria-pressed", "false");
  await page
    .getByRole("button", { name: "Follow the cat to The person" })
    .click();
  expect(
    await page.evaluate(() => Reflect.get(window, "catVoicePlays").length),
  ).toBe(0);
  await voice.click();
  await expect(voice).toHaveAttribute("aria-pressed", "true");
  expect(
    await page.evaluate(() => Reflect.get(window, "catVoicePlays").length),
  ).toBe(0);
  await page
    .getByRole("button", { name: "Follow the cat to The creations" })
    .click();
  expect(
    await page.evaluate(() => Reflect.get(window, "catVoicePlays")),
  ).toEqual(["http://127.0.0.1:3100/audio/cat-meow.ogg"]);
});

test("unavailable cat voice leaves the guide usable", async ({ page }) => {
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = async () => {
      throw new Error("Playback unavailable");
    };
  });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Follow the cat to The person" })
    .click();
  await expect(
    page.getByRole("button", { name: "Cat voice", exact: true }),
  ).toBeDisabled();
  await expect(page.getByRole("status")).toContainText(
    "Cat voice is unavailable",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A person behind",
  );
});

for (const height of [667, 900]) {
  test(`cat guide stays clear of the mobile action and chapter index at ${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height });
    await page.goto("/");
    const guide = page.locator(".cat-guide");
    const action = page.getByRole("button", {
      name: "Scroll into the painting",
    });
    await expect(guide).toBeVisible();
    const catBox = await guide.boundingBox();
    const actionBox = await action.boundingBox();
    const navBox = await page.getByRole("navigation").boundingBox();
    expect(
      catBox &&
        actionBox &&
        (catBox.x >= actionBox.x + actionBox.width ||
          catBox.y >= actionBox.y + actionBox.height),
    ).toBe(true);
    expect(catBox && navBox && catBox.y + catBox.height <= navBox.y).toBe(true);
    await page.screenshot({
      path: `test-results/cat-opening-360-${height}.png`,
    });
  });
}
