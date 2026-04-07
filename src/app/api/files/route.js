import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const files = await readdir(uploadDir);

    const pptFiles = files
      .filter(f => f.endsWith(".pptx") || f.endsWith(".ppt"))
      .map(name => ({
        name,
        url: `/uploads/${name}`,
        createdAt: new Date().toISOString() // Mock date for now
      }));

    return NextResponse.json(pptFiles);
  } catch (error) {
    console.error("List error:", error);
    return NextResponse.json([], { status: 200 }); // Return empty array if dir doesn't exist yet
  }
}
