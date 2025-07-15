
# 🎬 Cont Endless – Automated AI‑Powered Short Videos

**Cont Endless** is a fully automated n8n workflow that takes trending content ideas through a creative pipeline—idea scraping, prompt generation, video rendering via Creatomate, approval, and publishing—optimized for TikTok & Instagram.

---

## 🚀 Features

- **Trend Discovery**  
  Scrapes TikTok/Instagram for trending ideas using Playwright or APIs.

- **Content Prompt Generation**  
  Uses OpenAI’s GPT through n8n’s AI Agent to create video prompts.

- **Video Creation**  
  Sends prompts to Creatomate’s API for vertical video generation using a pre‑made template :contentReference[oaicite:1]{index=1}.

- **Approval Workflow**  
  Suspends the workflow until user approval via webhook/UI step.

- **Multi‑Platform Publishing**  
  Automatically posts approved videos to TikTok & Instagram through upload‑post.com or native APIs.

- **Analytics Loop**  
  Fetches engagement data and feeds it back into the trend‑picking agent for continuous optimization.

---

## 📦 Tech Stack

| Component               | Tech / Service                      |
|------------------------|-------------------------------------|
| Workflow Orchestration | **n8n** (self-hosted or Cloud)      |
| Scraping / Trend Data  | Playwright, Apify                   |
| Creative Generation    | OpenAI GPT via AI‑Agent node        |
| Video Rendering        | Creatomate API :contentReference[oaicite:2]{index=2} |
| User Approval          | n8n Webhook + Conditional Logic     |
| Social Posting         | upload‑post.com / TikTok & IG APIs |
| Analytics Storage      | Postgres / Airtable / MongoDB       |

---

## 🛠️ Getting Started

### 1. Create a Creatomate Template  
- Log into Creatomate, choose or set up a **9:16 vertical video template** (e.g., Quick Promo).  
- Mark dynamic fields (e.g., Text-1, Text-2, Video) to be replaced via API :contentReference[oaicite:3]{index=3}.

### 2. Configure n8n

1. **Manual Trigger for Testing**  
   Use a manual trigger and a Set node to define example prompt fields.

2. **HTTP Request Node for Video Submission**  
   - Import Creatomate’s cURL into n8n.  
   - Map your Set-Node JSON to template fields (video URL, text) :contentReference[oaicite:4]{index=4}.

3. **Wait & Polling**  
   - Use a Wait node (e.g., 60–120 s), then poll Creatomate’s `GET /renders/{id}` endpoint.  
   - Route based on status: `succeeded`, `failed`, or still processing.

4. **Success & Failure Handling**  
   - On success: return video URL.  
   - On failure: notify via Slack, email, or UI.

5. **Approval Step**  
   - Send video preview via webhook or rich notification.  
   - Use conditional routing: Wait for user approval before proceeding.

6. **Publishing**  
   - Use HTTP Request or upload‑post.com nodes to publish to TikTok & Instagram.

7. **Analytics Collection**  
   - Periodically fetch post metrics via platform APIs.  
   - Store results, and feed back into trend and prompt agents.

---

## 🧪 Quick Workflow Example

```text
[Trigger → Set Prompt] 
↓
[Send to Creatomate → Wait → Poll Status]
↓
└─ If succeeded → [Webhook: await approval]
     ├────▶ If approved → [Publish → Fetch Analytics → Store → Re-optimize]
     └────▶ If declined → [Log / Stop / Edit Prompt]
````

---

## 📚 Useful References

* **n8n + Creatomate integration tutorial** ([Creatomate][1], [n8n][2], [n8n][3])
* Creatomate + elevenLabs automated voiceover workflows ([Creatomate][4])
* n8n multi-platform video pipeline sample template ([n8n][3])

---

## ✅ Next Steps

1. Set up Creatomate template and note its template ID.
2. Create the HTTP Request node in n8n; test sample render.
3. Add Wait + Poll nodes with status-based routing.
4. Build user approval workflow.
5. Integrate publishing nodes for TikTok & Instagram.
6. Design analytics agent to capture and loop back insights.

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

Created with ❤️ by \yipyeeep.
Ready to transform your machine-driven creativity into viral content? Let’s go viral!
