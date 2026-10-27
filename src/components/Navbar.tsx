import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ShieldAlert } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    sound.setEnabled(next);
  };

  const navLinks = [
    { label: 'Visão Geral', href: '#sobre' },
    { label: 'Especialidades', href: '#dominios' },
    { label: 'Projetos & Exploits', href: '#projetos' },
    { label: 'Console Interativo', href: '#terminal' },
    { label: 'Metodologia', href: '#processo' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-[#262626] shadow-2xl'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          onClick={() => sound.playClick()}
          className="group flex items-center gap-2.5 text-white font-display font-bold text-lg tracking-tight whitespace-nowrap shrink-0"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E82626] group-hover:scale-125 transition-transform duration-300" />
          <span>GABRIEL GALUCIO</span>
          <span className="hidden sm:inline-block font-mono-tech text-[10px] text-[#8E8E93] tracking-widest pl-1 uppercase">
            / SEC_OPS
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-mono-tech uppercase tracking-wider text-[#A0A0A0]" aria-label="Navegação principal">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => sound.playClick()}
              className="hover:text-white transition-colors duration-200 relative py-1 hover:underline decoration-[#E82626] underline-offset-8 whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Audio Control */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={audioEnabled ? 'Desativar áudio háptico' : 'Ativar áudio háptico'}
            title={audioEnabled ? 'Áudio hático ativado' : 'Ativar feedback sonoro'}
            className="p-2 rounded-md text-[#8E8E93] hover:text-white hover:bg-[#1A1A1A] border border-transparent hover:border-[#262626] transition-all"
          >
            {audioEnabled ? (
              <Volume2 className="w-4 h-4 text-[#E82626]" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenContact();
            }}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono-tech tracking-wider uppercase font-semibold text-white bg-[#E82626] hover:bg-[#ff3333] transition-all duration-200 glow-accent-sm whitespace-nowrap rounded-none active:scale-95"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Iniciar Contrato</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 text-white hover:bg-[#1A1A1A] border border-[#262626] rounded-none"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[60px] left-0 w-full bg-[#0D0D0D]/95 backdrop-blur-2xl border-b border-[#262626] px-6 py-8 flex flex-col gap-6 shadow-2xl z-50">
          <nav className="flex flex-col gap-5 text-sm font-mono-tech uppercase tracking-widest text-[#A0A0A0]">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                }}
                className="py-2 border-b border-[#1E1E1E] hover:text-[#E82626] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full py-3 text-center text-xs font-mono-tech tracking-wider uppercase font-semibold text-white bg-[#E82626] hover:bg-[#ff3333] transition-colors"
          >
            Iniciar Contrato
          </button>
        </div>
      )}
    </header>
  );
};
