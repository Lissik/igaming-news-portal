#!/usr/bin/env python3
"""
add_articles.py — добавляет статьи из JSON в lib/data.ts и коммитит.
Использование: python3 add_articles.py igaming_2026_09_07.json [igaming_2026_09_08.json ...]
"""

import json
import re
import sys
import os
import subprocess
from pathlib import Path

REPO = Path(__file__).parent
DATA_TS = REPO / "lib" / "data.ts"

CATEGORY_MAP = {
    "Regulation": "regulation",
    "Operators": "operators",
    "Slots & Game Providers": "slots-game-providers",
    "Industry Services": "industry-services",
    "Marketing & Traffic": "marketing-traffic",
    "Affiliates": "affiliates",
    "Payments & Fintech": "payments-fintech",
    "Conferences & Events": "conferences-events",
    "Payments": "payments-fintech",
    "Fintech": "payments-fintech",
    "Conferences": "conferences-events",
    "Events": "conferences-events",
}

AUTHORS_BY_CATEGORY = {
    "regulation": "AUTHORS[4]",        # Marcus De Luca
    "operators": "AUTHORS[0]",          # James Whitfield
    "slots-game-providers": "AUTHORS[3]", # Sofia Eriksson
    "industry-services": "AUTHORS[6]",  # Anton Voronov
    "marketing-traffic": "AUTHORS[3]",  # Sofia Eriksson
    "affiliates": "AUTHORS[3]",
    "payments-fintech": "AUTHORS[5]",   # Priya Sharma
    "conferences-events": "AUTHORS[0]",
}

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def escape_backtick(s):
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

def get_last_ids(content):
    ids = re.findall(r'id:\s*"(\d+)"', content)
    last_article_id = max((int(x) for x in ids), default=0)
    tag_ids = re.findall(r'id:\s*"t(\d+)"', content)
    last_tag_id = max((int(x) for x in tag_ids), default=0)
    return last_article_id, last_tag_id

def make_tag_slug(label):
    return slugify(label)

def article_to_ts(article, article_id, tag_id_start):
    cat_raw = article.get("category", "")
    category = CATEGORY_MAP.get(cat_raw, "regulation")
    if "author_index" in article:
        author = f"AUTHORS[{int(article['author_index'])}]"
    else:
        author = AUTHORS_BY_CATEGORY.get(category, "AUTHORS[0]")

    slug = article.get("slug", slugify(article.get("rewritten_headline", str(article_id))))
    title = article.get("rewritten_headline", article.get("title", ""))
    excerpt = article.get("excerpt", "")
    pub_date = article.get("publication_date", "2026-09-10")
    source_name = article.get("source_name", "")
    source_url = article.get("source_url", "")

    body = article.get("article_body_markdown", "")
    source_attr = article.get("source_attribution", "")
    if source_attr:
        content = body + f"\n\n---\n\n*{source_attr}*"
    else:
        content = body

    tags = article.get("tags", [])
    tags_ts_parts = []
    for i, tag in enumerate(tags):
        tid = f"t{tag_id_start + i}"
        label = tag if isinstance(tag, str) else tag.get("label", str(tag))
        tslug = make_tag_slug(label)
        tags_ts_parts.append(f'      {{ id: "{tid}", label: "{label}", slug: "{tslug}" }}')
    tags_ts = ",\n".join(tags_ts_parts)

    image_path = f"/images/articles/{slug}.png"

    seo_title = article.get("seo_title") or f"{title} | iGaming Pulse"
    meta_desc = article.get("meta_description") or excerpt[:160]

    import random
    likes = random.randint(5, 25)

    ts = f'''  {{
    id: "{article_id}",
    slug: "{slug}",
    language: "en",
    translationGroupId: "tg-{article_id}",
    title: "{title.replace('"', '\\"')}",
    excerpt: "{excerpt.replace('"', '\\"')}",
    content: `{escape_backtick(content)}`,
    featuredImage: "{image_path}",
    author: {author},
    publishedAt: "{pub_date}T08:30:00Z",
    category: "{category}",
    tags: [
{tags_ts},
    ],
    sourceName: "{source_name}",
    sourceUrl: "{source_url}",
    featured: false,
    trending: false,
    sponsored: false,
    seoTitle: "{seo_title.replace('"', '\\"')}",
    metaDescription: "{meta_desc.replace('"', '\\"')}",
    likes: {likes},
    comments: [],
  }}'''
    return ts, len(tags)

