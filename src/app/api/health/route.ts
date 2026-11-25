import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ status: "ok", service: "fitledger-api", timestamp: new Date().toISOString() });
}
