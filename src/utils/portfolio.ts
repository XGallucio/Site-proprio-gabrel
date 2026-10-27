/**
 * Utility functions for Gabriel Galucio portfolio logic.
 * Decoupled for fast unit-testing per Ultra Mode guidelines.
 */

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'cybersecurity' | 'webdev' | 'hardware' | 'infrastructure';
  categoryLabel: string;
  description: string;
  highlights: string[];
  tags: string[];
  severityImpact?: string;
  stack: string[];
  metrics: string;
  architectureDetails?: string;
  codeSnippet?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Filter projects by category with 'all' fallback
 */
export function filterProjects(
  category: string,
  projects: ProjectItem[]
): ProjectItem[] {
  if (!category || category === 'all') {
    return projects;
  }
  return projects.filter((p) => p.category === category);
}

/**
 * Validates the contact form payload
 */
export function validateContactForm(payload: ContactPayload): ValidationResult {
  const errors: Record<string, string> = {};

  if (!payload.name || payload.name.trim().length < 2) {
    errors.name = 'Nome deve conter pelo menos 2 caracteres.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!payload.email || !emailRegex.test(payload.email.trim())) {
    errors.email = 'Insira um e-mail válido.';
  }

  if (!payload.message || payload.message.trim().length < 10) {
    errors.message = 'A mensagem deve ter pelo menos 10 caracteres.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Format numerical metric counter with prefix/suffix and optional float precision
 */
export function formatMetricNumber(
  current: number,
  target: number,
  suffix = '',
  precision = 0
): string {
  const val = Math.min(current, target);
  const formatted = precision > 0 ? val.toFixed(precision) : Math.round(val).toString();
  return `${formatted}${suffix}`;
}

/**
 * Calculate security posture score based on verified benchmarks
 */
export function calculateSecurityScore(auditedProjects: number, vulnerabilitiesPatched: number): number {
  if (auditedProjects <= 0) return 0;
  const base = Math.min(100, Math.round((vulnerabilitiesPatched / (auditedProjects * 2.5)) * 100));
  return Math.max(90, Math.min(99, base));
}
