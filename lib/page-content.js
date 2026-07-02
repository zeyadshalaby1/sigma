import { pool } from "./db";

export const ensurePagesTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS pages_content (
      id SERIAL PRIMARY KEY,
      page_key VARCHAR(50) NOT NULL,
      lang VARCHAR(10) NOT NULL,
      content JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(page_key, lang)
    );
  `);
};

export async function getPageContent(pageKey, lang) {
  try {
    await ensurePagesTable();
    const result = await pool.query(
      `SELECT content FROM pages_content WHERE page_key = $1 AND lang = $2 LIMIT 1`,
      [pageKey, lang]
    );
    return result.rows[0]?.content || null;
  } catch (error) {
    console.error(`Error in getPageContent for ${pageKey} [${lang}]:`, error);
    return null;
  }
}

export async function savePageContent(pageKey, lang, content) {
  try {
    await ensurePagesTable();
    const result = await pool.query(
      `INSERT INTO pages_content (page_key, lang, content) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (page_key, lang) 
       DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
       RETURNING *;`,
      [pageKey, lang, JSON.stringify(content)]
    );
    return result.rows[0]?.content || null;
  } catch (error) {
    console.error(`Error in savePageContent for ${pageKey} [${lang}]:`, error);
    throw error;
  }
}
