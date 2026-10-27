import React from 'react';
import { TECH_ARSENAL } from '../data/portfolioData';
import { Cpu, ShieldCheck, Binary, Terminal } from 'lucide-react';

export const TechArsenal: React.FC = () => {
  const getCategoryIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Terminal className="w-4 h-4 text-[#E82626]" />;
      case 1:
        return <Binary className="w-4 h-4 text-[#E82626]" />;
      case 2:
        return <Cpu className="w-4 h-4 text-[#E82626]" />;
      case 3:
        return <ShieldCheck className="w-4 h-4 text-[#E82626]" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-[#E82626]" />;
    }
  };

  const frameworks = [
    { name: 'MITRE ATT&CK', desc: 'Mapeamento de táticas, técnicas e procedimentos adversários' },
    { name: 'OWASP ASVS v4.0', desc: 'Verificação rigorosa de segurança em nível de aplicação' },
    { name: 'NIST SP 800-53', desc: 'Controles de segurança e privacidade para sistemas federais' },
    { name: 'ISO/IEC 27001', desc: 'Gestão de riscos e conformidade estrutural de dados' },
  ];

  return (
    <section className="py-24 bg-[#0D0D0D] border-b border-[#222222]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#222222] mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E82626]" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#E82626] font-semibold">
                INSTRUMENTAÇÃO & PILHA TÉCNICA
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
              Arsenal <span className="font-editorial text-[#E82626] font-normal lowercase">&</span> Frameworks
            </h2>
          </div>
          <p className="text-[#8E8E93] text-sm max-w-md leading-relaxed font-normal">
            Domínio de ferramentas proprietárias e de código aberto para auditoria de software, hardware e infraestrutura de alta complexidade.
          </p>
        </div>

        {/* Arsenal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TECH_ARSENAL.map((group, idx) => (
            <div
              key={group.category}
              className="bg-[#131313] border border-[#222222] hover:border-[#E82626]/40 p-6 flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#1E1E1E]">
                  {getCategoryIcon(idx)}
                  <h3 className="font-mono-tech text-xs uppercase tracking-wider text-white font-semibold">
                    {group.category}
                  </h3>
                </div>

                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono-tech text-xs text-[#A5A5A5] hover:text-white transition-colors flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-[#E82626] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Frameworks Compliance Strip */}
        <div className="bg-[#121212] border border-[#222222] p-8">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="w-4 h-4 text-[#E82626]" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.18em] text-white font-semibold">
              PADRÕES DE CONFORMIDADE & AUDITORIA SEGUIDOS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {frameworks.map((fw) => (
              <div key={fw.name} className="border-l border-[#2B2B2B] pl-4">
                <span className="font-mono-tech text-xs text-white font-bold block mb-1">
                  {fw.name}
                </span>
                <p className="text-xs text-[#8E8E93] leading-relaxed">
                  {fw.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
