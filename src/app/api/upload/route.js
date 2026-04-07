import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import path from "path";
import { mkdir, writeFile } from "fs/promises";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileName = file.name;
    const buffer = Buffer.from(await file.arrayBuffer());
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const isVercel = process.env.VERCEL === '1';

    if (token) {
      console.log("Uploading to Vercel Blob:", fileName, "Size:", buffer.length);

      const blob = await put(fileName, buffer, {
        access: "public",
        token,
        allowOverwrite: true,
      });

      console.log("Vercel Blob upload successful:", blob.url);

      return NextResponse.json({
        success: true,
        fileName,
        fileUrl: blob.url,
        storage: "vercel-blob"
      });
    }

    if (isVercel) {
      console.error("Vercel Blob token missing on Vercel deployment.");
      return NextResponse.json(
        { error: "Vercel Blob token missing. Set BLOB_READ_WRITE_TOKEN in Vercel environment variables." },
        { status: 500 }
      );
    }

    // Local development fallback to public/uploads when token is not configured
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    const uploadPath = path.join(uploadDir, fileName);
    await writeFile(uploadPath, buffer);

    console.log("Local upload fallback saved:", uploadPath);

    return NextResponse.json({
      success: true,
      fileName,
      fileUrl: `/uploads/${fileName}`,
      storage: "local"
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
