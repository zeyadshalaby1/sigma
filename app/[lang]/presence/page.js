"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Building2, Globe } from "lucide-react";
import { useParams } from "next/navigation";

export default function GlobalPresencePage() {
  const params = useParams();
  const lang = params.lang;
  const isRTL = lang === "ar";

  const content = {
    ar: {
      title: "تكامل وتواجد عالمي",
      subtitle: "تواجد تشغيلي قوي عبر الشرق الأوسط وأفريقيا لدعم قطاع الطاقة المتنامي.",
      headline: "توصيل الخدمات في مختلف الأسواق",
      desc: "نعمل بمرونة تامة تحت ظروف تشغيلية، أطر تنظيمية، ونطاقات مشاريع مختلفة في عدة دول.",
      officesTitle: "مكاتبنا وفروعنا الإقليمية",
      operationsTitle: "تغطية العمليات الإقليمية",
      offices: [
        {
          name: "المقر الرئيسي - الإسكندرية (مصر)",
          address: "المنطقة الحرة العامة، العامرية، الإسكندرية، مصر",
          phone: "+20 3 481 2620",
          type: "Headquarters"
        },
        {
          name: "مكتب القاهرة (مصر)",
          address: "40 امتداد شارع فلسطين، المعادي الجديدة، القاهرة، مصر",
          phone: "+20 2 25176177",
          type: "Corporate Office"
        },
        {
          name: "فرع المملكة العربية السعودية",
          address: "4992 شارع 11أ، حي الجسر، الخبر 34714، المملكة العربية السعودية",
          phone: "+966 50 028 1522",
          type: "Regional Branch"
        },
        {
          name: "فرع سلطنة عُمان",
          address: "52 شارع الإسكان، روي، ص.ب 676، سلطنة عمان",
          phone: "+968 24 780 071",
          type: "Regional Branch"
        },
        {
          name: "فرع ليبيا",
          address: "الطابق الثاني، شارع المدينة الرشيد، أرض بلعون، بنغازي، ليبيا",
          phone: "+218 92 179 5363",
          type: "Regional Branch"
        },
        {
          name: "فرع سوريا",
          address: "مبنى 16، قطاع الأندلس، طريق المطار، دمشق، سوريا",
          phone: "+963 968077581",
          type: "Regional Branch"
        }
      ],
      countries: ["مصر", "المملكة العربية السعودية", "سلطنة عمان", "ليبيا", "سوريا"]
    },
    en: {
      title: "Global Presence",
      subtitle: "Delivering oilfield excellence across the Middle East and Africa under diverse operating environments.",
      headline: "Proven Delivery Across Diverse Markets",
      desc: "With a strong operational presence across the MENA region and Africa, delivering under diverse conditions, regulatory frameworks, and project scales.",
      officesTitle: "Our Corporate & Regional Offices",
      operationsTitle: "Operations Across MENA & Africa",
      offices: [
        {
          name: "Egypt Headquarters - Alexandria",
          address: "General Free Zone, Amreya, Alexandria, Egypt",
          phone: "+20 3 481 2620",
          type: "Headquarters"
        },
        {
          name: "Cairo Office",
          address: "40 Palestine Street Extension, New Maadi, Cairo, Egypt",
          phone: "+20 2 25176177",
          type: "Corporate Office"
        },
        {
          name: "Saudi Arabia Branch",
          address: "4992 11A Street, Al Jisr District, Al Khobar 34714, Kingdom of Saudi Arabia",
          phone: "+966 50 028 1522",
          type: "Regional Branch"
        },
        {
          name: "Oman Branch",
          address: "Sigma Petroleum Services Oman, 52 Al Iskan Street, Ruwi, P.O. Box 676, Sultanate of Oman",
          phone: "+968 24 780 071",
          type: "Regional Branch"
        },
        {
          name: "Libya Branch",
          address: "Second Floor, Rashid City Street, Baloun Land, Benghazi, Libya",
          phone: "+218 92 179 5363",
          type: "Regional Branch"
        },
        {
          name: "Syria Branch",
          address: "Building 16, Al Andalus Sector, Airport Street, Damascus, Syria",
          phone: "+963 968077581",
          type: "Regional Branch"
        }
      ],
      countries: ["Egypt", "Saudi Arabia", "Oman", "Libya", "Syria"]
    }
  }[lang] || { ar: {}, en: {} };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#002244] to-[#000f22] dark:from-[#0b1322] dark:to-[#040711] text-white py-20 md:py-28 border-b border-white/5">
        {/* Pulsing glow blob */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,28,36,0.15),transparent_50%)] pointer-events-none" />
        <div className="container mx-auto max-w-5xl px-6 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? "عملياتنا الإقليمية" : "MENA & AFRICA COVERAGE"}</span>
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
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? "مواقع الإنتاج" : "MARKETS"}</span>
          <h2 className="text-2xl md:text-4xl font-black text-[#003366] dark:text-white leading-tight">
            {content.headline}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed font-semibold">
            {content.desc}
          </p>
        </div>

        {/* Section 1: Countries Tags */}
        <div className="space-y-6 bg-muted/20 p-8 md:p-12 rounded-[32px] border border-border/20 shadow-inner text-center">
          <h3 className="text-xs font-bold text-[#003366] dark:text-white uppercase tracking-widest mb-6">
            {content.operationsTitle}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {content.countries.map((country, i) => (
              <span key={i} className="px-5 py-2.5 rounded-full border border-border/30 bg-card text-xs md:text-sm font-extrabold text-[#003366] dark:text-zinc-200 shadow-sm hover:border-primary hover:shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5">
                <Globe className="h-4 w-4 text-primary shrink-0" />
                {country}
              </span>
            ))}
          </div>
        </div>

        {/* Section 2: Offices Cards Grid */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{isRTL ? "الفروع الرسمية" : "BRANCH DIRECTORY"}</span>
            <h3 className="text-2xl md:text-3xl font-black text-[#003366] dark:text-white leading-tight">
              {content.officesTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.offices.map((office, i) => (
              <Card key={i} className="border-border/30 hover:shadow-2xl hover:border-primary/20 transition-all duration-300 rounded-[28px] bg-card overflow-hidden flex flex-col justify-between transform hover:-translate-y-1">
                <div>
                  <CardHeader className="pb-4 bg-muted/30 border-b border-border/10 p-6 md:p-8">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm shrink-0 mt-0.5">
                        <Building2 className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <CardTitle className="text-sm md:text-base font-extrabold text-foreground leading-snug">{office.name}</CardTitle>
                        <CardDescription className="text-[9px] uppercase font-black tracking-widest mt-1.5 text-primary">{office.type}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8 space-y-4 text-xs md:text-sm text-muted-foreground font-medium">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5 pt-3 border-t border-border/10 font-bold text-foreground">
                      <Phone className="h-4.5 w-4.5 text-primary shrink-0" />
                      <a href={`tel:${office.phone.replace(/\s+/g, "")}`} className="hover:underline hover:text-primary transition-colors font-semibold" dir="ltr">{office.phone}</a>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
