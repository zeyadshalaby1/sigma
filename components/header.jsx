"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Header({ lang, dict }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollHeight > 0) {
        setScrollProgress((window.scrollY / totalScrollHeight) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  if (pathname?.includes("/admin")) {
    return null;
  }

  const navLinks = [
    { href: `/${lang}`, label: dict?.nav?.home || (lang === "ar" ? "الرئيسية" : "Home") },
    { href: `/${lang}/about`, label: lang === "ar" ? "من نحن" : "Who We Are" },
    { href: `/${lang}/services`, label: dict?.nav?.services || (lang === "ar" ? "خدماتنا" : "Services") },
    { href: `/${lang}/timeline`, label: lang === "ar" ? "مسيرتنا" : "Timeline" },
    { href: `/${lang}/supply`, label: lang === "ar" ? "التوريدات" : "Supply" },
    { href: `/${lang}/marine`, label: lang === "ar" ? "البحرية" : "Marine" },
    { href: `/${lang}/blog`, label: lang === "ar" ? "المدونة" : "Blog" },
    { href: `/${lang}/contact`, label: dict?.nav?.contact || (lang === "ar" ? "تواصل معنا" : "Contact") },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full pointer-events-none transition-all duration-300 flex justify-center px-2 sm:px-4 ${
          isScrolled ? "pt-2 sm:pt-3" : "pt-0"
        }`}
      >
        <div
          className={`w-full max-w-5xl flex items-center justify-between px-3 sm:px-6 transition-all duration-300 pointer-events-auto relative ${
            isScrolled
              ? "rounded-full border border-border/40 bg-background/70 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] h-14 overflow-hidden"
              : "border-b border-border/10 bg-transparent h-16 sm:h-20"
          }`}
        >
          {/* Logo */}
          <a href={`/${lang}`} className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Sigma website/Sigma Logo/Orignal Logo.png"
              alt="Sigma Logo"
              className={`transition-all duration-300 object-contain ${
                isScrolled ? "h-6 sm:h-7 max-w-[100px]" : "h-8 sm:h-11 max-w-[110px] sm:max-w-[150px]"
              }`}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname === `${link.href}/`;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-xs lg:text-sm font-bold px-3 py-1.5 rounded-full transition-all duration-300 relative ${
                    isActive
                      ? "text-primary bg-primary/5 dark:bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <LanguageToggle lang={lang} dict={dict} />
            <ThemeToggle dict={dict} />
          </div>

          {/* Mobile: actions + hamburger */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            <LanguageToggle lang={lang} dict={dict} />
            <ThemeToggle dict={dict} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-muted/60 border border-border/40 hover:bg-muted hover:border-border transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4 text-foreground" />
              ) : (
                <Menu className="h-4 w-4 text-foreground" />
              )}
            </button>
          </div>

          {/* Scroll progress bar */}
          <div
            className="absolute bottom-0 start-0 h-[2px] bg-gradient-to-r from-primary via-orange-400 to-[#E61C24] animate-shine shadow-[0_0_8px_rgba(230,28,36,0.6)] transition-all duration-100 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-20 sm:top-24 start-4 end-4 bg-card/95 backdrop-blur-2xl border border-border/40 rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.15)] p-6 transition-all duration-300 ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100 scale-100"
              : "-translate-y-4 opacity-0 scale-95"
          }`}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname === `${link.href}/`;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition-all duration-300 ${
                    isActive
                      ? "text-primary bg-primary/5 dark:bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="my-4 h-px bg-border/40" />

          {/* Mobile footer info */}
          <div className="text-center text-xs text-muted-foreground font-semibold">
            © {new Date().getFullYear()} Sigma Petroleum Services
          </div>
        </div>
      </div>
    </>
  );
}