import React from 'react';
import { ShieldCheck, Code2, Cpu, Server, CheckCircle2 } from 'lucide-react';
import { DOMAINS } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const Domains: React.FC = () => {
  const getIcon = (num: string) => {
    switch (num) {
      case '01':
        return <ShieldCheck className="w-6 h-6 text-[#E82626]" />;
      case '02':
        return <Code2 className="w-6 h-6 text-[#E82626]" />;
      case '03':
        return <Cpu className="w-6 h-6 text-[#E82626]" />;
      case '04':
        return <Server className="w-6 h-6 text-[#E82626]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#E82626]" />;
    }
  };

  return (
    <section id="dominios" className="py-24 bg-[#0D0D0D] border-b border-[#222222] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#222222] mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E82626]" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#E82626] font-semibold">
                DOMÍNIOS DE ATUAÇÃO
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
              Especialidades <span className="font-editorial text-[#E82626] font-normal lowercase">&</span> Expertise
            </h2>
          </div>
          <p className="text-[#8E8E93] text-sm max-w-md leading-relaxed font-normal">
            Arquitetura técnica multidisciplinar. Da desconstrução em nível de byte e barramento à engenharia de software distribuído.
          </p>
        </div>

        {/* 4 Modular Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DOMAINS.map((domain) => (
            <div
              key={domain.number}
              onMouseEnter={() => sound.playBlip(380, 0.04)}
              className="bg-[#141414] hover:bg-[#181818] border border-[#242424] hover:border-[#E82626]/60 p-8 sm:p-10 transition-all duration-300 relative group flex flex-col justify-between"
            >
              {/* Subtle top indicator bar on hover */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#E82626] group-hover:w-full transition-all duration-500" />

              <div>
                {/* Header of Card */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="p-3 bg-[#1A1A1A] border border-[#2B2B2B] group-hover:border-[#E82626]/40 transition-colors">
                    {getIcon(domain.number)}
                  </div>
                  <span className="font-mono-tech text-xs font-bold text-[#8E8E93] group-hover:text-[#E82626] transition-colors tracking-widest">
                    {domain.number} / 04
                  </span>
                </div>

                <div className="font-mono-tech text-[11px] text-[#E82626] uppercase tracking-[0.16em] mb-1.5 font-medium">
                  {domain.subtitle}
                </div>
                <h3 className="font-display font-bold text-2xl text-white tracking-tight mb-4 group-hover:text-[#F5F0E9] transition-colors">
                  {domain.title}
                </h3>
                <p className="text-sm text-[#A0A0A0] leading-relaxed mb-6 font-normal">
                  {domain.description}
                </p>

                {/* Checklist Features */}
                <ul className="space-y-2.5 mb-8">
                  {domain.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[#CCCCCC]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E82626] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies strip (unboxed clean text separated by dots) */}
              <div className="pt-6 border-t border-[#222222] flex flex-wrap items-center gap-x-2 gap-y-1 font-mono-tech text-[11px] text-[#8E8E93]">
                <span className="text-[#A0A0A0] font-semibold uppercase tracking-wider">Arsenal:</span>
                {domain.technologies.map((tech, i) => (
                  <React.Fragment key={tech}>
                    <span className="text-[#D0D0D0] hover:text-white transition-colors">{tech}</span>
                    {i < domain.technologies.length - 1 && <span className="text-[#444]">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
