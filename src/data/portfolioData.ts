import { ProjectItem } from '../utils/portfolio';

export interface ServiceDomain {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  technologies: string[];
}

export interface ProcessStep {
  step: string;
  name: string;
  headline: string;
  description: string;
  deliverable: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  badge: string;
}

export const GABRIEL_DATA = {
  name: 'Gabriel Galucio',
  title: 'CYBERSECURITY & FULL-STACK ENGINEER',
  status: 'DISPONÍVEL PARA CONTRATO & RED TEAM',
  location: 'SÃO PAULO / DISPONÍVEL GLOBALMENTE',
  email: 'gabrielsbgalucio@gmail.com',
  pgpFingerprint: '9B4E 2F10 C76A 89D3 4E51 77A2 C908 11FA 3B64 DE78',
  metrics: [
    { value: 8, suffix: '+', label: 'ANOS DE ENGENHARIA', subtext: 'Pesquisa e desenvolvimento prático de alta intensidade' },
    { value: 140, suffix: '+', label: 'AUDITORIAS & PENTESTS', subtext: 'Vulnerabilidades críticas neutralizadas antes do deploy' },
    { value: 99.9, suffix: '%', label: 'RESILIÊNCIA EM DEFESA', subtext: 'SLA mantido sob cenários de teste de estresse e intrusão' },
    { value: 45, suffix: '+', label: 'SISTEMAS IMPLANTADOS', subtext: 'De gateways distribuídos a firmware de segurança de hardware' },
  ],
  bioHeadline: 'Engenharia de precisão onde segurança ofensiva encontra código de produção impecável.',
  bioParagraph: 'Atuo na interseção crítica entre descoberta de vulnerabilidades (offensive security / pentest), desenvolvimento de aplicações web escaláveis, infraestrutura de T.I. resiliente e engenharia reversa de hardware. Meu trabalho não se resume a emitir relatórios de falhas: eu projeto, quebro e reconstruo sistemas para que sejam matematicamente sólidos e visualmente de primeira classe.',
};

