export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sigmagroupegypt.com";

  const routes = ["", "#about", "#services", "#contact"];
  const locales = ["en", "ar"];

  const urls = [];

  for (const locale of locales) {
    for (const route of routes) {
      urls.push({
        url: `${baseUrl}/${locale}${route ? `/${route}` : ""}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route ? `/${route}` : ""}`,
            ar: `${baseUrl}/ar${route ? `/${route}` : ""}`,
          },
        },
      });
    }
  }

  return urls;
}
