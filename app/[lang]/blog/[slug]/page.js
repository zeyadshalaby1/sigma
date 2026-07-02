import { notFound } from "next/navigation";
import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_Dcw9muxJz0TE@ep-hidden-breeze-atjfzdrq-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: { rejectUnauthorized: false },
});

async function getPost(slug) {
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

  const result = await pool.query("SELECT * FROM blog_posts WHERE slug = $1 AND published = true", [slug]);
  return result.rows[0] || null;
}

export default async function BlogPostPage({ params }) {
  const { lang, slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return notFound();
  }

  const isArabic = lang === "ar";
  const title = isArabic ? post.title_ar || post.title_en : post.title_en || post.title_ar;
  const content = isArabic ? post.content_ar || post.content_en : post.content_en || post.content_ar;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003366]/5 via-background to-primary/5 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-border/30 bg-card/90 p-8 shadow-2xl sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          {isArabic ? "مدونة سيجما" : "Sigma Blog"}
        </p>
        <h1 className="mt-4 text-3xl font-black text-foreground sm:text-4xl">{title || (isArabic ? "عنوان غير متوفر" : "Untitled")}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {isArabic ? "تم النشر في" : "Published on"} {new Date(post.created_at).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}
        </p>
        <div className="prose prose-sm mt-8 max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: content || "" }} />
      </div>
    </div>
  );
}
