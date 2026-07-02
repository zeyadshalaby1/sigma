import { pool } from "./db";

export const ensureHomepageTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS homepage_content (
      id SERIAL PRIMARY KEY,
      lang VARCHAR(10) UNIQUE NOT NULL,
      content JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
};

export async function getHomepageContent(lang) {
  try {
    await ensureHomepageTable();
    const result = await pool.query(
      `SELECT content FROM homepage_content WHERE lang = $1 LIMIT 1`,
      [lang]
    );
    return result.rows[0]?.content || null;
  } catch (error) {
    console.error("Error in getHomepageContent:", error);
    return null;
  }
}

export async function saveHomepageContent(lang, content) {
  try {
    await ensureHomepageTable();
    const result = await pool.query(
      `INSERT INTO homepage_content (lang, content) 
       VALUES ($1, $2) 
       ON CONFLICT (lang) 
       DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
       RETURNING *;`,
      [lang, JSON.stringify(content)]
    );
    return result.rows[0]?.content || null;
  } catch (error) {
    console.error("Error in saveHomepageContent:", error);
    throw error;
  }
}