def submit_for_indexing(urls):
    """Submit freshly-published URLs for indexing immediately via igaming_indexing_manager.py
    (service-account auth, same pattern as the virtuwise.io pipeline — no OAuth refresh-token
    expiry), and record them in the shared submitted_urls.json log used by index_submitter.py."""
    if not urls:
        return
    print(f"\nSubmitting {len(urls)} URL(s) for indexing...")

    try:
        result = subprocess.run(
            [
                "/Library/Frameworks/Python.framework/Versions/3.13/bin/python3",
                "/Users/Administrator/igaming_indexing_manager.py",
                "--submit-many",
                *urls,
            ],
            capture_output=True, text=True, timeout=120,
        )
        print("  " + result.stdout.strip().replace("\n", "\n  "))
        if result.returncode != 0:
            print(f"  igaming_indexing_manager.py error: {result.stderr[-500:]}")
    except Exception as e:
        print(f"  Indexing submission skipped ({e})")

    try:
        log_path = Path("/Users/Administrator/submitted_urls.json")
        existing = set(json.loads(log_path.read_text())) if log_path.exists() else set()
        existing.update(urls)
        log_path.write_text(json.dumps(sorted(existing), indent=2))
    except Exception as e:
        print(f"  Could not update submitted_urls.json: {e}")


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 add_articles.py <file.json> [file2.json ...]")
        sys.exit(1)

    # Load all articles from provided JSON files
    all_articles = []
    for path in sys.argv[1:]:
        p = Path(path)
        if not p.exists():
            # Try looking in home dir
            p = Path.home() / path
        with open(p) as f:
            data = json.load(f)
        all_articles.extend(data)
        print(f"Loaded {len(data)} articles from {path}")

    if not all_articles:
        print("No articles found.")
        sys.exit(0)

    content = DATA_TS.read_text(encoding="utf-8")
    last_id, last_tag_id = get_last_ids(content)
    print(f"Current: last article id={last_id}, last tag id=t{last_tag_id}")

    # Check for duplicate slugs
    existing_slugs = set(re.findall(r'slug:\s*"([^"]+)"', content))
    new_articles = []
    skipped = []
    for a in all_articles:
        slug = a.get("slug", "")
        if slug in existing_slugs:
            skipped.append(slug)
        else:
            new_articles.append(a)

    if skipped:
        print(f"Skipping {len(skipped)} already existing slugs: {skipped[:3]}{'...' if len(skipped) > 3 else ''}")

    if not new_articles:
        print("Nothing new to add.")
        sys.exit(0)

    print(f"Adding {len(new_articles)} new articles...")

    ts_blocks = []
    cur_id = last_id + 1
    cur_tag = last_tag_id + 1
    dates = set()
    for article in new_articles:
        block, n_tags = article_to_ts(article, cur_id, cur_tag)
        ts_blocks.append(block)
        dates.add(article.get("publication_date", ""))
        cur_id += 1
        cur_tag += n_tags

    insertion = ",\n\n".join(ts_blocks)

    # Insert before closing ]; of ARTICLES array.
    # Last existing article's closing "}" may or may not have a trailing comma
    # depending on how it was written previously — accept both.
    new_content = re.sub(
        r'},?(\s*)\];\s*\n// [─�]{3} Helper',
        lambda m: f'}},\n\n{insertion}\n];\n\n// ─── Helper',
        content,
        count=1
    )

    if new_content == content:
        print("ERROR: Could not find insertion point in data.ts")
        sys.exit(1)

    DATA_TS.write_text(new_content, encoding="utf-8")
    print(f"Written {len(new_articles)} articles to data.ts (ids {last_id+1}–{cur_id-1})")

    # Git commit and push
    os.chdir(REPO)
    date_str = ", ".join(sorted(dates))
    msg = f"Add {len(new_articles)} articles for {date_str}"

    subprocess.run(["git", "add", "lib/data.ts"], check=True)
    # Also stage any matching PNG images that are already on disk (avoids a separate commit/build)
    images_dir = REPO / "public" / "images" / "articles"
    for article in new_articles:
        slug = article.get("slug", "")
        img = images_dir / f"{slug}.png"
        if img.exists():
            subprocess.run(["git", "add", str(img)], check=False)
    subprocess.run(["git", "commit", "-m", msg], check=True)
    subprocess.run(["git", "push"], check=True)
    print(f"\nDone! Committed and pushed: '{msg}'")

    # Merge v0 image branch if it has new commits
    subprocess.run(["git", "fetch", "origin"], check=False)
    merge = subprocess.run(
        ["git", "merge", "origin/v0/article-featured-images", "--no-edit"],
        capture_output=True, text=True
    )
    if merge.returncode == 0 and "Already up to date" not in merge.stdout:
        subprocess.run(["git", "push"], check=False)
        print("v0 image branch merged and pushed.")
    elif merge.returncode != 0:
        subprocess.run(["git", "merge", "--abort"], check=False)
        print("v0 image branch not available yet — will be merged on next run.")

    print("Vercel will deploy automatically.")

    # Submit the just-published URLs for indexing right away.
    new_urls = [f"https://igamingpulse.media/en/article/{a['slug']}" for a in new_articles if a.get("slug")]
    submit_for_indexing(new_urls)

if __name__ == "__main__":
    main()
