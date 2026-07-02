"use client";

import { useEffect, useState } from "react";

const CONSENT_COOKIE = "sigma_visitor_consent";
const PROFILE_COOKIE = "sigma_visitor_profile";

function getCookie(name) {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]^$\\/+?])/g, "\\$1")}=([^;]*)`)
  );

  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value, days = 365) {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

export function VisitorConsent({ lang = "en" }) {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const consent = getCookie(CONSENT_COOKIE);
    const profile = getCookie(PROFILE_COOKIE);

    if (consent || profile) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(() => setVisible(true), 600);
    return () => window.clearTimeout(timer);
  }, []);

  const handleAccept = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();

      const profilePayload = {
        acceptedAt: new Date().toISOString(),
        ip: data.ip || null,
        city: data.city || null,
        region: data.region || null,
        country: data.country_name || data.country || null,
        countryCode: data.country_code || null,
        timezone: data.timezone || null,
        currency: data.currency || null,
        languages: data.languages || null,
        organization: data.org || null,
        raw: data,
      };

      setCookie(CONSENT_COOKIE, "true", 365);
      setCookie(PROFILE_COOKIE, JSON.stringify(profilePayload), 365);

      await fetch("/api/visitor-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profilePayload),
      });
    } catch {
      const fallbackPayload = {
        acceptedAt: new Date().toISOString(),
        ip: null,
        city: null,
        region: null,
        country: null,
      };

      setCookie(CONSENT_COOKIE, "true", 365);
      setCookie(PROFILE_COOKIE, JSON.stringify(fallbackPayload), 365);

      try {
        await fetch("/api/visitor-consent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fallbackPayload),
        });
      } catch {
        // Ignore database errors and still keep the consent cookie.
      }
    } finally {
      setVisible(false);
      setIsLoading(false);
    }
  };

  if (!visible) return null;

  const isArabic = lang === "ar";

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {isArabic ? "زيارة جديدة" : "New visitor"}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
            {isArabic ? "هل تريد حفظ بيانات زيارتك وتفعيل تجربة مميزة؟" : "Would you like to save your visit details and enable a better experience?"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {isArabic
              ? "بمجرد الضغط على الزر سيتم حفظ معلومات زيارتك من خلال خدمة الموقع ثم تخزينها في الكوكيز بحيث لا يظهر هذا الكرت مرة أخرى."
              : "Once you press the button, your visit details will be fetched and stored in cookies so this card will not appear again."}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleAccept}
            disabled={isLoading}
            className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (isArabic ? "جاري الحفظ..." : "Saving...") : isArabic ? "قبول وحفظ البيانات" : "Accept and save"}
          </button>
        </div>
      </div>
    </div>
  );
}
