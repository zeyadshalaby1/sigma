"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Briefcase, ChevronRight, ChevronLeft } from "lucide-react";

export default function TimelinePage({ params }) {
  const resolvedParams = React.use(params);
  const lang = resolvedParams.lang;
  const isRTL = lang === "ar";

  const content = {
    ar: {
      title: "مسيرة النمو والتوسع",
      subtitle: "25 عاماً من الإنجازات والنمو المستمر في تقديم الحلول النفطية المتكاملة.",
      timelineTitle: "مخطط النمو والتوسع الزمني",
      timelineSubtitle: "بناء القدرات وتوسيع النطاق وتحقيق النتائج — معالم بارزة تحدد مسيرتنا الناجحة.",
      events: [
        { year: "2001", title: "تأسيس سيجما للخدمات البترولية", desc: "تأسست الشركة لتقديم خدمات حقول النفط وحلول الإنتاج المبتكرة." },
        { year: "2007", title: "بدء التوسع الإقليمي", desc: "افتتاح أول فرع دولي لسيجما في سلطنة عمان، مما أدى إلى توسيع العمليات خارج مصر." },
        { year: "2010", title: "الدخول إلى السوق السوري", desc: "الفوز بأول مشروع للشركة في سوريا، وتوسيع بصمتها الإقليمية." },
        { year: "2013", title: "أول منشأة لمعالجة الغاز", desc: "تسليم أول مشروع لمعالجة الغاز بسعة 60 مليون قدم مكعب قياسي يومياً لصالح شركة SUCO." },
        { year: "2014", title: "إطلاق خدمات اختبار الآبار", desc: "توسيع محفظة الخدمات من خلال إدخال حلول اختبار الآبار المتكاملة." },
        { year: "2015", title: "معلم بارز في ضغط الغاز", desc: "تنفيذ أول مشروع لضغط الغاز في الصحراء الغربية بمصر." },
        { year: "2016", title: "مشروع نيدوكو العملاق", desc: "تسليم مشروع نيدوكو التاريخي (EPF)، لمعالجة 540 مليون قدم مكعب قياسي يومياً وتغذية محطة طاقة ضخمة." },
        { year: "2018", title: "إدخال خدمات وحدات السحب (Pulling Unit)", desc: "تعزيز قدرات التدخل في الآبار من خلال إدخال عمليات وحدات السحب." },
        { year: "2022", title: "الاستدامة وتقليل الانبعاثات", desc: "تشغيل أول منشأة لمعالجة وإعادة حقن المياه المنتجة وتسليم أول مشروع لتقليل حرق الغاز صفر (Zero-flare)." },
        { year: "2023", title: "التوسع في المغرب", desc: "تأسيس العمليات في المغرب، مما يعزز وجود سيجما في شمال أفريقيا." },
        { year: "2024", title: "المشروع الأول في ليبيا", desc: "تأمين وتنفيذ أول مشروع لشركة سيجما بنجاح في الأراضي الليبية." },
        { year: "2025", title: "تأسيس فرع المملكة العربية السعودية", desc: "افتتاح وجود دائم في السعودية لدعم النمو عبر دول مجلس التعاون الخليجي." },
        { year: "2026", title: "التوسع في الجزائر وكينيا", desc: "الفوز بأولى مشاريع الشركة في الجزائر وكينيا، مما يمثل استمرار النمو في أفريقيا." }
      ]
    },
    en: {
      title: "25 Years of Growth",
      subtitle: "Milestones that define our success — building capability, expanding reach, and delivering results.",
      timelineTitle: "Growth & Expansion Timeline",
      timelineSubtitle: "Building capability, expanding reach, delivering results — milestones that define our success.",
      events: [
        { year: "2001", title: "Sigma Petroleum Services Founded", desc: "Established to deliver innovative oilfield services and production solutions." },
        { year: "2007", title: "Regional Expansion Begins", desc: "Opened Sigma’s first international branch in Oman, extending operations beyond Egypt." },
        { year: "2010", title: "Entry into Syria", desc: "Awarded the company’s first project in Syria, expanding its regional footprint." },
        { year: "2013", title: "First Gas Processing Facility", desc: "Delivered Sigma’s first gas treatment project with a capacity of 60 MMSCFD for SUCO." },
        { year: "2014", title: "Well Testing Services Launched", desc: "Expanded the service portfolio with integrated well testing solutions." },
        { year: "2015", title: "Gas Compression Milestone", desc: "Executed the first gas compression project in Egypt’s Western Desert." },
        { year: "2016", title: "Nidoco Mega Project", desc: "Delivered the landmark Nidoco EPF, processing 540 MMSCFD and supplying gas to a major combined-cycle power plant." },
        { year: "2018", title: "Pulling Unit Services Introduced", desc: "Enhanced well intervention capabilities through the addition of pulling unit operations." },
        { year: "2022", title: "Sustainability & Emissions Reduction Milestone", desc: "Commissioned the first produced water treatment and reinjection facility and delivered Sigma’s first zero-gas-flare project." },
        { year: "2023", title: "Expansion into Morocco", desc: "Established operations in Morocco, strengthening Sigma’s North African presence." },
        { year: "2024", title: "First Project in Libya", desc: "Successfully secured and executed Sigma’s first Libyan project." },
        { year: "2025", title: "Saudi Arabia Branch Established", desc: "Opened a permanent presence in Saudi Arabia to support growth across the GCC." },
        { year: "2026", title: "Expansion into Algeria & Kenya", desc: "Awarded the company’s first projects in Algeria and Kenya, marking continued growth across Africa." }
      ]
    }
  }[lang] || { ar: {}, en: {} };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#002244] to-[#000f22] dark:from-[#0b1322] dark:to-[#040711] text-white py-20 md:py-28 border-b border-white/5">
        {/* Pulsing glow blob */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,28,36,0.15),transparent_50%)] pointer-events-none" />
        <div className="container mx-auto max-w-5xl px-6 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? "تاريخ سيجما" : "GROWTH & legacy"}</span>
          <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-tight">
            {content.title}
          </h1>
          <p className="text-zinc-300 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {content.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-3xl px-6 py-16 md:py-24 space-y-16">
        
        {/* Section 0: Timeline Image Overview map */}
        <div className="bg-card p-6 md:p-8 rounded-[32px] border border-border/30 shadow-xl text-center space-y-6">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? "خريطة المعالم" : "MILESTONE TIMELINE MAP"}</span>
            <h3 className="text-lg md:text-2xl font-black text-[#003366] dark:text-white leading-tight">
              {isRTL ? "مخطط مسيرة النمو والتوسع" : "Milestone Overview Map"}
            </h3>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-border/20 max-w-4xl mx-auto bg-muted/20 p-4 md:p-6 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/Sigma website/time line.png" 
              alt="Sigma Timeline Chart" 
              className="max-h-[350px] object-contain rounded-xl hover:scale-102 transition-transform duration-300 filter dark:brightness-95 dark:contrast-105" 
            />
          </div>
        </div>

        {/* Section 1: Detailed Interactive Timeline Tree */}
        <div className="relative border-s-2 border-primary/20 dark:border-primary/10 ms-4 md:ms-8 space-y-12 pt-6">
          {content.events.map((event, index) => (
            <div key={index} className="relative ps-8 group">
              {/* Bullet indicator */}
              <span className={`absolute -start-[11px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border bg-background text-xs font-bold transition-all duration-300 group-hover:scale-110 group-hover:border-primary ${
                index % 2 === 0 ? "border-[#003366] dark:border-white" : "border-primary"
              }`}>
                <span className={`h-2.5 w-2.5 rounded-full ${
                  index % 2 === 0 ? "bg-[#003366] dark:bg-white" : "bg-primary"
                }`} />
              </span>

              {/* Time tag */}
              <div className="inline-flex items-center rounded-xl px-3 py-1 text-xs font-bold bg-primary/10 text-primary mb-2 shadow-sm">
                <Calendar className="h-3.5 w-3.5 me-1.5" />
                {event.year}
              </div>

              {/* Event card */}
              <Card className="border border-border/30 hover:shadow-2xl hover:border-primary/20 transition-all duration-300 transform group-hover:translate-x-1.5 duration-300 rounded-3xl bg-card overflow-hidden">
                <CardHeader className="pb-2 px-6">
                  <CardTitle className="text-base md:text-lg font-extrabold text-[#003366] dark:text-white flex items-center gap-2 leading-snug">
                    <Briefcase className="h-4.5 w-4.5 text-primary shrink-0" />
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed font-medium">
                    {event.desc}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

