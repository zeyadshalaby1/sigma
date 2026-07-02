"use client";

import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

const FacebookIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.5 9.93v-7.03h-2.5v-2.9h2.5V9.6c0-2.46 1.48-3.82 3.75-3.82 1.08 0 2.22.2 2.22.2v2.45h-1.26c-1.24 0-1.62.77-1.62 1.56v1.88h2.76l-.44 2.9h-2.32v7.03A10 10 0 0 0 22 12Z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm8.62 1.5h-8.24A4.26 4.26 0 0 0 3.85 7.75v8.24a4.26 4.26 0 0 0 4.26 4.26h8.24a4.26 4.26 0 0 0 4.26-4.26V7.75a4.26 4.26 0 0 0-4.26-4.26Zm-4.31 3.4a5.35 5.35 0 1 1 0 10.7 5.35 5.35 0 0 1 0-10.7Zm0 1.5a3.85 3.85 0 1 0 0 7.7 3.85 3.85 0 0 0 0-7.7Zm5.55-.85a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M21.8 7.3a3.03 3.03 0 0 0-2.13-2.13C17.81 4.8 12 4.8 12 4.8s-5.81 0-7.67.37A3.03 3.03 0 0 0 2.2 7.3 31.75 31.75 0 0 0 2 12a31.75 31.75 0 0 0 .2 4.7 3.03 3.03 0 0 0 2.13 2.13c1.86.37 7.67.37 7.67.37s5.81 0 7.67-.37A3.03 3.03 0 0 0 21.8 16.7 31.75 31.75 0 0 0 22 12a31.75 31.75 0 0 0-.2-4.7Zm-11 9.65V7.05l6.25 4.45-6.25 4.45Z" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M4.98 3.5A2.5 2.5 0 0 0 2.5 6v12a2.5 2.5 0 0 0 2.48 2.5h14.04A2.5 2.5 0 0 0 21.5 18V6a2.5 2.5 0 0 0-2.48-2.5H4.98Zm1.02 5.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm.25 10.75H6V10.75h2.25V20Zm5.75 0h-2.25V10.75h2.25V12c.6-.95 1.65-1.4 2.75-1.4 2.95 0 3.5 1.95 3.5 4.5V20h-2.25v-4.2c0-1 .05-2.3-1.4-2.3-1.4 0-1.6 1.05-1.6 2.2V20Z" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M22.46 6c-.77.34-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.57 8.57 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.29 3.9 12.14 12.14 0 0 1-8.82-4.47 4.28 4.28 0 0 0 1.33 5.71 4.24 4.24 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.28 4.28 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.97A8.58 8.58 0 0 1 2 19.54a12.1 12.1 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.68 8.68 0 0 0 22.46 6Z" />
  </svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12a11.92 11.92 0 0 0 2.02 6.57L0 24l5.56-1.47A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.16-3.48-8.52Zm-8.52 17.05c-1.84 0-3.66-.5-5.2-1.45l-.37-.22-3.3.87.88-3.22-.24-.38A9.6 9.6 0 0 1 2.4 12C2.4 6.52 6.52 2.4 12 2.4c3.2 0 6.2 1.25 8.43 3.48A11.84 11.84 0 0 1 22.8 12c0 6.63-5.37 12-12 12Zm6.36-7.46c-.35-.18-2.06-1.01-2.38-1.12-.32-.12-.56-.18-.8.18-.24.35-.9 1.12-1.11 1.36-.2.24-.41.27-.76.09-.35-.18-1.48-.55-2.82-1.74-1.04-.93-1.74-2.08-1.95-2.43-.2-.35-.02-.54.16-.72.16-.16.35-.41.53-.62.18-.22.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.8-1.95-1.1-2.68-.29-.7-.59-.61-.8-.62-.21-.01-.45-.01-.68-.01-.24 0-.63.09-.96.45-.33.36-1.25 1.22-1.25 2.98s1.28 3.46 1.46 3.7c.18.24 2.55 3.9 6.18 5.47.86.37 1.53.59 2.05.75.86.27 1.64.23 2.26.14.69-.11 2.06-.84 2.35-1.65.29-.8.29-1.49.2-1.64-.09-.16-.33-.24-.69-.42Z" />
  </svg>
);

