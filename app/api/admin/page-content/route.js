import { NextResponse } from "next/server";
import { getPageContent, savePageContent } from "@/lib/page-content";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json(
        { success: false, error: "Missing page key (key)" },
        { status: 400 }
      );
    }

    const arContent = await getPageContent(key, "ar");
    const enContent = await getPageContent(key, "en");

    return NextResponse.json({
      success: true,
      ar: arContent,
      en: enContent,
    });
  } catch (error) {
    console.error("GET page admin data error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { key, lang, content } = await request.json();

    if (!key) {
      return NextResponse.json(
        { success: false, error: "Missing page key (key)" },
        { status: 400 }
      );
    }

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

    const savedContent = await savePageContent(key, lang, content);

    return NextResponse.json({
      success: true,
      key,
      lang,
      content: savedContent,
    });
  } catch (error) {
    console.error("POST page admin data error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
