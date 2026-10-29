#!/usr/bin/env python3
"""
daily_articles.py — Generates 15 iGaming news articles for yesterday, in 3 batches of 5.
Uses Claude OAuth token from macOS Keychain (no API key needed).
Saves JSON + sends file to Telegram. Written as independent news reporting, no forced
outreach-service links (that's reserved for editorial/authored pieces only).
"""

import json
import os
import re
import subprocess
import requests
import xml.etree.ElementTree as ET
from datetime import date, timedelta
from email.utils import parsedate_to_datetime

# ── Config ─────────────────────────────────────────────────────────────────────
YESTERDAY = date.today() - timedelta(days=1)
YESTERDAY_STR = YESTERDAY.strftime("%Y-%m-%d")
OUTPUT_FILE = os.environ.get(
    "ARTICLES_JSON_PATH",
    f"/Users/Administrator/igaming_{YESTERDAY.strftime('%Y_%m_%d')}.json"
)

TG_TOKEN = "8824127595:AAH05g6vIa0cpvS4VWPqqG5k149wo4C58zI"
TG_CHAT_ID = "1294346179"

RSS_FEEDS = [
    "https://igamingbusiness.com/feed/",
    "https://calvinayre.com/feed/",
    "https://www.casino.org/news/feed/",
    "https://www.gamblinginsider.com/feed",
]

REQUIRED_FIELDS = [
    "category", "original_headline", "rewritten_headline", "publication_date",
    "source_name", "source_url", "entities", "region", "summary",
    "why_it_matters", "tags", "slug", "article_type", "image_url",
    "featured_image_note", "excerpt", "article_body_markdown",
]

CATEGORIES = (
    "Operators | Slots & Game Providers | Regulation | Marketing & Traffic | "
    "Conferences & Events | Industry Services | Payments & Fintech | Affiliates"
)

ARTICLES_PER_DAY = 15
BATCH_SIZE = 5  # proven reliable per-call size; 15/day = 3 batches

BODY_RETRY_PROMPT = """\
You are the editor of igamingpulse.media. The article below is missing its article_body_markdown.

Generate the full article body for this article only, then return a JSON object with ONLY these two fields:
- "slug": the article slug below
- "article_body_markdown": the full article body (700-1000 words, ## subheadings, independent reporting voice)

Article details:
slug: {slug}
headline: {headline}
summary: {summary}
category: {category}
publication_date: {date}

Return ONLY a valid JSON object. No preamble, no markdown fences.\
"""

PROMPT = """\
You are the editor of igamingpulse.media, a B2B iGaming news portal.

Today is {today}. Generate exactly {n} news articles covering events from {yesterday}.

{rss_section}

Return ONLY a valid JSON array with exactly {n} article objects. No preamble, no markdown fences.
Each object must have ALL 17 fields:

1.  category          — one of: {categories}
2.  original_headline — exact original headline from the source
3.  rewritten_headline — SEO-optimised rewrite (60-80 chars, include year)
4.  publication_date  — "{today}"
5.  source_name       — primary source publication name
6.  source_url        — primary source base URL
7.  entities          — JSON array of companies, people, regulators mentioned
8.  region            — geographic focus (e.g. "Europe", "North America", "Global")
9.  summary           — 2-3 sentence factual summary
10. why_it_matters    — 2-3 sentences on B2B significance
11. tags              — JSON array of 8-12 keyword tags
12. slug              — SEO slug, lowercase hyphens, year at end
13. article_type      — "news"
14. image_url         — "" (empty string)
15. featured_image_note — flat 16:9 image art direction with text overlay idea
16. excerpt           — 1-sentence teaser (max 180 chars)
17. article_body_markdown — write this as iGaming Pulse's OWN independent news reporting on a real
    industry event, the same way any other trade outlet covers the same real-world event in its own
    voice. Do NOT phrase it as a rewrite/summary of another site's article, and do NOT write "according
    to [source]" or "in an article published by X" — report the facts directly as news, the way a wire
    story or a competing portal would. Most articles: 700-1000 words with ## subheadings (Context / What
    This Means / What to Watch). About 1 in 4 articles should instead be a short, punchy news brief
    (300-500 words, just the facts and why it matters, no subheadings needed) — real newsrooms mix
    lengths depending on how much a story actually warrants. Do NOT include any link to virtuwise.io or
    any other outreach/marketing service anywhere in the body — this is straight news, not sponsored
    content.

CRITICAL RULES — violation means fabricated news that damages credibility:
- CONFERENCES: Do NOT write post-event recap articles (attendance figures, keynote summaries, award
  winners, deal announcements from the floor) for any conference UNLESS the RSS feed explicitly provides
  those details. If you know a conference is scheduled in the future, write a PREVIEW article instead.
  Known upcoming events: SiGMA Europe 2026 = Rome, November 2-5; ICE Barcelona 2027 = Barcelona
  (NOT London — moved to Barcelona in 2025), February 2-4 (write PREVIEW only, do NOT invent
  registration numbers, exhibitor counts, or growth figures); G2E Las Vegas 2026 = October 6-9.
  Do not invent attendance numbers, speaker quotes, or outcomes.
- EARNINGS/FINANCIALS: Only report specific revenue figures, percentages, or guidance if the RSS
  source contains them. Do not extrapolate or invent numbers.
- If the RSS feed has no material for a topic, skip that topic entirely rather than writing from memory.

Spread across different categories where possible. Do not repeat topics across articles.\
"""


