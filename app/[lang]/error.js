"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertOctagon, RefreshCw, Home } from "lucide-react";

export default function Error({ error, reset }) {
  const params = useParams();
  const lang = params?.lang || "en";

  useEffect(() => {
    console.error("Application error detailed log:", error);
  }, [error]);

  const content = {
    en: {
      title: "System Disruption Detected",
      subtitle: "Our system encountered an unexpected breakdown in the data pipelines. We are working to restore it.",
      tryAgain: "Try Again",
      backHome: "Back to Home",
    },
    ar: {
      title: "تم اكتشاف خلل في النظام",
      subtitle: "واجه نظامنا عطلاً غير متوقع في خطوط نقل البيانات. نحن نعمل على استعادة الخدمة.",
      tryAgain: "إعادة المحاولة",
      backHome: "العودة للرئيسية",
    },
  }[lang] || {
    title: "System Disruption Detected",
    subtitle: "Our system encountered an unexpected breakdown in the data pipelines. We are working to restore it.",
    tryAgain: "Try Again",
    backHome: "Back to Home",
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-6 py-12 relative overflow-hidden">
      {/* Red ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,28,36,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10 space-y-8">
        {/* Animated Icon */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl animate-pulse" />
          <div className="relative bg-card border border-red-500/20 rounded-full p-8 shadow-2xl flex items-center justify-center">
            <AlertOctagon className="h-20 w-20 text-[#E61C24] stroke-[1.5] animate-[spin_4s_linear_infinite]" />
          </div>
          <span className="absolute -bottom-2 bg-[#003366] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
            ERROR
          </span>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-black text-[#003366] dark:text-white leading-tight">
            {content.title}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base font-light leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={reset}
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full sm:w-auto h-11 px-6 bg-[#E61C24] hover:bg-[#c5151b] text-white rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            )}
          >
            <RefreshCw className="h-4 w-4" />
            {content.tryAgain}
          </button>

          <Link
            href={`/${lang}`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full sm:w-auto h-11 px-6 rounded-2xl flex items-center justify-center gap-2 hover:bg-muted border-border text-foreground text-sm font-semibold transition-all duration-300 cursor-pointer"
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
