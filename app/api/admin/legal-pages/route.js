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

export async function GET() {
  try {
    await ensureTable();
    const result = await pool.query(`SELECT * FROM legal_pages ORDER BY updated_at DESC`);
    return NextResponse.json({ pages: result.rows });
  } catch (error) {
    console.error("legal pages fetch error", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await ensureTable();
    const body = await request.json();
    const slug = (body.slug || "page").toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    if (!slug) {
      return NextResponse.json({ success: false, error: "Invalid slug" }, { status: 400 });
    }

    if (body.delete && body.id) {
      await pool.query("DELETE FROM legal_pages WHERE id = $1", [body.id]);
      return NextResponse.json({ success: true, deletedId: body.id });
    }

    const values = [
      slug,
      body.titleEn || null,
      body.titleAr || null,
      body.subtitleEn || null,
      body.subtitleAr || null,
      body.contentEn || null,
      body.contentAr || null,
      body.published === true || body.published === "true",
    ];

    const result = await pool.query(
      `INSERT INTO legal_pages (
        slug,
        title_en,
        title_ar,
        subtitle_en,
        subtitle_ar,
        content_en,
        content_ar,
        published
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (slug) DO UPDATE SET
        title_en = EXCLUDED.title_en,
        title_ar = EXCLUDED.title_ar,
        subtitle_en = EXCLUDED.subtitle_en,
        subtitle_ar = EXCLUDED.subtitle_ar,
        content_en = EXCLUDED.content_en,
        content_ar = EXCLUDED.content_ar,
        published = EXCLUDED.published,
        updated_at = NOW()
      RETURNING *;
    `,
      values
    );

    return NextResponse.json({ success: true, page: result.rows[0] });
  } catch (error) {
    console.error("legal pages save error", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
