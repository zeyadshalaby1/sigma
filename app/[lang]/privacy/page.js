import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Eye, Lock, FileText } from "lucide-react";
import { getLegalPage } from "@/lib/legal-pages";

function renderParagraphs(content) {
  if (!content) return [];
  return content.split(/\n\s*\n/).map((paragraph, index) => (
    <p key={index} className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light mb-4">
      {paragraph}
    </p>
  ));
}

export default async function PrivacyPage({ params }) {
  const lang = params.lang;
  const isRTL = lang === "ar";
  const dbPage = await getLegalPage("privacy");

  const fallback = {
    ar: {
      title: "سياسة الخصوصية وحماية البيانات",
      subtitle: "نلتزم بأعلى معايير الأمان وحماية سرية البيانات الشخصية والتجارية لعملائنا وشركائنا.",
      lastUpdated: "آخر تحديث: يوليو 2026",
      sections: [
        {
          title: "1. جمع المعلومات واستخدامها",
          desc: "نقوم بجمع المعلومات الفنية والتجارية المحدودة التي تقدمها لنا طواعية عبر نموذج الاتصال، مثل الاسم، البريد الإلكتروني، والشركة، وذلك للتواصل وتطوير مقترحات الخدمات الهندسية فقط.",
          icon: Eye,
        },
        {
          title: "2. حماية وتشفير البيانات",
          desc: "نطبق تدابير أمنية تقنية وإدارية صارمة لمنع الوصول غير المصرح به أو الكشف عن بياناتك. يتم نقل وتخزين المعلومات الحساسة الخاصة بالعقود الفنية عبر شبكات آمنة ومشفرة.",
          icon: Lock,
        },
        {
          title: "3. عدم مشاركة البيانات مع أطراف ثالثة",
          desc: "سيجما للخدمات البترولية لا تقوم ببيع أو تأجير أو مشاركة أي بيانات شخصية أو تجارية مع جهات خارجية، باستثناء الشركاء والمشغلين الرسميين للمشاريع وبموافقة كتابية مسبقة.",
          icon: ShieldCheck,
        },
        {
          title: "4. ملفات تعريف الارتباط (Cookies)",
          desc: "يستخدم موقعنا ملفات تعريف الارتباط الأساسية لتحسين تجربة المستخدم وتحليل حركة المرور للموقع بشكل مجهول الهوية دون تسجيل تفاصيل شخصية دقيقة.",
          icon: FileText,
        },
      ],
    },
    en: {
      title: "Privacy & Data Protection Policy",
      subtitle: "We maintain the highest standards of safety, privacy, and confidentiality for all client and partner data.",
      lastUpdated: "Last Updated: July 2026",
      sections: [
        {
          title: "1. Data Collection & Usage",
          desc: "We only collect limited corporate and technical information submitted voluntarily via our contact form (e.g. name, email, company) to respond to engineering inquiries and proposal requests.",
          icon: Eye,
        },
        {
          title: "2. Data Security & Encryption",
          desc: "We implement advanced administrative and technical safety protocols to prevent unauthorized access or leakage of your commercial data. Technical specs are encrypted during transmission.",
          icon: Lock,
        },
        {
          title: "3. Non-Disclosure & Third Parties",
          desc: "Sigma Petroleum Services does not sell, lease, or share your company information with third-party vendors, except with official joint venture partners under strict non-disclosure agreement parameters.",
          icon: ShieldCheck,
        },
        {
          title: "4. Cookie Usage",
          desc: "Our website uses standard technical cookies to verify traffic patterns and improve load speeds anonymously without tracking individual user identities.",
          icon: FileText,
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
        {/* Header */}
        <div className="space-y-4 text-center md:text-start">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">{dbPage ? `Updated: ${new Date(dbPage.updated_at).toLocaleDateString()}` : defaultContent.lastUpdated}</span>
          <h1 className="text-3xl md:text-5xl font-black text-[#003366] dark:text-white leading-tight">
            {title}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl font-light">
            {subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {body ? (
            <Card className="border-border/30 rounded-3xl overflow-hidden bg-card transition-all hover:shadow-sm">
              <CardContent className="p-6 md:p-8">
                {renderParagraphs(body)}
              </CardContent>
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
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light pl-1 md:pl-14">
                      {sec.desc}
                    </p>
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
