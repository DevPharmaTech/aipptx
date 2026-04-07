import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;

    // Upload to Vercel Blob storage
    console.log("Uploading to Vercel Blob:", fileName, "Size:", buffer.length);

    const blob = await put(fileName, buffer, {
      access: 'public',
    });

    console.log("Vercel Blob upload successful:", blob.url);

    return NextResponse.json({
      success: true,
      fileName,
      fileUrl: blob.url,
      expiresAt: "Files stored permanently in Vercel Blob"
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
