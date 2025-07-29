import express from 'express';
import { chromium } from 'playwright';

const app = express();

app.get('/scrape-trends', async (_req, res) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.tiktok.com/trending');

  const trends = await page.evaluate(() => {
    const items: { tag: string; views: string }[] = [];
    document.querySelectorAll('a[href*="/tag/"]').forEach(el => {
      const tag = el.textContent?.trim() || '';
      const views = (el.closest('div')?.querySelector('[data-e2e="view-count"]') as HTMLElement)?.textContent?.trim() || '';
      if (tag && views) {
        items.push({ tag, views });
      }
    });
    return items;
  });

  await browser.close();
  res.json(trends);
});

app.listen(3000, () => {
  console.log('Scraper service running on port 3000');
});