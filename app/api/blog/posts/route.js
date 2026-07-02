import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_Dcw9muxJz0TE@ep-hidden-breeze-atjfzdrq-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: { rejectUnauthorized: false },
});

const ensureTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title_en TEXT,
      title_ar TEXT,
      excerpt_en TEXT,
      excerpt_ar TEXT,
      content_en TEXT,
      content_ar TEXT,
      author TEXT DEFAULT 'Sigma Admin',
      published BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
};

export async function GET(request) {
  try {
    await ensureTable();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const mode = searchParams.get("mode");
    const publishedOnly = searchParams.get("published") !== "false";

    if (slug) {
      const result = await pool.query(
        mode === "admin"
          ? "SELECT * FROM blog_posts WHERE slug = $1 ORDER BY created_at DESC"
          : "SELECT * FROM blog_posts WHERE slug = $1 AND published = true ORDER BY created_at DESC",
        [slug]
      );
      return NextResponse.json({ post: result.rows[0] || null });
    }

    const query = mode === "admin"
      ? "SELECT * FROM blog_posts ORDER BY created_at DESC"
      : "SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC";

    const result = await pool.query(query);
    return NextResponse.json({ posts: result.rows });
  } catch (error) {
    console.error("blog fetch error", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await ensureTable();
    const body = await request.json();
    const slug = (body.slug || body.titleEn || body.titleAr || "post")
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const values = [
      slug,
      body.titleEn || null,
      body.titleAr || null,
      body.excerptEn || null,
      body.excerptAr || null,
      body.contentEn || null,
      body.contentAr || null,
      body.author || "Sigma Admin",
      body.published === true || body.published === "true",
    ];

    const insertQuery = `
      INSERT INTO blog_posts (
        slug,
        title_en,
        title_ar,
        excerpt_en,
        excerpt_ar,
        content_en,
        content_ar,
        author,
        published
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (slug) DO UPDATE SET
        title_en = EXCLUDED.title_en,
        title_ar = EXCLUDED.title_ar,
        excerpt_en = EXCLUDED.excerpt_en,
        excerpt_ar = EXCLUDED.excerpt_ar,
        content_en = EXCLUDED.content_en,
        content_ar = EXCLUDED.content_ar,
        author = EXCLUDED.author,
        published = EXCLUDED.published
      RETURNING *;
    `;

    const result = await pool.query(insertQuery, values);
    return NextResponse.json({ success: true, post: result.rows[0] });
  } catch (error) {
    console.error("blog save error", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
