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

    console.log(`🔗 Found ${pinUrls.length} unique pins`);

    const results = [];

    for (let i = 0; i < Math.min(pinUrls.length, maxPins); i++) {
      const pinUrl = pinUrls[i];
      const pinPage = await browser.newPage();

      console.log(`🔍 Scraping pin ${i + 1}/${pinUrls.length}: ${pinUrl}`);

      try {
        await pinPage.setCacheEnabled(false);
        await pinPage.goto(pinUrl, {
          waitUntil: "domcontentloaded",
          timeout: 60000,
        });

        await new Promise((res) => setTimeout(res, 2000));

        await pinPage.waitForSelector("img", { timeout: 10000 });

        const data = await pinPage.evaluate(() => {
          const h1El = document.querySelector("h1");
          const imgEl = document.querySelector("img[src*='i.pinimg.com']");

          const title = h1El?.innerText?.trim() || "";
          const description = imgEl?.alt?.trim() || "";
          let image = imgEl?.src || "";

          if (image.includes("/236x/")) {
            image = image.replace("/236x/", "/736x/");
          }

          if (!title) console.warn("⚠️ Missing title");
          if (!image) console.warn("⚠️ Missing image");

          if (!title || !image) return null;

          return { title, description, image };
        });

        if (data) {
          results.push(data);
          console.log(`✅ Scraped: ${pinUrl}`);
        } else {
          console.warn(`⚠️ Skipped (missing data): ${pinUrl}`);
        }
      } catch (err) {
        console.warn(`❌ Failed to scrape ${pinUrl}: ${err.message}`);
      }

      await pinPage.close();
    }

    await browser.close();
    console.log(`✅ Finished: ${results.length} templates scraped`);
    return results;
  } catch (err) {
    await browser.close();
    console.error("Pinterest scraping failed:", err.message);
    throw new Error("Pinterest scraping failed: " + err.message);
  }
};
