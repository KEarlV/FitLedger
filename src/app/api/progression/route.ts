import { NextRequest, NextResponse } from "next/server";
import { getRank, RANKS } from "@/lib/ranks";

export async function GET(request: NextRequest) {
  const xp = Number(request.nextUrl.searchParams.get("xp") ?? 0);
  if (!Number.isInteger(xp) || xp < 0 || xp > 10000000) return NextResponse.json({ error: "XP must be a whole number between 0 and 10,000,000." }, { status: 400 });
  return NextResponse.json({ ...getRank(xp), ladder: RANKS.map(({ name, min, color }) => ({ name, minXp: min, color })) });
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || !("xp" in body)) return NextResponse.json({ error: "Provide an xp value." }, { status: 400 });
    const xp = Number((body as { xp: unknown }).xp);
    if (!Number.isInteger(xp) || xp < 0 || xp > 10000000) return NextResponse.json({ error: "XP must be a whole number between 0 and 10,000,000." }, { status: 400 });
    return NextResponse.json(getRank(xp));
  } catch {
    return NextResponse.json({ error: "Invalid JSON request." }, { status: 400 });
  }
}
