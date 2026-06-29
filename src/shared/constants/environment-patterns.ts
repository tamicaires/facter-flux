export const ENVIRONMENT_PATTERNS: Array<{ pattern: RegExp; environment: string }> = [
  { pattern: /\.prod\./i, environment: 'prod' },
  { pattern: /\.production\./i, environment: 'prod' },
  { pattern: /\.uat\./i, environment: 'uat' },
  { pattern: /\.staging\./i, environment: 'staging' },
  { pattern: /\.stg\./i, environment: 'staging' },
  { pattern: /\.dev\./i, environment: 'dev' },
  { pattern: /\.development\./i, environment: 'dev' },
  { pattern: /\.hml\./i, environment: 'uat' },
  { pattern: /\.homolog/i, environment: 'uat' },
  { pattern: /localhost/i, environment: 'dev' },
  { pattern: /127\.0\.0\.1/i, environment: 'dev' },
  { pattern: /:3\d{3}/i, environment: 'dev' },
];

export const ENVIRONMENT_COLORS: Record<string, string> = {
  prod: '#22c55e',
  uat: '#eab308',
  staging: '#f97316',
  dev: '#3b82f6',
};
