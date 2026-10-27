import React from 'react';
import { GABRIEL_DATA } from '../data/portfolioData';
import { Terminal, Cpu, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-[#0D0D0D] border-b border-[#222222] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Column Left: Philosophy & Narrative */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E82626]" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#E82626] font-semibold">
                FILOSOFIA DE ENGENHARIA
              </span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-8">
              A segurança não é um remendo, é a <span className="font-editorial text-[#E82626] font-normal lowercase">fundação</span> do sistema.
            </h2>

            <div className="space-y-5 text-sm sm:text-base text-[#A5A5A5] leading-relaxed font-normal">
              <p>
                {GABRIEL_DATA.bioParagraph}
              </p>
              <p>
                Enquanto scanners tradicionais apenas procuram por assinaturas conhecidas, minha abordagem de <strong className="text-white font-medium">Red Team</strong> investiga a lógica de negócio, falhas de sincronização de memória e barramentos de hardware onde defesas em software falham.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#222222] grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <span className="font-mono-tech text-xs text-[#E82626] font-bold block mb-1">OFFENSIVE</span>
                <p className="text-xs text-[#8E8E93]">Identificação de vetores ocultos antes que adversários reais o façam.</p>
              </div>
              <div>
                <span className="font-mono-tech text-xs text-white font-bold block mb-1">ARCHITECTURAL</span>
                <p className="text-xs text-[#8E8E93]">Construção de código resiliente em Go, Rust, TypeScript e C.</p>
              </div>
              <div>
                <span className="font-mono-tech text-xs text-[#E82626] font-bold block mb-1">HARDWARE LAB</span>
                <p className="text-xs text-[#8E8E93]">Análise física direta de memória flash, barramentos e firmware.</p>
              </div>
            </div>
          </div>

          {/* Column Right: Technical Workbench Card */}
          <div className="lg:col-span-5 bg-[#141414] border border-[#262626] p-8 sm:p-10 relative">
            <div className="font-mono-tech text-[10px] text-[#8E8E93] uppercase tracking-widest mb-4">
              PROFILE_MANIFEST // GABRIEL_GALUCIO
            </div>

            <div className="space-y-4 font-mono-tech text-xs">
              <div className="flex items-start justify-between py-2 border-b border-[#202020]">
                <span className="text-[#8E8E93]">ESPECIALIZAÇÃO:</span>
                <span className="text-white font-semibold">Offensive Pentest & Web Core</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-[#202020]">
                <span className="text-[#8E8E93]">LINGUAGENS:</span>
                <span className="text-white">Go, Rust, TypeScript, C/C++, Python</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-[#202020]">
                <span className="text-[#8E8E93]">FRAMEWORKS:</span>
                <span className="text-white">React 19, Next.js, Node, eBPF, Linux</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-[#202020]">
                <span className="text-[#8E8E93]">HARDWARE LAB:</span>
                <span className="text-white">Bus Pirate, Saleae, UART/JTAG, STM32</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-[#202020]">
                <span className="text-[#8E8E93]">DISPONIBILIDADE:</span>
                <span className="text-emerald-400 font-semibold">Projetos & Red Team Retainers</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-[#0A0A0A] border border-[#222] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#E82626] shrink-0" />
              <span className="font-mono-tech text-[11px] text-[#A0A0A0]">
                Auditorias executadas sob regras de engajamento formais (Rules of Engagement).
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
