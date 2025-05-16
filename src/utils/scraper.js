import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

export const scrapePinterestPins = async (profileUrl, maxPins = 10) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: null,
  });

  const page = await browser.newPage();

  try {
    await page.goto(profileUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Scroll to load more pins
    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await new Promise((res) => setTimeout(res, 2500));
    }

    // Get unique pin URLs
    const pinUrls = await page.evaluate(() => {
      const anchors = document.querySelectorAll("a[href*='/pin/']");
      const links = Array.from(anchors)
        .map((a) => a.href)
        .filter((href, i, arr) => arr.indexOf(href) === i);
      return links;
    });

    const results = [];

    for (let i = 0; i < Math.min(pinUrls.length, maxPins); i++) {
      const pinUrl = pinUrls[i];
      const pinPage = await browser.newPage();

      try {
        await pinPage.setCacheEnabled(false);
        await pinPage.goto(pinUrl, {
          waitUntil: "domcontentloaded",
          timeout: 60000,
        });

        await pinPage.waitForSelector("img", { timeout: 10000 });
        await pinPage.waitForSelector("h1", { timeout: 10000 });

        const data = await pinPage.evaluate(() => {
          const h1El = document.querySelector("h1");
          const imgEl = document.querySelector("img[src*='i.pinimg.com']");

          let title = h1El?.innerText?.trim() || "";
          const description = imgEl?.alt?.trim() || "";
          let image = imgEl?.src || "";

          // Fallback title from alt text if h1 is missing
          if (!title && description) {
            title = description.split(" ").slice(0, 7).join(" ") + "...";
          }

          if (image.includes("/236x/")) {
            image = image.replace("/236x/", "/736x/");
          }

          // Skip if title is still missing or matches description exactly
          if (!title || !image || title === description) return null;

          return { title, description, image };
        });

        if (data) results.push(data);
      } catch (err) {
        console.warn(`❌ Failed to scrape ${pinUrl}: ${err.message}`);
      }

      await pinPage.close();
    }

    await browser.close();
    return results;
  } catch (err) {
    await browser.close();
    throw new Error("Pinterest scraping failed: " + err.message);
  }
};
