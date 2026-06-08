import { useState, useRef } from 'react';

function BeforeAfterSlider({ beforeSrc, afterSrc, beforeLabel = 'Before', afterLabel = 'After' }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPos = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setSliderPos(newPos);
  };

  if (!beforeSrc || !afterSrc) return null;

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700"
      onMouseMove={handleMouseMove}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        const rect = containerRef.current.getBoundingClientRect();
        const newPos = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
        setSliderPos(newPos);
      }}
    >
      <div className="relative">
        {/* After image (background) */}
        <img src={afterSrc} alt={afterLabel} className="w-full" />

        {/* Before image (overlay) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
          <img src={beforeSrc} alt={beforeLabel} className="w-full" />
        </div>

        {/* Slider line */}
        <div className="absolute inset-y-0 w-1 bg-white shadow-lg" style={{ left: `${sliderPos}%` }} />

        {/* Labels */}
        <div className="absolute left-2 top-2 rounded bg-black/60 px-2 py-1 text-xs font-semibold text-white">
          {beforeLabel}
        </div>
        <div className="absolute right-2 top-2 rounded bg-black/60 px-2 py-1 text-xs font-semibold text-white">
          {afterLabel}
        </div>
      </div>
    </div>
  );
}

export default BeforeAfterSlider;
