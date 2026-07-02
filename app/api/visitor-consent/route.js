import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_Dcw9muxJz0TE@ep-hidden-breeze-atjfzdrq-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: { rejectUnauthorized: false },
});

export async function POST(request) {
  try {
    const body = await request.json();

    const query = `
      CREATE TABLE IF NOT EXISTS visitor_consent (
        id SERIAL PRIMARY KEY,
        accepted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        ip TEXT,
        city TEXT,
        region TEXT,
        country TEXT,
        country_code TEXT,
        timezone TEXT,
        currency TEXT,
        languages TEXT,
        organization TEXT,
        raw_data JSONB
      );
    `;

    await pool.query(query);

    const insertQuery = `
      INSERT INTO visitor_consent (
        ip,
        city,
        region,
        country,
        country_code,
        timezone,
        currency,
        languages,
        organization,
        raw_data
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;
    `;

    const values = [
      body.ip ?? null,
      body.city ?? null,
      body.region ?? null,
      body.country ?? null,
      body.countryCode ?? null,
      body.timezone ?? null,
      body.currency ?? null,
      body.languages ?? null,
      body.organization ?? null,
      body.raw ?? null,
    ];

    const result = await pool.query(insertQuery, values);

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error("visitor consent save error", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
