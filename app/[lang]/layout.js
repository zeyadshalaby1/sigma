import { Inter, Cairo } from "next/font/google";
import { getDictionary, locales } from "@/i18n/dictionaries";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { VisitorConsent } from "@/components/visitor-consent";
import { Toaster } from "sonner";
import { Pool } from "pg";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-sans",
  subsets: ["arabic", "latin"],
});

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_Dcw9muxJz0TE@ep-hidden-breeze-atjfzdrq-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: { rejectUnauthorized: false },
});

const fetchSocialLinks = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS social_links (
      id SERIAL PRIMARY KEY,
      social_data JSONB NOT NULL DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  const result = await pool.query(
    "SELECT social_data FROM social_links ORDER BY updated_at DESC LIMIT 1"
  );

  return result.rows[0]?.social_data || {
    facebook: "https://www.facebook.com/zeyad.haytham.abass",
    instagram: "",
    youtube: "",
    linkedin: "",
    twitter: "",
    whatsapp: "",
  };
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sigmapetroleum.com";

  return {
    title: {
      default: dict.metadata.title,
      template: `%s | Sigma Petroleum Services`,
    },
    description: dict.metadata.description,
    keywords: dict.metadata.keywords,
    authors: [{ name: "Zeyad Shalaby", url: "https://www.facebook.com/zeyad.haytham.abass" }],
    creator: "Zeyad Shalaby",
    publisher: "Sigma Petroleum Services",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
      },
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      locale: lang === "ar" ? "ar_SA" : "en_US",
      alternateLocale: lang === "ar" ? "en_US" : "ar_SA",
      type: "website",
      siteName: "Sigma Petroleum Services",
      url: `${baseUrl}/${lang}`,
      images: [
        {
          url: `/Sigma website/Sigma Logo/Orignal Logo.png`,
          width: 1200,
          height: 630,
          alt: dict.seo?.og_image_alt || "Sigma Petroleum Services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: [`/Sigma website/Sigma Logo/Orignal Logo.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // Add real values when available
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
    },
    category: "technology",
  };
}

// JSON-LD Schema for Organization
function OrganizationSchema({ lang, dict, baseUrl, socialLinks }) {
  const sameAs = [
    socialLinks?.facebook,
    socialLinks?.instagram,
    socialLinks?.youtube,
    socialLinks?.linkedin,
    socialLinks?.twitter,
    socialLinks?.whatsapp,
    "https://www.facebook.com/zeyad.haytham.abass",
  ].filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sigma Petroleum Services",
    alternateName: "سيجما للخدمات البترولية",
    url: baseUrl,
    logo: `${baseUrl}/Sigma website/Sigma Logo/Orignal Logo.png`,
    description: dict.seo?.schema_description || dict.metadata.description,
    foundingDate: dict.seo?.schema_founding_year || "2020",
    address: {
      "@type": "PostalAddress",
      addressLocality: dict.seo?.schema_address_locality || "Cairo",
      addressCountry: dict.seo?.schema_address_country || "Egypt",
    },
    areaServed: {
      "@type": "GeoCircle",
      name: dict.seo?.schema_area_served || "Middle East, Africa",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+20-123-456-7890",
      contactType: "customer service",
      availableLanguage: ["Arabic", "English"],
    },
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// JSON-LD Schema for Website (with SearchAction)
function WebSiteSchema({ lang, baseUrl }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sigma Petroleum Services",
    alternateName: "سيجما للخدمات البترولية",
    url: baseUrl,
    inLanguage: lang === "ar" ? "ar" : "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// JSON-LD Breadcrumb schema
function BreadcrumbSchema({ lang, baseUrl }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "ar" ? "الرئيسية" : "Home",
        item: `${baseUrl}/${lang}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// JSON-LD LocalBusiness schema
function LocalBusinessSchema({ dict, baseUrl }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Sigma Petroleum Services",
    image: `${baseUrl}/Sigma website/Sigma Logo/Orignal Logo.png`,
    url: baseUrl,
    telephone: "+20-123-456-7890",
    email: "info@sigmapetroleum.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: dict.seo?.schema_address_locality || "Cairo",
      addressCountry: dict.seo?.schema_address_country || "EG",
    },
    priceRange: "$$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "17:00",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";
  const fontClass = lang === "ar" ? cairo.variable : inter.variable;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sigmapetroleum.com";
  const socialLinks = await fetchSocialLinks();

  return (
    <>
      <html lang={lang} dir={dir} className={fontClass} suppressHydrationWarning>
        <head>
          <link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
          <link rel="alternate" hrefLang="ar" href={`${baseUrl}/ar`} />
          <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en`} />
          <link rel="icon" href="/Sigma website/Sigma Logo/Orignal Logo.png" />
          <link rel="apple-touch-icon" href="/Sigma website/Sigma Logo/Orignal Logo.png" />
          <meta name="theme-color" content="#003366" />

          {/* JSON-LD Structured Data */}
          <OrganizationSchema lang={lang} dict={dict} baseUrl={baseUrl} socialLinks={socialLinks} />
          <WebSiteSchema lang={lang} baseUrl={baseUrl} />
          <BreadcrumbSchema lang={lang} baseUrl={baseUrl} />
          <LocalBusinessSchema dict={dict} baseUrl={baseUrl} />
        </head>
        <body className="min-h-screen flex flex-col bg-background font-sans antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header lang={lang} dict={dict} />
            <main className="flex-1">{children}</main>
            <Footer dict={dict} socialLinks={socialLinks} />
            <VisitorConsent lang={lang} />
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
