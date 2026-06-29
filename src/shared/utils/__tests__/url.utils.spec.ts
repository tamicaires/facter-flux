import { describe, it, expect } from 'vitest';
import { isValidUrl, extractUrl, detectEnvironment, extractDomain, extractTagsFromUrl } from '../url.utils';

describe('url.utils', () => {
  describe('isValidUrl', () => {
    it('should return true for valid http URL', () => {
      expect(isValidUrl('http://example.com')).toBe(true);
    });

    it('should return true for valid https URL', () => {
      expect(isValidUrl('https://example.com/path')).toBe(true);
    });

    it('should return false for plain text', () => {
      expect(isValidUrl('just some text')).toBe(false);
    });

    it('should return true for URL mixed with text', () => {
      expect(isValidUrl('check this https://example.com link')).toBe(true);
    });
  });

  describe('extractUrl', () => {
    it('should extract URL from mixed text', () => {
      expect(extractUrl('look at https://example.com/page now')).toBe('https://example.com/page');
    });

    it('should return null for text without URL', () => {
      expect(extractUrl('no url here')).toBeNull();
    });
  });

  describe('detectEnvironment', () => {
    it('should detect uat environment', () => {
      expect(detectEnvironment('https://api.uat.example.com')).toBe('uat');
    });

    it('should detect prod environment', () => {
      expect(detectEnvironment('https://api.prod.example.com')).toBe('prod');
    });

    it('should detect dev from localhost', () => {
      expect(detectEnvironment('http://localhost:3000')).toBe('dev');
    });

    it('should detect staging environment', () => {
      expect(detectEnvironment('https://app.staging.example.com')).toBe('staging');
    });

    it('should return null for unknown', () => {
      expect(detectEnvironment('https://example.com')).toBeNull();
    });
  });

  describe('extractDomain', () => {
    it('should extract hostname', () => {
      expect(extractDomain('https://api.example.com/v1/users')).toBe('api.example.com');
    });

    it('should return null for invalid URL', () => {
      expect(extractDomain('not a url')).toBeNull();
    });
  });

  describe('extractTagsFromUrl', () => {
    it('should extract subdomain as tag', () => {
      const tags = extractTagsFromUrl('https://argocd.example.com');
      expect(tags).toContain('argocd');
    });

    it('should include environment as tag', () => {
      const tags = extractTagsFromUrl('https://api.uat.example.com');
      expect(tags).toContain('uat');
    });
  });
});
