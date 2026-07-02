"use client";

import React, { memo, useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

// Natural Earth 50m resolution for good detail on MENA region
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

// ISO 3166-1 numeric codes for countries to display in the MENA region
const MENA_IDS = new Set([
  "504", // Morocco
  "012", // Algeria
  "788", // Tunisia
  "434", // Libya
  "818", // Egypt
  "729", // Sudan
  "728", // South Sudan
  "760", // Syria
  "422", // Lebanon
  "400", // Jordan
  "368", // Iraq
  "376", // Israel
  "275", // Palestine
  "682", // Saudi Arabia
  "414", // Kuwait
  "048", // Bahrain
  "634", // Qatar
  "784", // UAE
  "512", // Oman
  "887", // Yemen
  "364", // Iran
  "792", // Turkey
  "196", // Cyprus
  "148", // Chad
  "562", // Niger
  "466", // Mali
  "478", // Mauritania
  "732", // Western Sahara
  "232", // Eritrea
  "262", // Djibouti
  "706", // Somalia
  "231", // Ethiopia
  "404", // Kenya
  "800", // Uganda
  "834", // Tanzania
  "180", // DR Congo
  "140", // Central African Republic
  "566", // Nigeria
  "854", // Burkina Faso
  "694", // Sierra Leone
  "430", // Liberia
  "384", // Ivory Coast
  "288", // Ghana
  "768", // Togo
  "204", // Benin
  "120", // Cameroon
  "226", // Equatorial Guinea
  "266", // Gabon
  "178", // Congo
  "300", // Greece
  "380", // Italy
  "724", // Spain
  "620", // Portugal
  "250", // France (mainland)
  "756", // Switzerland
  "040", // Austria
  "276", // Germany
  "191", // Croatia
  "070", // Bosnia
  "688", // Serbia
  "008", // Albania
  "807", // North Macedonia
  "100", // Bulgaria
  "642", // Romania
  "348", // Hungary
  "616", // Poland
  "804", // Ukraine
  "498", // Moldova
  "268", // Georgia
  "051", // Armenia
  "031", // Azerbaijan
  "762", // Tajikistan
  "860", // Uzbekistan
  "795", // Turkmenistan
  "586", // Pakistan
  "004", // Afghanistan
]);

// Sigma office countries — these are interactive
const SIGMA_IDS = {
  "818": "Egypt",
  "682": "Saudi Arabia",
  "512": "Oman",
  "434": "Libya",
  "760": "Syria",
};

// Reverse lookup: country name → ISO numeric ID
const NAME_TO_ID = {
  Egypt: "818",
  "Saudi Arabia": "682",
  Oman: "512",
  Libya: "434",
  Syria: "760",
};

function MenaMap({ selectedCountry, onSelectCountry, isRTL }) {
  const selectedId = NAME_TO_ID[selectedCountry] || "";

  return (
    <div className="relative w-full h-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [38, 24],
          scale: 420,
        }}
        width={800}
        height={480}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup
          center={[38, 24]}
          zoom={1}
          minZoom={0.8}
          maxZoom={3}
        >
          {/* Sea / ocean background */}
          <rect x={-500} y={-500} width={2000} height={2000} className="fill-blue-50/50 dark:fill-blue-950/20" />

          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const geoId = geo.id;
                const isMena = MENA_IDS.has(geoId);
                const isSigma = geoId in SIGMA_IDS;
                const isSelected = geoId === selectedId;

                // Only render MENA-region and surrounding countries
                if (!isMena) return null;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={
                      isSigma
                        ? () => onSelectCountry(SIGMA_IDS[geoId])
                        : undefined
                    }
                    style={{
                      default: {
                        fill: isSelected
                          ? "#E61C24"
                          : isSigma
                          ? "#003366"
                          : "#d1d5db",
                        stroke: isSelected
                          ? "#E61C24"
                          : isSigma
                          ? "#002244"
                          : "#9ca3af",
                        strokeWidth: isSelected ? 1.5 : 0.5,
                        cursor: isSigma ? "pointer" : "default",
                        outline: "none",
                        transition: "all 250ms",
                        filter: isSelected
                          ? "drop-shadow(0 0 8px rgba(230,28,36,0.5))"
                          : isSigma
                          ? "drop-shadow(0 1px 2px rgba(0,0,0,0.15))"
                          : "none",
                      },
                      hover: {
                        fill: isSelected
                          ? "#FF3B43"
                          : isSigma
                          ? "#004488"
                          : "#d1d5db",
                        stroke: isSelected
                          ? "#FF3B43"
                          : isSigma
                          ? "#003366"
                          : "#9ca3af",
                        strokeWidth: isSigma ? 1.5 : 0.5,
                        cursor: isSigma ? "pointer" : "default",
                        outline: "none",
                        filter: isSigma
                          ? "drop-shadow(0 0 6px rgba(0,51,102,0.4))"
                          : "none",
                      },
                      pressed: {
                        fill: isSigma ? "#E61C24" : "#d1d5db",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}

export default memo(MenaMap);
