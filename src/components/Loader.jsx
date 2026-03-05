// Professional comments in English only: Enhanced animated loader overlay for 3D scene loading.
// This loader uses layered spinning rings and a pulsing center glow for a modern look.
// Pure Tailwind CSS implementation with no external libraries.

import React from "react";

const CanvasLoader = () => {
  return (
    <div className="flex items-center justify-center">
      {/* Outer rotating gradient ring */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-violet-500/30"></div>

        {/* Animated spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-violet-500 border-r-violet-400 border-b-transparent border-l-transparent animate-spin"></div>

        {/* Inner pulsing glow */}
        <div className="absolute inset-4 rounded-full bg-violet-500/20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default CanvasLoader;