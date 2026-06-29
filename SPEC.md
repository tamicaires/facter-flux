# Facter Notes - Especificacao Tecnica Completa

> Documento de referencia para implementacao do Facter Notes.
> Criado em: 2026-06-29

---

## 1. Problema

Tech leads/owners que atuam em multiplas empresas e projetos acumulam informacoes criticas (links de ambientes, anotacoes de reunioes, tasks, decisoes tecnicas) em blocos de notas avulsos, sem organizacao, sem busca, sem contexto. O resultado: links se perdem, tasks sao esquecidas, decisoes nao sao rastreadas.

**Ferramentas existentes falham porque:**
- Notion: lento, muita estrutura, overhead para 3 palavras
- Obsidian: bom para knowledge base, ruim para captura rapida multi-contexto
- Google Keep: sem separacao de contextos, sem inteligencia
- Notepad: zero friccao na captura, zero retrieval

**Gap de mercado:** captura com friccao de Notepad + retrieval com inteligencia de Notion.

---

## 2. Conceito do Produto

### Principio: "Dump first, organize later"

O usuario joga texto, links, qualquer coisa numa caixa. O sistema detecta padroes e **sugere** classificacao. O usuario confirma/edita com um gesto (Enter/Tab). Nada e automatico sem confirmacao.

### Publico-alvo
- Tech leads, tech owners, CTOs de startups
- Pessoas que gerenciam multiplos projetos/empresas
- Perfil tecnico que vive entre terminal, browser e reunioes

### Proposta de valor
1. Captura em 2 segundos
2. Encontra em 5 segundos
3. Zero informacao perdida

---

## 3. Data Model

### 3.1 Workspace

Representa um projeto, empresa ou contexto de trabalho.

```
Workspace
  id          String    @id @default(uuid())
  name        String    (ex: "Martech", "Facter", "Pessoal")
  slug        String    @unique (auto-gerado do name)
  color       String    (hex color para badge visual)
  icon        String?   (emoji ou lucide icon name)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  entries     Entry[]
  tags        Tag[]
```

### 3.2 Entry

Unidade central. Tudo e uma Entry - notas, links, tasks, snippets.

```
Entry
  id          String      @id @default(uuid())
  content     String      (texto original digitado pelo usuario)
  type        EntryType   (NOTE | LINK | TASK | SNIPPET)
  status      EntryStatus (INBOX | ACTIVE | DONE | ARCHIVED)
  workspaceId String?     (FK -> Workspace, nullable para Inbox)
  assignee    String?     (nome da pessoa, para tasks delegadas)
  pinned      Boolean     @default(false)
  metadata    Json?       (dados extras por tipo - ver 3.2.1)
  source      EntrySource @default(MANUAL) (MANUAL | QUICK_CAPTURE | MEETING | IMPORT)
  meetingId   String?     (FK -> Meeting, nullable)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  tags        Tag[]       (many-to-many via EntryTag)
  workspace   Workspace?
  meeting     Meeting?
```

#### 3.2.1 Metadata por Tipo (JSON)

**LINK:**
```json
{
  "url": "https://argocd.martech.uat...",
  "title": "martech-theloophub-mfe - ArgoCD",
  "favicon": "https://argocd.../favicon.ico",
  "environment": "uat",
  "domain": "mybees-platform.dev",
  "serviceName": "martech-theloophub-mfe"
}
```

**TASK:**
```json
{
  "priority": "normal",
  "dueDate": null
}
```

**SNIPPET:**
```json
{
  "language": "typescript"
}
```

**NOTE:**
```json
{}
```

### 3.3 Tag

```
Tag
  id          String    @id @default(uuid())
  name        String    (ex: "argocd", "refactor", "prod")
  color       String?   (hex color opcional)
  workspaceId String?   (FK -> Workspace, null = tag global)
  createdAt   DateTime  @default(now())
  entries     Entry[]   (many-to-many via EntryTag)
```

### 3.4 EntryTag (join table)

```
EntryTag
  entryId     String
  tagId       String
  @@id([entryId, tagId])
```

### 3.5 Meeting

