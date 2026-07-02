import { NextResponse } from "next/server";
import { getHomepageContent, saveHomepageContent } from "@/lib/homepage-content";

export async function GET(request) {
  try {
    const arContent = await getHomepageContent("ar");
    const enContent = await getHomepageContent("en");

    return NextResponse.json({
      success: true,
      ar: arContent,
      en: enContent,
    });
  } catch (error) {
    console.error("GET homepage admin data error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { lang, content } = await request.json();

    if (!lang || !["ar", "en"].includes(lang)) {
      return NextResponse.json(
        { success: false, error: "Invalid or missing language (lang)" },
        { status: 400 }
      );
    }

    if (!content || typeof content !== "object") {
      return NextResponse.json(
        { success: false, error: "Content must be a non-empty object" },
        { status: 400 }
      );
    }

    const savedContent = await saveHomepageContent(lang, content);

    return NextResponse.json({
      success: true,
      lang,
      content: savedContent,
    });
  } catch (error) {
    console.error("POST homepage admin data error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
