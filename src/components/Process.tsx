import React from 'react';
import { PROCESS_STEPS } from '../data/portfolioData';

export const Process: React.FC = () => {
  return (
    <section id="processo" className="py-24 bg-[#0A0A0A] border-b border-[#222222]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#222222] mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E82626]" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#E82626] font-semibold">
                PIPELINE DE ENGENHARIA
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
              Metodologia <span className="font-editorial text-[#E82626] font-normal lowercase">&</span> Processo
            </h2>
          </div>
          <p className="text-[#8E8E93] text-sm max-w-md leading-relaxed font-normal">
            Do reconhecimento inicial ao hardening cirúrgico. Cada etapa é documentada com evidências reproduzíveis e código limpo.
          </p>
        </div>

        {/* 5-Step Process Pipeline */}
        <div className="space-y-4">
          {PROCESS_STEPS.map((item) => (
            <div
              key={item.step}
              className="bg-[#121212] hover:bg-[#161616] border border-[#242424] hover:border-[#E82626]/50 p-6 sm:p-8 transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group"
            >
              {/* Step Number */}
              <div className="md:col-span-2 flex items-center gap-4">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#E82626]">
                  {item.step}
                </span>
                <span className="font-mono-tech text-xs text-[#8E8E93] uppercase tracking-wider block">
                  FASE
                </span>
              </div>

              {/* Step Info */}
              <div className="md:col-span-6">
                <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight mb-1 group-hover:text-[#F5F0E9] transition-colors">
                  {item.name}
                </h3>
                <div className="font-mono-tech text-xs text-[#E82626] mb-2 font-medium">
                  {item.headline}
                </div>
                <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Deliverable Box */}
              <div className="md:col-span-4 bg-[#0A0A0A] p-4 border border-[#222]">
                <span className="font-mono-tech text-[10px] text-[#8E8E93] uppercase tracking-widest block mb-1">
                  ENTREGÁVEL AUDITÁVEL
                </span>
                <span className="font-mono-tech text-xs text-white font-medium">
                  {item.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
