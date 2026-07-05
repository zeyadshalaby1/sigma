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

  useEffect(() => {
    const consent = getCookie(CONSENT_COOKIE);
    const profile = getCookie(PROFILE_COOKIE);

    if (consent || profile) {
      setVisible(false);
      return;
    }

    handleAccept();
  }, []);

  return null;
}