```
Meeting
  id          String    @id @default(uuid())
  name        String    (ex: "Daily Martech 29/06")
  workspaceId String?   (FK -> Workspace)
  startedAt   DateTime  @default(now())
  endedAt     DateTime?
  entries     Entry[]
  createdAt   DateTime  @default(now())
```

### 3.6 EnvironmentLink (para o Environment Dashboard)

```
EnvironmentLink
  id            String    @id @default(uuid())
  workspaceId   String    (FK -> Workspace)
  serviceName   String    (ex: "ArgoCD", "API Gateway", "Dashboard")
  environment   String    (ex: "prod", "uat", "dev", "staging")
  url           String
  order         Int       @default(0)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  workspace     Workspace
  @@unique([workspaceId, serviceName, environment])
```

### 3.7 Enums

```
enum EntryType {
  NOTE
  LINK
  TASK
  SNIPPET
}

enum EntryStatus {
  INBOX       // recem capturado, nao processado
  ACTIVE      // processado, ativo
  DONE        // task concluida
  ARCHIVED    // arquivado
}

enum EntrySource {
  MANUAL
  QUICK_CAPTURE
  MEETING
  IMPORT
}
```

---

## 4. Suggestion Engine (v1 - Rule-based)

### 4.1 Interface

```typescript
interface SuggestionResult {
  type: EntryType
  confidence: number           // 0-1
  tags: string[]               // sugestoes de tags
  workspace?: string           // slug do workspace sugerido
  assignee?: string            // nome se detectado
  metadata?: Partial<EntryMetadata>
  environment?: string         // prod | uat | dev | staging
}
```

### 4.2 Regras de Deteccao (ordem de prioridade)

