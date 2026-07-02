import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_Dcw9muxJz0TE@ep-hidden-breeze-atjfzdrq-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: { rejectUnauthorized: false },
});

const ensureSocialTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS social_links (
      id SERIAL PRIMARY KEY,
      social_data JSONB NOT NULL DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
};

export async function GET() {
  try {
    await ensureSocialTable();
    const result = await pool.query(
      "SELECT social_data FROM social_links ORDER BY updated_at DESC LIMIT 1"
    );

    const socialLinks = result.rows[0]?.social_data || {
      facebook: "",
      instagram: "",
      youtube: "",
      linkedin: "",
      twitter: "",
      whatsapp: "",
    };

    return NextResponse.json({ socialLinks });
  } catch (error) {
    console.error("social links fetch error", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await ensureSocialTable();
    const body = await request.json();
    const socialLinks = {
      facebook: body.facebook?.toString().trim() || "",
      instagram: body.instagram?.toString().trim() || "",
      youtube: body.youtube?.toString().trim() || "",
      linkedin: body.linkedin?.toString().trim() || "",
      twitter: body.twitter?.toString().trim() || "",
      whatsapp: body.whatsapp?.toString().trim() || "",
    };

    const result = await pool.query(
      `INSERT INTO social_links (social_data) VALUES ($1) RETURNING social_data;`,
      [socialLinks]
    );

    return NextResponse.json({ success: true, socialLinks: result.rows[0].social_data });
  } catch (error) {
    console.error("social links save error", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
