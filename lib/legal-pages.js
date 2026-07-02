import { pool } from "./db";

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

export async function getLegalPage(slug) {
  await ensureTable();
  const result = await pool.query(`SELECT * FROM legal_pages WHERE slug = $1 AND published = true LIMIT 1`, [slug]);
  return result.rows[0] || null;
}

export async function getAllLegalPages() {
  await ensureTable();
  const result = await pool.query(`SELECT * FROM legal_pages ORDER BY updated_at DESC`);
  return result.rows;
}
