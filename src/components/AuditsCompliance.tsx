import React from 'react';
import { TESTIMONIALS } from '../data/portfolioData';
import { Quote } from 'lucide-react';

export const AuditsCompliance: React.FC = () => {
  return (
    <section className="py-24 bg-[#0A0A0A] border-b border-[#222222]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#222222] mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E82626]" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#E82626] font-semibold">
                AVALIAÇÕES & PROVA TÉCNICA
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
              Reconhecimento <span className="font-editorial text-[#E82626] font-normal lowercase">&</span> Resultados
            </h2>
          </div>
          <p className="text-[#8E8E93] text-sm max-w-md leading-relaxed font-normal">
            Depoimentos de lideranças de engenharia e segurança que confiaram seus ecossistemas críticos ao olhar investigativo de Gabriel Galucio.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#121212] border border-[#222222] hover:border-[#E82626]/40 p-8 flex flex-col justify-between transition-colors relative"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1E1E1E]">
                  <span className="font-mono-tech text-[10px] text-[#E82626] uppercase tracking-wider font-semibold">
                    {t.badge}
                  </span>
                  <Quote className="w-4 h-4 text-[#444]" />
                </div>

                <p className="text-sm text-[#CCCCCC] leading-relaxed mb-8 italic font-light">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#1E1E1E]">
                <div className="font-display font-bold text-white text-base">
                  {t.name}
                </div>
                <div className="font-mono-tech text-xs text-[#8E8E93] mt-0.5">
                  {t.role}
                </div>
                <div className="font-mono-tech text-[11px] text-[#A0A0A0] mt-0.5 font-medium">
                  {t.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
