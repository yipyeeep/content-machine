# 🎬 Content Machine – Automated AI‑Powered Short Videos

**Content Machine** is a fully automated n8n workflow that takes trending content ideas through a creative pipeline—idea scraping, prompt generation, video rendering via Creatomate, approval, and publishing—optimized for TikTok & Instagram.

---

## 🚀 Features

- **Scrape Trending Ideas**
  Agent scrapes TikTok/Instagram for trending topics, hashtags, view counts.
  Uses n8n Code node + Playwright for custom scraping to bypass restrictions.

- **Generate Creative Prompt**
  Reads scraped trends and uses LLM to suggest unique video ideas.
  Uses n8n AI Agent node and leverages GPT for creativity.

- **Validation & Enrichment**
  Verifies ideas using external knowledge API.
  Uses Perplexity via OpenRouter in HTTP Request and reduces hallucination by checking real facts.

- **Video Creation**  
  Sends prompts to Creatomate’s API for vertical video generation using a pre‑made template.

- **Approval Flow**
  Uploads placeholder video, workflow pauses for your review.
  Uses n8n webhook + user-trigger node to ensure human-in-the-loop quality check.

- **Multi‑Platform Publishing**  
  Automatically posts approved videos to TikTok & Instagram through upload‑post.com or native APIs.

- **Analytics Loop**  
  Fetches engagement data and feeds it back into the trend‑picking agent for continuous optimization.
  Enables data-driven optimization via n8n HTTP Request or Code nodes + Postgres.

---

## 📦 Tech Stack

| Component              | Tech / Service                      |
|------------------------|-------------------------------------|
| Workflow Orchestration | n8n (self-hosted)                   |
| Scraping / Trend Data  | Playwright                          |
| Creative Generation    | OpenAI GPT via AI‑Agent node        |
| Validation / Enrichment| Perplexity via OpenRouter           |
| Video Rendering        | Creatomate API                      |
| User Approval          | n8n Webhook + Conditional Logic     |
| Social Posting         | upload‑post.com / TikTok & IG APIs  |
| Analytics Storage      | Postgres                            |

---

## 🛠️ Getting Started

### 1. Create a Creatomate Template  
- Log into Creatomate, choose or set up a **9:16 vertical video template** (e.g., Quick Promo).
- Mark dynamic fields (e.g., Text-1, Text-2, Video) to be replaced via API.

### 2. Configure n8n

1. **Manual Trigger for Testing**  
   Use a manual trigger and a Set node to define example prompt fields.

2. **Configure validation agent**
   - Enable Perplexity credentials in n8n and add HTTP Request node to verify idea prompts.

3. **HTTP Request Node for Video Submission**  
   - Import Creatomate’s cURL into n8n.  
   - Map your Set-Node JSON to template fields (video URL, text).

4. **Wait & Polling**  
   - Use a Wait node (e.g., 60–120 s), then poll Creatomate’s `GET /renders/{id}` endpoint.  
   - Route based on status: `succeeded`, `failed`, or still processing.

5. **Success & Failure Handling**  
   - On success: return video URL.  
   - On failure: notify via Slack, email, or UI.

6. **Approval Step**  
   - Send video preview via webhook or rich notification.  
   - Use conditional routing: Wait for user approval before proceeding.

7. **Publishing**  
   - Use HTTP Request or upload‑post.com nodes to publish to TikTok & Instagram.

8. **Analytics Collection**  
   - Periodically fetch post metrics via platform APIs.  
   - Store results, and feed back into trend and prompt agents.

---

## 🧩 Pipeline Flow (n8n Visualization)

```text
[Trigger] 
 ↓
[Agent 1: Scrape Trends] → Postgres
 ↓
[Agent 2: LLM Prompt Generation] → Postgres
 ↓
[Agent 3: Perplexity Validation] → Curated Prompts
 ↓
[Agent 4: Creatomate Video Generation] → Wait + Poll
 ↓
[Approval? Webhook] —✅→ [Agent 5: Publish Video] → [Agent 6: Fetch Analytics] → Postgres → feedback to Agents 1/2
                 —❌→ [Abort or Loop Back to Agent 2]
```

---

## ✅ Next Steps

1. Set up Perplexity API call for idea fact-checking.
2. Set up Creatomate template and note its template ID.
3. Create the HTTP Request node in n8n; test sample render.
4. Add Wait + Poll nodes with status-based routing.
5. Build and test user approval workflow.
6. Integrate publishing nodes for TikTok & Instagram.
7. Design analytics agent to capture and loop back insights.

---

## 🤝 Contributing

Pull requests and feature ideas are welcome! Please follow these steps:

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/video-approval`)
3. Commit your changes (`git commit -m 'Add video approval step'`)
4. Push and open a PR

---

## 📄 License

MIT License – see [LICENSE.md](LICENSE.md)

---

Created by yipyeeep.
