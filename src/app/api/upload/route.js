import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
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
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const uploadPath = path.join(uploadDir, fileName);

    // Ensure the upload directory exists
    await mkdir(uploadDir, { recursive: true });

    // Save the original file
    await writeFile(uploadPath, buffer);

    // Convert to PDF using LibreOffice for reliable local rendering
    // This is the "100% Local" rendering fix
    try {
      console.log(`PPT Hub: Starting local conversion for ${fileName}...`);
      await execPromise(`libreoffice --headless --convert-to pdf --outdir "${uploadDir}" "${uploadPath}"`);
      console.log(`PPT Hub: Conversion successful for ${fileName}`);
    } catch (convError) {
      console.error("PPT Hub: Conversion failed", convError);
      // We still return success since the original file is saved, 
      // but the viewer will need to handle the missing PDF fallback.
    }

    return NextResponse.json({ 
      success: true, 
      fileName, 
      filePath: `/uploads/${fileName}`,
      pdfPath: `/uploads/${fileName.replace(/\.(pptx|ppt)$/i, ".pdf")}`
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
