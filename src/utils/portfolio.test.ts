import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  validateContactForm,
  formatMetricNumber,
  calculateSecurityScore,
  ProjectItem,
} from './portfolio';

const mockProjects: ProjectItem[] = [
  {
    id: 'p1',
    number: '01',
    title: 'Aegis Breach Sim',
    subtitle: 'Red Team Autonomous Scanner',
    category: 'cybersecurity',
    categoryLabel: 'Cyber Security',
    description: 'Test description',
    highlights: ['Feature A'],
    tags: ['Go', 'eBPF'],
    stack: ['Go', 'Docker'],
    metrics: '99.8% Detection',
  },
  {
    id: 'p2',
    number: '02',
    title: 'SpectrePulse IoT',
    subtitle: 'Hardware firmware extractor',
    category: 'hardware',
    categoryLabel: 'Hardware & IoT',
    description: 'Hardware hacking',
    highlights: ['UART / JTAG'],
    tags: ['C++', 'Logic Analyzer'],
    stack: ['C++', 'Bus Pirate'],
    metrics: '100% extraction',
  },
  {
    id: 'p3',
    number: '03',
    title: 'Hyperion Core',
    subtitle: 'High-throughput platform',
    category: 'webdev',
    categoryLabel: 'Web Dev',
    description: 'Distributed web system',
    highlights: ['40k req/s'],
    tags: ['TypeScript', 'Rust'],
    stack: ['Next.js', 'PostgreSQL'],
    metrics: '12ms latency',
  },
];

test('filterProjects correctly returns all projects when category is "all"', () => {
  const result = filterProjects('all', mockProjects);
  assert.equal(result.length, 3);
});

test('filterProjects correctly filters by specific category', () => {
  const sec = filterProjects('cybersecurity', mockProjects);
  assert.equal(sec.length, 1);
  assert.equal(sec[0].id, 'p1');

  const hw = filterProjects('hardware', mockProjects);
  assert.equal(hw.length, 1);
  assert.equal(hw[0].id, 'p2');
});

test('validateContactForm rejects empty fields and invalid email', () => {
  const empty = validateContactForm({
    name: '',
    email: 'invalid-email',
    subject: '',
    message: 'short',
  });
  assert.equal(empty.isValid, false);
  assert.ok(empty.errors.name);
  assert.ok(empty.errors.email);
  assert.ok(empty.errors.message);
});

test('validateContactForm accepts valid form submission', () => {
  const valid = validateContactForm({
    name: 'Roberto Silva',
    email: 'roberto@enterprise.com',
    subject: 'Contratação Red Team Pentest',
    message: 'Gostaríamos de agendar uma auditoria de segurança para nossa infraestrutura.',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('formatMetricNumber bounds values and appends suffix correctly', () => {
  assert.equal(formatMetricNumber(8.2, 8, '+'), '8+');
  assert.equal(formatMetricNumber(140, 140, '+'), '140+');
  assert.equal(formatMetricNumber(99.9, 99.9, '%', 1), '99.9%');
  assert.equal(formatMetricNumber(45, 45, '+', 0), '45+');
});

test('calculateSecurityScore produces realistic calibrated score', () => {
  const score = calculateSecurityScore(40, 100);
  assert.ok(score >= 90 && score <= 99);
});