# ── Auth ────────────────────────────────────────────────────────────────────────
_API_KEY_FILE = os.path.expanduser("~/.anthropic_api_key")


def get_api_key():
    key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not key and os.path.exists(_API_KEY_FILE):
        with open(_API_KEY_FILE) as f:
            key = f.read().strip()
    if not key:
        raise RuntimeError("ANTHROPIC_API_KEY not set and ~/.anthropic_api_key not found")
    return key


# ── Claude API ──────────────────────────────────────────────────────────────────
def call_claude(prompt, retries=5):
    import time
    import socket
    api_key = get_api_key()
    for attempt in range(retries):
        try:
            resp = requests.post(
                "https://api.anthropic.com/v1/messages",
                headers={
                    "x-api-key": api_key,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json",
                },
                json={
                    "model": "claude-haiku-4-5-20251001",
                    "max_tokens": 12000,
                    "messages": [{"role": "user", "content": prompt}],
                },
                timeout=300,
            )
        except (requests.exceptions.Timeout, requests.exceptions.ConnectionError,
                requests.exceptions.ReadTimeout, socket.timeout) as e:
            wait = 90 * (attempt + 1)
            print(f"  Timeout/connection error (attempt {attempt+1}/{retries}): {e}. Waiting {wait}s...")
            time.sleep(wait)
            continue
        if resp.status_code in (429, 529):
            wait = 60 * (attempt + 1)
            print(f"  HTTP {resp.status_code} (attempt {attempt+1}/{retries}), waiting {wait}s...")
            time.sleep(wait)
            continue
        resp.raise_for_status()
        return resp.json()["content"][0]["text"]
    raise RuntimeError(f"All {retries} attempts failed")


# ── RSS ─────────────────────────────────────────────────────────────────────────
def fetch_rss():
    items = []
    for url in RSS_FEEDS:
        try:
            r = requests.get(url, timeout=12, headers={"User-Agent": "Mozilla/5.0"})
            r.raise_for_status()
            root = ET.fromstring(r.content)
            for item in root.findall(".//item"):
                try:
                    pub_str = item.findtext("pubDate", "")
                    pub_dt = parsedate_to_datetime(pub_str) if pub_str else None
                    if pub_dt and pub_dt.date() != YESTERDAY:
                        continue
                    title = item.findtext("title", "").strip()
                    link = item.findtext("link", "").strip()
                    desc = re.sub(r"<[^>]+>", "", item.findtext("description", "")).strip()[:250]
                    if title and link:
                        source = url.split("/")[2].replace("www.", "")
                        items.append(f"[{source}] {title}\n  {link}\n  {desc}")
                except Exception:
                    continue
        except Exception as e:
            print(f"RSS error {url}: {e}")
    return items


# ── Telegram ────────────────────────────────────────────────────────────────────
def tg_message(text):
    try:
        requests.post(
            f"https://api.telegram.org/bot{TG_TOKEN}/sendMessage",
            data={"chat_id": TG_CHAT_ID, "text": text, "parse_mode": "HTML"},
            timeout=10,
        )
    except Exception as e:
        print(f"TG error: {e}")


def tg_document(file_path, caption):
    try:
        with open(file_path, "rb") as f:
            requests.post(
                f"https://api.telegram.org/bot{TG_TOKEN}/sendDocument",
                data={"chat_id": TG_CHAT_ID, "caption": caption},
                files={"document": (os.path.basename(file_path), f, "application/json")},
                timeout=30,
            )
    except Exception as e:
        print(f"TG document error: {e}")


# ── Validation ──────────────────────────────────────────────────────────────────
def validate(articles):
    errors = []
    for i, a in enumerate(articles):
        for field in REQUIRED_FIELDS:
            if not a.get(field) and field not in ("image_url",):
                errors.append(f"Article {i+1} ({a.get('slug','?')}) missing: {field}")
    return errors


def retry_missing_bodies(articles):
    """For articles missing article_body_markdown, try to regenerate just the body."""
    import time
    fixed = 0
    for a in articles:
        if a.get("article_body_markdown"):
            continue
        slug = a.get("slug", "?")
        print(f"  Retrying body for: {slug}")
        prompt = BODY_RETRY_PROMPT.format(
            slug=slug,
            headline=a.get("rewritten_headline", a.get("original_headline", "")),
            summary=a.get("summary", ""),
            category=a.get("category", ""),
            date=a.get("publication_date", ""),
        )
        for attempt in range(2):
            try:
                raw = call_claude(prompt)
                match = re.search(r"\{[\s\S]+\}", raw)
                if not match:
                    print(f"    No JSON in retry response (attempt {attempt+1})")
                    continue
                patch = json.loads(match.group())
                body = patch.get("article_body_markdown", "")
                if body and len(body) > 100:
                    a["article_body_markdown"] = body
                    fixed += 1
                    print(f"    Body recovered ({len(body)} chars)")
                    break
            except Exception as e:
                print(f"    Retry error (attempt {attempt+1}): {e}")
                time.sleep(30)
    return fixed


