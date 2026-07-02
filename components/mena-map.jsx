"use client";

import React from "react";
import { motion } from "framer-motion";

// Real simplified SVG paths for MENA region countries
// ViewBox is calibrated to show the Arab world from Morocco to Oman
const COUNTRY_PATHS = {
  // North Africa
  Morocco: {
    d: "M88,bindTo158 L95,149 L107,146 L112,140 L120,139 L126,134 L130,128 L138,126 L142,118 L136,113 L128,115 L118,112 L110,108 L102,112 L93,116 L86,122 L78,128 L72,136 L68,144 L70,152 L78,156 Z",
    label: { x: 100, y: 135 },
    labelAr: "المغرب"
  },
  Algeria: {
    d: "M142,118 L138,126 L130,128 L126,134 L120,139 L112,140 L107,146 L108,156 L112,168 L118,182 L126,196 L136,204 L148,210 L162,212 L176,208 L188,200 L196,192 L202,180 L204,168 L200,156 L194,146 L186,138 L178,132 L170,128 L162,124 L154,120 L148,118 Z",
    label: { x: 158, y: 162 },
    labelAr: "الجزائر"
  },
  Tunisia: {
    d: "M178,108 L174,114 L170,120 L170,128 L178,132 L184,126 L188,118 L186,112 Z",
    label: { x: 179, y: 120 },
    labelAr: "تونس"
  },
  Libya: {
    d: "M188,118 L184,126 L178,132 L186,138 L194,146 L200,156 L204,168 L210,178 L220,186 L232,190 L244,188 L254,184 L262,178 L268,170 L272,160 L270,148 L264,138 L256,130 L248,124 L240,120 L230,116 L220,114 L210,114 L200,116 Z",
    label: { x: 230, y: 152 },
    labelAr: "ليبيا"
  },
  Egypt: {
    d: "M272,160 L268,170 L262,178 L258,188 L256,198 L258,208 L262,218 L268,226 L276,228 L284,226 L290,220 L296,212 L300,202 L302,192 L300,182 L296,174 L290,166 L282,162 Z",
    label: { x: 278, y: 196 },
    labelAr: "مصر"
  },
  Sudan: {
    d: "M268,226 L262,236 L258,248 L260,260 L266,270 L274,276 L284,280 L296,278 L306,272 L312,264 L316,254 L316,244 L312,234 L306,226 L298,220 L290,220 L284,226 L276,228 Z",
    label: { x: 286, y: 252 },
    labelAr: "السودان"
  },
  // Levant
  Syria: {
    d: "M320,138 L314,144 L310,152 L312,160 L318,166 L326,168 L334,166 L340,160 L342,152 L340,144 L334,138 L328,136 Z",
    label: { x: 326, y: 153 },
    labelAr: "سوريا"
  },
  Lebanon: {
    d: "M312,168 L310,174 L312,180 L318,182 L320,176 L318,170 Z",
    label: { x: 315, y: 175 },
    labelAr: "لبنان"
  },
  Jordan: {
    d: "M318,182 L314,190 L316,198 L322,204 L330,202 L334,194 L332,186 L326,180 Z",
    label: { x: 324, y: 193 },
    labelAr: "الأردن"
  },
  Iraq: {
    d: "M340,144 L342,152 L340,160 L334,166 L326,168 L318,170 L320,176 L318,182 L326,180 L332,186 L340,188 L350,186 L360,180 L368,172 L372,162 L370,152 L366,144 L358,138 L350,136 L342,138 Z",
    label: { x: 348, y: 162 },
    labelAr: "العراق"
  },
  Palestine: {
    d: "M308,186 L306,192 L308,198 L312,200 L314,194 L312,188 Z",
    label: { x: 310, y: 193 },
    labelAr: "فلسطين"
  },
  // Gulf
  Kuwait: {
    d: "M368,172 L366,178 L370,184 L376,182 L376,176 Z",
    label: { x: 372, y: 178 },
    labelAr: "الكويت"
  },
  SaudiArabia: {
    d: "M322,204 L316,212 L310,224 L308,238 L312,252 L320,264 L332,272 L346,276 L360,278 L374,276 L386,270 L396,260 L404,248 L408,236 L408,224 L404,214 L398,206 L390,198 L382,192 L376,188 L370,184 L366,178 L360,180 L350,186 L340,188 L332,186 L330,194 L326,200 Z",
    label: { x: 360, y: 238 },
    labelAr: "السعودية"
  },
  Bahrain: {
    d: "M392,210 L390,214 L392,218 L396,216 L396,212 Z",
    label: { x: 393, y: 214 },
    labelAr: "البحرين"
  },
  Qatar: {
    d: "M398,218 L396,224 L398,230 L402,228 L402,222 Z",
    label: { x: 399, y: 224 },
    labelAr: "قطر"
  },
  UAE: {
    d: "M408,224 L404,230 L406,238 L414,242 L422,240 L426,234 L424,228 L418,224 Z",
    label: { x: 416, y: 233 },
    labelAr: "الإمارات"
  },
  Oman: {
    d: "M414,242 L410,250 L408,260 L412,270 L420,276 L430,278 L438,274 L444,266 L446,256 L444,246 L438,238 L430,234 L424,234 L422,240 Z",
    label: { x: 430, y: 258 },
    labelAr: "عُمان"
  },
  Yemen: {
    d: "M346,276 L340,284 L338,294 L342,304 L350,310 L362,312 L374,310 L386,304 L396,296 L404,286 L408,276 L404,268 L396,260 L386,270 L374,276 L360,278 Z",
    label: { x: 370, y: 294 },
    labelAr: "اليمن"
  },
};

