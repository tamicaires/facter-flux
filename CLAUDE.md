# Facter Flux

App de captura rapida e organizacao inteligente de notas, links, tasks e snippets para tech leads multi-projeto.

## Conceito

"Dump first, organize later" - usuario joga qualquer texto, sistema sugere classificacao (tipo, workspace, tags, assignee), usuario confirma/edita.

## Stack

- Next.js 14+ (App Router) - full-stack
- TypeScript strict
- Prisma + Neon (Postgres serverless)
- @facter/ds-core (UI components)
- Zod (validation)
- TanStack Query (data fetching)
- Zustand (state, se necessario)

## Arquitetura

Clean Architecture adaptada para Next.js:

```
src/
  core/domain/entities/       # Entities com Zod validation
  core/domain/repositories/   # Abstract classes
  core/domain/errors/         # DomainError subclasses
  core/use-cases/             # Business logic (usa apenas abstracoes)
  infra/repositories/         # Prisma implementations
  infra/services/             # Services (suggestion engine, url metadata)
  actions/                    # Next.js Server Actions (ponte UI <-> use cases)
  features/                   # Feature modules (components, hooks, forms)
  shared/                     # Types, utils, constants
```

### Regras
- Use cases NUNCA acessam Prisma diretamente
- Server Actions instanciam use cases via factory functions (infra/container.ts)
- Entities se auto-validam via Zod
- Erros de negocio: throw DomainError subclasses

## Features Principais

1. **Capture Bar** (Ctrl+K) - input com suggestion engine
2. **Suggestion Engine** - rule-based, detecta tipo/tags/workspace/assignee
3. **Workspaces** - contextos separados (Martech, Facter, Pessoal)
4. **Timeline** - entries agrupadas por data
5. **Environment Dashboard** - grid servico x ambiente com links
6. **Inbox** - entries nao processadas
7. **Pins** - acesso rapido a entries importantes
8. **Search** - full-text com filtros

## Componentes DS Obrigatorios

- Layout: `Sidebar.*`, `Navbar`
- Cards: `Card`, `Badge`
- Forms: `Form.*`, `Input`, `Dialog`
- Data: `DataTable`, `Tabs`
- Feedback: `toast()`, `Skeleton`, `EmptyState`
- Navigation: `DropdownMenu`, `Popover`

Verificar @facter/ds-core ANTES de criar qualquer componente. Se nao existe mas deveria: PARAR e avisar.

## Commits

Formato: `[FNOTES] tipo(escopo): mensagem`
Tipos: feat, fix, docs, refactor, test, chore
NUNCA adicionar Co-Authored-By.

## Testes

- Obrigatorios para todo codigo novo
- InMemory repositories para testes de use cases
- AAA pattern (Arrange, Act, Assert)
- Suggestion engine: cobrir todos os patterns de deteccao

## Referencia

Especificacao completa: `SPEC.md`
Padroes gerais Facter: `../CLAUDE.md`
DS docs: `../facter-design-system/CLAUDE.md`
