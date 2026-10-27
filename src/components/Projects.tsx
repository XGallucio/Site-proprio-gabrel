import React, { useState } from 'react';
import { ArrowUpRight, Shield, Layers, Cpu, Server } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem, filterProjects } from '../utils/portfolio';
import { ProjectModal } from './ProjectModal';
import { sound } from '../utils/audio';

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = [
    { id: 'all', label: 'Todos os Projetos' },
    { id: 'cybersecurity', label: 'Cybersecurity & Pentest' },
    { id: 'webdev', label: 'Web Architecture' },
    { id: 'hardware', label: 'Hardware & IoT' },
    { id: 'infrastructure', label: 'Infraestrutura T.I.' },
  ];

  const filtered = filterProjects(activeCategory, PROJECTS);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'cybersecurity':
        return <Shield className="w-3.5 h-3.5 text-[#E82626]" />;
      case 'webdev':
        return <Layers className="w-3.5 h-3.5 text-[#E82626]" />;
      case 'hardware':
        return <Cpu className="w-3.5 h-3.5 text-[#E82626]" />;
      case 'infrastructure':
        return <Server className="w-3.5 h-3.5 text-[#E82626]" />;
      default:
        return <Shield className="w-3.5 h-3.5 text-[#E82626]" />;
    }
  };

  return (
    <section id="projetos" className="py-24 bg-[#0A0A0A] border-b border-[#222222] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#222222] mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E82626]" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#E82626] font-semibold">
                CASOS DE ESTUDO & EXPLOITS
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
              Projetos <span className="font-editorial text-[#E82626] font-normal lowercase">&</span> Implementações
            </h2>
          </div>

          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#141414] border border-[#262626]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-3.5 py-1.5 text-xs font-mono-tech tracking-wider uppercase transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#E82626] text-white font-semibold'
                    : 'text-[#8E8E93] hover:text-white hover:bg-[#1E1E1E]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <article
              key={item.id}
              onClick={() => {
                sound.playBlip(480, 0.05);
                setSelectedProject(item);
              }}
              className="bg-[#121212] hover:bg-[#171717] border border-[#242424] hover:border-[#E82626]/70 p-8 sm:p-10 transition-all duration-300 group cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              {/* Corner accent tick */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-[#E82626] transition-colors" />

              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1E1E1E]">
                  <div className="flex items-center gap-2 font-mono-tech text-xs">
                    {getCategoryIcon(item.category)}
                    <span className="text-[#8E8E93] uppercase tracking-wider">{item.categoryLabel}</span>
                  </div>
                  <span className="font-mono-tech text-sm font-bold text-white group-hover:text-[#E82626] transition-colors">
                    {item.number}
                  </span>
                </div>

                <div className="font-mono-tech text-xs text-[#E82626] uppercase tracking-wider mb-2 font-medium">
                  {item.subtitle}
                </div>
                <h3 className="font-display font-bold text-2xl text-white tracking-tight mb-4 group-hover:translate-x-1 transition-transform">
                  {item.title}
                </h3>
                <p className="text-sm text-[#A0A0A0] leading-relaxed mb-6 font-normal">
                  {item.description}
                </p>

                {/* Key Metric highlight box */}
                <div className="p-3 bg-[#0D0D0D] border border-[#222] mb-6 flex items-center justify-between">
                  <span className="font-mono-tech text-[10px] text-[#8E8E93] uppercase tracking-wider">Métrica de Validação</span>
                  <span className="font-mono-tech text-xs text-white font-semibold">{item.metrics}</span>
                </div>
              </div>

              {/* Bottom footer with tags and CTA */}
              <div>
                <div className="pt-4 border-t border-[#1E1E1E] flex items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono-tech text-[#8E8E93]">
                    {item.tags.slice(0, 3).map((tag, i) => (
                      <React.Fragment key={tag}>
                        <span className="text-[#C5C5C5]">{tag}</span>
                        {i < Math.min(item.tags.length - 1, 2) && <span className="text-[#444]">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-[#E82626] group-hover:translate-x-1 transition-transform uppercase font-medium">
                    <span>Detalhes</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Project Case-Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