#### URL Detection (confidence: 0.95)
- **Trigger:** contem URL valida (regex: `https?://[^\s]+`)
- **Tipo:** LINK
- **Acoes:**
  - Extrai URL do texto
  - Detecta ambiente: `.uat.` | `.staging.` | `.dev.` | `localhost` -> environment
  - Detecta dominio -> sugere workspace por historico (dominio X ja foi associado ao workspace Y)
  - Extrai path segments para tags (ex: `/applications/martech-theloophub-mfe` -> #martech)
  - Faz fetch do titulo da pagina (async, nao bloqueia)

#### Task Detection - Assignee Pattern (confidence: 0.9)
- **Trigger:** `NOME: acao` ou `@nome acao` (regex: `^([A-Z][A-Za-z]+):\s+(.+)$`)
- **Tipo:** TASK
- **Acoes:**
  - Extrai assignee do nome
  - Conteudo = acao
  - Tags: extrai palavras-chave tecnicas (refactor, fix, deploy, etc.)

#### Task Detection - Action Verbs (confidence: 0.7)
- **Trigger:** comeca com ou contem verbos de acao:
  - PT: fazer, criar, remover, checar, migrar, refatorar, alinhar, configurar, atualizar, corrigir, implementar, testar, verificar, limitar, mostrar
  - EN: fix, add, remove, check, migrate, refactor, implement, test, deploy, update, create, delete
- **Tipo:** TASK
- **Tags:** extrai substantivos tecnicos do texto

#### Snippet Detection (confidence: 0.85)
- **Trigger:** contem ``` ou blocos com `{}`, `() =>`, `function`, `const `, `import `
- **Tipo:** SNIPPET
- **Acoes:** detecta linguagem pelo conteudo

#### Default (confidence: 0.5)
- **Tipo:** NOTE
- **Tags:** extrai palavras-chave se houver (#hashtags explicitas)

### 4.3 Workspace Suggestion

Logica de sugestao do workspace (nesta ordem):
1. Se tem URL -> busca historico: "este dominio ja foi usado no workspace X?"
2. Se tem palavras-chave do nome do workspace no texto
3. Ultimo workspace ativo (se nenhum match)
4. Null (fica no Inbox global)

### 4.4 Tag Extraction

- **Explicitas:** `#tag` no texto -> extrai como tag
- **Implicitas:** palavras-chave tecnicas conhecidas (git, deploy, docker, api, frontend, backend, etc.)
- **De URL:** segments relevantes do path da URL

---

## 5. Arquitetura

### 5.1 Stack

| Camada | Tecnologia | Motivo |
|--------|-----------|--------|
| Framework | Next.js 14+ (App Router) | Full-stack, SSR, Server Actions |
| Linguagem | TypeScript (strict) | Padrao Facter |
| Database | Neon (Postgres serverless) | Free tier, connection string simples, escala |
| ORM | Prisma | Padrao Facter, typesafe |
| Validacao | Zod | Padrao Facter, runtime validation |
| UI | @facter/ds-core | Design System First (regra obrigatoria) |
| Icons | lucide-react | Ja no DS |
| State | Zustand (se necessario) | Padrao Facter frontend |
| Data fetching | TanStack Query | Padrao Facter frontend |
| Auth | NextAuth.js | Para futuro multi-tenant |
| Search | pg_trgm + ts_vector | Full-text search nativo Postgres |

### 5.2 Estrutura do Projeto

```
facter-notes/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (ThemeProvider, Sidebar)
│   │   ├── page.tsx                  # Dashboard / Inbox
│   │   ├── workspace/
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Workspace timeline
│   │   ├── links/
│   │   │   └── page.tsx              # Environment Dashboard
│   │   ├── tasks/
│   │   │   └── page.tsx              # Tasks view
│   │   ├── meetings/
│   │   │   ├── page.tsx              # Meetings list
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Meeting detail
│   │   └── api/                      # API Routes (se necessario)
│   │       └── metadata/
│   │           └── route.ts          # URL metadata extraction endpoint
│   │
│   ├── core/                         # Domain Layer (Clean Architecture)
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── entry.ts
│   │   │   │   ├── workspace.ts
│   │   │   │   ├── tag.ts
│   │   │   │   ├── meeting.ts
│   │   │   │   └── environment-link.ts
│   │   │   ├── repositories/         # Abstracoes (abstract classes)
│   │   │   │   ├── entries.repository.ts
│   │   │   │   ├── workspaces.repository.ts
│   │   │   │   ├── tags.repository.ts
│   │   │   │   ├── meetings.repository.ts
│   │   │   │   └── environment-links.repository.ts
│   │   │   └── errors/
│   │   │       ├── domain-error.ts
│   │   │       ├── entry-not-found.error.ts
│   │   │       ├── workspace-not-found.error.ts
│   │   │       └── duplicate-tag.error.ts
│   │   │
│   │   ├── use-cases/
│   │   │   ├── entries/
│   │   │   │   ├── create-entry.ts
│   │   │   │   ├── update-entry.ts
│   │   │   │   ├── delete-entry.ts
│   │   │   │   ├── search-entries.ts
│   │   │   │   ├── pin-entry.ts
│   │   │   │   ├── archive-entry.ts
│   │   │   │   └── process-inbox-entry.ts  # move do Inbox para workspace
│   │   │   ├── workspaces/
│   │   │   │   ├── create-workspace.ts
│   │   │   │   ├── update-workspace.ts
│   │   │   │   └── list-workspaces.ts
│   │   │   ├── tags/
│   │   │   │   ├── create-tag.ts
│   │   │   │   └── list-tags.ts
│   │   │   ├── meetings/
│   │   │   │   ├── start-meeting.ts
│   │   │   │   ├── end-meeting.ts
│   │   │   │   └── list-meetings.ts
│   │   │   └── suggestions/
│   │   │       └── suggest-entry-metadata.ts
│   │   │
│   │   └── services/                 # Abstracoes de servicos externos
│   │       └── url-metadata.service.ts
│   │
│   ├── infra/                        # Infrastructure Layer
│   │   ├── repositories/             # Prisma implementations
│   │   │   ├── prisma-entries.repository.ts
│   │   │   ├── prisma-workspaces.repository.ts
│   │   │   ├── prisma-tags.repository.ts
│   │   │   ├── prisma-meetings.repository.ts
│   │   │   └── prisma-environment-links.repository.ts
│   │   ├── services/
│   │   │   ├── suggestion-engine.ts  # Implementacao do motor de sugestoes
│   │   │   └── url-metadata-extractor.ts
│   │   └── database/
│   │       └── prisma.ts             # Prisma client singleton
│   │
│   ├── actions/                      # Next.js Server Actions
│   │   ├── entry.actions.ts
│   │   ├── workspace.actions.ts
│   │   ├── tag.actions.ts
│   │   ├── meeting.actions.ts
│   │   └── suggestion.actions.ts
│   │
│   ├── features/                     # Feature modules (frontend)
│   │   ├── capture/
│   │   │   ├── components/
│   │   │   │   ├── capture-bar.tsx           # Componente principal de captura
│   │   │   │   ├── suggestion-chips.tsx      # Chips de sugestao editaveis
│   │   │   │   └── workspace-picker-inline.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── use-capture.ts
│   │   │   │   └── use-suggestions.ts
│   │   │   └── forms/
│   │   │       └── capture.schema.ts
│   │   │
│   │   ├── timeline/
│   │   │   ├── components/
│   │   │   │   ├── timeline-view.tsx
│   │   │   │   ├── entry-card.tsx
│   │   │   │   ├── entry-card-link.tsx
│   │   │   │   ├── entry-card-task.tsx
│   │   │   │   ├── entry-card-note.tsx
│   │   │   │   └── date-separator.tsx
│   │   │   └── hooks/
│   │   │       └── use-entries.ts
│   │   │
│   │   ├── inbox/
│   │   │   ├── components/
│   │   │   │   ├── inbox-view.tsx
│   │   │   │   └── inbox-entry-card.tsx      # Card com acoes de processar
│   │   │   └── hooks/
│   │   │       └── use-inbox.ts
│   │   │
│   │   ├── links/
│   │   │   ├── components/
│   │   │   │   ├── environment-dashboard.tsx
│   │   │   │   ├── service-grid.tsx
│   │   │   │   └── link-card.tsx
│   │   │   └── hooks/
│   │   │       └── use-environment-links.ts
│   │   │
│   │   ├── search/
│   │   │   ├── components/
│   │   │   │   ├── search-dialog.tsx
│   │   │   │   └── search-results.tsx
│   │   │   └── hooks/
│   │   │       └── use-search.ts
│   │   │
│   │   ├── meetings/
│   │   │   ├── components/
│   │   │   │   ├── meeting-capture-mode.tsx
│   │   │   │   ├── meeting-list.tsx
│   │   │   │   └── meeting-summary.tsx
│   │   │   └── hooks/
│   │   │       ├── use-meeting-session.ts
│   │   │       └── use-meetings.ts
│   │   │
│   │   ├── workspaces/
│   │   │   ├── components/
│   │   │   │   ├── workspace-switcher.tsx
│   │   │   │   └── workspace-form-dialog.tsx
│   │   │   └── hooks/
│   │   │       └── use-workspaces.ts
│   │   │
│   │   └── pins/
│   │       ├── components/
│   │       │   └── pinned-list.tsx
│   │       └── hooks/
│   │           └── use-pins.ts
│   │
│   ├── shared/
│   │   ├── types/
│   │   │   ├── entry.types.ts
│   │   │   ├── workspace.types.ts
│   │   │   └── common.types.ts
│   │   ├── utils/
│   │   │   ├── url.utils.ts              # parse URL, detectar ambiente
│   │   │   ├── text.utils.ts             # detectar padroes no texto
│   │   │   └── date.utils.ts
│   │   └── constants/
│   │       ├── action-verbs.ts           # listas de verbos PT/EN
│   │       ├── tech-keywords.ts          # palavras-chave tecnicas
│   │       └── environment-patterns.ts   # padroes de deteccao de ambiente
│   │
│   └── lib/
│       └── query-client.ts               # TanStack Query config
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── .env.example
├── CLAUDE.md                             # Instrucoes especificas do projeto
└── SPEC.md                               # Este documento
```

### 5.3 Clean Architecture - Regras

Seguindo padroes do Facter Truck:

1. **Use cases usam APENAS abstracoes** - nunca Prisma direto
2. **Repositories:** abstract class em `core/domain/repositories/`, implementacao Prisma em `infra/repositories/`
3. **Server Actions** sao a ponte entre frontend e use cases (substitui controllers do NestJS)
4. **Entities** se auto-validam via Zod
5. **DomainErrors** para erros de negocio
6. **Dependency Injection** via factory functions (Next.js nao tem DI container como NestJS)

#### Exemplo de fluxo:

```
[UI] CaptureBar.onSubmit()
  -> [Server Action] createEntryAction(data)
    -> [Use Case] CreateEntry.execute(data)
      -> [Repository Abstract] entriesRepository.create(entry)
        -> [Prisma Impl] PrismaEntriesRepository.create(entry)
          -> [DB] INSERT INTO entries ...
```

#### Dependency Injection sem NestJS:

```typescript
// infra/container.ts
import { PrismaEntriesRepository } from './repositories/prisma-entries.repository'
import { PrismaWorkspacesRepository } from './repositories/prisma-workspaces.repository'
import { CreateEntry } from '@/core/use-cases/entries/create-entry'

// Singleton instances
const entriesRepository = new PrismaEntriesRepository()
const workspacesRepository = new PrismaWorkspacesRepository()

// Factory functions para use cases
export function makeCreateEntry() {
  return new CreateEntry(entriesRepository, workspacesRepository)
}

// Server Action usa:
// actions/entry.actions.ts
'use server'
import { makeCreateEntry } from '@/infra/container'

export async function createEntryAction(data: CreateEntryInput) {
  const useCase = makeCreateEntry()
  return useCase.execute(data)
}
```

---

## 6. Mapeamento de Componentes do DS (@facter/ds-core)

### 6.1 Layout Principal

| Area | Componente DS | Uso |
|------|--------------|-----|
| Sidebar | `Sidebar.Root`, `Sidebar.Header`, `Sidebar.Nav`, `Sidebar.Section`, `Sidebar.NavItem`, `Sidebar.Footer` | Navegacao principal com workspaces, views, reunioes |
| Top bar | `Navbar` | Barra superior com busca e acoes |
| Theme | `ThemeProvider` + tema customizado `notes.css` | Tema proprio do Notes |

### 6.2 Capture Bar

| Elemento | Componente DS | Detalhes |
|----------|--------------|----------|
| Input principal | `Input` | Com icone de search/capture, placeholder dinamico |
| Chips de sugestao | `Badge` | Variantes por tipo: default (tag), secondary (workspace), outline (tipo) |
| Workspace picker | `Popover` + lista customizada | Popover com lista de workspaces e cores |
| Type selector | `DropdownMenu` | Dropdown com opcoes NOTE, LINK, TASK, SNIPPET |

### 6.3 Entry Cards

| Elemento | Componente DS | Detalhes |
|----------|--------------|----------|
| Card container | `Card` (CardHeader, CardContent) | Card compacto com acoes |
| Type badge | `Badge` | Cor por tipo: blue=LINK, green=TASK, gray=NOTE, purple=SNIPPET |
| Tags | `Badge` (variant="outline") | Tags como badges outline |
| Workspace indicator | `Badge` (variant="secondary") | Com cor do workspace |
| Status | `Badge` | Para tasks: Pendente, Concluido |
| Assignee | `Avatar` + texto | Para tasks delegadas |
| Actions | `DropdownMenu` | Editar, Arquivar, Pinnar, Deletar |
| Pin indicator | Icone `lucide-react/Pin` | Visual de item pinnado |

### 6.4 Views

| View | Componentes DS |
|------|---------------|
| Timeline | `ScrollArea`, `SectionHeader` (para separadores de data), `Card` (entries) |
| Inbox | `Card` com acoes extras (processar, categorizar), `EmptyState` quando vazio |
| Links / Environment Dashboard | `Card` por workspace, grid customizado, `Badge` para status |
| Tasks | `DataTable` ou lista filtrada, `Checkbox` para marcar done |
| Search | `Dialog` (modal de busca), `Input`, resultados em `Card` |
| Meetings | `Card` por reuniao, timeline interna |

### 6.5 Formularios

| Form | Componentes DS |
|------|---------------|
| Criar Workspace | `Dialog` (1-4 campos: nome, cor, icone) + `Form.Input`, `Form.Select` |
| Editar Entry | Inline editing no card ou `Dialog` |
| Criar Environment Link | `Dialog` + `Form.Input` (URL), `Form.Select` (ambiente, servico) |

### 6.6 Outros

| Elemento | Componente DS |
|----------|--------------|
| Loading states | `Skeleton` |
| Empty states | `EmptyState` |
| Notifications | `toast()` via Sonner |
| Tooltips | `SimpleTooltip` para link previews |
| Page headers | `PageHeader` |
| Separators | `Separator` |
| Tabs de view | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |

### 6.7 Tema

Criar `notes.css` no DS ou usar tema inline. Sugestao de cor primaria:

- **Teal/Cyan** (diferencia de truck=blue, vagas=purple, techcare=green)
- Primary: `hsl(185, 65%, 45%)` (#1a9ca0 aproximado)
- Ou **Amber/Orange** para algo mais quente: `hsl(35, 85%, 55%)`

---

## 7. Interface - Wireframes Detalhados

### 7.1 Layout Principal

```
+------------------------------------------------------------------+
| [=] Facter Notes           [Ctrl+K Capturar...]    [🔔] [👤]    |
+----------+-------------------------------------------------------+
|          |                                                        |
| SIDEBAR  |  MAIN CONTENT                                         |
|          |                                                        |
| 📥 Inbox |  +--------------------------------------------------+ |
| ⭐ Pins  |  | Ctrl+K  Digite qualquer coisa...           [🎙️]  | |
| 🔗 Links |  +--------------------------------------------------+ |
| ✅ Tasks |                                                        |
|          |  [Filtros: Todos | Tipo | Tags | 🔍 Buscar]           |
| SPACES   |                                                        |
| ● Martech|  --- Hoje ---                                          |
| ● Facter |  +--------------------------------------------------+ |
| ● Pessoal|  | 🔗 ArgoCD UAT - martech-theloophub-mfe            | |
| + Novo   |  |    [#argocd] [#uat] [● Martech]      2h atras  ⋮ | |
|          |  +--------------------------------------------------+ |
| REUNIOES |  +--------------------------------------------------+ |
| 📋 Daily |  | ✅ Nao mostrar botao quando nao tiver dados       | |
|   29/06  |  |    [#ui] [● Martech]   ○ Pendente            ⋮  | |
| 📋 Plann |  +--------------------------------------------------+ |
|   27/06  |  +--------------------------------------------------+ |
|          |  | ✅ Refactor Types                                  | |
|          |  |    👤 Sobreira [#refactor] [● Martech]   ○ Pend ⋮ | |
|          |  +--------------------------------------------------+ |
|          |                                                        |
|          |  --- Ontem ---                                          |
|          |  +--------------------------------------------------+ |
|          |  | 📝 Alinhar front com back git flow                 | |
|          |  |    [#git] [#processo] [● Facter]       1d atras ⋮ | |
|          |  +--------------------------------------------------+ |
+----------+-------------------------------------------------------+
```

### 7.2 Capture Bar (expandida com sugestoes)

```
+------------------------------------------------------------------+
|                                                                    |
|  Ctrl+K  SOBREIRA: Refactor Types█                                |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  | Sugestoes:                                                    | |
|  |                                                               | |
|  | Tipo: [✅ Task ▼]   Space: [● Martech ▼]                     | |
|  | Assignee: [👤 Sobreira ✕]                                     | |
|  | Tags: [#refactor ✕] [+ tag]                                   | |
|  |                                                               | |
|  | [Enter: Salvar]   [Tab: Navegar]   [Esc: Cancelar]            | |
|  +--------------------------------------------------------------+ |
|                                                                    |
+------------------------------------------------------------------+
```

Fluxo:
1. Usuario digita texto
2. Apos 300ms debounce, suggestion engine analisa
3. Chips aparecem abaixo com sugestoes
4. Cada chip e clicavel/editavel
5. Enter salva aceitando sugestoes
6. Esc fecha sem salvar

### 7.3 Environment Dashboard (view Links)

```
+------------------------------------------------------------------+
| 🔗 Links por Ambiente                                             |
|                                                                    |
| +--- ● Martech -------------------------------------------------+|
| |                                                                 ||
| |       ArgoCD         API Gateway     Dashboard     MFE         ||
| | PROD  [Abrir] 🟢    [Abrir] 🟢     [Abrir] 🟢   [Abrir] 🟢  ||
| | UAT   [Abrir] 🟢    [Abrir] 🟡     ---           [Abrir] 🟢  ||
| | DEV   [Abrir] 🔵    ---             ---           [Abrir] 🔵  ||
| |                                        [+ Servico] [+ Ambiente]||
| +----------------------------------------------------------------+|
|                                                                    |
| +--- ● Facter --------------------------------------------------+|
| |                                                                 ||
| |       Truck App      Hub Web        DS Storybook               ||
| | PROD  [Abrir] 🟢    ---            [Abrir] 🟢                 ||
| | UAT   [Abrir] 🟢    [Abrir] 🟢    ---                         ||
| | DEV   [Abrir] 🔵    [Abrir] 🔵    [Abrir] 🔵                 ||
| +----------------------------------------------------------------+|
|                                                                    |
| Links recentes sem ambiente:                                       |
| • Figma - Design System v3              2 dias atras              |
| • Confluence - ADR Authentication        1 semana atras           |
+------------------------------------------------------------------+
```

### 7.4 Meeting Capture Mode

```
+------------------------------------------------------------------+
| 📋 Reuniao: Daily Martech - 29/06    ⏱ 00:14:32     [Encerrar]  |
| -----------------------------------------------------------------|
|                                                                    |
| Ctrl+K  Capturar na reuniao...                                    |
|                                                                    |
| Capturado nesta reuniao:                                           |
|                                                                    |
| 09:30  📝 Comentar Bruno sobre deploy                             |
| 09:31  📝 Falar sobre squash nos PRs                              |
| 09:33  ✅ Alinhar front com back git flow     -> Task criada      |
| 09:35  🔗 https://argocd...                   -> Link salvo (UAT) |
| 09:38  📝 Resources: discussao sobre favoritos...                  |
| 09:41  ✅ SOBREIRA: Refactor Types            -> Task (Sobreira)  |
| 09:43  📝 checar jsonata sumiu tbm                                |
|                                                                    |
| ----------------------------------------------------------------- |
| Resumo: 7 entradas | 3 tasks | 1 link | 3 notas                  |
+------------------------------------------------------------------+
```

### 7.5 Inbox (Daily Review)

```
+------------------------------------------------------------------+
| 📥 Inbox (5 itens para processar)                                 |
|                                                                    |
| +--------------------------------------------------+              |
| | 📝 Resources tem a funcionalidade de favoritos... |              |
| |    Capturado: hoje 09:38 | Reuniao: Daily Martech|              |
| |                                                   |              |
| |    Mover para: [● Martech ▼]                      |              |
| |    Tags: [+ tag]                                   |              |
| |    Tipo: [📝 Note ▼]                               |              |
| |                                                   |              |
| |    [✓ Processar]  [📌 Pin]  [🗑️ Descartar]        |              |
| +--------------------------------------------------+              |
|                                                                    |
| +--------------------------------------------------+              |
| | 📝 checar jsonata sumiu tbm                       |              |
| |    Capturado: hoje 09:43                           |              |
| |    ...                                             |              |
| +--------------------------------------------------+              |
+------------------------------------------------------------------+
```

---

## 8. Keyboard Shortcuts

| Shortcut | Acao |
|----------|------|
| `Ctrl+K` | Focar Capture Bar |
| `Enter` | Salvar entry (na capture bar) |
| `Tab` | Navegar entre chips de sugestao |
| `Esc` | Fechar capture bar / cancelar |
| `Ctrl+M` | Iniciar/parar Meeting Mode |
| `Ctrl+F` | Abrir busca |
| `Ctrl+1-9` | Trocar workspace (por ordem) |
| `Ctrl+Shift+P` | Command palette (futuro) |

---

## 9. MVP Scope (v0.1)

### Incluido no MVP

- [ ] Setup do projeto (Next.js, Prisma, Neon, @facter/ds-core)
- [ ] Schema Prisma + migrations
- [ ] Entities + Zod schemas
- [ ] Repositories (abstract + Prisma)
- [ ] DI container (factory functions)

- [ ] Capture Bar com Suggestion Engine
- [ ] CRUD de Entries (criar, listar, editar, deletar)
- [ ] Timeline view (agrupado por data)
- [ ] Filtros por tipo, workspace, tag
- [ ] Full-text search (pg_trgm)

- [ ] CRUD de Workspaces (com cor e icone)
- [ ] Sidebar com workspaces
- [ ] Workspace switcher na capture bar

- [ ] Tags (auto-sugeridas + manuais)
- [ ] Inbox (entries sem workspace)
- [ ] Pin entries (quick access)

- [ ] Environment Dashboard (links por servico x ambiente)
- [ ] Link metadata extraction (titulo, favicon)

- [ ] Keyboard shortcuts (Ctrl+K, Enter, Esc, Tab)

### Fora do MVP (v0.2+)

- Meeting Mode (v0.2)
- Health check de links (v0.2)
- Board/Kanban view para tasks (v0.2)
- Daily Review flow (v0.2)
- People view - delegacoes (v0.3)
- PWA + atalho global de sistema (v0.3)
- Import de notas existentes (v0.3)
- AI-powered suggestions (v1.0)
- Multi-tenant / auth / billing (v1.0 - quando virar produto)
- Mobile responsive (v0.2)

---

## 10. Testes

Seguindo padrao Facter:

### Backend (use cases)
- InMemory repositories para testes
- AAA pattern (Arrange, Act, Assert)
- Cenarios de sucesso E erro obrigatorios
- Factory functions para criar entities de teste

### Frontend
- React Testing Library para componentes
- Mock de server actions
- Testes do suggestion engine (puro, sem DOM)

### Suggestion Engine (testes prioritarios)
```
describe('SuggestionEngine', () => {
  it('detecta URL como LINK')
  it('detecta ambiente UAT na URL')
  it('detecta pattern NOME: acao como TASK com assignee')
  it('detecta verbos de acao como TASK')
  it('extrai hashtags como tags')
  it('sugere workspace por dominio da URL')
  it('retorna NOTE como default')
  it('detecta code snippet')
})
```

---

## 11. Convencoes

### Commits
Formato Facter: `[FNOTES] tipo(escopo): mensagem`
- `[FNOTES] feat(capture): add suggestion engine with URL detection`
- `[FNOTES] fix(timeline): fix date grouping for entries`

### Arquivos
- kebab-case para arquivos: `create-entry.ts`, `use-capture.ts`
- PascalCase para classes: `CreateEntry`, `EntriesRepository`
- camelCase para variaveis: `isCapturing`, `entryType`

### Branch
- `feat/fnotes-capture-bar`
- `fix/fnotes-timeline-grouping`

---

## 12. Decisoes Tecnicas

### Por que Next.js full-stack e nao NestJS + React?

- Projeto menor que Truck, nao precisa de API separada no MVP
- Server Actions simplificam o fluxo (sem HTTP layer)
- Deploy unificado (Vercel ou qualquer Node host)
- Se crescer, extrai API depois (use cases ja estao isolados)

### Por que Neon e nao SQLite?

- Full-text search nativo (pg_trgm, ts_vector) - SQLite precisa FTS5 que e limitado
- Quando virar produto multi-tenant, ja esta em Postgres
- Free tier generoso (0.5 GB)
- Connection string simples, zero Docker local

### Por que rule-based e nao AI para sugestoes?

- Zero latencia (sincrono, local)
- Zero custo (sem API calls)
- Zero dependencia externa
- Previsivel e debuggavel
- AI vem na v1.0 como upgrade, nao como requisito

---

## 13. Proximos Passos

1. Criar repo/pasta `facter-notes/`
2. Setup Next.js com App Router
3. Configurar Prisma + Neon
4. Integrar @facter/ds-core (tema, componentes)
5. Implementar data model (schema.prisma + entities)
6. Implementar Suggestion Engine (core logic + testes)
7. Implementar Capture Bar (componente central)
8. Implementar Timeline view
9. Implementar Workspaces + Sidebar
10. Implementar Environment Dashboard
11. Implementar Search
12. Implementar Inbox + Pins
