#!/usr/bin/env python3
"""Send async v0 image generation request for articles in the given JSON file."""
import json
import os
import sys
import requests

V0_API_KEY = os.environ.get("V0_API_KEY") or open(os.path.expanduser("~/.v0_api_key")).read().strip()
CHAT_ID = "hlWyMfm4M2a"
HEADERS = {"Authorization": f"Bearer {V0_API_KEY}", "Content-Type": "application/json"}

json_path = sys.argv[1] if len(sys.argv) > 1 else "articles_today.json"
with open(json_path) as f:
    articles = json.load(f)

lines = "\n".join(
    f"- {a['slug']} — {a['rewritten_headline']} ({a.get('category', 'Operators')})"
    for a in articles
)
prompt = f"""Generate featured images for {len(articles)} iGaming news articles. Each image:
- 1424x752px, saved to public/images/articles/{{slug}}.png
- Photo-realistic or editorial illustration style
- No readable text, no real logos, no identifiable real people
- Professionally relevant to the article headline

Articles:
{lines}

After generating all images, resize each to 1200x630 (cover crop) and push to the article-featured-images branch."""

resp = requests.post(
    f"https://api.v0.dev/v2/chats/{CHAT_ID}/messages/async",
    headers=HEADERS,
    json={"message": prompt, "modelConfiguration": {"imageGenerations": True}},
    timeout=30,
)
if resp.status_code not in (200, 202):
    print(f"v0 error: {resp.status_code} {resp.text[:300]}", file=sys.stderr)
    sys.exit(1)

msg_id = resp.json().get("messageId", "unknown")
print(f"v0 request sent OK (messageId={msg_id})")
