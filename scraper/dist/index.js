"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const playwright_1 = require("playwright");
const app = (0, express_1.default)();
app.get('/scrape-trends', async (_req, res) => {
    const browser = await playwright_1.chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://www.tiktok.com/trending');
    const trends = await page.evaluate(() => {
        const items = [];
        document.querySelectorAll('a[href*="/tag/"]').forEach(el => {
            const tag = el.textContent?.trim() || '';
            const views = el.closest('div')?.querySelector('[data-e2e="view-count"]')?.textContent?.trim() || '';
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
