import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[75vh] w-full flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,51,102,0.03),transparent_50%)] pointer-events-none" />

      <div className="flex flex-col items-center justify-center space-y-6 relative z-10">
        {/* Pulsing Brand Logo with a Spinning Outer Ring */}
        <div className="relative flex items-center justify-center w-24 h-24">
          {/* Animated Spinner Ring */}
          <div className="absolute inset-0 border-2 border-t-transparent border-r-[#E61C24] border-b-[#003366] border-l-transparent rounded-full animate-[spin_1.2s_linear_infinite]" />
          
          {/* Pulsing inner branding container */}
          <div className="w-18 h-18 bg-card border border-border/40 rounded-full flex items-center justify-center shadow-lg animate-pulse p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Sigma website/Sigma Logo/Orignal Logo.png"
              alt="Sigma Logo"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        {/* Loading bar */}
        <div className="w-32 h-1 bg-border/40 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-2/3 bg-gradient-to-r from-[#003366] to-[#E61C24] rounded-full animate-loader-bar" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loaderBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-loader-bar {
          animation: loaderBar 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}} />
    </div>
  );
}
