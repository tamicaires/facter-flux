import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning database...');
  await prisma.entryTag.deleteMany();
  await prisma.entry.deleteMany();
  await prisma.environmentLink.deleteMany();
  await prisma.meeting.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.workspace.deleteMany();

  console.log('Creating workspaces...');
  const martech = await prisma.workspace.create({
    data: {
      name: 'Martech',
      slug: 'martech',
      color: '#10b981',
      icon: 'Briefcase',
    },
  });

  const facter = await prisma.workspace.create({
    data: {
      name: 'Facter',
      slug: 'facter',
      color: '#3b82f6',
      icon: 'Code',
    },
  });

  const pessoal = await prisma.workspace.create({
    data: {
      name: 'Pessoal',
      slug: 'pessoal',
      color: '#f59e0b',
      icon: 'User',
    },
  });

  console.log('Creating tags...');
  const tagReact = await prisma.tag.create({
    data: { name: 'react', color: '#61dafb', workspaceId: facter.id },
  });
  const tagDevops = await prisma.tag.create({
    data: { name: 'devops', color: '#ff6b6b', workspaceId: martech.id },
  });
  const tagArgocd = await prisma.tag.create({
    data: { name: 'argocd', color: '#ef5b25', workspaceId: martech.id },
  });
  const tagNextjs = await prisma.tag.create({
    data: { name: 'nextjs', color: '#000000', workspaceId: facter.id },
  });
  const tagPrisma = await prisma.tag.create({
    data: { name: 'prisma', color: '#2d3748', workspaceId: facter.id },
  });
  const tagBug = await prisma.tag.create({
    data: { name: 'bug', color: '#e53e3e' },
  });
  const tagUrgente = await prisma.tag.create({
    data: { name: 'urgente', color: '#dd6b20' },
  });
  const tagIdeia = await prisma.tag.create({
    data: { name: 'ideia', color: '#9f7aea' },
  });
  const tagInfra = await prisma.tag.create({
    data: { name: 'infra', color: '#4299e1', workspaceId: martech.id },
  });
  const tagDS = await prisma.tag.create({
    data: { name: 'design-system', color: '#ed64a6', workspaceId: facter.id },
  });

  console.log('Creating entries...');
  const now = new Date();
  const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000);
  const daysAgo = (d: number) => new Date(now.getTime() - d * 24 * 60 * 60 * 1000);

  // === HOJE ===

  // LINK - ArgoCD (Martech)
  await prisma.entry.create({
    data: {
      content: 'https://argocd.martech.mybees-platform.com/applications/martech-theloophub-mfe?resource=',
      type: 'LINK',
      status: 'ACTIVE',
      source: 'QUICK_CAPTURE',
      workspaceId: martech.id,
      pinned: true,
      metadata: { url: 'https://argocd.martech.mybees-platform.com/applications/martech-theloophub-mfe?resource=', environment: 'production' },
      createdAt: hoursAgo(1),
      tags: { create: [{ tagId: tagArgocd.id }, { tagId: tagDevops.id }] },
    },
  });

  // TASK - Deploy review
  await prisma.entry.create({
    data: {
      content: 'SOBREIRA: Revisar deploy do TheLoopHub MFE antes de quarta',
      type: 'TASK',
      status: 'ACTIVE',
      source: 'QUICK_CAPTURE',
      workspaceId: martech.id,
      assignee: 'SOBREIRA',
      metadata: null,
      createdAt: hoursAgo(2),
      tags: { create: [{ tagId: tagDevops.id }] },
    },
  });

  // NOTE - Ideia
  await prisma.entry.create({
    data: {
      content: 'Ideia: criar um CLI do Facter Flux pra capturar direto do terminal. facter-cli capture "texto aqui" --workspace=martech --tags=devops',
      type: 'NOTE',
      status: 'INBOX',
      source: 'QUICK_CAPTURE',
      metadata: null,
      createdAt: hoursAgo(3),
      tags: { create: [{ tagId: tagIdeia.id }] },
    },
  });

  // SNIPPET - React hook
  await prisma.entry.create({
    data: {
      content: `const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};`,
      type: 'SNIPPET',
      status: 'ACTIVE',
      source: 'QUICK_CAPTURE',
      workspaceId: facter.id,
      metadata: { language: 'typescript' },
      createdAt: hoursAgo(4),
      tags: { create: [{ tagId: tagReact.id }] },
    },
  });

  // LINK - Prisma docs
  await prisma.entry.create({
    data: {
      content: 'https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search',
      type: 'LINK',
      status: 'ACTIVE',
      source: 'QUICK_CAPTURE',
      workspaceId: facter.id,
      metadata: { url: 'https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search', title: 'Full-text search - Prisma Docs' },
      createdAt: hoursAgo(5),
      tags: { create: [{ tagId: tagPrisma.id }] },
    },
  });

  // TASK - Inbox sem workspace
  await prisma.entry.create({
    data: {
      content: 'Configurar alertas do Datadog para os serviços críticos',
      type: 'TASK',
      status: 'INBOX',
      source: 'QUICK_CAPTURE',
      metadata: null,
      createdAt: hoursAgo(6),
      tags: { create: [{ tagId: tagUrgente.id }, { tagId: tagInfra.id }] },
    },
  });

  // === ONTEM ===

  // NOTE
  await prisma.entry.create({
    data: {
      content: 'Meeting com o time de produto: definir roadmap Q3. Prioridades: migração micro-frontends, novo dashboard de métricas, integração com Slack.',
      type: 'NOTE',
      status: 'ACTIVE',
      source: 'MEETING',
      workspaceId: martech.id,
      pinned: true,
      metadata: null,
      createdAt: daysAgo(1),
    },
  });

  // LINK - Grafana
  await prisma.entry.create({
    data: {
      content: 'https://grafana.martech.mybees-platform.com/d/abc123/theloophub-overview',
      type: 'LINK',
      status: 'ACTIVE',
      source: 'QUICK_CAPTURE',
      workspaceId: martech.id,
      metadata: { url: 'https://grafana.martech.mybees-platform.com/d/abc123/theloophub-overview', environment: 'production', title: 'TheLoopHub Overview - Grafana' },
      createdAt: daysAgo(1),
      tags: { create: [{ tagId: tagInfra.id }] },
    },
  });

  // TASK done
  await prisma.entry.create({
    data: {
      content: 'Atualizar versão do Next.js para 16 no facter-flux',
      type: 'TASK',
      status: 'DONE',
      source: 'QUICK_CAPTURE',
      workspaceId: facter.id,
      metadata: null,
      createdAt: daysAgo(1),
      tags: { create: [{ tagId: tagNextjs.id }] },
    },
  });

  // SNIPPET - SQL
  await prisma.entry.create({
    data: {
      content: `SELECT
  w.name as workspace,
  COUNT(e.id) as total_entries,
  COUNT(CASE WHEN e.type = 'TASK' AND e.status = 'DONE' THEN 1 END) as done_tasks,
  COUNT(CASE WHEN e.pinned = true THEN 1 END) as pinned
FROM workspaces w
LEFT JOIN entries e ON e.workspace_id = w.id
GROUP BY w.id, w.name
ORDER BY total_entries DESC;`,
      type: 'SNIPPET',
      status: 'ACTIVE',
      source: 'QUICK_CAPTURE',
      workspaceId: facter.id,
      pinned: true,
      metadata: { language: 'sql' },
      createdAt: daysAgo(1),
      tags: { create: [{ tagId: tagPrisma.id }] },
    },
  });

  // === 2 DIAS ATRAS ===

  // TASK
  await prisma.entry.create({
    data: {
      content: 'TAMIR: Implementar dark mode no design system com CSS variables',
      type: 'TASK',
      status: 'ACTIVE',
      source: 'QUICK_CAPTURE',
      workspaceId: facter.id,
      assignee: 'TAMIR',
      metadata: null,
      createdAt: daysAgo(2),
      tags: { create: [{ tagId: tagDS.id }] },
    },
  });

  // LINK - GitHub PR
  await prisma.entry.create({
    data: {
      content: 'https://github.com/facter-io/facter-design-system/pull/42',
      type: 'LINK',
      status: 'ACTIVE',
      source: 'QUICK_CAPTURE',
      workspaceId: facter.id,
      metadata: { url: 'https://github.com/facter-io/facter-design-system/pull/42', title: 'PR #42 - Add compound Form components' },
      createdAt: daysAgo(2),
      tags: { create: [{ tagId: tagDS.id }, { tagId: tagReact.id }] },
    },
  });

  // NOTE
  await prisma.entry.create({
    data: {
      content: 'Estudar Turborepo vs Nx para monorepo do ecossistema Facter. Turborepo parece mais simples mas Nx tem melhor cache remoto.',
      type: 'NOTE',
      status: 'ACTIVE',
      source: 'QUICK_CAPTURE',
      workspaceId: facter.id,
      metadata: null,
      createdAt: daysAgo(2),
      tags: { create: [{ tagId: tagIdeia.id }] },
    },
  });

  // === 3 DIAS ATRAS ===

  // NOTE pessoal
  await prisma.entry.create({
    data: {
      content: 'Renovar certificados AWS - expiram dia 15/07. Estudar pra Solutions Architect Professional.',
      type: 'NOTE',
      status: 'ACTIVE',
      source: 'MANUAL',
      workspaceId: pessoal.id,
      pinned: true,
      metadata: null,
      createdAt: daysAgo(3),
    },
  });

  // LINK pessoal
  await prisma.entry.create({
    data: {
      content: 'https://www.udemy.com/course/aws-certified-solutions-architect-professional/',
      type: 'LINK',
      status: 'ACTIVE',
      source: 'QUICK_CAPTURE',
      workspaceId: pessoal.id,
      metadata: { url: 'https://www.udemy.com/course/aws-certified-solutions-architect-professional/', title: 'AWS Solutions Architect Professional - Udemy' },
      createdAt: daysAgo(3),
    },
  });

  // TASK archived
  await prisma.entry.create({
    data: {
      content: 'Configurar ESLint flat config no facter-flux',
      type: 'TASK',
      status: 'ARCHIVED',
      source: 'QUICK_CAPTURE',
      workspaceId: facter.id,
      metadata: null,
      createdAt: daysAgo(3),
    },
  });

  // === 5 DIAS ATRAS ===

  // SNIPPET - bash
  await prisma.entry.create({
    data: {
      content: `#!/bin/bash
# Quick deploy script for Martech MFEs
set -e

ENV=\${1:-staging}
echo "Deploying to $ENV..."

for mfe in theloophub dashboard analytics; do
  echo "Building $mfe..."
  pnpm --filter "@martech/$mfe" build
  echo "Pushing $mfe to $ENV..."
  kubectl apply -f "k8s/$mfe/$ENV.yaml"
done

echo "Deploy complete!"`,
      type: 'SNIPPET',
      status: 'ACTIVE',
      source: 'QUICK_CAPTURE',
      workspaceId: martech.id,
      pinned: true,
      metadata: { language: 'bash' },
      createdAt: daysAgo(5),
      tags: { create: [{ tagId: tagDevops.id }, { tagId: tagInfra.id }] },
    },
  });

  // TASK
  await prisma.entry.create({
    data: {
      content: 'Migrar autenticação do TheLoopHub para o Facter Hub SSO',
      type: 'TASK',
      status: 'ACTIVE',
      source: 'QUICK_CAPTURE',
      workspaceId: martech.id,
      metadata: null,
      createdAt: daysAgo(5),
    },
  });

  // NOTE - INBOX
  await prisma.entry.create({
    data: {
      content: 'Verificar se o rate limiting está funcionando corretamente na API de webhooks. Cliente reportou timeout.',
      type: 'NOTE',
      status: 'INBOX',
      source: 'QUICK_CAPTURE',
      metadata: null,
      createdAt: daysAgo(5),
      tags: { create: [{ tagId: tagBug.id }, { tagId: tagUrgente.id }] },
    },
  });

  console.log('Creating environment links...');
  // Martech environment links
  await prisma.environmentLink.createMany({
    data: [
      { workspaceId: martech.id, serviceName: 'TheLoopHub', environment: 'production', url: 'https://theloophub.martech.com', order: 0 },
      { workspaceId: martech.id, serviceName: 'TheLoopHub', environment: 'staging', url: 'https://staging.theloophub.martech.com', order: 0 },
      { workspaceId: martech.id, serviceName: 'TheLoopHub', environment: 'development', url: 'http://localhost:3000', order: 0 },
      { workspaceId: martech.id, serviceName: 'Dashboard', environment: 'production', url: 'https://dashboard.martech.com', order: 1 },
      { workspaceId: martech.id, serviceName: 'Dashboard', environment: 'staging', url: 'https://staging.dashboard.martech.com', order: 1 },
      { workspaceId: martech.id, serviceName: 'ArgoCD', environment: 'production', url: 'https://argocd.martech.mybees-platform.com', order: 2 },
      { workspaceId: martech.id, serviceName: 'Grafana', environment: 'production', url: 'https://grafana.martech.mybees-platform.com', order: 3 },
      { workspaceId: martech.id, serviceName: 'Grafana', environment: 'staging', url: 'https://staging-grafana.martech.mybees-platform.com', order: 3 },
    ],
  });

  // Facter environment links
  await prisma.environmentLink.createMany({
    data: [
      { workspaceId: facter.id, serviceName: 'Hub Web', environment: 'production', url: 'https://hub.facter.io', order: 0 },
      { workspaceId: facter.id, serviceName: 'Hub Web', environment: 'staging', url: 'https://staging.hub.facter.io', order: 0 },
      { workspaceId: facter.id, serviceName: 'Hub Web', environment: 'development', url: 'http://localhost:3001', order: 0 },
      { workspaceId: facter.id, serviceName: 'Hub API', environment: 'production', url: 'https://api.hub.facter.io', order: 1 },
      { workspaceId: facter.id, serviceName: 'Hub API', environment: 'development', url: 'http://localhost:4000', order: 1 },
      { workspaceId: facter.id, serviceName: 'Truck App', environment: 'production', url: 'https://truck.facter.io', order: 2 },
      { workspaceId: facter.id, serviceName: 'DS Storybook', environment: 'production', url: 'https://ds.facter.io', order: 3 },
      { workspaceId: facter.id, serviceName: 'DS Storybook', environment: 'development', url: 'http://localhost:6006', order: 3 },
    ],
  });

  console.log('Creating meetings with linked entries...');

  // Meeting 1 - Daily Martech (ontem, 25 min)
  const dailyMartech = await prisma.meeting.create({
    data: {
      name: 'Daily Martech',
      workspaceId: martech.id,
      startedAt: daysAgo(1),
      endedAt: new Date(daysAgo(1).getTime() + 25 * 60 * 1000),
    },
  });

  await prisma.entry.create({
    data: {
      content: 'TheLoopHub MFE: build quebrado no staging, webpack config com path errado pro shared module',
      type: 'NOTE',
      status: 'ACTIVE',
      source: 'MEETING',
      workspaceId: martech.id,
      meetingId: dailyMartech.id,
      createdAt: new Date(daysAgo(1).getTime() + 3 * 60 * 1000),
      tags: { create: [{ tagId: tagDevops.id }] },
    },
  });

  await prisma.entry.create({
    data: {
      content: 'SOBREIRA: Corrigir config do webpack shared module até amanhã',
      type: 'TASK',
      status: 'ACTIVE',
      source: 'MEETING',
      workspaceId: martech.id,
      assignee: 'SOBREIRA',
      meetingId: dailyMartech.id,
      createdAt: new Date(daysAgo(1).getTime() + 5 * 60 * 1000),
      tags: { create: [{ tagId: tagDevops.id }] },
    },
  });

  await prisma.entry.create({
    data: {
      content: 'https://argocd.martech.mybees-platform.com/applications/martech-theloophub-mfe',
      type: 'LINK',
      status: 'ACTIVE',
      source: 'MEETING',
      workspaceId: martech.id,
      meetingId: dailyMartech.id,
      metadata: { url: 'https://argocd.martech.mybees-platform.com/applications/martech-theloophub-mfe', environment: 'staging' },
      createdAt: new Date(daysAgo(1).getTime() + 8 * 60 * 1000),
      tags: { create: [{ tagId: tagArgocd.id }] },
    },
  });

  await prisma.entry.create({
    data: {
      content: 'Dashboard analytics: API de métricas retornando 504 intermitente. Possível N+1 na query de aggregation.',
      type: 'NOTE',
      status: 'ACTIVE',
      source: 'MEETING',
      workspaceId: martech.id,
      meetingId: dailyMartech.id,
      createdAt: new Date(daysAgo(1).getTime() + 12 * 60 * 1000),
      tags: { create: [{ tagId: tagBug.id }, { tagId: tagInfra.id }] },
    },
  });

  await prisma.entry.create({
    data: {
      content: 'TAMIR: Investigar N+1 no endpoint /api/metrics/aggregate',
      type: 'TASK',
      status: 'ACTIVE',
      source: 'MEETING',
      workspaceId: martech.id,
      assignee: 'TAMIR',
      meetingId: dailyMartech.id,
      createdAt: new Date(daysAgo(1).getTime() + 14 * 60 * 1000),
      tags: { create: [{ tagId: tagBug.id }] },
    },
  });

  await prisma.entry.create({
    data: {
      content: 'Deploy do novo fluxo de onboarding: aguardando QA finalizar testes no UAT',
      type: 'NOTE',
      status: 'ACTIVE',
      source: 'MEETING',
      workspaceId: martech.id,
      meetingId: dailyMartech.id,
      createdAt: new Date(daysAgo(1).getTime() + 18 * 60 * 1000),
    },
  });

  await prisma.entry.create({
    data: {
      content: 'https://grafana.martech.mybees-platform.com/d/xyz789/api-latency',
      type: 'LINK',
      status: 'ACTIVE',
      source: 'MEETING',
      workspaceId: martech.id,
      meetingId: dailyMartech.id,
      metadata: { url: 'https://grafana.martech.mybees-platform.com/d/xyz789/api-latency', environment: 'production', title: 'API Latency - Grafana' },
      createdAt: new Date(daysAgo(1).getTime() + 20 * 60 * 1000),
      tags: { create: [{ tagId: tagInfra.id }] },
    },
  });

  // Meeting 2 - Sprint Planning Facter (2 dias atrás, 1h)
  const sprintPlanning = await prisma.meeting.create({
    data: {
      name: 'Sprint Planning Facter',
      workspaceId: facter.id,
      startedAt: daysAgo(2),
      endedAt: new Date(daysAgo(2).getTime() + 60 * 60 * 1000),
    },
  });

  await prisma.entry.create({
    data: {
      content: 'Sprint 12 - Foco: Meeting Mode, Daily Review, Health Check. Estimativa: 2 semanas.',
      type: 'NOTE',
      status: 'ACTIVE',
      source: 'MEETING',
      workspaceId: facter.id,
      meetingId: sprintPlanning.id,
      createdAt: new Date(daysAgo(2).getTime() + 5 * 60 * 1000),
    },
  });

  await prisma.entry.create({
    data: {
      content: 'TAMIR: Implementar Meeting Mode com Ctrl+M, banner, cronômetro e summary dialog',
      type: 'TASK',
      status: 'DONE',
      source: 'MEETING',
      workspaceId: facter.id,
      assignee: 'TAMIR',
      meetingId: sprintPlanning.id,
      createdAt: new Date(daysAgo(2).getTime() + 15 * 60 * 1000),
      tags: { create: [{ tagId: tagReact.id }] },
    },
  });

  await prisma.entry.create({
    data: {
      content: 'TAMIR: Daily Review flow - stepper com progress bar, processar/pin/descartar',
      type: 'TASK',
      status: 'DONE',
      source: 'MEETING',
      workspaceId: facter.id,
      assignee: 'TAMIR',
      meetingId: sprintPlanning.id,
      createdAt: new Date(daysAgo(2).getTime() + 25 * 60 * 1000),
      tags: { create: [{ tagId: tagReact.id }] },
    },
  });

  await prisma.entry.create({
    data: {
      content: 'Decisão: Health Check via API Route (não server action) por causa do fetch com timeout',
      type: 'NOTE',
      status: 'ACTIVE',
      source: 'MEETING',
      workspaceId: facter.id,
      meetingId: sprintPlanning.id,
      createdAt: new Date(daysAgo(2).getTime() + 35 * 60 * 1000),
      tags: { create: [{ tagId: tagNextjs.id }] },
    },
  });

  await prisma.entry.create({
    data: {
      content: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
      type: 'LINK',
      status: 'ACTIVE',
      source: 'MEETING',
      workspaceId: facter.id,
      meetingId: sprintPlanning.id,
      metadata: { url: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers', title: 'Route Handlers - Next.js Docs' },
      createdAt: new Date(daysAgo(2).getTime() + 40 * 60 * 1000),
      tags: { create: [{ tagId: tagNextjs.id }] },
    },
  });

  // Meeting 3 - Alinhamento Produto (3 dias atrás, 45 min)
  const alinhamento = await prisma.meeting.create({
    data: {
      name: 'Alinhamento Produto Q3',
      workspaceId: martech.id,
      startedAt: daysAgo(3),
      endedAt: new Date(daysAgo(3).getTime() + 45 * 60 * 1000),
    },
  });

  await prisma.entry.create({
    data: {
      content: 'Roadmap Q3: 1) Migração micro-frontends 2) Dashboard métricas 3) Integração Slack 4) Facter Hub SSO',
      type: 'NOTE',
      status: 'ACTIVE',
      source: 'MEETING',
      workspaceId: martech.id,
      pinned: true,
      meetingId: alinhamento.id,
      createdAt: new Date(daysAgo(3).getTime() + 10 * 60 * 1000),
    },
  });

  await prisma.entry.create({
    data: {
      content: 'Prioridade máxima: migração MFE do TheLoopHub. Deadline: final de julho.',
      type: 'NOTE',
      status: 'ACTIVE',
      source: 'MEETING',
      workspaceId: martech.id,
      meetingId: alinhamento.id,
      createdAt: new Date(daysAgo(3).getTime() + 20 * 60 * 1000),
    },
  });

  await prisma.entry.create({
    data: {
      content: 'SOBREIRA: Criar RFC da migração MFE com estimativas por serviço',
      type: 'TASK',
      status: 'ACTIVE',
      source: 'MEETING',
      workspaceId: martech.id,
      assignee: 'SOBREIRA',
      meetingId: alinhamento.id,
      createdAt: new Date(daysAgo(3).getTime() + 30 * 60 * 1000),
    },
  });

  // Meeting 4 - Tech Review Facter (5 dias atrás, 50 min)
  const techReview = await prisma.meeting.create({
    data: {
      name: 'Tech Review - Design System',
      workspaceId: facter.id,
      startedAt: daysAgo(5),
      endedAt: new Date(daysAgo(5).getTime() + 50 * 60 * 1000),
    },
  });

  await prisma.entry.create({
    data: {
      content: 'DS v2: compound components pattern funcionando bem. Form.Input, Form.Select etc. Adoção positiva.',
      type: 'NOTE',
      status: 'ACTIVE',
      source: 'MEETING',
      workspaceId: facter.id,
      meetingId: techReview.id,
      createdAt: new Date(daysAgo(5).getTime() + 10 * 60 * 1000),
      tags: { create: [{ tagId: tagDS.id }] },
    },
  });

  await prisma.entry.create({
    data: {
      content: 'Falta: DataTable com server-side sorting/filtering. Próxima prioridade do DS.',
      type: 'NOTE',
      status: 'ACTIVE',
      source: 'MEETING',
      workspaceId: facter.id,
      meetingId: techReview.id,
      createdAt: new Date(daysAgo(5).getTime() + 25 * 60 * 1000),
      tags: { create: [{ tagId: tagDS.id }] },
    },
  });

  // Meeting 5 - 1:1 rápida sem workspace (7 dias atrás, 15 min)
  await prisma.meeting.create({
    data: {
      name: '1:1 Sobreira',
      startedAt: daysAgo(7),
      endedAt: new Date(daysAgo(7).getTime() + 15 * 60 * 1000),
    },
  });

  console.log('Creating additional INBOX entries for Daily Review...');

  await prisma.entry.create({
    data: {
      content: 'Testar nova versão do Turborepo 2.5 - promises de cache melhorado',
      type: 'NOTE',
      status: 'INBOX',
      source: 'QUICK_CAPTURE',
      metadata: null,
      createdAt: hoursAgo(1),
      tags: { create: [{ tagId: tagIdeia.id }] },
    },
  });

  await prisma.entry.create({
    data: {
      content: 'https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates',
      type: 'LINK',
      status: 'INBOX',
      source: 'QUICK_CAPTURE',
      metadata: { url: 'https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates', title: 'Optimistic Updates - TanStack Query' },
      createdAt: hoursAgo(2),
      tags: { create: [{ tagId: tagReact.id }] },
    },
  });

  await prisma.entry.create({
    data: {
      content: 'SOBREIRA: Revisar PR #87 do hub-api - middleware de rate limiting',
      type: 'TASK',
      status: 'INBOX',
      source: 'QUICK_CAPTURE',
      assignee: 'SOBREIRA',
      metadata: null,
      createdAt: hoursAgo(4),
    },
  });

  await prisma.entry.create({
    data: {
      content: `const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};`,
      type: 'SNIPPET',
      status: 'INBOX',
      source: 'QUICK_CAPTURE',
      metadata: { language: 'typescript' },
      createdAt: hoursAgo(7),
    },
  });

  await prisma.entry.create({
    data: {
      content: 'Erro no Sentry: "TypeError: Cannot read properties of undefined (reading \'map\')" no DashboardMetrics component. 47 ocorrências hoje.',
      type: 'NOTE',
      status: 'INBOX',
      source: 'QUICK_CAPTURE',
      metadata: null,
      createdAt: hoursAgo(8),
      tags: { create: [{ tagId: tagBug.id }, { tagId: tagUrgente.id }] },
    },
  });

  await prisma.entry.create({
    data: {
      content: 'Avaliar Biome como substituto do ESLint + Prettier - benchmark mostra 10x mais rápido',
      type: 'NOTE',
      status: 'INBOX',
      source: 'QUICK_CAPTURE',
      metadata: null,
      createdAt: daysAgo(1),
      tags: { create: [{ tagId: tagIdeia.id }] },
    },
  });

  await prisma.entry.create({
    data: {
      content: 'https://biomejs.dev/blog/biome-v2/',
      type: 'LINK',
      status: 'INBOX',
      source: 'QUICK_CAPTURE',
      metadata: { url: 'https://biomejs.dev/blog/biome-v2/', title: 'Biome v2 - Blog' },
      createdAt: daysAgo(1),
    },
  });

  await prisma.entry.create({
    data: {
      content: 'Agendar demo do Facter Flux pro time de produto - mostrar Meeting Mode e Daily Review',
      type: 'TASK',
      status: 'INBOX',
      source: 'QUICK_CAPTURE',
      metadata: null,
      createdAt: daysAgo(2),
    },
  });

  console.log('Seed completed!');
  const counts = {
    workspaces: await prisma.workspace.count(),
    entries: await prisma.entry.count(),
    tags: await prisma.tag.count(),
    environmentLinks: await prisma.environmentLink.count(),
    meetings: await prisma.meeting.count(),
  };
  console.log('Totals:', counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
