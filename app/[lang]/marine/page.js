"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { mergeContent } from "@/lib/merge-content";
import { Anchor, Fuel, Shield } from "lucide-react";

export default function MarinePage() {
  const params = useParams();
  const lang = params.lang;
  const isRTL = lang === "ar";

  const [dbContent, setDbContent] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/page-content?key=marine`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data[lang]) {
          setDbContent(data[lang]);
        }
      })
      .catch((err) => console.error("Error loading marine content:", err));
  }, [lang]);

  const fallbackContent = {
    ar: {
      title: "الحلول البحرية",
      subtitle: "أشهر الماركات العالمية .. أداء يعتمد عليه.",
      intro: "سيجما هي الوكيل والموزع المعتمد لأبرز علامات المعدات البحرية الرائدة عالمياً، تقدم حلولاً احترافية متكاملة للقطاع البحري والترفيهي.",
      
      div2Title: "القسم البحري",
      div2Subtitle: "التوزيع المعتمد للمعدات البحرية",
      div2Desc: "أشهر الماركات العالمية. أداء يعتمد عليه. سيجما هي الوكيل والموزع المعتمد لأبرز علامات المعدات البحرية الرائدة عالمياً.",
      div2Brands: [
        {
          name: "سوزوكي (Suzuki)",
          tagline: "المحركات البحرية الخارجية (OUTBOARD MOTORS)",
          desc: "محركات بحرية خارجية عالية الأداء وموثوقة للغاية عالمياً، تشتهر بكفاءتها العالية في استهلاك الوقود والقوة الهائلة والاستدامة."
        },
        {
          name: "زودياك (Zodiac)",
          tagline: "القوارب المطاطية (INFLATABLE BOATS)",
          desc: "قوارب مطاطية احترافية مصممة خصيصاً لأقسى الظروف البحرية، وتتميز بالأمان الفائق والمتانة والقدرة العالية على المناورة."
        },
        {
          name: "سي دو (Sea-Doo)",
          tagline: "الدراجات المائية (JET SKIS)",
          desc: "جت سكي ودراجات مائية فاخرة تقدم مزيجاً فريداً من الأداء والرشاقة والابتكار التكنولوجي للاستخدامات الترفيهية والمهنية."
        }
      ],
      quote: "من المحركات إلى القوارب — تقدم سيجما موثوقية بحرية يمكنك الاعتماد عليها دائماً."
    },
    en: {
      title: "Marine Solutions",
      subtitle: "Trusted Global Brands .. Reliable Performance.",
      intro: "SIGMA is an authorized distributor of world-leading marine equipment brands, providing comprehensive professional solutions for the marine and recreational sectors.",
      
      div2Title: "MARINE DIVISION",
      div2Subtitle: "Authorized Marine Distribution",
      div2Desc: "Trusted Global Brands. Reliable Performance. SIGMA is an authorized distributor of world-leading marine equipment brands.",
      div2Brands: [
        {
          name: "Suzuki",
          tagline: "OUTBOARD MOTORS",
          desc: "High-performance marine outboard engines trusted worldwide for reliability, fuel efficiency, and power."
        },
        {
          name: "Zodiac",
          tagline: "INFLATABLE BOATS",
          desc: "Professional-grade inflatable boats engineered for safety, durability, and versatility in demanding marine environments."
        },
        {
          name: "Sea-Doo",
          tagline: "JET SKIS",
          desc: "Premium personal watercraft delivering performance, agility, and innovation for recreational and professional use."
        }
      ],
      quote: "From outboards to watercraft — SIGMA delivers marine reliability you can trust."
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
            {isRTL ? "الخدمات البحرية" : "MARINE DIVISION"}
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

        {/* Division 2 Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-8">
          {/* Left: Image Frame */}
          <div className="lg:col-span-5 lg:order-1 order-2 relative h-[380px] md:h-[480px] w-full rounded-[32px] overflow-hidden shadow-2xl bg-muted border border-border/30 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/new/4/Marine Division.png" 
              alt="Marine Outboard & Equipment Distribution" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-4 start-4 text-[9px] font-black text-white bg-primary px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm select-none">
              {isRTL ? "التوزيع المعتمد" : "AUTHORIZED MARINE CENTER"}
            </span>
          </div>

          {/* Right: Text & Brands */}
          <div className="lg:col-span-7 lg:order-2 order-1 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-4xl font-black text-[#003366] dark:text-white leading-tight">
                {content.div2Subtitle}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
                {content.div2Desc}
              </p>
            </div>

            {/* Brand cards list */}
            <div className="space-y-4 pt-4 border-t border-border/20">
              {content.div2Brands.map((brand, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-card border border-border/25 shadow-md hover:border-primary/20 hover:shadow-xl transition-all duration-300">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm shrink-0 h-fit">
                    {idx === 0 && <Fuel className="h-5 w-5" />}
                    {idx === 1 && <Anchor className="h-5 w-5" />}
                    {idx === 2 && <Shield className="h-5 w-5" />}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-base text-[#003366] dark:text-white flex items-center gap-2 leading-none">
                      {brand.name}
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider px-2 py-0.5 rounded bg-muted">
                        {brand.tagline}
                      </span>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
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
