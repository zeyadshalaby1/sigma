import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_Dcw9muxJz0TE@ep-hidden-breeze-atjfzdrq-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  try {
    const summaryQuery = `
      SELECT
        COUNT(*)::int AS total_visitors,
        COUNT(DISTINCT country)::int AS countries_count,
        COUNT(DISTINCT city)::int AS cities_count,
        COUNT(DISTINCT region)::int AS regions_count
      FROM visitor_consent;
    `;

    const countriesQuery = `
      SELECT COALESCE(NULLIF(country, ''), 'Unknown') AS name, COUNT(*)::int AS value
      FROM visitor_consent
      WHERE country IS NOT NULL AND country <> ''
      GROUP BY country
      ORDER BY value DESC, name ASC
      LIMIT 8;
    `;

    const citiesQuery = `
      SELECT COALESCE(NULLIF(city, ''), 'Unknown') AS name, COUNT(*)::int AS value
      FROM visitor_consent
      WHERE city IS NOT NULL AND city <> ''
      GROUP BY city
      ORDER BY value DESC, name ASC
      LIMIT 8;
    `;

    const dailyQuery = `
      SELECT TO_CHAR(accepted_at::date, 'YYYY-MM-DD') AS day, COUNT(*)::int AS value
      FROM visitor_consent
      GROUP BY accepted_at::date
      ORDER BY accepted_at::date DESC
      LIMIT 14;
    `;

    const recentQuery = `
      SELECT
        id,
        accepted_at,
        ip,
        COALESCE(NULLIF(city, ''), 'Unknown') AS city,
        COALESCE(NULLIF(region, ''), 'Unknown') AS region,
        COALESCE(NULLIF(country, ''), 'Unknown') AS country,
        COALESCE(raw_data->>'latitude', NULL) AS latitude,
        COALESCE(raw_data->>'longitude', NULL) AS longitude
      FROM visitor_consent
      ORDER BY accepted_at DESC
      LIMIT 12;
    `;

    const [summaryResult, countriesResult, citiesResult, dailyResult, recentResult] = await Promise.all([
      pool.query(summaryQuery),
      pool.query(countriesQuery),
      pool.query(citiesQuery),
      pool.query(dailyQuery),
      pool.query(recentQuery),
    ]);

    const dailySeries = [...dailyResult.rows].reverse();

    return NextResponse.json({
      summary: summaryResult.rows[0] || {
        total_visitors: 0,
        countries_count: 0,
        cities_count: 0,
        regions_count: 0,
      },
      countries: countriesResult.rows,
      cities: citiesResult.rows,
      daily: dailySeries,
      recent: recentResult.rows,
    });
  } catch (error) {
    console.error("admin visitors analytics error", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
