"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { mergeContent } from "@/lib/merge-content";

export default function ClientsPage() {
  const params = useParams();
  const lang = params.lang;
  const isRTL = lang === "ar";

  const [dbContent, setDbContent] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/page-content?key=clients`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data[lang]) {
          setDbContent(data[lang]);
        }
      })
      .catch((err) => console.error("Error loading clients page content:", err));
  }, [lang]);

  const fallbackContent = {
    ar: {
      title: "شركاء النجاح والعملاء",
      subtitle: "نفخر بشراكتنا مع رواد الطاقة والمشغلين الدوليين والشركات الوطنية عبر الشرق الأوسط وأفريقيا."
    },
    en: {
      title: "Trusted by Our Clients",
      subtitle: "Partnering with leading international operators, joint ventures, and national oil companies across MENA & Africa."
    }
  }[lang] || { ar: {}, en: {} };

  const content = mergeContent(fallbackContent, dbContent);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#002244] to-[#000f22] dark:from-[#0b1322] dark:to-[#040711] text-white py-20 md:py-28 border-b border-white/5">
        {/* Pulsing glow blob */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,28,36,0.15),transparent_50%)] pointer-events-none" />
        <div className="container mx-auto max-w-5xl px-6 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">
            {isRTL ? "شركاء النجاح" : "GLOBAL TRADING & SERVICES"}
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
      <div className="container mx-auto max-w-4xl px-6 py-16 md:py-24">
        {/* Image Card Overview */}
        <div className="bg-card p-6 md:p-8 rounded-[32px] border border-border/30 shadow-xl text-center space-y-6 bg-white dark:bg-zinc-900/45">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              {isRTL ? "قائمة العملاء" : "OUR PARTNERS & OPERATORS"}
            </span>
            <h3 className="text-lg md:text-2xl font-black text-[#003366] dark:text-white leading-tight">
              {isRTL ? "المشغلون والشركاء المعتمدون" : "Certified Partners & Operators"}
            </h3>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-border/10 max-w-3xl mx-auto bg-white p-4 md:p-6 flex items-center justify-center shadow-inner group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/Sigma website/Client list logos/Client list logos copy.png" 
              alt="Sigma Clients List Map" 
              className="w-full object-contain rounded-xl hover:scale-102 transition-transform duration-500" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
