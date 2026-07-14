"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { mergeContent } from "@/lib/merge-content";
import { CheckCircle2 } from "lucide-react";

export default function SupplyPage() {
  const params = useParams();
  const lang = params.lang;
  const isRTL = lang === "ar";

  const [dbContent, setDbContent] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/page-content?key=supply`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data[lang]) {
          setDbContent(data[lang]);
        }
      })
      .catch((err) => console.error("Error loading supply content:", err));
  }, [lang]);

  const fallbackContent = {
    ar: {
      title: "الحلول والتوريدات",
      subtitle: "مواد موثوقة .. معايير مثبتة .. مخزون جاهز.",
      intro: "بصفتها شريكاً تجارياً ومورداً ومخزناً موثوقاً لقطاعات النفط والغاز والطاقة والصناعة، تمتلك سيجما مخزوناً قوياً من المواد والمعدات المعتمدة، مما يتيح استجابة سريعة، ومصادر توريد موثوقة، ودعماً مستمراً للمشاريع عبر متطلبات تشغيلية متنوعة.",
      
      div1Title: "قطاع التوريدات",
      div1Subtitle: "حلول التجارة الاستراتيجية والتخزين والتوريد",
      div1Desc: "مواد موثوقة ومعايير مثبتة — تقوم سيجما بتوريد المواد البترولية والصناعية المعتمدة مع مخزون قوي جاهز للتعبئة والانتشار الفوري.",
      div1Items: [
        "أنابيب خطوط الصلب الكربوني (غير الملحومة والملحومة)، بمقاسات من ¼ بوصة إلى 48 بوصة",
        "وصلات وفلنجات من الصلب الكربوني (Fittings & Flanges)",
        "أنابيب التغليف والتبطين (Casing & Tubing) وفقاً لمعايير API / 5CT",
        "طلاء وتبقين الأنابيب والمواد (Coating & Lining)",
        "الصمامات بأنواعها: الصمامات الكروية، صمامات البوابة، وصمامات عدم الرجوع",
        "ألواح وأنابيب ووصلات الفولاذ المقاوم للصدأ (Stainless Steel)",
        "وصلات وأجهزة القياس والدقة (Instrumentation Fittings)",
        "مواد الهياكل البحرية والإنشائية (Offshore Structural)",
        "صمامات التحكم والتدفق (Control Valves)",
        "مضخات الطرد المركزي متعددة المراحل",
        "مفاتيح الضغط ومقاييس الضغط الصناعية"
      ],
      quote: "من مواد حقول النفط إلى المعدات الصناعية — تقدم سيجما موثوقية يمكنك الاعتماد عليها دائماً."
    },
    en: {
      title: "Supply Solutions",
      subtitle: "Reliable Materials .. Proven Standards .. Ready Stock.",
      intro: "As a trusted trader, stockist, and supplier to the oil & gas, energy, and industrial sectors, SIGMA maintains a robust inventory of certified materials and equipment — enabling rapid response, reliable sourcing, and uninterrupted project support across diverse operational requirements.",
      
      div1Title: "SUPPLY DIVISION",
      div1Subtitle: "Strategic Trading, Stocking & Supply Solutions",
      div1Desc: "Reliable materials and proven standards — SIGMA supplies certified oilfield and industrial materials with a robust inventory ready for rapid mobilization.",
      div1Items: [
        "Carbon Steel Line Pipes (Seamless & Welded), sizes from ¼\" to 48\"",
        "Carbon Steel Fittings & Flanges",
        "Casing and Tubing in accordance with API / 5CT standards",
        "Coating & Lining solutions",
        "Valves: Ball, Gate, and Check Valves",
        "Stainless Steel Plates, Pipes, and Pipe Fittings",
        "Instrumentation Fittings",
        "Offshore Structural Materials",
        "Control Valves",
        "Multistage Centrifugal Pumps",
        "Pressure Switches & Pressure Gauges"
      ],
      quote: "From oilfield materials to industrial equipment — SIGMA delivers reliability you can trust."
    }
  }[lang] || { ar: {}, en: {} };

  const content = mergeContent(fallbackContent, dbContent);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#002244] to-[#000f22] dark:from-[#0b1322] dark:to-[#040711] text-white py-20 md:py-28 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,28,36,0.15),transparent_50%)] pointer-events-none" />
        <div className="container mx-auto max-w-5xl px-6 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">
            {isRTL ? "قطاع التوريدات" : "SUPPLY DIVISION"}
          </span>
          <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-tight">
            {content.title}
          </h1>
          <p className="text-zinc-300 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {content.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-5xl px-6 py-16 md:py-24 space-y-24">
        
        {/* Intro Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-medium">
            {content.intro}
          </p>
          <div className="w-16 h-1 bg-primary/30 mx-auto rounded-full" />
        </div>

        {/* Division 1 Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Text & List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-4xl font-black text-[#003366] dark:text-white leading-tight">
                {content.div1Subtitle}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
                {content.div1Desc}
              </p>
            </div>

            {/* List Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/20">
              {content.div1Items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-card border border-border/20 shadow-sm hover:border-primary/20 transition-colors">
                  <CheckCircle2 className="h-4.5 w-4.5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm font-semibold text-muted-foreground leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Two Images Grid */}
          <div className="lg:col-span-5 space-y-4">
            <a 
              href="/new/5/IMG_1184.PNG" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative h-[220px] md:h-[230px] w-full rounded-[32px] overflow-hidden shadow-2xl bg-muted border border-border/30 group block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/new/5/IMG_1184.PNG" 
                alt="Strategic Supply Solutions" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-4 start-4 text-[9px] font-black text-white bg-primary px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm select-none">
                {isRTL ? "مستودعات وتخزين" : "CERTIFIED PIPE STOCKYARDS"}
              </span>
            </a>
            <a 
              href="/new/5/IMG_1183.PNG" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative h-[220px] md:h-[230px] w-full rounded-[32px] overflow-hidden shadow-2xl bg-muted border border-border/30 group block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/new/5/IMG_1183.PNG" 
                alt="Strategic Supply Materials" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-4 start-4 text-[9px] font-black text-white bg-primary px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm select-none">
                {isRTL ? "مواد وحلول التوريد" : "SUPPLY & LOGISTICS"}
              </span>
            </a>
          </div>
        </div>

        {/* Quote Banner */}
        <div className="bg-muted/30 p-8 rounded-[32px] border border-border/20 text-center relative overflow-hidden shadow-inner max-w-4xl mx-auto">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#E61C24]/5 blur-[80px] pointer-events-none -z-10" />
          <p className="text-sm md:text-lg font-black text-[#003366] dark:text-white italic leading-relaxed">
            "{content.quote}"
          </p>
        </div>

      </div>
    </div>
  );
}
