import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET() {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const isVercel = process.env.VERCEL === '1';

    if (token) {
      const { blobs } = await list({ token });
      const pptFiles = blobs
        .filter(blob => blob.pathname.endsWith(".pptx") || blob.pathname.endsWith(".ppt"))
        .map(blob => ({
          name: blob.pathname,
          url: blob.url,
          createdAt: blob.uploadedAt
        }));
      return NextResponse.json(pptFiles);
    }

    if (isVercel) {
      console.error("Vercel Blob token missing for listing blobs.");
      return NextResponse.json(
        { error: "Vercel Blob token missing. Set BLOB_READ_WRITE_TOKEN in Vercel environment variables." },
        { status: 500 }
      );
    }

    return NextResponse.json([]);
  } catch (error) {
    console.error("List error:", error);
    return NextResponse.json([], { status: 200 });
  }
}
