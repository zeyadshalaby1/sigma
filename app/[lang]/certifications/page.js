"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, Flame, Scale, Lightbulb, Compass, Award, Clock } from "lucide-react";
import { useParams } from "next/navigation";
import { mergeContent } from "@/lib/merge-content";
import { useState, useEffect } from "react";

export default function CertificationsPage() {
  const params = useParams();
  const lang = params.lang;
  const isRTL = lang === "ar";

  const [dbContent, setDbContent] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/page-content?key=certifications`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data[lang]) {
          setDbContent(data[lang]);
        }
      })
      .catch((err) => console.error("Error loading certifications page content:", err));
  }, [lang]);

  const fallbackContent = {
    ar: {
      title: "شهاداتنا وقيمنا",
      subtitle: "الجودة ليست مجرد وعد، بل هي الأساس الذي نبني عليه نجاح عملائنا وعملياتنا.",
      certSectionTitle: "الشهادات العالمية للجودة",
      certSectionDesc: "نحن نحافظ على مستويات عالية من الكفاءة والسلامة المهنية من خلال اعتماد معايير الجودة العالمية.",
      valuesSectionTitle: "قيمنا الأساسية وتوجهاتنا",
      valuesSectionDesc: "المبادئ التوجيهية التي تقود قراراتنا التشغيلية وتحدد أسلوب عملنا يومياً.",
      certs: [
        {
          code: "ISO 9001",
          title: "إدارة الجودة الشاملة",
          desc: "تقديم خدمات ومنتجات عالية الجودة باستمرار تلبي جميع معايير العملاء والاشتراطات التنظيمية والرقابية.",
          icon: Award
        },
        {
          code: "ISO 14001",
          title: "الإدارة البيئية المستدامة",
          desc: "عمليات مستدامة بيئياً مدعومة بنظام متكامل وفعال لحماية البيئة والحد من استهلاك الموارد المهدورة.",
          icon: ShieldCheck
        },
        {
          code: "OHSAS 18001",
          title: "السلامة والصحة المهنية",
          desc: "إعطاء الأولوية القصوى لسلامة العاملين والشركاء في الحقول من خلال تطبيق معايير السلامة المعترف بها دولياً.",
          icon: CheckCircle
        }
      ],
      values: [
        {
          title: "بنيت على مدار 50 عاماً",
          desc: "ثقة تم اكتسابها من خلال خمسة عقود من الدقة وحفظ الوعود وبناء شراكات موثوقة طويلة الأمد.",
          icon: Clock
        },
        {
          title: "دفع الحدود وتحدي الصعاب",
          desc: "نسترشد بالأخلاقيات والمسؤولية لتقديم حلول تدفع باتجاه النجاح وتحمي البيئة في آن واحد.",
          icon: Compass
        },
        {
          title: "الابتكار يلتقي بالفرص",
          desc: "الجمع بين الانتشار العالمي والخبرة المحلية من خلال فريق عمل من المتخصصين المهرة حول العالم.",
          icon: Lightbulb
        },
        {
          title: "السرعة تلتقي بالكمال",
          desc: "العمل بمرونة تامة ونشاط يشبه الشركات الناشئة، مدعوماً بخبرة رائدة في الصناعة دون أي تأخير.",
          icon: Scale
        }
      ]
    },
    en: {
      title: "Certified to Lead",
      subtitle: "Quality isn't just a promise — it's our foundation. Our values showcase our commitment.",
      certSectionTitle: "Our ISO & Safety Certifications",
      certSectionDesc: "We continuously maintain and audit our systems in accordance with global quality and health standards.",
      valuesSectionTitle: "Our Core Operational Values",
      valuesSectionDesc: "The guiding principles that shape our daily workspace and power our project execution.",
      certs: [
        {
          code: "ISO 9001",
          title: "Quality Management",
          desc: "Consistently high-quality products and services that meet all customer, legal, and regulatory standards.",
          icon: Award
        },
        {
          code: "ISO 14001",
          title: "Environmental Management",
          desc: "Sustainable processes powered by an effective environmental management system to reduce footprint.",
          icon: ShieldCheck
        },
        {
          code: "OHSAS 18001",
          title: "Occupational Health & Safety",
          desc: "Prioritizing field safety with internationally recognized health and safety standards across all projects.",
          icon: CheckCircle
        }
      ],
      values: [
        {
          title: "Built Over 50 Years",
          desc: "Trust earned through five decades of precision, promise-keeping, and reliable partnerships.",
          icon: Clock
        },
        {
          title: "Pushing Boundaries",
          desc: "Guided by ethics and responsibility, delivering solutions that drive success and protect the environment.",
          icon: Compass
        },
        {
          title: "Innovation Meets Opportunity",
          desc: "Combining global reach with local expertise through a team of skilled specialists worldwide.",
          icon: Lightbulb
        },
        {
          title: "Speed Meets Perfection",
          desc: "Operating with start-up agility backed by industry-leader expertise — fast, efficient, no delays.",
          icon: Scale
        }
      ]
    }
  }[lang] || { ar: {}, en: {} };

  const content = mergeContent(fallbackContent, dbContent);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#002244] to-[#000f22] dark:from-[#0b1322] dark:to-[#040711] text-white py-20 md:py-28 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,28,36,0.15),transparent_50%)]" />
        <div className="container mx-auto max-w-5xl px-6 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? "شهاداتنا وقيمنا" : "COMPLIANCE & QUALITY"}</span>
          <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-tight">
            {content.title}
          </h1>
          <p className="text-zinc-300 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {content.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-5xl px-6 py-16 md:py-24 space-y-20">
        
        {/* Section 1: ISO Certifications */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? "معايير الامتثال" : "GLOBAL COMPLIANCE STANDARDS"}</span>
            <h2 className="text-2xl md:text-4xl font-black text-[#003366] dark:text-white leading-tight">
              {content.certSectionTitle}
            </h2>
            <p className="text-muted-foreground text-sm font-semibold">
              {content.certSectionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.certs.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <Card key={i} className="border-border/30 hover:shadow-2xl hover:border-primary/20 transition-all duration-300 rounded-[28px] bg-card overflow-hidden group transform hover:-translate-y-1 flex flex-col justify-between">
                  <CardHeader className="pb-3 px-6 pt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20 tracking-wider">
                        {cert.code}
                      </span>
                      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-base font-extrabold text-[#003366] dark:text-white mt-4">
                      {cert.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-medium">
                      {cert.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Section 2: Values */}
        <div className="space-y-12 pt-16 border-t border-border/20">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? "ركائزنا الأساسية" : "OUR CORE ROCKS"}</span>
            <h2 className="text-2xl md:text-4xl font-black text-[#003366] dark:text-white leading-tight">
              {content.valuesSectionTitle}
            </h2>
            <p className="text-muted-foreground text-sm font-semibold">
              {content.valuesSectionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div key={i} className="flex gap-4 p-6 rounded-[28px] bg-card border border-border/30 hover:shadow-2xl hover:border-primary/15 transition-all duration-300 transform hover:-translate-y-0.5">
                  <div className="p-3 rounded-2xl bg-muted text-primary h-fit border border-border/20 shadow-sm shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-[#003366] dark:text-white text-sm md:text-base leading-snug">
                      {value.title}
                    </h4>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-medium">
                      {value.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
