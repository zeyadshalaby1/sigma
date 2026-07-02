"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileQuestion, Home, ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  const params = useParams();
  const lang = params?.lang || "en";
  const isRTL = lang === "ar";

  const content = {
    en: {
      code: "404",
      title: "Lost in the Dunes?",
      subtitle: "The page you are looking for has been moved, deleted, or never existed in our pipeline.",
      backHome: "Back to Home",
      backPrev: "Go Back",
    },
    ar: {
      code: "٤٠٤",
      title: "هل تهت في الكثبان؟",
      subtitle: "الصفحة التي تبحث عنها قد تم نقلها، أو حذفها، أو أنها لم تكن موجودة في خطوطنا من الأساس.",
      backHome: "العودة للرئيسية",
      backPrev: "الرجوع للخلف",
    },
  }[lang] || {
    code: "404",
    title: "Lost in the Dunes?",
    subtitle: "The page you are looking for has been moved, deleted, or never existed in our pipeline.",
    backHome: "Back to Home",
    backPrev: "Go Back",
  };

  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-background px-6 py-12 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,28,36,0.05),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(230,28,36,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#003366]/5 dark:bg-[#003366]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10 space-y-8">
        {/* Animated Icon & Code */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse" />
          <div className="relative bg-card border border-border/40 rounded-full p-8 shadow-2xl flex items-center justify-center">
            <FileQuestion className="h-20 w-20 text-[#003366] dark:text-blue-400 stroke-[1.5] animate-bounce" />
          </div>
          <span className="absolute -bottom-4 right-0 bg-[#E61C24] text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
            {content.code}
          </span>
        </div>

        {/* Text Details */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-black text-[#003366] dark:text-white leading-tight">
            {content.title}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base font-medium leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={handleGoBack}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full sm:w-auto h-11 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-muted border-border/40 text-foreground text-sm font-semibold transition-all duration-300 cursor-pointer"
            )}
          >
            {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            {content.backPrev}
          </button>

          <Link
            href={`/${lang}`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full sm:w-auto h-11 px-6 bg-primary hover:bg-primary/95 text-white rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            )}
          >
            <Home className="h-4 w-4" />
            {content.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
