import puppeteer from "puppeteer";

export const scrapePinterestPins = async (profileUrl, maxPins = 10) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto(profileUrl, { waitUntil: "networkidle2", timeout: 60000 });

    // Scroll to load pins
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

    // Go into each pin page and extract real title + description
    for (let i = 0; i < Math.min(pinUrls.length, maxPins); i++) {
      const pinUrl = pinUrls[i];
      const pinPage = await browser.newPage();

      try {
        await pinPage.goto(pinUrl, {
          waitUntil: "networkidle2",
          timeout: 60000,
        });

        const data = await pinPage.evaluate(() => {
          const h1 = document.querySelector("h1");
          const title = h1?.innerText?.trim() || "";

          const imgEl = document.querySelector("img[src*='i.pinimg.com']");
          const imageRaw = imgEl?.src || "";
          const description = imgEl?.alt?.trim() || "";

          // Skip if no REAL title
          if (!title || !imageRaw) return null;

          let image = imageRaw;
          if (image.includes("/236x/")) {
            image = image.replace("/236x/", "/736x/");
          }

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