export function Footer({ dict, socialLinks }) {
  const pathname = usePathname();
  const isAr = pathname?.startsWith("/ar");

  // Hide footer on admin routes
  if (pathname?.includes("/admin")) {
    return null;
  }

  return (
    <footer className="bg-gradient-to-b from-[#002244] to-[#000f22] dark:from-[#0b1322] dark:to-[#040711] text-white pt-16 pb-8 mt-auto border-t border-white/5 shadow-2xl font-sans relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#004799]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          
          {/* Logo & About Column */}
          <div className="flex flex-col items-center md:items-start space-y-5 text-center md:text-start">
            <div className="h-10 flex items-center transition-transform hover:scale-102">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Sigma website/Sigma Logo/LOGO WHI.png"
                alt="Sigma Logo"
                className="max-h-full max-w-[130px] object-contain drop-shadow-[0_2px_10px_rgba(255,255,255,0.05)]"
              />
            </div>
            <div className="text-zinc-400 text-xs leading-relaxed max-w-xs font-medium">
              {isAr ? (
                <>
                  <p>عضو فخور في مجموعة سيجما، نقدم حلولاً متكاملة لحقول النفط والغاز منذ عام 2001.</p>
                  <p className="mt-3 text-zinc-300 font-bold border-l-2 border-primary pl-2.5 rtl:border-l-0 rtl:border-r-2 rtl:pr-2.5 rtl:pl-0">
                    المنطقة الحرة العامة، العامرية<br />
                    الإسكندرية، مصر
                  </p>
                </>
              ) : (
                <>
                  <p>A proud member of Sigma Group, delivering integrated oilfield solutions since 2001.</p>
                  <p className="mt-3 text-zinc-300 font-bold border-l-2 border-primary pl-2.5">
                    General Free Zone, Amreya<br />
                    Alexandria, Egypt
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-base font-bold text-white relative pb-2 after:content-[''] after:absolute after:bottom-0 after:start-0 after:w-8 after:h-[2px] after:bg-primary">
              {isAr ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-center md:text-start max-w-sm w-full">
              <li>
                <a href={isAr ? "/ar" : "/en"} className="text-zinc-400 hover:text-primary text-xs font-semibold transition-colors duration-300">
                  {dict?.nav?.home || (isAr ? "الرئيسية" : "Home")}
                </a>
              </li>
              <li>
                <a href={isAr ? "/ar/services" : "/en/services"} className="text-zinc-400 hover:text-primary text-xs font-semibold transition-colors duration-300">
                  {dict?.nav?.services || (isAr ? "خدماتنا" : "Services")}
                </a>
              </li>
              <li>
                <a href={isAr ? "/ar/timeline" : "/en/timeline"} className="text-zinc-400 hover:text-primary text-xs font-semibold transition-colors duration-300">
                  {isAr ? "مسيرتنا" : "Timeline"}
                </a>
              </li>
              <li>
                <a href={isAr ? "/ar/presence" : "/en/presence"} className="text-zinc-400 hover:text-primary text-xs font-semibold transition-colors duration-300">
                  {isAr ? "تواجدنا العالمي" : "Global Presence"}
                </a>
              </li>
              <li>
                <a href={isAr ? "/ar/certifications" : "/en/certifications"} className="text-zinc-400 hover:text-primary text-xs font-semibold transition-colors duration-300">
                  {isAr ? "الشهادات والقيم" : "Certifications"}
                </a>
              </li>
              <li>
                <a href={isAr ? "/ar/clients" : "/en/clients"} className="text-zinc-400 hover:text-primary text-xs font-semibold transition-colors duration-300">
                  {isAr ? "شركاء النجاح" : "Clients"}
                </a>
              </li>
              <li>
                <a href={isAr ? "/ar/about" : "/en/about"} className="text-zinc-400 hover:text-primary text-xs font-semibold transition-colors duration-300">
                  {dict?.nav?.about || (isAr ? "من نحن" : "About")}
                </a>
              </li>
              <li>
                <a href={isAr ? "/ar/contact" : "/en/contact"} className="text-zinc-400 hover:text-primary text-xs font-semibold transition-colors duration-300">
                  {dict?.nav?.contact || (isAr ? "تواصل معنا" : "Contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column & Social */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-base font-bold text-white relative pb-2 after:content-[''] after:absolute after:bottom-0 after:start-0 after:w-8 after:h-[2px] after:bg-primary">
              {isAr ? "تواصل معنا" : "Get In Touch"}
            </h3>
            <ul className="space-y-3.5 text-zinc-400 text-xs font-semibold text-center md:text-start">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <div className="p-1.5 rounded-full bg-white/5 text-primary">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <span dir="ltr" className="hover:text-white transition-colors cursor-pointer">+20 123 456 7890</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <div className="p-1.5 rounded-full bg-white/5 text-primary">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <a href="mailto:info@sigmapetroleum.com" className="hover:text-white transition-colors">
                  info@sigmapetroleum.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <div className="p-1.5 rounded-full bg-white/5 text-primary">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <span className="hover:text-white transition-colors">{isAr ? "القاهرة، مصر" : "Cairo, Egypt"}</span>
              </li>
            </ul>
            <div className="flex items-center gap-3 pt-2">
              {[
                {
                  name: "Facebook",
                  url: socialLinks?.facebook ,
                  Icon: FacebookIcon,
                },
                {
                  name: "Instagram",
                  url: socialLinks?.instagram,
                  Icon: InstagramIcon,
                },
                {
                  name: "YouTube",
                  url: socialLinks?.youtube,
                  Icon: YoutubeIcon,
                },
                {
                  name: "LinkedIn",
                  url: socialLinks?.linkedin,
                  Icon: LinkedinIcon,
                },
                {
                  name: "Twitter",
                  url: socialLinks?.twitter,
                  Icon: TwitterIcon,
                },
                {
                  name: "WhatsApp",
                  url: socialLinks?.whatsapp,
                  Icon: WhatsAppIcon,
                },
              ]
                .filter((item) => item.url)
                .map((item) => {
                  const Icon = item.Icon;
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={item.name}
                      className="p-2.5 rounded-full bg-white/5 hover:bg-primary transition-all duration-300 text-white shadow-sm hover:scale-110 active:scale-95"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-center md:text-start gap-4 text-[11px] text-zinc-500 font-semibold">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <div>
              © {new Date().getFullYear()} Sigma. {dict?.footer?.rights || (isAr ? "جميع الحقوق محفوظة" : "All rights reserved")}.
            </div>
            <span className="hidden md:inline text-zinc-800">|</span>
            <div className="flex items-center gap-3">
              <a href={isAr ? "/ar/privacy" : "/en/privacy"} className="hover:text-white transition-all">
                {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
              </a>
              <span className="text-zinc-800">·</span>
              <a href={isAr ? "/ar/terms" : "/en/terms"} className="hover:text-white transition-all">
                {isAr ? "شروط الاستخدام" : "Terms of Use"}
              </a>
              <span className="text-zinc-800">·</span>
              <a href={isAr ? "/ar/hsse" : "/en/hsse"} className="hover:text-white transition-all">
                {isAr ? "الصحة والسلامة والبيئة (HSSE)" : "HSSE Policy"}
              </a>
            </div>
          </div>
          
          {/* Developer Credit */}
          <div className="text-[10px] text-zinc-500 flex items-center justify-center gap-1.5 bg-white/[0.02] border border-white/5 hover:border-primary/20 px-3 py-1.5 rounded-full transition-all duration-300">
            <span>{isAr ? "تصميم وتطوير" : "Designed & Developed by"}</span>
            <span className="font-bold text-zinc-300 flex items-center gap-0.5">
              زياد شلبي (Zeyad Shalaby)
              <Heart className="h-2.5 w-2.5 fill-primary text-primary animate-pulse" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

