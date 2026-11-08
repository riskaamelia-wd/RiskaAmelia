import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const width of [360, 768, 1440]) {
  test(`technology explanations work at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/about");
    const section = page.getByRole("region", {
      name: "Tools behind the work.",
    });
    await section.scrollIntoViewIfNeeded();
    await expect(section).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(section.getByRole("button")).toHaveCount(10);
    await section
      .getByRole("button", { name: "Learn about TypeScript", exact: true })
      .click();
    const note = page.getByRole("dialog", {
      name: "TypeScript",
      exact: true,
    });
    await expect(note).toContainText("type system");
    await expect(note).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");

    await expect(
      note.getByRole("link", { name: "CMS OPENDATA" }),
    ).toHaveAttribute("href", "/projects/cms-opendata");
    await expect(
      note.getByRole("link", { name: "Official documentation" }),
    ).toHaveAttribute("href", "https://www.typescriptlang.org/docs/");
    await page.keyboard.press("Escape");
    await section
      .getByRole("button", { name: "Learn about Kong", exact: true })
      .focus();
    await page.keyboard.press("Home");
    await expect(
      section.getByRole("button", { name: "Learn about React", exact: true }),
    ).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByRole("dialog", { name: "Next.js", exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
    await section.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `test-results/technology-garden-${width}.png`,
    });
  });
}

test("desktop biography and tools sit side by side with animated hover", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/about");
  const bio = await page.locator(".profile-bio").boundingBox();
  const tools = await page.locator(".technology-garden").boundingBox();
  expect(
    bio &&
      tools &&
      bio.x + bio.width <= tools.x &&
      Math.abs(bio.y - tools.y) < 3,
  ).toBe(true);
  const react = page.getByRole("button", {
    name: "Learn about React",
    exact: true,
  });
  await react.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const initial = await react.boundingBox();
  await react.hover();
  await expect
    .poll(async () => {
      const hovered = await react.boundingBox();
      return initial && hovered ? hovered.width / initial.width : 0;
    })
    .toBeGreaterThan(1.1);
  await page.screenshot({ path: "test-results/about-tech-hover.png" });
});

test("technologies align in rows and experience uses the full content width", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about");
  const list = page.getByRole("list", { name: "Explore technologies" });
  await expect(list).toHaveCSS("display", "grid");
  const buttons = list.getByRole("button");
  const first = await buttons.nth(0).boundingBox();
  const second = await buttons.nth(1).boundingBox();
  const third = await buttons.nth(2).boundingBox();
  expect(
    first &&
      second &&
      third &&
      Math.abs(first.y - second.y) < 2 &&
      Math.abs(first.x - third.x) < 2,
  ).toBe(true);
  const body = await page.locator(".profile-body").boundingBox();
  const experience = await page.locator(".profile-experience").boundingBox();
  expect(body && experience && experience.width >= body.width * 0.95).toBe(
    true,
  );
  await page.locator(".profile-experience").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "test-results/about-experience-wide.png" });
});

test("About uses the owner's two-paragraph biography and the journey keeps its short introduction", async ({
  page,
}) => {
  await page.goto("/about");
  const paragraphs = page.locator(".profile-bio > p");
  await expect(paragraphs).toHaveCount(2);
  await expect(paragraphs.nth(0)).toHaveText(
    "I am a Software Engineer specializing in frontend development with expertise in React.js, Next.js, and TypeScript. As a Valedictorian graduate in Information Systems, I bring strong analytical skills and a detail-oriented approach to designing modern interfaces, improving user workflows, and transforming legacy systems into efficient, user-friendly web applications.",
  );
  await expect(paragraphs.nth(1)).toHaveText(
    "My experience includes contributing to the redevelopment of large-scale government platforms, collaborating across teams, and delivering responsive, accessible, and maintainable solutions. I am passionate about building meaningful digital products that enhance user experience and improve operational efficiency.",
  );
  await page.goto("/#about");
  await expect(page.locator(".journey-bio .journey-copy")).toContainText(
    "Frontend-focused software engineer working with React, Next.js, and TypeScript.",
  );
});

test("technology copy uses the About paragraph size at desktop and mobile", async ({
  page,
}) => {
  for (const width of [1440, 360]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about");
    const size = await page
      .locator(".profile-bio p")
      .first()
      .evaluate((node) => getComputedStyle(node).fontSize);
    await expect(
      page.getByRole("button", { name: "Learn about React", exact: true }),
    ).toHaveCSS("font-size", size);
    await expect(page.locator(".technology-intro")).toHaveCSS(
      "font-size",
      size,
    );
    await page
      .getByRole("button", { name: "Learn about React", exact: true })
      .click();
    await expect(page.locator(".technology-definition")).toHaveCSS(
      "font-size",
      size,
    );
    const headingSize = await page
      .getByRole("heading", { name: "Experience", exact: true })
      .evaluate((node) => getComputedStyle(node).fontSize);
    await expect(
      page.getByRole("heading", {
        name: "Tools behind the work.",
        exact: true,
      }),
    ).toHaveCSS("font-size", headingSize);
  }
});

test("technology details pop out on hover without reserving a permanent area", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/about");
  await expect(page.locator(".technology-note")).toHaveCount(0);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  const trigger = page.getByRole("button", {
    name: "Learn about TypeScript",
    exact: true,
  });
  await trigger.hover();
  const popup = page.getByRole("dialog", { name: "TypeScript", exact: true });
  await expect(popup).toContainText("type system");
  await popup.hover();
  await expect(popup.getByRole("link", { name: "CMS OPENDATA" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(popup).toHaveCount(0);
});

test("touch opens a pop-out without changing layout and dismisses outside", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 360, height: 800 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100/about");
  const trigger = page.getByRole("button", {
    name: "Learn about TypeScript",
    exact: true,
  });
  await trigger.scrollIntoViewIfNeeded();
  const before = await page.locator(".technology-garden").boundingBox();
  await trigger.tap();
  const popup = page.getByRole("dialog", { name: "TypeScript", exact: true });
  await expect(popup).toBeVisible();
  const bounds = await popup.boundingBox();
  expect(bounds && bounds.x >= 15 && bounds.x + bounds.width <= 345).toBe(true);
  const after = await page.locator(".technology-garden").boundingBox();
  expect(after?.height).toBe(before?.height);
  await page
    .getByRole("button", { name: "Close technology explanation" })
    .tap();
  await expect(popup).toHaveCount(0);
  await trigger.tap();
  await expect(popup).toBeVisible();
  await page.touchscreen.tap(4, 4);
  await expect(popup).toHaveCount(0);
  await context.close();
});

test("keyboard focus reaches links inside the pop-out", async ({ page }) => {
  await page.goto("/about");
  const trigger = page.getByRole("button", {
    name: "Learn about TypeScript",
    exact: true,
  });
  await trigger.focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowLeft");
  const popup = page.getByRole("dialog", { name: "TypeScript", exact: true });
  await expect(popup).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(popup.getByRole("link", { name: "CMS OPENDATA" })).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(popup).toBeVisible();
  await expect(popup.getByRole("link", { name: "CMS OPENDATA" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(popup).toHaveCount(0);
  await expect
    .poll(() =>
      page.evaluate(() => document.activeElement?.outerHTML.slice(0, 350)),
    )
    .toContain('aria-label="Learn about TypeScript"');
});