// Countries where Sigma has offices (clickable & highlighted)
const SIGMA_COUNTRIES = ["Egypt", "SaudiArabia", "Oman", "Libya", "Syria"];

// Map from SIGMA_COUNTRIES keys to MAP_COUNTRIES names
const COUNTRY_KEY_TO_NAME = {
  Egypt: "Egypt",
  SaudiArabia: "Saudi Arabia",
  Oman: "Oman",
  Libya: "Libya",
  Syria: "Syria",
};

const NAME_TO_COUNTRY_KEY = {
  Egypt: "Egypt",
  "Saudi Arabia": "SaudiArabia",
  Oman: "Oman",
  Libya: "Libya",
  Syria: "Syria",
};

export default function MenaMap({ selectedCountry, onSelectCountry, isRTL }) {
  const selectedKey = NAME_TO_COUNTRY_KEY[selectedCountry] || "";

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="60 90 420 240"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxHeight: "100%" }}
      >
        {/* Background grid pattern */}
        <defs>
          <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-border/30" />
          </pattern>
          {/* Glow filter for selected country */}
          <filter id="selectedGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="#E61C24" floodOpacity="0.4" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Subtle shadow for all countries */}
          <filter id="countryShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Grid background */}
        <rect x="60" y="90" width="420" height="240" fill="url(#mapGrid)" opacity="0.4" />

        {/* Water / Sea areas - subtle blue tint */}
        <rect x="60" y="90" width="420" height="240" fill="currentColor" className="text-blue-500/[0.03] dark:text-blue-400/[0.05]" />

        {/* Render all country shapes */}
        {Object.entries(COUNTRY_PATHS).map(([key, country]) => {
          const isSigma = SIGMA_COUNTRIES.includes(key);
          const isSelected = key === selectedKey;
          const countryName = COUNTRY_KEY_TO_NAME[key];

          return (
            <g key={key}>
              {/* Country shape */}
              <motion.path
                d={country.d}
                onClick={isSigma ? () => onSelectCountry(countryName) : undefined}
                className={`
                  transition-all duration-300 cursor-${isSigma ? "pointer" : "default"}
                  ${isSelected
                    ? "fill-[#E61C24] stroke-[#E61C24] dark:fill-[#FF3B43] dark:stroke-[#FF3B43]"
                    : isSigma
                      ? "fill-[#003366] stroke-[#003366]/60 dark:fill-[#4A90D9] dark:stroke-[#4A90D9]/60 hover:fill-[#004488] dark:hover:fill-[#5BA3FF]"
                      : "fill-muted-foreground/15 stroke-muted-foreground/30 dark:fill-white/10 dark:stroke-white/20"
                  }
                `}
                strokeWidth={isSelected ? 2 : 1}
                filter={isSelected ? "url(#selectedGlow)" : isSigma ? "url(#countryShadow)" : undefined}
                whileHover={isSigma ? { scale: 1.03 } : {}}
                style={{ transformOrigin: `${country.label.x}px ${country.label.y}px` }}
              />

              {/* Country label */}
              <text
                x={country.label.x}
                y={country.label.y}
                textAnchor="middle"
                dominantBaseline="central"
                className={`
                  pointer-events-none select-none font-bold
                  ${isSelected
                    ? "fill-white text-[7px]"
                    : isSigma
                      ? "fill-white dark:fill-white text-[6px]"
                      : "fill-muted-foreground/60 dark:fill-white/30 text-[5px]"
                  }
                `}
                style={{ fontSize: isSelected ? "7px" : isSigma ? "6px" : "5px" }}
              >
                {isRTL ? country.labelAr : key === "SaudiArabia" ? "KSA" : key === "Palestine" ? "PS" : key}
              </text>

              {/* Pulsing dot for Sigma countries */}
              {isSigma && (
                <>
                  <circle
                    cx={country.label.x}
                    cy={country.label.y - 12}
                    r={isSelected ? 4 : 3}
                    className={isSelected ? "fill-white" : "fill-[#E61C24]"}
                  />
                  {isSelected && (
                    <motion.circle
                      cx={country.label.x}
                      cy={country.label.y - 12}
                      r={4}
                      fill="none"
                      stroke="#E61C24"
                      strokeWidth={1.5}
                      initial={{ r: 4, opacity: 0.8 }}
                      animate={{ r: 12, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                </>
              )}
            </g>
          );
        })}

        {/* Sea labels */}
        <text x="200" y="175" textAnchor="middle" className="fill-blue-400/30 dark:fill-blue-300/20" style={{ fontSize: "6px", fontStyle: "italic" }}>
          {isRTL ? "البحر المتوسط" : "Mediterranean Sea"}
        </text>
        <text x="300" y="260" textAnchor="middle" className="fill-blue-400/30 dark:fill-blue-300/20" style={{ fontSize: "5px", fontStyle: "italic" }}>
          {isRTL ? "البحر الأحمر" : "Red Sea"}
        </text>
        <text x="420" y="215" textAnchor="middle" className="fill-blue-400/30 dark:fill-blue-300/20" style={{ fontSize: "5px", fontStyle: "italic" }}>
          {isRTL ? "الخليج العربي" : "Arabian Gulf"}
        </text>
      </svg>
    </div>
  );
}
