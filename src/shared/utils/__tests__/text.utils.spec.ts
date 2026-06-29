import { describe, it, expect } from 'vitest';
import {
  detectAssignee,
  startsWithActionVerb,
  extractHashtags,
  extractTechKeywords,
  isCodeSnippet,
  detectLanguage,
} from '../text.utils';

describe('text.utils', () => {
  describe('detectAssignee', () => {
    it('should detect NOME: acao pattern', () => {
      const result = detectAssignee('SOBREIRA: Refactor Types');
      expect(result).toEqual({ assignee: 'SOBREIRA', content: 'Refactor Types' });
    });

    it('should detect name with accent', () => {
      const result = detectAssignee('José: Fix the bug');
      expect(result).toEqual({ assignee: 'José', content: 'Fix the bug' });
    });

    it('should return null for non-matching text', () => {
      expect(detectAssignee('Just a regular note')).toBeNull();
    });

    it('should not match lowercase name', () => {
      expect(detectAssignee('lowercase: something')).toBeNull();
    });
  });

  describe('startsWithActionVerb', () => {
    it('should detect Portuguese verbs', () => {
      expect(startsWithActionVerb('criar novo endpoint')).toBe(true);
      expect(startsWithActionVerb('fazer deploy')).toBe(true);
    });

    it('should detect English verbs', () => {
      expect(startsWithActionVerb('fix the login bug')).toBe(true);
      expect(startsWithActionVerb('add new feature')).toBe(true);
    });

    it('should return false for non-action text', () => {
      expect(startsWithActionVerb('the sky is blue')).toBe(false);
    });
  });

  describe('extractHashtags', () => {
    it('should extract hashtags', () => {
      const tags = extractHashtags('Note about #docker and #deploy');
      expect(tags).toEqual(['docker', 'deploy']);
    });

    it('should return empty array for no hashtags', () => {
      expect(extractHashtags('No hashtags here')).toEqual([]);
    });
  });

  describe('extractTechKeywords', () => {
    it('should extract known tech keywords', () => {
      const keywords = extractTechKeywords('Deploy the docker container to kubernetes');
      expect(keywords).toContain('docker');
      expect(keywords).toContain('kubernetes');
      expect(keywords).toContain('deploy');
    });

    it('should not extract random words', () => {
      const keywords = extractTechKeywords('The cat sat on the mat');
      expect(keywords).toEqual([]);
    });
  });

  describe('isCodeSnippet', () => {
    it('should detect code blocks', () => {
      expect(isCodeSnippet('```const x = 1```')).toBe(true);
    });

    it('should detect arrow functions', () => {
      expect(isCodeSnippet('const fn = () => true')).toBe(true);
    });

    it('should not match plain text', () => {
      expect(isCodeSnippet('Just a regular sentence')).toBe(false);
    });
  });

  describe('detectLanguage', () => {
    it('should detect TypeScript', () => {
      expect(detectLanguage('const x = () => true')).toBe('typescript');
    });

    it('should detect Python', () => {
      expect(detectLanguage('def hello():\n  print("hi")')).toBe('python');
    });

    it('should detect SQL', () => {
      expect(detectLanguage('SELECT * FROM users WHERE id = 1')).toBe('sql');
    });

    it('should return null for unknown', () => {
      expect(detectLanguage('random text without code')).toBeNull();
    });
  });
});
