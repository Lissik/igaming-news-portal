import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ slug: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const seedParam = req.nextUrl.searchParams.get("seed");
  const seed = seedParam ? parseInt(seedParam, 10) : 5;
  const key = `likes:${slug}`;

  let count = await kv.get<number>(key);
  if (count === null) {
    await kv.set(key, seed);
    count = seed;
  }

  return NextResponse.json({ likes: count });
}

export async function POST(req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const { action, seed } = await req.json();
  const key = `likes:${slug}`;

  const existing = await kv.get<number>(key);
  if (existing === null) {
    await kv.set(key, seed ?? 5);
  }

  let newCount: number;
  if (action === "like") {
    newCount = await kv.incr(key);
  } else {
    newCount = await kv.decr(key);
    if (newCount < 0) {
      await kv.set(key, 0);
      newCount = 0;
    }
  }

  return NextResponse.json({ likes: newCount });
}
