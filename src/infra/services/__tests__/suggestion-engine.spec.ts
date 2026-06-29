import { describe, it, expect } from 'vitest';
import { suggestMetadata } from '../suggestion-engine';

const workspaces = [
  { slug: 'martech', name: 'Martech' },
  { slug: 'facter', name: 'Facter' },
  { slug: 'pessoal', name: 'Pessoal' },
];

describe('SuggestionEngine', () => {
  describe('URL detection', () => {
    it('should detect URL as LINK with confidence 0.95', () => {
      const result = suggestMetadata('https://argocd.martech.uat.example.com/apps');

      expect(result.type).toBe('LINK');
      expect(result.confidence).toBe(0.95);
      expect(result.metadata).toBeDefined();
    });

    it('should detect UAT environment from URL', () => {
      const result = suggestMetadata('https://api.martech.uat.mybees.dev');

      expect(result.environment).toBe('uat');
    });

    it('should detect prod environment from URL', () => {
      const result = suggestMetadata('https://api.martech.prod.mybees.dev');

      expect(result.environment).toBe('prod');
    });

    it('should detect dev environment from localhost', () => {
      const result = suggestMetadata('http://localhost:3000/dashboard');

      expect(result.environment).toBe('dev');
    });

    it('should extract domain from URL', () => {
      const result = suggestMetadata('https://argocd.example.com/applications/my-app');

      expect(result.metadata).toHaveProperty('domain', 'argocd.example.com');
    });

    it('should extract tags from URL', () => {
      const result = suggestMetadata('https://argocd.example.com/applications/my-app');

      expect(result.tags).toContain('argocd');
    });

    it('should detect URL mixed with text', () => {
      const result = suggestMetadata('Check this link https://argocd.uat.example.com');

      expect(result.type).toBe('LINK');
    });
  });

  describe('assignee pattern detection', () => {
    it('should detect NOME: acao pattern as TASK with assignee', () => {
      const result = suggestMetadata('SOBREIRA: Refactor Types', workspaces);

      expect(result.type).toBe('TASK');
      expect(result.confidence).toBe(0.9);
      expect(result.assignee).toBe('SOBREIRA');
    });

    it('should detect name with accents', () => {
      const result = suggestMetadata('José: Fix the bug', workspaces);

      expect(result.type).toBe('TASK');
      expect(result.assignee).toBe('José');
    });

    it('should extract tech keywords from task content', () => {
      const result = suggestMetadata('SOBREIRA: Refactor Types #typescript', workspaces);

      expect(result.tags).toContain('typescript');
    });
  });

  describe('action verb detection', () => {
    it('should detect Portuguese action verb as TASK', () => {
      const result = suggestMetadata('criar endpoint de autenticacao');

      expect(result.type).toBe('TASK');
      expect(result.confidence).toBe(0.7);
    });

    it('should detect English action verb as TASK', () => {
      const result = suggestMetadata('fix login page validation');

      expect(result.type).toBe('TASK');
      expect(result.confidence).toBe(0.7);
    });

    it('should detect deploy as TASK', () => {
      const result = suggestMetadata('deploy new version to production');

      expect(result.type).toBe('TASK');
    });
  });

  describe('snippet detection', () => {
    it('should detect code block as SNIPPET', () => {
      const result = suggestMetadata('```const x = 1```');

      expect(result.type).toBe('SNIPPET');
      expect(result.confidence).toBe(0.85);
    });

    it('should detect arrow function as SNIPPET', () => {
      const result = suggestMetadata('const handler = () => { return true }');

      expect(result.type).toBe('SNIPPET');
    });

    it('should detect language for TypeScript code', () => {
      const result = suggestMetadata('const handler = () => { return true }');

      expect(result.metadata).toHaveProperty('language', 'typescript');
    });
  });

  describe('default NOTE detection', () => {
    it('should return NOTE as default with confidence 0.5', () => {
      const result = suggestMetadata('Random thought about the project');

      expect(result.type).toBe('NOTE');
      expect(result.confidence).toBe(0.5);
    });

    it('should extract explicit hashtags as tags', () => {
      const result = suggestMetadata('Interesting idea #innovation #design');

      expect(result.tags).toContain('innovation');
      expect(result.tags).toContain('design');
    });

    it('should extract tech keywords as implicit tags', () => {
      const result = suggestMetadata('The docker container keeps crashing');

      expect(result.tags).toContain('docker');
    });
  });

  describe('workspace suggestion', () => {
    it('should suggest workspace when name is mentioned', () => {
      const result = suggestMetadata('Issue in Martech dashboard', workspaces);

      expect(result.workspace).toBe('martech');
    });

    it('should suggest workspace by slug', () => {
      const result = suggestMetadata('facter needs a new release', workspaces);

      expect(result.workspace).toBe('facter');
    });

    it('should return null workspace when no match', () => {
      const result = suggestMetadata('Generic note without context', workspaces);

      expect(result.workspace).toBeUndefined();
    });
  });
});
