import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RefreshCw, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

interface InteractiveConsoleProps {
  onOpenContact: () => void;
}

export const InteractiveConsole: React.FC<InteractiveConsoleProps> = ({ onOpenContact }) => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: '1', type: 'output', text: 'GALUCIO_SEC_CORE v4.12.0 (x86_64-hardened-linux-gnu)' },
    { id: '2', type: 'output', text: 'Digite "help" ou selecione um comando abaixo para interagir.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    sound.playClick();

    const newHistory: TerminalLine[] = [
      ...history,
      { id: Date.now().toString(), type: 'input', text: `$ ${cmd}` },
    ];

    switch (trimmed) {
      case 'help':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `Comandos disponíveis:
  whoami     - Perfil e missão técnica de Gabriel Galucio
  skills     - Matriz de competências técnicas (Cyber, Web, Hardware, T.I.)
  pentest    - Simular auditoria ofensiva automatizada em target virtual
  hardware   - Inspeção de instrumentação de bancada e firmware dumping
  cve        - Relatório de mitigação de vulnerabilidades críticas
  contact    - Informações seguras de contratação e chave PGP
  clear      - Limpar o buffer do terminal`,
        });
        break;

      case 'whoami':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `USUÁRIO: Gabriel Galucio
ROLE: Senior Cybersecurity Specialist, Offensive Pentester & Full-Stack Architect
LOCALIZAÇÃO: São Paulo, Brasil (Atuação Global)
FILOSOFIA: "Se pode ser executado, pode ser auditado; se pode ser auditado, pode ser fortificado."`,
        });
        break;

      case 'skills':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `[OFFENSIVE]: Burp Suite Pro, Metasploit, Nmap, Ghidra, Zero-Day PoCs, WAF Evasion
[WEB DEV]: TypeScript, React 19, Next.js, Node.js, Go, Rust, PostgreSQL, WebSockets
[HARDWARE]: Bus Pirate, UART / SPI / JTAG probing, Logic Analyzers, STM32, KiCad
[INFRA & T.I.]: Linux Kernel Hardening, Docker Rootless, Kubernetes, WireGuard, CI/CD`,
        });
        break;

      case 'pentest':
        setIsScanning(true);
        sound.playScan();
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: '[*] Iniciando varredura direcionada em target.sandbox.internal...',
        });
        setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            { id: Date.now().toString(), type: 'output', text: '[+] Portas abertas: 22/tcp (SSH-2.0-OpenSSH), 443/tcp (TLS 1.3), 8443/tcp (Admin API)' },
            { id: (Date.now() + 1).toString(), type: 'output', text: '[+] Testando vetor: Injeção de cabeçalho gRPC & Desserialização insegura' },
            { id: (Date.now() + 2).toString(), type: 'success', text: '[✓] VULNERABILIDADE DETECTADA: Falha de autenticação em endpoint /v1/auth/refresh (CVSS 8.4)' },
            { id: (Date.now() + 3).toString(), type: 'success', text: '[✓] MITIGAÇÃO: Token validation assinado com Ed25519 e rate limiting ativo.' },
          ]);
          setIsScanning(false);
        }, 1200);
        break;

      case 'hardware':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `[HARDWARE WORKBENCH]:
  1. Barramento SPI: Extração de chip Winbond W25Q128 (16MB Flash) em 38.2s
  2. Logic Analyzer: Canal 0 (SCK), Canal 1 (MISO), Canal 2 (MOSI), Canal 3 (CS)
  3. UART: Baud 115200 8N1 -> Console root U-Boot desprotegido identificado
  4. Status: Firmware descriptografado com sucesso via Binwalk`,
        });
        break;

      case 'cve':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `[CVE AUDIT TRACK RECORD]:
  • CVE-2024-XXXX: Remote Code Execution via desserialização em microserviço
  • CVE-2023-XXXX: Broken Object Level Authorization (BOLA) em API bancária
  • CVE-2023-XXXX: Firmware Hardcoded Cryptographic Key em dispositivo IoT
  Status: 100% de mitigações implementadas e validadas em produção.`,
        });
        break;

      case 'contact':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'success',
          text: `[+] E-MAIL: gabrielsbgalucio@gmail.com
[+] PGP KEY: 9B4E 2F10 C76A 89D3 4E51 77A2 C908 11FA 3B64 DE78
[+] Abrindo formulário de contato seguro...`,
        });
        setTimeout(() => {
          onOpenContact();
        }, 600);
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'error',
          text: `Comando não reconhecido: "${cmd}". Digite "help" para ver a lista de comandos.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(inputVal);
    }
  };

  const quickCommands = ['help', 'whoami', 'skills', 'pentest', 'hardware', 'contact', 'clear'];

  return (
    <section id="terminal" className="py-24 bg-[#0D0D0D] border-b border-[#222222]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#222222] mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E82626]" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#E82626] font-semibold">
                DIAGNÓSTICO EM TEMPO REAL
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
              Console <span className="font-editorial text-[#E82626] font-normal lowercase">&</span> CLI Interativo
            </h2>
          </div>
          <p className="text-[#8E8E93] text-sm max-w-md leading-relaxed font-normal">
            Teste e explore as credenciais técnicas diretamente pelo terminal simulado de Gabriel Galucio.
          </p>
        </div>

        {/* Terminal Window Box */}
        <div className="bg-[#101010] border border-[#2B2B2B] shadow-2xl relative overflow-hidden">
          {/* Terminal Window Top Bar */}
          <div className="bg-[#181818] border-b border-[#262626] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#E82626]/80" />
              <div className="w-3 h-3 rounded-full bg-[#333]" />
              <div className="w-3 h-3 rounded-full bg-[#262626]" />
              <span className="font-mono-tech text-xs text-[#A0A0A0] ml-2 font-medium">
                bash: galucio@sec-workstation:~ (pts/1)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-[10px] text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 className="w-3 h-3" />
                <span>eBPF Monitor Active</span>
              </span>
            </div>
          </div>

          {/* Quick command buttons strip */}
          <div className="bg-[#141414] border-b border-[#222] px-4 py-2 flex flex-wrap items-center gap-2">
            <span className="font-mono-tech text-[10px] text-[#8E8E93] uppercase tracking-wider mr-1">
              Atalhos Rápidos:
            </span>
            {quickCommands.map((q) => (
              <button
                key={q}
                onClick={() => runCommand(q)}
                className="px-2.5 py-1 text-[11px] font-mono-tech text-[#D4D4D8] hover:text-white bg-[#1C1C1C] hover:bg-[#E82626] border border-[#2B2B2B] transition-colors"
              >
                ${q}
              </button>
            ))}
          </div>

          {/* Terminal Output Area */}
          <div className="p-6 h-80 sm:h-96 overflow-y-auto font-mono-tech text-xs sm:text-sm text-[#E0E0E0] space-y-2 leading-relaxed bg-[#0B0B0B]">
            {history.map((line) => {
              if (line.type === 'input') {
                return (
                  <div key={line.id} className="text-white font-bold flex items-center gap-2">
                    <span className="text-[#E82626]">$</span>
                    <span>{line.text.replace('$ ', '')}</span>
                  </div>
                );
              }
              if (line.type === 'error') {
                return (
                  <div key={line.id} className="text-[#FF5555] bg-red-950/20 p-2 border-l border-[#E82626]">
                    {line.text}
                  </div>
                );
              }
              if (line.type === 'success') {
                return (
                  <div key={line.id} className="text-emerald-400 bg-emerald-950/20 p-2 border-l border-emerald-500">
                    {line.text}
                  </div>
                );
              }
              return (
                <div key={line.id} className="text-[#A5A5A5] whitespace-pre-wrap">
                  {line.text}
                </div>
              );
            })}
            {isScanning && (
              <div className="text-[#E82626] animate-pulse flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Executando varredura e emulando adversário...</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Bar */}
          <div className="bg-[#121212] border-t border-[#262626] p-3 flex items-center gap-3">
            <span className="text-[#E82626] font-mono-tech font-bold pl-2">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite um comando (ex: pentest, skills, contact)..."
              aria-label="Linha de comando do terminal de Gabriel Galucio"
              className="w-full bg-transparent font-mono-tech text-xs sm:text-sm text-white placeholder-[#555] focus:outline-none"
            />
            <button
              onClick={() => runCommand(inputVal)}
              aria-label="Executar comando"
              className="px-3.5 py-1.5 bg-[#1C1C1C] hover:bg-[#E82626] text-white font-mono-tech text-xs tracking-wider uppercase border border-[#2B2B2B] transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Exec</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
