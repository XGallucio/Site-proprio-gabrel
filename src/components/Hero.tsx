import React from 'react';
import { ShieldCheck, Terminal, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { CyberGlobe } from './CyberGlobe';
import { GABRIEL_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface HeroProps {
  onOpenContact: () => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onExploreProjects }) => {
  return (
    <section id="top" className="relative min-h-[95vh] pt-28 pb-16 md:pt-36 md:pb-24 flex flex-col justify-between border-b border-[#222222]">
      {/* 1px Vertical Engineering Grid Lines (Visible layout aesthetic) */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pointer-events-none flex justify-between z-0">
        <div className="w-[1px] h-full bg-[#1F1F1F]" />
        <div className="w-[1px] h-full bg-[#1F1F1F] hidden md:block" />
        <div className="w-[1px] h-full bg-[#1F1F1F] hidden lg:block" />
        <div className="w-[1px] h-full bg-[#1F1F1F]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10 w-full my-auto">
        {/* Top Kicker Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#222222]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#E82626] animate-pulse" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#E82626] font-semibold">
              {GABRIEL_DATA.status}
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono-tech text-xs uppercase tracking-[0.15em] text-[#8E8E93]">
            <span>{GABRIEL_DATA.location}</span>
            <span className="text-[#333]">|</span>
            <span className="text-white">ENGENHARIA & DEFESA</span>
          </div>
        </div>

        {/* 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Column Left: Oversized Typographic Dominance */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Editorial Script Accent Flourish */}
            <div className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#E82626] mb-1 font-normal select-none">
              Offensive mind, defensive craft
            </div>

            {/* Massive Display Title touching bounds */}
            <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl xl:text-[6.8rem] leading-[0.92] text-white tracking-[-0.04em] uppercase mb-6 text-wrap-balance">
              GABRIEL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5F0E9] to-[#8E8E93]">
                GALUCIO
              </span>
            </h1>

            {/* Subtitle / Lead Paragraph */}
            <p className="text-[#A0A0A0] text-base sm:text-lg max-w-xl font-normal leading-relaxed mb-8">
              Especialista sênior em <strong className="text-white font-medium">cybersecurity</strong>, testes de intrusão (<strong className="text-white font-medium">pentesting</strong>), desenvolvimento <strong className="text-white font-medium">full-stack resiliente</strong> e engenharia reversa de <strong className="text-white font-medium">hardware</strong>. Projetado para quem exige segurança matemática e acabamento digital sem concessões.
            </p>

            {/* Dual CTAs (1 Filled Accent + 1 Ghost Outline) */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenContact();
                }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#E82626] hover:bg-[#ff3333] text-white font-mono-tech text-xs uppercase tracking-[0.16em] font-bold transition-all duration-200 glow-accent"
              >
                <span>Solicitar Auditoria / Red Team</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onExploreProjects();
                }}
                className="inline-flex items-center gap-3 px-7 py-4 bg-[#141414] hover:bg-[#1C1C1C] text-white font-mono-tech text-xs uppercase tracking-[0.16em] border border-[#2B2B2B] hover:border-white/50 transition-all duration-200"
              >
                <Terminal className="w-4 h-4 text-[#E82626]" />
                <span>Explorar Projetos & Exploits</span>
                <ArrowDownRight className="w-4 h-4 text-[#8E8E93]" />
              </button>
            </div>
          </div>

          {/* Column Right: 3D Holographic Globe with Rim Lighting */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <CyberGlobe className="w-full max-w-[480px]" />
          </div>
        </div>
      </div>

      {/* Bottom Floating Technical Ticker Line */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 w-full mt-12 relative z-10">
        <div className="pt-6 border-t border-[#222222] flex flex-wrap items-center justify-between gap-4 font-mono-tech text-[11px] text-[#8E8E93] uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E82626]" />
            <span>METODOLOGIA OSCP / NIST / OWASP ASVS</span>
          </div>
          <div className="flex items-center gap-3">
            <span>PGP: {GABRIEL_DATA.pgpFingerprint.slice(0, 19)}...</span>
          </div>
        </div>
      </div>
    </section>
  );
};
