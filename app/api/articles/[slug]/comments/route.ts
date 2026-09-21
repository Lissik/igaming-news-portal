import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

interface Comment {
  id: string;
  author: string;
  content: string;
  publishedAt: string;
}

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const comments = (await kv.get<Comment[]>(`comments:${slug}`)) ?? [];
  return NextResponse.json({ comments });
}

export async function POST(req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const { author, content } = await req.json();

  if (!author?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const key = `comments:${slug}`;
  const existing = (await kv.get<Comment[]>(key)) ?? [];

  const newComment: Comment = {
    id: `c-${Date.now()}`,
    author: author.trim(),
    content: content.trim(),
    publishedAt: new Date().toISOString(),
  };

  await kv.set(key, [...existing, newComment]);

  return NextResponse.json({ comment: newComment });
}
