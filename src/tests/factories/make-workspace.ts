import { Workspace, type WorkspaceProps } from '@/core/domain/entities/workspace';

export function makeWorkspace(overrides: Partial<WorkspaceProps> = {}): Workspace {
  return new Workspace({
    name: 'Test Workspace',
    slug: 'test-workspace',
    color: '#3b82f6',
    ...overrides,
  });
}
