import Link from "next/link";
import { Pool } from "pg";
import { notFound } from "next/navigation";

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_Dcw9muxJz0TE@ep-hidden-breeze-atjfzdrq-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: { rejectUnauthorized: false },
});

async function getPosts() {
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

  const result = await pool.query(
    "SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC"
  );
  return result.rows;
}

export default async function BlogPage({ params }) {
  const { lang } = await params;
  const posts = await getPosts();

  if (!posts.length) {
    return notFound();
  }

  const isArabic = lang === "ar";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003366]/5 via-background to-primary/5 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {isArabic ? "المدونة" : "Blog"}
          </p>
          <h1 className="mt-3 text-4xl font-black text-foreground sm:text-5xl">
            {isArabic ? "أحدث المقالات والحديث التقني" : "Latest insights and technical updates"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            {isArabic
              ? "اقرأ أحدث المقالات بالعربية والإنجليزية من سيجما، مع تحديثات فنية ومحتوى عملي." : "Read the latest Arabic and English articles from Sigma with practical updates and technical insights."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => {
            const title = isArabic ? post.title_ar || post.title_en : post.title_en || post.title_ar;
            const excerpt = isArabic ? post.excerpt_ar || post.excerpt_en : post.excerpt_en || post.excerpt_ar;
            return (
              <article key={post.id} className="rounded-[28px] border border-border/30 bg-card/90 p-6 shadow-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  {new Date(post.created_at).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}
                </p>
                <h2 className="mt-3 text-2xl font-black text-foreground">{title || (isArabic ? "عنوان غير متوفر" : "Untitled")}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {excerpt || (isArabic ? "لا يوجد وصف لهذا المقال بعد." : "No excerpt available yet.")}
                </p>
                <Link href={`/${lang}/blog/${post.slug}`} className="mt-6 inline-flex items-center font-bold text-primary hover:underline">
                  {isArabic ? "اقرأ المزيد" : "Read more"}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
