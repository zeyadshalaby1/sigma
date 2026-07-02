import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Heart, Trash2, Flame } from "lucide-react";
import { getLegalPage } from "@/lib/legal-pages";

function renderParagraphs(content) {
  if (!content) return [];
  return content.split(/\n\s*\n/).map((paragraph, index) => (
    <p key={index} className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light mb-4">
      {paragraph}
    </p>
  ));
}

export default async function HSSEPage({ params }) {
  const lang = params.lang;
  const dbPage = await getLegalPage("hsse");

  const fallback = {
    ar: {
      title: "سياسة الصحة والسلامة والبيئة (HSSE)",
      subtitle: "نلتزم بوضع حماية العنصر البشري والمحافظة على البيئة في قلب جميع عملياتنا البترولية والميدانية.",
      lastUpdated: "آخر تحديث: يوليو 2026",
      sections: [
        {
          title: "1. صحة وسلامة العنصر البشري",
          desc: "نسعى جاهدين لتوفير بيئة عمل صحية وآمنة وخالية من الحوادث لكافة العاملين والشركاء والمقاولين في الحقول ومرافق الإنتاج المبكر.",
          icon: Heart,
        },
        {
          title: "2. السلامة التشغيلية والوقاية",
          desc: "نطبق معايير سلامة تشغيلية صارمة للوقاية من الحرائق والحوادث الهندسية وتخفيف المخاطر المرافقة لعمليات اختبار الآبار وضغط الغاز.",
          icon: ShieldCheck,
        },
        {
          title: "3. خفض الانبعاثات والحد من الاحتراق",
          desc: "نتبنى تقنيات هندسية متطورة للحد من حرق الغاز الروتيني (Zero Gas Flaring) وتحويل الغاز المصاحب إلى طاقة مفيدة لتقليل البصمة الكربونية.",
          icon: Flame,
        },
        {
          title: "4. إدارة النفايات والمياه المنتجة",
          desc: "معالجة المياه المنتجة بنسب كفاءة تتجاوز 95% وإعادة حقنها للحفاظ على سلامة طبقات الأرض وتجنب تلوث المياه السطحية والجوفية.",
          icon: Trash2,
        },
      ],
    },
    en: {
      title: "Health, Safety, Security & Environment (HSSE)",
      subtitle: "We put human life and environmental protection at the center of all our technical and field petroleum operations.",
      lastUpdated: "Last Updated: July 2026",
      sections: [
        {
          title: "1. Health & Safe Workplace",
          desc: "We are committed to providing a secure, healthy, and incident-free working environment for all personnel, operators, and sub-contractors on early production facilities.",
          icon: Heart,
        },
        {
          title: "2. Process Safety Management",
          desc: "We enforce strict process safety reviews, automated Emergency Shutdown (ESD) barriers, and rigorous field audits to prevent active well-testing and compression incidents.",
          icon: ShieldCheck,
        },
        {
          title: "3. Emissions & Gas Flaring Reduction",
          desc: "We promote zero-routine-flaring programs, capturing greenhouse gases and associated streams to transform emissions into clean electricity feeds.",
          icon: Flame,
        },
        {
          title: "4. Waste & Water Stewardship",
          desc: "We clean and recycle produced water up to 95% efficiency for reservoir pressure reinjection, avoiding superficial soil contamination and protecting water tables.",
          icon: Trash2,
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
