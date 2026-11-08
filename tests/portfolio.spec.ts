import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("native scrolling travels through all five chapters", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A little world,",
  );
  await page.getByRole("button", { name: "Scroll into the painting" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A person behind",
  );
  await expect(
    page.getByRole("img", { name: "Riska Amelia", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "The creations" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Ideas, taking",
  );
  await expect
    .poll(async () =>
      Number(
        await page
          .locator('[data-scene="bridge"]')
          .evaluate((e) => getComputedStyle(e).opacity),
      ),
    )
    .toBeGreaterThan(0.95);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "The notebook" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Thoughts that",
  );
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "A conversation" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Every good thing",
  );
  await expect(
    page.getByRole("link", { name: "Say hello", exact: true }),
  ).toHaveAttribute("href", "mailto:tugasriskaamelia@gmail.com");
  await expect(
    page.getByRole("link", { name: "WhatsApp", exact: true }),
  ).toHaveAttribute("href", "https://wa.link/hp10p5");
  await expect
    .poll(async () =>
      Number(
        await page
          .locator('[data-scene="lilies"]')
          .evaluate((e) => getComputedStyle(e).opacity),
      ),
    )
    .toBeGreaterThan(0.95);
  await page.getByRole("button", { name: "Return to the pond" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A little world,",
  );
  expect(errors).toEqual([]);
});

test("mouse wheel moves the painting without intercepting native scrolling", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.mouse.wheel(0, 2000);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Ideas, taking",
  );
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);
});

for (const width of [360, 768, 1440]) {
  test(`responsive journey and accessibility at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    for (const [index, label] of [
      "The pond",
      "The person",
      "The creations",
      "The notebook",
      "A conversation",
    ].entries()) {
      await page
        .getByRole("navigation")
        .getByRole("link", { name: label, exact: true })
        .click();
      await expect(
        page
          .getByRole("navigation")
          .getByRole("link", { name: label, exact: true }),
      ).toHaveAttribute("aria-current", "step");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
      if (index === 0 || index === 2 || index === 4)
        await page.screenshot({
          path: `test-results/journey-${width}-${index}.png`,
        });
    }
  });
}

test("reduced motion switches paintings without zooming", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "A conversation" })
    .click();
  await expect(page.locator('[data-scene="lilies"]')).toHaveCSS("opacity", "1");
  await expect(page.locator('[data-scene="lilies"]')).toHaveCSS(
    "transform",
    "none",
  );
});

test("keyboard can skip the journey and open collections", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip the journey — view projects" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "SIMDIKLAT", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Writing" })
    .click();
  await expect(page.getByText("The notebook is open.")).toBeVisible();
});

test("touch can advance the journey and select a chapter", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100");
  await page.getByRole("button", { name: "Scroll into the painting" }).tap();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A person behind",
  );
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "A conversation" })
    .tap();
  await expect(
    page.getByRole("link", { name: "WhatsApp", exact: true }),
  ).toBeVisible();
  await context.close();
});

test("no-JavaScript visitors retain introduction and direct content links", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Projects", exact: true }),
  ).toHaveAttribute("href", "/projects");
  await page.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "SIMDIKLAT", exact: true }),
  ).toBeVisible();
  await context.close();
});

test("redirect and missing detail routes retain correct status", async ({
  request,
}) => {
  const redirect = await request.get("/allPortfolio", { maxRedirects: 0 });
  expect(redirect.status()).toBe(308);
  for (const url of ["/projects/missing", "/writing/missing", "/missing"]) {
    expect((await request.get(url)).status()).toBe(404);
  }
});
