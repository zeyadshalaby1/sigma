import { Card, CardContent } from "@/components/ui/card";
import { Scale, ShieldAlert, FileText, HelpCircle } from "lucide-react";
import { getLegalPage } from "@/lib/legal-pages";

function renderParagraphs(content) {
  if (!content) return [];
  return content.split(/\n\s*\n/).map((paragraph, index) => (
    <p key={index} className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light mb-4">
      {paragraph}
    </p>
  ));
}

export default async function TermsPage({ params }) {
  const lang = params.lang;
  const dbPage = await getLegalPage("terms");

  const fallback = {
    ar: {
      title: "شروط وأحكام الاستخدام",
      subtitle: "يرجى قراءة شروط الاستخدام هذه بعناية قبل تصفح الموقع الإلكتروني الرسمي لسيجما للخدمات البترولية.",
      lastUpdated: "آخر تحديث: يوليو 2026",
      sections: [
        {
          title: "1. الملكية الفكرية وحقوق النشر",
          desc: "جميع المواد المعروضة على هذا الموقع، بما في ذلك الشعارات، النصوص، المخططات البيانية والصور الفوتوغرافية، هي ملك حصري لشركة سيجما للخدمات البترولية ومجموعة سيجما (Sigma Group) ومحمية بقوانين الملكية الفكرية الدولية والمحلية.",
          icon: ShieldAlert,
        },
        {
          title: "2. إخلاء المسؤولية القانونية",
          desc: "المعلومات الفنية والبيانات الإحصائية للمشاريع ومعدلات الأداء (مثل تفاصيل سعات محطات الغاز) هي لأغراض العرض التعريفي والتسويقي العام فقط. ولا تعتبر عروضاً تعاقدية ملزمة أو بديلاً عن وثائق المناقصات والعقود المبرمة رسمياً.",
          icon: Scale,
        },
        {
          title: "3. الاستخدام المقبول للموقع",
          desc: "يُحظر استخدام هذا الموقع في أي أغراض غير قانونية أو ضارة بالبنية التحتية البرمجية للموقع، بما في ذلك محاولات حقن الأكواد الضارة أو استخراج البيانات غير المصرح بها.",
          icon: FileText,
        },
        {
          title: "4. القانون الواجب التطبيق",
          desc: "تخضع شروط الاستخدام هذه وتفسر وفقاً للقوانين والأنظمة المعمول بها في جمهورية مصر العربية، ويكون للمحاكم المصرية الاختصاص القضائي الحصري للفصل في أي نزاع ينشأ عنها.",
          icon: HelpCircle,
        },
      ],
    },
    en: {
      title: "Terms & Conditions of Use",
      subtitle: "Please read these terms and conditions carefully before browsing the official Sigma Petroleum Services website.",
      lastUpdated: "Last Updated: July 2026",
      sections: [
        {
          title: "1. Intellectual Property & Copyright",
          desc: "All content displayed on this website, including logos, trademarks, texts, timeline graphics, and field photos, are the exclusive intellectual property of Sigma Petroleum Services and Sigma Group, protected under international copyright treaties.",
          icon: ShieldAlert,
        },
        {
          title: "2. Legal Disclaimer of Info",
          desc: "The technical performance data and project capacities listed (e.g. gas plant metrics) are for marketing and general informational purposes only. They do not constitute official contractual offers or binding technical sheets.",
          icon: Scale,
        },
        {
          title: "3. Acceptable Website Usage",
          desc: "You agree not to use this website for any unlawful activities or in ways that could damage the hosting servers, including malicious code injection, web scraping, or unauthorized server penetration attempts.",
          icon: FileText,
        },
        {
          title: "4. Governing Law & Jurisdiction",
          desc: "These terms of use are governed by and construed in accordance with the laws of the Arab Republic of Egypt, and any disputes shall be referred to the exclusive jurisdiction of the competent courts of Egypt.",
          icon: HelpCircle,
        },
      ],
    },
  };

  const defaultContent = fallback[lang] || fallback.en;
  const title = dbPage ? (lang === "ar" ? dbPage.title_ar || dbPage.title_en : dbPage.title_en || dbPage.title_ar) : defaultContent.title;
  const subtitle = dbPage ? (lang === "ar" ? dbPage.subtitle_ar || dbPage.subtitle_en : dbPage.subtitle_en || dbPage.subtitle_ar) : defaultContent.subtitle;
  const body = dbPage ? (lang === "ar" ? dbPage.content_ar || dbPage.content_en : dbPage.content_en || dbPage.content_ar) : null;

  return (
    <div className="min-h-screen bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-3xl px-6 space-y-12">
        <div className="space-y-4 text-center md:text-start">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">{dbPage ? `Updated: ${new Date(dbPage.updated_at).toLocaleDateString()}` : defaultContent.lastUpdated}</span>
          <h1 className="text-3xl md:text-5xl font-black text-[#003366] dark:text-white leading-tight">{title}</h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl font-light">{subtitle}</p>
        </div>

        <div className="space-y-6">
          {body ? (
            <Card className="border-border/30 rounded-3xl overflow-hidden bg-card transition-all hover:shadow-sm">
              <CardContent className="p-6 md:p-8">{renderParagraphs(body)}</CardContent>
            </Card>
          ) : (
            defaultContent.sections.map((sec, i) => {
              const Icon = sec.icon;
              return (
                <Card key={i} className="border-border/30 rounded-3xl overflow-hidden bg-card transition-all hover:shadow-sm">
                  <CardContent className="p-6 md:p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-primary/10 text-primary w-fit">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-extrabold text-base md:text-lg text-[#003366] dark:text-white">{sec.title}</h3>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light pl-1 md:pl-14">{sec.desc}</p>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
