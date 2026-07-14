"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, FastForward, Award, Layers, Sparkles, Handshake, Users, ArrowUpRight } from "lucide-react";
import { useParams } from "next/navigation";
import { mergeContent } from "@/lib/merge-content";

export default function AboutPage() {
  const params = useParams();
  const lang = params.lang;
  const isRTL = lang === "ar";

  const [dbContent, setDbContent] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/page-content?key=about`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data[lang]) {
          setDbContent(data[lang]);
        }
      })
      .catch((err) => console.error("Error loading about page content:", err));
  }, [lang]);

  const fallbackContent = {
    ar: {
      title: "من نحن",
      subtitle: "سيجما للخدمات البترولية - إرث من التميز والابتكار في قطاع النفط والغاز.",
      whoWeAreTitle: "من نحن وكيف بدأنا",
      whoWeAreText1: "تأسست شركة سيجما للخدمات البترولية في عام 2001 كذراع مخصصة للخدمات النفطية لمجموعة سيجما (Sigma Group)، وتقدم حلولاً متكاملة وموجهة نحو النتائج ومصممة لتعزيز إنتاجية الآبار وزيادة قيمة الأصول.",
      whoWeAreText2: "من خلال الخبرة الصناعية العميقة، والتحالفات القوية مع الموردين، والأساس المالي القوي، نقدم خدمات فعالة وفعالة من حيث التكلفة مصممة خصيصًا لتلبية الأهداف التشغيلية لعملائنا. بدعم من شركاتنا الشقيقة سيجما للتوريدات وسيجما للابتكار، نضمن تنفيذًا أسرع وعمليات أكثر أمانًا وتسليمًا موثوقًا في كل مشروع.",
      whoWeAreText3: "كجزء من مجموعة سيجما - وهي تكتل متنوع تأسس في عام 1959 مع إرث يمتد إلى التطوير العقاري وتجارة الصلب والمواد الكيميائية الصناعية والمعدات البحرية - تجسد سيجما للخدمات البترولية الابتكار والجودة والموثوقية. اليوم، مع أكثر من 290 مشروعًا مكتملًا، نحن معترف بنا كأحد الرواد في توفير مرافق الإنتاج سريعة التتبع وفعالة من حيث التكلفة في مصر والشرق الأوسط وأفريقيا.",
      whyTitle: "لماذا تختار سيجما؟",
      whySubtitle: "شريكك في التميز التشغيلي",
      features: [
        { title: "التنفيذ السريع", desc: "تسليم المشاريع في الوقت المحدد حتى تحت أصعب الجداول الزمنية التشغيلية.", icon: FastForward },
        { title: "الخبرة المثبتة", desc: "سجل حافل من المشاريع الناجحة في جميع أنحاء الشرق الأوسط وأفريقيا.", icon: Award },
        { title: "مخزون متنوع", desc: "معدات ومواد واسعة النطاق جاهزة للتعبئة الفورية لأي مشروع.", icon: Layers },
        { title: "عمليات متكاملة", desc: "دعم سلس للتشغيل والصيانة يتماشى تمامًا مع أطر العقود المختلفة.", icon: Shield },
        { title: "قابلية التوسع السريع", desc: "توسيع نطاق المشروع بسلاسة مع تطور احتياجاتك التشغيلية.", icon: Sparkles },
        { title: "عقود مرنة", desc: "حلول قصيرة وطويلة الأجل مصممة خصيصًا لمتطلبات العميل الفريدة.", icon: Handshake },
        { title: "الالتزام البيئي", desc: "المسؤولية البيئية والسلامة والجودة جزء لا يتجزأ من كل نشاط نقوم به.", icon: Shield },
        { title: "شراكة موثوقة", desc: "الاسم الذي يثق به العملاء لإنجاز المهام بسلاسة وبكفاءة عالية.", icon: Users },
      ]
    },
    en: {
      title: "Who We Are",
      subtitle: "Sigma Petroleum Services - A legacy of excellence, innovation, and performance in the Oil & Gas sector.",
      whoWeAreTitle: "Our Identity & Legacy",
      whoWeAreText1: "Founded in 2001 as the dedicated oilfield services arm of Sigma Group, Sigma Petroleum Services delivers integrated, results-driven solutions designed to enhance well productivity and maximize asset value.",
      whoWeAreText2: "Through deep industry expertise, strong supplier alliances, and a robust financial foundation, we provide efficient, cost-effective services tailored to our clients' operational objectives. Supported by our sister companies Sigma Supplies and Sigma Innovation, we ensure faster execution, safer operations, and dependable delivery across every project.",
      whoWeAreText3: "As part of Sigma Group — a diversified conglomerate established in 1959 with a legacy spanning real estate development, steel trading, industrial chemicals, and marine equipment — Sigma Petroleum Services embodies innovation, quality, and reliability. Today, with over 290 completed projects, we are recognized as one of the leaders in the provision of fast-track and cost-effective production facilities across Egypt, the Middle East, and Africa.",
      whyTitle: "Why Sigma Petroleum Services?",
      whySubtitle: "Your Partner in Operational Excellence",
      features: [
        { title: "Fast-Track Execution", desc: "Timely project delivery even under the most demanding schedules.", icon: FastForward },
        { title: "Proven Expertise", desc: "A strong record of successfully executed projects across MENA and Africa.", icon: Award },
        { title: "Diverse Inventory", desc: "Extensive equipment and materials for immediate mobilization at any scale.", icon: Layers },
        { title: "Integrated Operations", desc: "Seamless O&M support aligned with contractual frameworks.", icon: Shield },
        { title: "Rapid Scalability", desc: "Smooth expansion of project scope as operational needs evolve.", icon: Sparkles },
        { title: "Flexible Contracts", desc: "Short- and long-term solutions tailored to client requirements.", icon: Handshake },
        { title: "Environmental Commitment", desc: "Quality, safety, and environmental responsibility embedded across all activities.", icon: Shield },
        { title: "Trusted Partnership", desc: "The name clients trust to get the job done — seamlessly and efficiently.", icon: Users },
      ]
    }
  }[lang] || { ar: {}, en: {} };

  const content = mergeContent(fallbackContent, dbContent);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Banner / Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#002244] to-[#000f22] dark:from-[#0b1322] dark:to-[#040711] text-white py-20 md:py-28 border-b border-white/5">
        {/* Pulsing glow blob */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,28,36,0.15),transparent_50%)] pointer-events-none" />
        <div className="container mx-auto max-w-5xl px-6 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold text-[#E61C24] uppercase tracking-widest">{isRTL ? "من نحن" : "ABOUT SIGMA"}</span>
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
        
        {/* Section 1: Who We Are */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-4xl font-black text-[#003366] dark:text-white leading-tight">
              {content.whoWeAreTitle}
            </h2>
            <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed font-medium">
              <p>{content.whoWeAreText1}</p>
              <p>{content.whoWeAreText2}</p>
            </div>
          </div>

          {/* Asymmetric Bento Photo Collage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-48 overflow-hidden rounded-3xl border border-border/30 bg-muted shadow-sm group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/Sigma%20website/Photos/General/1.png" 
                  alt="Sigma Operations" 
                  className="w-full h-full object-cover hover:scale-108 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
              <div className="relative h-32 overflow-hidden rounded-3xl border border-border/30 bg-muted shadow-sm group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/new/5/IMG_1189.PNG" 
                  alt="Sigma Facility" 
                  className="w-full h-full object-cover hover:scale-108 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative h-32 overflow-hidden rounded-3xl border border-border/30 bg-muted shadow-sm group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/new/5/IMG_1189.PNG" 
                  alt="Sigma Team" 
                  className="w-full h-full object-cover hover:scale-108 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
              <div className="bg-card border border-border/30 p-6 rounded-3xl shadow-md text-center flex flex-col justify-center min-h-[190px] transition-all hover:shadow-xl hover:border-primary/20 duration-300">
                <span className="block text-4xl font-black text-primary leading-none">290+</span>
                <span className="text-[9px] text-muted-foreground font-extrabold uppercase tracking-wider mt-1.5">{isRTL ? "مشروع مكتمل" : "Completed Projects"}</span>
                <span className="block text-3xl font-black text-[#003366] dark:text-white mt-6 leading-none">2001</span>
                <span className="text-[9px] text-muted-foreground font-extrabold uppercase tracking-wider mt-1.5">{isRTL ? "عام التأسيس" : "Year Founded"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Quote */}
        <div className="p-8 rounded-[32px] bg-muted/40 border border-border/20 text-center max-w-4xl mx-auto border-l-4 border-l-primary shadow-sm rtl:border-l-0 rtl:border-r-4 rtl:border-r-primary">
          <p className="text-xs md:text-sm text-muted-foreground italic leading-relaxed font-semibold">
            {content.whoWeAreText3}
          </p>
        </div>

        {/* Section 2: Why Sigma (Features Grid) */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? "الميزات التنافسية" : "OUR CAPABILITIES"}</span>
            <h2 className="text-2xl md:text-4xl font-black text-[#003366] dark:text-white leading-tight">
              {content.whyTitle}
            </h2>
            <p className="text-muted-foreground text-sm font-semibold">
              {content.whySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card key={i} className="border-border/30 hover:shadow-2xl hover:border-primary/20 transition-all duration-300 group rounded-3xl bg-card overflow-hidden flex flex-col justify-between transform hover:-translate-y-1">
                  <CardHeader className="pb-2">
                    <div className="p-3 rounded-2xl bg-muted text-primary w-fit group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-border/20">
                      <Icon className="h-5 w-5" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-1.5 pt-2 px-6">
                    <CardTitle className="text-base font-extrabold text-[#003366] dark:text-white leading-snug">{feature.title}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground leading-relaxed font-medium">{feature.desc}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
