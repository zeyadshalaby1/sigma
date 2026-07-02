"use client";

import { usePathname, useRouter } from "next/navigation";

export function LanguageToggle({ lang, dict }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const targetLocale = lang === "ar" ? "en" : "ar";
    document.cookie = `NEXT_LOCALE=${targetLocale};path=/;max-age=31536000`;
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    router.push(segments.join("/"));
  };

  const isAr = lang === "ar";

  return (
    <button
      onClick={switchLocale}
      className="relative flex h-9 w-9 items-center justify-center rounded-full bg-card/60 backdrop-blur-md hover:bg-card border border-border/30 hover:border-primary/40 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 text-muted-foreground hover:text-foreground overflow-hidden font-bold text-xs"
      title={isAr ? "Switch to English" : "التبديل للعربية"}
      aria-label="Toggle language"
    >
      {/* English Text */}
      <span
        className={`absolute transition-all duration-500 ease-in-out ${
          isAr ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        EN
      </span>
      
      {/* Arabic Text */}
      <span
        className={`absolute transition-all duration-500 ease-in-out ${
          isAr ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        }`}
      >
        AR
      </span>
    </button>
  );
}