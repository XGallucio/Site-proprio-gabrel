import React, { useEffect, useState, useRef } from 'react';
import { GABRIEL_DATA } from '../data/portfolioData';
import { formatMetricNumber } from '../utils/portfolio';

export const Metrics: React.FC = () => {
  const [animated, setAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#0F0F0F] border-b border-[#222222] py-14" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#262626] border border-[#262626]">
          {GABRIEL_DATA.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-[#141414] hover:bg-[#181818] transition-colors p-8 flex flex-col justify-between group"
            >
              <div>
                <span className="font-mono-tech text-[10px] text-[#E82626] tracking-[0.2em] uppercase font-bold block mb-4">
                  METRIC_0{idx + 1}
                </span>
                <div className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight tabular-nums mb-3 group-hover:text-[#F5F0E9] transition-colors">
                  {animated ? (
                    formatMetricNumber(metric.value, metric.value, metric.suffix, metric.value % 1 !== 0 ? 1 : 0)
                  ) : (
                    `0${metric.suffix}`
                  )}
                </div>
              </div>

              <div>
                <div className="font-mono-tech text-xs uppercase tracking-[0.14em] text-white font-medium mb-1">
                  {metric.label}
                </div>
                <p className="text-xs text-[#8E8E93] leading-relaxed">
                  {metric.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
