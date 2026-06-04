import { buildForminatorEmbedDocument } from "@/lib/forminatorEmbed";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Invalid form id" }, { status: 400 });
  }

  try {
    const html = await buildForminatorEmbedDocument(id, "1");
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load form";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
