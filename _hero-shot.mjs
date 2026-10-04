export default async function run(page) {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("http://127.0.0.1:8765/services.html", { waitUntil: "networkidle" });
  const dir = await page.evaluate(() => getComputedStyle(document.querySelector(".svc-hero__actions")).flexDirection);
  const bg = await page.evaluate(() => getComputedStyle(document.querySelector(".svc-hero")).backgroundColor);
  await page.locator(".svc-hero").screenshot({ path: "C:/Users/HP/Documents/Downloads-1/stackly-site/assets/images/Downloads/Smart-Home-technology/_hero-shot.png" });
  return { dir, bg };
}
