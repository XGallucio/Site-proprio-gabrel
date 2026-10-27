import React from 'react';
import { ArrowUp, Github, Linkedin, ShieldCheck, Mail } from 'lucide-react';
import { GABRIEL_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090909] text-white pt-20 pb-12 border-t border-[#222222] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#1E1E1E]">
          {/* Col 1: Bio / Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E82626]" />
              <span className="font-display font-bold text-lg tracking-tight">GABRIEL GALUCIO</span>
            </div>
            <p className="text-xs sm:text-sm text-[#8E8E93] max-w-sm leading-relaxed">
              Cybersecurity Researcher, Offensive Pentester & Full-Stack Architect. Unindo a precisão da engenharia reversa com sistemas web de alta performance.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Gabriel Galucio"
                className="p-2 bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] text-[#A0A0A0] hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Gabriel Galucio"
                className="p-2 bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] text-[#A0A0A0] hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${GABRIEL_DATA.email}`}
                aria-label="E-mail de Gabriel Galucio"
                className="p-2 bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] text-[#A0A0A0] hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3 font-mono-tech text-xs uppercase tracking-wider">
            <span className="text-[#8E8E93] font-bold block mb-2">NAVEGAÇÃO</span>
            <ul className="space-y-2 text-[#C5C5C5]">
              <li>
                <a href="#sobre" className="hover:text-[#E82626] transition-colors">Visão Geral</a>
              </li>
              <li>
                <a href="#dominios" className="hover:text-[#E82626] transition-colors">Especialidades</a>
              </li>
              <li>
                <a href="#projetos" className="hover:text-[#E82626] transition-colors">Projetos & Exploits</a>
              </li>
              <li>
                <a href="#terminal" className="hover:text-[#E82626] transition-colors">Console Interativo</a>
              </li>
              <li>
                <a href="#processo" className="hover:text-[#E82626] transition-colors">Metodologia de Auditoria</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Security / Key */}
          <div className="md:col-span-4 space-y-3 font-mono-tech text-xs">
            <span className="text-[#8E8E93] uppercase tracking-wider font-bold block mb-2">CANAL SEGURO</span>
            <p className="text-[#A0A0A0] leading-relaxed text-[11px]">
              E-mail: <strong className="text-white">{GABRIEL_DATA.email}</strong>
            </p>
            <p className="text-[#8E8E93] leading-relaxed text-[10px] break-all">
              PGP: {GABRIEL_DATA.pgpFingerprint}
            </p>
            <div className="pt-2 flex items-center gap-2 text-[10px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TLS 1.3 / E-mail assinado digitalmente</span>
            </div>
          </div>
        </div>

        {/* Colossal Wordmark Display as Fecho */}
        <div className="py-12 border-b border-[#1A1A1A] text-center select-none overflow-hidden">
          <div className="font-display font-black text-4xl sm:text-6xl md:text-8xl lg:text-[7.8rem] leading-none tracking-[-0.04em] text-[#161616] hover:text-[#202020] transition-colors uppercase whitespace-nowrap">
            GABRIEL GALUCIO
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-[11px] text-[#8E8E93] uppercase tracking-wider">
          <div>
            © {new Date().getFullYear()} GABRIEL GALUCIO. TODOS OS DIREITOS RESERVADOS.
          </div>

          <div className="flex items-center gap-6">
            <span>SÃO PAULO · BRASIL · GLOBAL</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-white hover:text-[#E82626] transition-colors cursor-pointer"
            >
              <span>Topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
