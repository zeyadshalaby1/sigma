import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BASE_PHOTOS_DIR = path.join(process.cwd(), "public", "Sigma website", "Photos");

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const relativePath = searchParams.get("path") || "";

    // Resolve target directory path safely
    const targetDir = path.resolve(BASE_PHOTOS_DIR, relativePath);

    // Prevent directory traversal attacks
    if (!targetDir.startsWith(BASE_PHOTOS_DIR)) {
      return NextResponse.json(
        { success: false, error: "Access Denied: Path traversal detected" },
        { status: 403 }
      );
    }

    if (!fs.existsSync(targetDir)) {
      return NextResponse.json(
        { success: false, error: "Directory does not exist" },
        { status: 404 }
      );
    }

    const items = fs.readdirSync(targetDir, { withFileTypes: true });

    const folders = [];
    const files = [];

    for (const item of items) {
      if (item.isDirectory()) {
        folders.push({
          name: item.name,
          relativePath: path.relative(BASE_PHOTOS_DIR, path.join(targetDir, item.name)).replace(/\\/g, "/"),
        });
      } else {
        const ext = path.extname(item.name).toLowerCase();
        // Only include standard web images
        if ([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"].includes(ext)) {
          // The public URL path should start with /Sigma website/Photos/...
          const relativeToPublic = path.relative(
            path.join(process.cwd(), "public"),
            path.join(targetDir, item.name)
          ).replace(/\\/g, "/");

          files.push({
            name: item.name,
            url: "/" + relativeToPublic,
          });
        }
      }
    }

    // Sort folders and files alphabetically
    folders.sort((a, b) => a.name.localeCompare(b.name));
    files.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({
      success: true,
      currentPath: relativePath.replace(/\\/g, "/"),
      parentPath: relativePath ? path.dirname(relativePath).replace(/\\/g, "/").replace(/^\.$/, "") : null,
      folders,
      files,
    });
  } catch (error) {
    console.error("Error in Media API:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