export const DOMAINS: ServiceDomain[] = [
  {
    number: '01',
    title: 'Cybersecurity & Pentesting',
    subtitle: 'Segurança Ofensiva & Red Team',
    description: 'Avaliação meticulosa de superfícies de ataque em aplicações web, APIs REST/GraphQL, protocolos de rede e infraestruturas em nuvem.',
    features: [
      'Testes de intrusão black-box, grey-box e white-box',
      'Descoberta de vulnerabilidades lógicas e Zero-Day PoCs',
      'Evasão e testes de eficácia de WAF / IDS / EDR',
      'Engenharia reversa de binários e análise de malware'
    ],
    technologies: ['Burp Suite Pro', 'Metasploit', 'Ghidra', 'Wireshark', 'Python / Go', 'eBPF']
  },
  {
    number: '02',
    title: 'Web Dev & Software Architecture',
    subtitle: 'Engenharia Full-Stack de Alta Performance',
    description: 'Criação de ecossistemas web com arquitetura desacoplada, tempo de resposta milimétrico, tipagem rigorosa e design dark mode de nível Awwwards.',
    features: [
      'Interfaces ultra-rápidas em React, Next.js e TypeScript',
      'Backends concorrentes em Node.js, Go e Rust',
      'Streaming em tempo real via WebSockets e gRPC',
      'Bancos de dados relacionais e chave-valor otimizados'
    ],
    technologies: ['TypeScript', 'React', 'Next.js', 'Go', 'PostgreSQL', 'Tailwind CSS']
  },
  {
    number: '03',
    title: 'Hardware & Embedded Hacking',
    subtitle: 'Segurança Física & Engenharia Reversa',
    description: 'Investigação profunda de circuitos integrados, microcontroladores, extração física de memória flash e auditoria de dispositivos IoT.',
    features: [
      'Dump e descompilação de firmware via SPI, I2C e UART',
      'Inspeção física com osciloscópio e analisador lógico',
      'Bypass de proteções em microcontroladores (ARM / ESP32)',
      'Auditoria de hardware para equipamentos críticos'
    ],
    technologies: ['Bus Pirate', 'Logic Analyzer', 'JTAG / UART', 'C / C++', 'Ghidra', 'KiCad']
  },
  {
    number: '04',
    title: 'Infraestrutura de T.I. & SecOps',
    subtitle: 'Hardening, Redes & DevSecOps',
    description: 'Arquitetura de sistemas operacionais, orquestração de containers e isolamento de privilégios sob a filosofia Zero-Trust.',
    features: [
      'Hardening de kernels Linux e políticas SELinux / AppArmor',
      'Redes privadas cifradas com WireGuard e firewalls stateful',
      'Pipelines CI/CD com auditoria estática (SAST/DAST) contínua',
      'Containers Docker e clusters Kubernetes com imunidade a privilege escalation'
    ],
    technologies: ['Linux Kernel', 'Docker', 'Kubernetes', 'WireGuard', 'Ansible', 'Terraform']
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'aegis-breach-sim',
    number: '01',
    title: 'Aegis Breach Simulator',
    subtitle: 'Framework de Adversary Emulation & EDR Evasion',
    category: 'cybersecurity',
    categoryLabel: 'CYBERSECURITY',
    description: 'Ferramenta autônoma desenvolvida em Go e eBPF para simulação de movimentos laterais em redes enterprise com verificação em tempo real de pontos cegos de SIEM.',
    highlights: [
      'Bypass de assinaturas estáticas via in-memory execution',
      'Telemetria no kernel Linux via eBPF sem crash de sistema',
      'Emulação de 38 técnicas do framework MITRE ATT&CK'
    ],
    tags: ['Offensive Go', 'eBPF', 'MITRE ATT&CK', 'Linux Kernel'],
    severityImpact: 'Crítico — 14 vetores de ataque mitigados',
    stack: ['Go 1.23', 'eBPF / C', 'Docker', 'Grafana Telemetry'],
    metrics: '99.4% Taxa de Evasão em Ambientes Sandbox',
    architectureDetails: 'Arquitetura modular client-daemon com comunicação criptografada por curvas elípticas (Ed25519) e túnel TLS 1.3 mutual. Utiliza módulos eBPF para monitorar chamadas de sistema sem afetar a integridade operacional do host.',
    codeSnippet: `// Kernel probe hook para detecção de injeção em memória
SEC("kprobe/sys_mprotect")
int trace_sys_mprotect(struct pt_regs *ctx) {
    u32 pid = bpf_get_current_pid_tgid() >> 32;
    unsigned long prot = PT_REGS_PARM3(ctx);
    if ((prot & PROT_EXEC) && (prot & PROT_WRITE)) {
        bpf_printk("[AEGIS_ALERT] RWX memory page allocated by PID: %d\\n", pid);
    }
    return 0;
}`
  },
  {
    id: 'sentinel-vault-core',
    number: '02',
    title: 'Sentinel Vault Core',
    subtitle: 'Cofre Criptográfico Zero-Knowledge com Hardware HSM',
    category: 'webdev',
    categoryLabel: 'WEB ARCHITECTURE',
    description: 'Arquitetura de alta disponibilidade para custódia de chaves de API e certificados sensíveis, garantindo zero vazamento mesmo em caso de dump de banco de dados.',
    highlights: [
      'Cifragem AES-256-GCM com rotação de chaves via Hardware Security Module (HSM)',
      'Protocolo Zero-Knowledge: o servidor nunca visualiza o plaintext',
      'Auditoria criptográfica contínua com hash chains imutáveis'
    ],
    tags: ['TypeScript', 'Node.js', 'Cryptography', 'Next.js', 'PostgreSQL'],
    severityImpact: 'Confidencialidade Bancária — Zero Plaintext',
    stack: ['TypeScript', 'Next.js 15', 'Node.js', 'PostgreSQL', 'WebCrypto API'],
    metrics: '< 18ms Latência de Cifragem com 20k RPS',
    architectureDetails: 'Implementa derivação de chave Argon2id no lado cliente com chave mestre fragmentada (Shamir Secret Sharing) e verificação de integridade via HMAC-SHA384.',
    codeSnippet: `// Derivação de chave com Argon2id + WebCrypto AES-GCM
export async function deriveClientKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 310000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}`
  },
  {
    id: 'spectrepulse-hardware',
    number: '03',
    title: 'SpectrePulse Hardware Auditor',
    subtitle: 'Dispositivo Físico para Dump de Firmware & JTAG Bypass',
    category: 'hardware',
    categoryLabel: 'HARDWARE & IOT',
    description: 'Instrumentação de bancada e firmware customizado para testes não-invasivos em placas de circuito integrado de roteadores e controladores industriais.',
    highlights: [
      'Extração física de memória flash SPI sem dessoldagem (in-circuit probe)',
      'Detecção automatizada de pinagem UART/JTAG via varredura por software',
      'Desempacotamento de imagens de firmware com Binwalk e Ghidra'
    ],
    tags: ['Hardware Hacking', 'UART / JTAG', 'Bus Pirate', 'Reverse Engineering'],
    severityImpact: 'Hardware Level — Acesso a Bootloader Root',
    stack: ['C / C++', 'STM32', 'Python Scripting', 'Ghidra', 'Sigrok PulseView'],
    metrics: '100% de Taxa de Sucesso em Extrações SPI 16MB',
    architectureDetails: 'Utiliza um microcontrolador STM32 com firmware em C bare-metal para sincronização temporal em nanossegundos e barramento de 4 canais para decodificação SPI em tempo real.',
    codeSnippet: `// Varredura de pinout UART automatizada em microcontrolador
void scan_uart_baudrates(uint32_t pin_rx) {
    const uint32_t bauds[] = {9600, 19200, 38400, 57600, 115200};
    for (int i = 0; i < 5; i++) {
        uart_init(pin_rx, bauds[i]);
        if (check_ascii_preamble(bauds[i])) {
            printf("[HARDWARE_LOCKED] Valid U-Boot Console found at %u baud\\n", bauds[i]);
            break;
        }
    }
}`
  },
  {
    id: 'hyperion-infra-mesh',
    number: '04',
    title: 'Hyperion Zero-Trust Cloud Mesh',
    subtitle: 'Cluster Linux Imutável com WireGuard Overlay & SAST CI/CD',
    category: 'infrastructure',
    categoryLabel: 'INFRASTRUCTURE & T.I.',
    description: 'Arquitetura de infraestrutura como código (IaC) com proteção contra ransomware, microsegmentação de redes e auto-recuperação de containers.',
    highlights: [
      'Sistemas de arquivos somente leitura com integridade dm-verity',
      'Malha de túneis WireGuard com autenticação por chave efêmera',
      'Pipeline de deploy que bloqueia qualquer artefato com vulnerabilidades CVE conhecidas'
    ],
    tags: ['Linux Hardening', 'Kubernetes', 'WireGuard', 'Zero-Trust', 'Terraform'],
    severityImpact: 'Infraestrutura Enterprise — Zero Privilégios Root',
    stack: ['Debian Hardened', 'WireGuard', 'Docker Rootless', 'Terraform', 'Prometheus'],
    metrics: '99.999% Uptime em 18 Meses de Operação',
    architectureDetails: 'Ambiente conteinerizado rootless onde cada serviço possui namespace de rede isolado e perfis seccomp rigorosos que bloqueiam 72% das chamadas de sistema não essenciais.',
    codeSnippet: `// Perfil Seccomp restritivo padrão para containers críticos
{
  "defaultAction": "SCMP_ACT_ERRNO",
  "architectures": ["SCMP_ARCH_X86_64"],
  "syscalls": [
    {
      "names": ["read", "write", "epoll_wait", "futex", "exit_group"],
      "action": "SCMP_ACT_ALLOW"
    }
  ]
}`
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    name: 'Reconhecimento & OSINT',
    headline: 'Mapeamento meticuloso da superfície',
    description: 'Levantamento de subdomínios, portas abertas, versões de software, metadados expostos e vetores humanos ou físicos de entrada.',
    deliverable: 'Dossiê técnico de vetores de exposição'
  },
  {
    step: '02',
    name: 'Modelagem de Ameaças',
    headline: 'Hipóteses de ataque e priorização',
    description: 'Classificação por risco real de negócio segundo o framework STRIDE e matriz de probabilidade versus impacto financeiro/operacional.',
    deliverable: 'Matriz de ameaças e cenários de intrusão'
  },
  {
    step: '03',
    name: 'Exploração & Engenharia',
    headline: 'Execução controlada sem indisponibilidade',
    description: 'Testes de intrusão práticos para validar brechas teóricas, ou construção de código resiliente concebido desde o primeiro byte para suportar ataques.',
    deliverable: 'Provas de Conceito (PoCs) funcionais'
  },
  {
    step: '04',
    name: 'Hardening & Mitigação',
    headline: 'Blindagem estrutural de cada camada',
    description: 'Implementação de correções definitivas de código, sanitização de inputs, configurações seguras de kernel e isolamento criptográfico.',
    deliverable: 'Patches de segurança e hardening scripts'
  },
  {
    step: '05',
    name: 'Validação & Certificação',
    headline: 'Contra-prova e relatório de conformidade',
    description: 'Nova rodada de testes para atestar que as correções foram eficazes e não introduziram regressões funcionais no ecossistema.',
    deliverable: 'Relatório Executivo & Certificado de Auditoria'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Carlos Albuquerque',
    role: 'Chief Technology Officer (CTO)',
    company: 'Fintech Nexus Pagamentos',
    quote: 'O Gabriel encontrou uma vulnerabilidade crítica de lógica em nosso gateway que passou despercebida por duas firmas tradicionais de auditoria. Ele não apenas apontou o erro, como enviou o patch de código pronto em TypeScript e Go no mesmo dia.',
    badge: 'AUDITORIA DE SEGURANÇA BANCÁRIA'
  },
  {
    name: 'Mariana Duarte',
    role: 'Head of Infrastructure & SecOps',
    company: 'DataScale Enterprise',
    quote: 'Trabalhar com o Gabriel foi revolucionário para nosso time de infraestrutura. A visão dele de segurança ofensiva mudou totalmente a forma como construímos nossos clusters Kubernetes e pipelines de entrega contínua.',
    badge: 'DEVSECOPS & HARDENING DE NUVEM'
  },
  {
    name: 'Henrique Vianna',
    role: 'Diretor de Engenharia de Hardware',
    company: 'OmniSensors IoT',
    quote: 'Pouquíssimos profissionais dominam ao mesmo tempo a desmontagem física de uma placa via JTAG e o desenvolvimento de um dashboard web moderno em tempo real. O Gabriel é um dos talentos técnicos mais completos que já contratei.',
    badge: 'HARDWARE REVERSE ENGINEERING'
  }
];

export const TECH_ARSENAL = [
  { category: 'Offensive & Pentest', items: ['Burp Suite Professional', 'Metasploit', 'Nmap / Masscan', 'Ghidra / IDA Pro', 'Wireshark', 'OWASP ZAP', 'SQLMap', 'ffuf'] },
  { category: 'Web & Backend', items: ['TypeScript / Node.js', 'React 19 / Next.js', 'Go (Golang)', 'Rust Core', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'GraphQL / gRPC'] },
  { category: 'Hardware & IoT', items: ['Bus Pirate v4', 'Saleae Logic Analyzer', 'UART / SPI / I2C / JTAG', 'STM32 / ESP32', 'Binwalk', 'KiCad PCB', 'Soldagem SMD'] },
  { category: 'Infra & Cloud', items: ['Linux Kernel Tuning', 'Docker / Rootless', 'Kubernetes', 'WireGuard VPN', 'Terraform', 'Prometheus & Grafana', 'eBPF Probes'] }
];
