import React, { useRef, useState, useEffect } from "react";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import BallsCanvas from "../components/canvas/Ball/";

const Tech = () => {
  const containerRef = useRef(null);
  const [size, setSize] = useState({
    width: 1000,
    height: 420,
    gapPx: 40,
    ballScale: 1.0,
  });

  const itemPx = 90;
  const baseGapPx  = 40;  
  const baseBallScale = 1.0; 

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.style.minHeight = "0";
    el.style.boxSizing = "content-box";

    const recompute = () => {
      const rect = el.getBoundingClientRect();
      const width = Math.max(1, rect.width);

      let cols = Math.max(1, Math.floor(width / (itemPx + baseGapPx)));
      const rows = Math.max(1, Math.ceil(technologies.length / cols));

      const extraCols = Math.max(0, cols - 6);
      const extraGap = Math.floor(extraCols / 2) * 16;
      const gapEffective = baseGapPx + extraGap;

      const shrinkFactor = Math.max(0, cols - 8) * 0.03;
      const scaleReduction = Math.min(0.35, shrinkFactor);
      const effectiveBallScale = Math.max(0.6, baseBallScale - scaleReduction);

      const spanPx = (rows - 1) * (itemPx + gapEffective) + itemPx;
      const verticalPadding = 40; 
      const neededHeight = Math.ceil(spanPx + verticalPadding);

      el.style.height = `${neededHeight}px`;

      setSize({
        width,
        height: neededHeight,
        gapPx: gapEffective,
        ballScale: effectiveBallScale,
      });
    };

    recompute();

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(recompute);
    });
    ro.observe(el);
    window.addEventListener("resize", recompute);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, [itemPx]);

  return (
    <div className="w-full flex justify-center">
      <div
        ref={containerRef}
        className="w-full"
        style={{ width: "100%" }}
      >
        <BallsCanvas
          technologies={technologies}
          containerWidth={size.width}
          containerHeight={size.height}
          itemPx={itemPx}
          gapPx={size.gapPx}
          size={size.ballScale}
        />
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");