import React, { useEffect } from 'react';
import { X, ShieldAlert, Cpu, Terminal, CheckCircle2, Copy, Check } from 'lucide-react';
import { ProjectItem } from '../utils/portfolio';
import { sound } from '../utils/audio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  const copyCode = async () => {
    if (project.codeSnippet) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(project.codeSnippet);
        }
      } catch {
        // Fallback for sandboxes
      }
      setCopied(true);
      sound.playClick();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-[#121212] border border-[#2D2D2D] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 bg-[#161616] border-b border-[#262626] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 font-mono-tech text-xs tracking-wider">
            <span className="text-[#E82626] font-bold">{project.number}</span>
            <span className="text-[#444]">/</span>
            <span className="text-[#8E8E93] uppercase">{project.categoryLabel}</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            aria-label="Fechar modal"
            className="p-1.5 text-[#8E8E93] hover:text-white hover:bg-[#222] transition-colors border border-transparent hover:border-[#333]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 md:p-10 space-y-8">
          {/* Header Title */}
          <div>
            <div className="font-mono-tech text-xs text-[#E82626] uppercase tracking-widest font-semibold mb-2">
              {project.subtitle}
            </div>
            <h2 id="modal-title" className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-4">
              {project.title}
            </h2>
            <p className="text-[#B5B5B5] text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Metrics Banner */}
          <div className="p-4 bg-[#181818] border border-[#282828] flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-mono-tech text-[10px] text-[#8E8E93] uppercase tracking-widest block mb-1">
                RESULTADO COMPROVADO
              </span>
              <span className="font-mono-tech text-lg text-white font-bold">
                {project.metrics}
              </span>
            </div>
            {project.severityImpact && (
              <div className="text-right">
                <span className="font-mono-tech text-[10px] text-[#8E8E93] uppercase tracking-widest block mb-1">
                  IMPACTO DE AUDITORIA
                </span>
                <span className="font-mono-tech text-xs text-[#E82626] font-semibold">
                  {project.severityImpact}
                </span>
              </div>
            )}
          </div>

          {/* Architecture Details */}
          {project.architectureDetails && (
            <div>
              <h3 className="font-mono-tech text-xs uppercase tracking-[0.16em] text-white font-semibold mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#E82626]" />
                <span>ANATOMIA DA ARQUITETURA & SEGURANÇA</span>
              </h3>
              <p className="text-sm text-[#A0A0A0] leading-relaxed bg-[#151515] p-5 border border-[#222]">
                {project.architectureDetails}
              </p>
            </div>
          )}

          {/* Highlights */}
          <div>
            <h3 className="font-mono-tech text-xs uppercase tracking-[0.16em] text-white font-semibold mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#E82626]" />
              <span>CAPACIDADES TÉCNICAS CHAVE</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3 bg-[#151515] border border-[#222] text-xs text-[#E0E0E0]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E82626] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Snippet Box */}
          {project.codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-mono-tech text-xs uppercase tracking-[0.16em] text-white font-semibold flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#E82626]" />
                  <span>EXEMPLO DE CÓDIGO / POINTER KERNEL</span>
                </h3>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono-tech text-[#A0A0A0] hover:text-white bg-[#1A1A1A] hover:bg-[#252525] border border-[#2B2B2B] transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
              <pre className="p-4 bg-[#0A0A0A] border border-[#222] text-xs font-mono-tech text-[#D4D4D8] overflow-x-auto leading-relaxed">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Stack list */}
          <div className="pt-4 border-t border-[#222222] flex flex-wrap items-center gap-2 font-mono-tech text-xs">
            <span className="text-[#8E8E93] uppercase font-semibold">Stack Utilizada:</span>
            {project.stack.map((s) => (
              <span key={s} className="px-2.5 py-1 bg-[#1A1A1A] border border-[#2B2B2B] text-white">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-[#161616] border-t border-[#262626] px-6 py-4 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2.5 bg-[#222] hover:bg-[#2C2C2C] text-white font-mono-tech text-xs uppercase tracking-wider transition-colors"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
};
