"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Handshake, Award, ShieldAlert, BadgeCheck } from "lucide-react";
import { useParams } from "next/navigation";

export default function ClientsPage() {
  const params = useParams();
  const lang = params.lang;
  const isRTL = lang === "ar";

  const content = {
    ar: {
      title: "شركاء النجاح والعملاء",
      subtitle: "نفخر بشراكتنا مع رواد الطاقة والمشغلين الدوليين والشركات الوطنية عبر الشرق الأوسط وأفريقيا.",
      trustTitle: "لماذا يثق بنا كبار المشغلين؟",
      trustSubtitle: "25 عاماً من الشراكة وبناء الثقة",
      stats: [
        { val: "45+", label: "عميل دولي رائد" },
        { val: "8+", label: "دول تشغيلية" },
        { val: "25 Years", label: "من الثقة والنجاح" }
      ],
      clientListTitle: "مشغلون وشركات نتشرف بخدمتهم",
      clients: [
        { name: "ENI", desc: "الشركة الإيطالية العالمية الرائدة في قطاع النفط والغاز." },
        { name: "EGPC", desc: "الهيئة المصرية العامة للبترول - الداعم الرئيسي لقطاع البترول المصري." },
        { name: "Petrobel", desc: "شركة بترول بلاعيم - أحد أكبر مشغلي إنتاج الغاز والنفط في مصر." },
        { name: "APACHE (Qarun/Khalda)", desc: "أباتشي الأمريكية - شريك إنتاج البترول والغاز الرئيسي بالصحراء الغربية." },
        { name: "Agiba Petroleum Co.", desc: "شركة عجيبة للبترول - رائدة تشغيل حقول الإنتاج والآبار." },
        { name: "RWE", desc: "شركة الطاقة الألمانية الرائدة بمشاريع الاستكشاف والإنتاج الإقليمية." },
        { name: "Petrosannan Co.", desc: "شركة بتروسنان - مشغل موثوق لتنمية وإنتاج حقول الطاقة." }
      ]
    },
    en: {
      title: "Trusted by Our Clients",
      subtitle: "Partnering with leading international operators, joint ventures, and national oil companies across MENA & Africa.",
      trustTitle: "Why Leading Energy Giants Trust Sigma?",
      trustSubtitle: "25 Years of Trust and Project Execution",
      stats: [
        { val: "45+", label: "International Clients" },
        { val: "8+", label: "Operating Countries" },
        { val: "25 Years", label: "of Continuous Trust" }
      ],
      clientListTitle: "Energy Giants & Partners We Serve",
      clients: [
        { name: "ENI", desc: "Leading Italian multinational oil and gas supermajor operating worldwide." },
        { name: "EGPC", desc: "Egyptian General Petroleum Corporation - The cornerstone of Egypt's petroleum sector." },
        { name: "Petrobel", desc: "Belayim Petroleum Company - One of the largest gas and oil producers in Egypt." },
        { name: "APACHE (Qarun/Khalda)", desc: "Apache Corporation - Principal Western Desert oil and gas production partner." },
        { name: "Agiba Petroleum Co.", desc: "Agiba Petroleum Company - Leading joint venture developer and operator." },
        { name: "RWE", desc: "German energy giant partnering in regional exploration and production projects." },
        { name: "Petrosannan Co.", desc: "Petrosannan Company - Developer and operator of energy production concessions." }
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
          <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? "شركاء النجاح" : "GLOBAL TRADING & SERVICES"}</span>
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
        
        {/* Section 1: Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {content.stats.map((stat, i) => (
            <Card key={i} className="border-border/30 text-center p-6 bg-card hover:shadow-2xl hover:border-primary/20 transition-all duration-300 rounded-[28px] transform hover:-translate-y-1">
              <CardContent className="pt-6 space-y-2">
                <span className="block text-4xl md:text-5xl font-black text-primary leading-none">
                  {stat.val}
                </span>
                <span className="block text-[10px] md:text-xs font-black text-muted-foreground uppercase tracking-widest mt-2">
                  {stat.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section 2: Trust Points (Split layout with Photo) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center bg-muted/20 p-8 md:p-12 rounded-[32px] border border-border/20 shadow-inner">
          
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? "مبادئ الشراكة" : "PARTNERSHIP CORE"}</span>
              <h2 className="text-2xl md:text-4xl font-black text-[#003366] dark:text-white leading-tight">
                {content.trustTitle}
              </h2>
              <p className="text-sm font-semibold text-muted-foreground">
                {content.trustSubtitle}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Trust Point 1 */}
              <div className="flex gap-4 p-5 rounded-[24px] bg-card border border-border/20 shadow-md hover:border-primary/20 hover:shadow-xl transition-all duration-300">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm shrink-0 h-fit">
                  <Award className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-[#003366] dark:text-white">{isRTL ? "معايير السلامة والأمان" : "Strict Safety Standards"}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                    {isRTL ? "تطبيق صارم لمتطلبات السلامة والأمن الصناعي وحماية البيئة في جميع مواقع الحقول." : "Rigorous compliance with OHSAS standards ensures accident-free, zero-risk environments."}
                  </p>
                </div>
              </div>

              {/* Trust Point 2 */}
              <div className="flex gap-4 p-5 rounded-[24px] bg-card border border-border/20 shadow-md hover:border-primary/20 hover:shadow-xl transition-all duration-300">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm shrink-0 h-fit">
                  <Handshake className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-[#003366] dark:text-white">{isRTL ? "التزام كامل بالعهود والوقت" : "Unmatched Timelines"}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                    {isRTL ? "الالتزام بتواريخ التسليم الصعبة وتوفير مرافق إنتاج جاهزة للعمل خلال أيام قصيرة." : "Delivering modular production facilities under challenging client-defined deadlines."}
                  </p>
                </div>
              </div>

              {/* Trust Point 3 */}
              <div className="flex gap-4 p-5 rounded-[24px] bg-card border border-border/20 shadow-md hover:border-primary/20 hover:shadow-xl transition-all duration-300">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm shrink-0 h-fit">
                  <BadgeCheck className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-[#003366] dark:text-white">{isRTL ? "نزاهة تجارية ودقة مطلقة" : "Commercial Accuracy"}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                    {isRTL ? "حلول قياس ونقل ملكية دقيقة ومعتمدة تحمي إيرادات عملائنا وتضمن شفافية كاملة." : "Providing certified custody transfer solutions for fiscal safety and absolute measurement confidence."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Tall rounded cover field image */}
          <div className="lg:col-span-2 relative h-[400px] md:h-[480px] w-full rounded-[32px] overflow-hidden shadow-2xl bg-muted border border-border/30 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/Sigma%20website/Photos/General/3.png" 
              alt="Sigma Trust Operations" 
              className="w-full h-full object-cover hover:scale-108 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/40 via-transparent to-transparent pointer-events-none" />
          </div>

        </div>

        {/* Section 3: Client Grid List */}
        <div className="space-y-8 pt-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? "شركاء الاستكشاف" : "ENERGY OPERATORS"}</span>
            <h3 className="text-2xl md:text-3xl font-black text-[#003366] dark:text-white leading-tight">
              {content.clientListTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {content.clients.map((client, i) => (
              <Card key={i} className="border-border/30 hover:shadow-2xl hover:border-primary/25 transition-all duration-300 rounded-[28px] bg-card overflow-hidden transform hover:-translate-y-1">
                <CardContent className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="font-extrabold text-base md:text-lg text-[#003366] dark:text-white tracking-wide">
                      {client.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                    {client.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
