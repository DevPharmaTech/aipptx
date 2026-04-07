import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET() {
  try {
    const isVercel = process.env.VERCEL === '1';

    if (isVercel) {
      // On Vercel, list blobs
      const { blobs } = await list();
      const pptFiles = blobs
        .filter(blob => blob.pathname.endsWith(".pptx") || blob.pathname.endsWith(".ppt"))
        .map(blob => ({
          name: blob.pathname,
          url: blob.url,
          createdAt: blob.uploadedAt
        }));
      return NextResponse.json(pptFiles);
    } else {
      // Local development: return empty array since we can't list Vercel blobs locally
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("List error:", error);
    return NextResponse.json([], { status: 200 });
  }
}
