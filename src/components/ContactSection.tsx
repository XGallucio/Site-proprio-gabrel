import React, { useState } from 'react';
import { Mail, Key, Copy, Check, Send, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { GABRIEL_DATA } from '../data/portfolioData';
import { validateContactForm, ContactPayload } from '../utils/portfolio';
import { sound } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState<ContactPayload>({
    name: '',
    email: '',
    subject: 'Solicitação de Auditoria / Projeto',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const copyPGP = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(GABRIEL_DATA.pgpFingerprint);
      }
    } catch {
      // Fallback for sandboxes without clipboard permission
    }
    setCopiedKey(true);
    sound.playClick();
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const copyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(GABRIEL_DATA.email);
      }
    } catch {
      // Fallback
    }
    setCopiedEmail(true);
    sound.playClick();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactForm(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      sound.playBlip(280, 0.08);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    sound.playScan();
  };

  return (
    <section id="contato" className="py-28 bg-[#0D0D0D] border-b border-[#222222] relative overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #E82626 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#141414] border border-[#262626]">
            <span className="w-2 h-2 rounded-full bg-[#E82626] animate-pulse" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#E82626] font-semibold">
              CANAL DE COMUNICAÇÃO SEGURO
            </span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight mb-6">
            Inicie uma <span className="font-editorial text-[#E82626] font-normal lowercase">conversa</span> estratégica
          </h2>

          <p className="text-[#A0A0A0] text-base leading-relaxed">
            Seja para uma auditoria completa de vulnerabilidades (Red Team), um projeto de arquitetura web de missão crítica ou engenharia reversa de hardware, entre em contato direto.
          </p>
        </div>

        {/* 2-Column Contact Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Column 1: Direct Credentials & PGP Security */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card */}
            <div className="bg-[#141414] border border-[#242424] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-[#1C1C1C] text-[#E82626] border border-[#2B2B2B]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono-tech text-[10px] text-[#8E8E93] uppercase tracking-widest block">
                    E-MAIL DIRETO
                  </span>
                  <a
                    href={`mailto:${GABRIEL_DATA.email}`}
                    className="font-mono-tech text-sm sm:text-base text-white hover:text-[#E82626] transition-colors font-medium break-all"
                  >
                    {GABRIEL_DATA.email}
                  </a>
                </div>
              </div>

              <button
                onClick={copyEmail}
                className="w-full mt-2 py-2.5 px-4 bg-[#1C1C1C] hover:bg-[#252525] border border-[#2E2E2E] text-xs font-mono-tech uppercase tracking-wider text-white transition-colors flex items-center justify-center gap-2"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'E-mail copiado!' : 'Copiar E-mail'}</span>
              </button>
            </div>

            {/* PGP Encryption Card */}
            <div className="bg-[#141414] border border-[#242424] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-[#1C1C1C] text-[#E82626] border border-[#2B2B2B]">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono-tech text-[10px] text-[#8E8E93] uppercase tracking-widest block">
                    CHAVE PGP / GPG FINGERPRINT
                  </span>
                  <span className="font-mono-tech text-xs text-white font-medium">
                    Canal Criptografado Ponta a Ponta
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#0B0B0B] border border-[#222] font-mono-tech text-xs text-[#8E8E93] break-all my-3 select-all">
                {GABRIEL_DATA.pgpFingerprint}
              </div>

              <button
                onClick={copyPGP}
                className="w-full py-2.5 px-4 bg-[#1C1C1C] hover:bg-[#252525] border border-[#2E2E2E] text-xs font-mono-tech uppercase tracking-wider text-white transition-colors flex items-center justify-center gap-2"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey ? 'Fingerprint copiado!' : 'Copiar PGP Fingerprint'}</span>
              </button>
            </div>

            {/* SLA / Terms Trust Badge */}
            <div className="p-5 bg-[#121212] border border-[#242424] flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#E82626] shrink-0 mt-0.5" />
              <p className="font-mono-tech text-xs text-[#8E8E93] leading-relaxed">
                Todas as comunicações e auditorias seguem termo estrito de confidencialidade (NDA) e autorização prévia por escrito.
              </p>
            </div>
          </div>

          {/* Column 2: Direct Contact Form */}
          <div className="lg:col-span-7 bg-[#141414] border border-[#262626] p-8 sm:p-10">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 bg-emerald-950/40 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  Mensagem Cifrada e Enviada
                </h3>
                <p className="text-sm text-[#A0A0A0] max-w-md mx-auto leading-relaxed">
                  Obrigado pelo contato, <strong className="text-white">{formData.name}</strong>. Gabriel Galucio responderá em seu e-mail ({formData.email}) em até 24 horas úteis.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      subject: 'Solicitação de Auditoria / Projeto',
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 bg-[#1E1E1E] hover:bg-[#2A2A2A] text-white font-mono-tech text-xs uppercase tracking-wider border border-[#333] transition-colors mt-4"
                >
                  Enviar Outra Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="name" className="block font-mono-tech text-xs text-[#8E8E93] uppercase tracking-wider mb-2">
                    Seu Nome ou Empresa *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Carlos Silva (CTO)"
                    className={`w-full bg-[#0D0D0D] border ${
                      errors.name ? 'border-[#E82626]' : 'border-[#262626] focus:border-[#E82626]'
                    } px-4 py-3 text-sm text-white placeholder-[#555] transition-colors focus:outline-none`}
                  />
                  {errors.name && (
                    <span className="font-mono-tech text-xs text-[#E82626] mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block font-mono-tech text-xs text-[#8E8E93] uppercase tracking-wider mb-2">
                    E-mail de Contato *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu.email@empresa.com"
                    className={`w-full bg-[#0D0D0D] border ${
                      errors.email ? 'border-[#E82626]' : 'border-[#262626] focus:border-[#E82626]'
                    } px-4 py-3 text-sm text-white placeholder-[#555] transition-colors focus:outline-none`}
                  />
                  {errors.email && (
                    <span className="font-mono-tech text-xs text-[#E82626] mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block font-mono-tech text-xs text-[#8E8E93] uppercase tracking-wider mb-2">
                    Tipo de Demanda
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-[#262626] focus:border-[#E82626] px-4 py-3 text-sm text-white transition-colors focus:outline-none"
                  >
                    <option value="Solicitação de Pentest & Auditoria Red Team">Pentest & Auditoria Red Team</option>
                    <option value="Desenvolvimento Web Full-Stack & Arquitetura">Desenvolvimento Web Full-Stack & Arquitetura</option>
                    <option value="Auditoria de Hardware & Engenharia Reversa">Auditoria de Hardware & Engenharia Reversa</option>
                    <option value="Hardening de Infraestrutura Linux & Cloud">Hardening de Infraestrutura Linux & Cloud</option>
                    <option value="Outro assunto estratégico">Outro assunto estratégico</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono-tech text-xs text-[#8E8E93] uppercase tracking-wider mb-2">
                    Mensagem ou Escopo do Projeto *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Descreva os objetivos, tecnologias envolvidas e prazos estimados..."
                    className={`w-full bg-[#0D0D0D] border ${
                      errors.message ? 'border-[#E82626]' : 'border-[#262626] focus:border-[#E82626]'
                    } px-4 py-3 text-sm text-white placeholder-[#555] transition-colors focus:outline-none resize-none`}
                  />
                  {errors.message && (
                    <span className="font-mono-tech text-xs text-[#E82626] mt-1 block">
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#E82626] hover:bg-[#ff3333] text-white font-mono-tech text-xs uppercase tracking-[0.18em] font-bold transition-all duration-200 glow-accent flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmitir Mensagem Cifrada</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
