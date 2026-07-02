import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_Dcw9muxJz0TE@ep-hidden-breeze-atjfzdrq-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: { rejectUnauthorized: false },
});

const ensureTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS legal_pages (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title_en TEXT,
      title_ar TEXT,
      subtitle_en TEXT,
      subtitle_ar TEXT,
      content_en TEXT,
      content_ar TEXT,
      published BOOLEAN DEFAULT true,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
};

export async function GET(request) {
  try {
    await ensureTable();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug") || "";

    if (!slug) {
      return NextResponse.json({ success: false, error: "Missing slug" }, { status: 400 });
    }

    const result = await pool.query(
      `SELECT * FROM legal_pages WHERE slug = $1 AND published = true LIMIT 1`,
      [slug]
    );

    return NextResponse.json({ page: result.rows[0] || null });
  } catch (error) {
    console.error("public legal page fetch error", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