# ── Main ────────────────────────────────────────────────────────────────────────
# NOTE: publishing to the portal happens in a SEPARATE step (Claude Code scheduled
# task "igaming-publish-with-images"), which only publishes once featured images
# exist for every article. This script's only job is: generate JSON + notify Telegram.
LOCK_DIR = f"/Users/Administrator/logs/igaming_daily_lock_{YESTERDAY.strftime('%Y_%m_%d')}"


def main():
    if os.path.exists(OUTPUT_FILE):
        print(f"[daily_articles] Already generated for {YESTERDAY_STR}, skipping")
        return

    # Atomic lock (mkdir) so two instances waking up close together (e.g. after
    # the Mac was asleep through both the 11:00 and 13:00 launchd slots) can't
    # both pass the exists-check and race to write OUTPUT_FILE.
    os.makedirs("/Users/Administrator/logs", exist_ok=True)
    try:
        os.mkdir(LOCK_DIR)
    except FileExistsError:
        print(f"[daily_articles] Another instance is already generating {YESTERDAY_STR}, skipping")
        return

    try:
        _generate()
    finally:
        try:
            os.rmdir(LOCK_DIR)
        except OSError:
            pass


def _generate():
    print(f"[daily_articles] Generating for {YESTERDAY_STR}")

    rss_items = fetch_rss()
    print(f"  RSS items: {len(rss_items)}")

    all_articles = []
    n_batches = -(-ARTICLES_PER_DAY // BATCH_SIZE)  # ceil division

    for batch_idx in range(n_batches):
        n_remaining = ARTICLES_PER_DAY - len(all_articles)
        n_this_batch = min(BATCH_SIZE, n_remaining)
        if n_this_batch <= 0:
            break

        batch_rss = rss_items[batch_idx * 10 : batch_idx * 10 + 10]
        if batch_rss:
            rss_section = (
                f"Use these real news items from {YESTERDAY_STR} as source material:\n\n"
                + "\n\n".join(batch_rss)
            )
        else:
            rss_section = f"No RSS available. Use knowledge of iGaming news from {YESTERDAY_STR}."

        if all_articles:
            covered = "\n".join(f"- {a.get('rewritten_headline', '')}" for a in all_articles)
            rss_section += f"\n\nAlready covered today - do NOT repeat these topics:\n{covered}"

        prompt = PROMPT.format(
            today=date.today().strftime("%Y-%m-%d"),
            yesterday=YESTERDAY_STR,
            rss_section=rss_section,
            categories=CATEGORIES,
            n=n_this_batch,
        )

        try:
            raw = call_claude(prompt)
        except Exception as e:
            print(f"Claude error (batch {batch_idx + 1}/{n_batches}): {e}")
            tg_message(f"⚠️ <b>Batch {batch_idx + 1}/{n_batches} failed</b>\n📅 {YESTERDAY_STR}\n<code>{e}</code>")
            continue

        match = re.search(r"\[[\s\S]+\]", raw)
        if not match:
            print(f"No JSON in batch {batch_idx + 1}. Raw: {raw[:300]}")
            continue

        try:
            batch_articles = json.loads(match.group())
        except json.JSONDecodeError as e:
            print(f"JSON error batch {batch_idx + 1}: {e}")
            continue

        all_articles.extend(batch_articles)
        print(f"  Batch {batch_idx + 1}/{n_batches}: +{len(batch_articles)} articles ({len(all_articles)} total)")

    if not all_articles:
        tg_message(f"❌ <b>No articles generated at all</b>\n📅 {YESTERDAY_STR}")
        return

    errors = validate(all_articles)
    if errors:
        body_errors = [e for e in errors if "article_body_markdown" in e]
        if body_errors:
            fixed = retry_missing_bodies(all_articles)
            print(f"  Body retry: {fixed}/{len(body_errors)} recovered")
            errors = validate(all_articles)  # re-validate after retry

    if errors:
        print("\n".join(errors))
        bad_slugs = {e.split("(")[1].split(")")[0].strip() for e in errors if "(" in e}
        all_articles = [a for a in all_articles if a.get("slug") not in bad_slugs]
        tg_message("⚠️ <b>Dropped invalid articles</b>\n" + "\n".join(errors))

    if not all_articles:
        tg_message(f"❌ <b>All articles failed validation</b>\n📅 {YESTERDAY_STR}")
        return

    with open(OUTPUT_FILE, "w", encoding="utf-8") as fh:
        json.dump(all_articles, fh, ensure_ascii=False, indent=2)
    print(f"  Saved: {OUTPUT_FILE} ({len(all_articles)} articles)")

    caption = f"новые статьи\n📅 {YESTERDAY_STR}  |  {len(all_articles)} статей\n✅ {os.path.basename(OUTPUT_FILE)}"
    tg_document(OUTPUT_FILE, caption)
    print("  Telegram: sent")


if __name__ == "__main__":
    main()
