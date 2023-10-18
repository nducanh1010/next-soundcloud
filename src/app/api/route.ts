import { NextRequest, NextResponse } from "next/server";

export async function GET(reqest: NextRequest, reponse: NextResponse) {
  const url = new URL(reqest.url);
  const searchParams = new URLSearchParams(url.search);
  const fileName = searchParams.get("audio");
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${fileName}`
  );
}
