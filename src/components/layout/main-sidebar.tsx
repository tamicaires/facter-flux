'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Plus, Calendar, LogOut } from 'lucide-react';
import { Sidebar, Logo } from '@facter/ds-core';
import { mainNavigation } from '@/config/navigation';
import { useWorkspaces } from '@/features/workspaces/hooks/use-workspaces';
import { useRecentMeetings } from '@/features/meetings/hooks/use-meetings';
import { logoutAction } from '@/actions/auth.actions';
import { WorkspaceFormDialog } from '@/features/workspaces/components/workspace-form-dialog';

export function MainSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { data: workspaces } = useWorkspaces();
  const { data: recentMeetings } = useRecentMeetings(5);
  const [workspaceDialogOpen, setWorkspaceDialogOpen] = useState(false);

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
    <Sidebar.Aside>
      <Sidebar.Header
        logo={
          <div className="flex h-8 w-8 items-center justify-center rounded-md">
            <Logo width={18} color="hsl(var(--primary-foreground))" />
          </div>
        }
        collapsedLogo={
          <div className="flex h-8 w-8 items-center justify-center rounded-md">
            <Logo width={18} color="hsl(var(--primary-foreground))" />
          </div>
        }
        title="Facter Flux"
        className="[&_span]:text-base"
      />

      <Sidebar.Nav>
        <Sidebar.Section>
          {mainNavigation.map((item) => (
            <Sidebar.NavItem
              key={item.href}
              icon={item.icon}
              label={item.title}
              href={item.href}
              isActive={isActiveRoute(item.href)}
            />
          ))}
        </Sidebar.Section>

        {recentMeetings && recentMeetings.length > 0 && (
          <Sidebar.Section title="Reunioes Recentes">
            {recentMeetings.map((meeting) => (
              <Sidebar.NavItem
                key={meeting.id}
                icon={Calendar}
                label={meeting.name}
                href={`/meetings/${meeting.id}`}
                isActive={pathname === `/meetings/${meeting.id}`}
              />
            ))}
          </Sidebar.Section>
        )}

        <Sidebar.Section title="Workspaces">
          {workspaces?.map((ws) => (
            <Sidebar.NavItem
              key={ws.id}
              icon={
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: ws.color }}
                />
              }
              label={ws.name}
              href={`/workspace/${ws.slug}`}
              isActive={pathname === `/workspace/${ws.slug}`}
            />
          ))}
          <Sidebar.NavItem
            icon={Plus}
            label="Novo Workspace"
            onClick={() => setWorkspaceDialogOpen(true)}
          />
        </Sidebar.Section>
      </Sidebar.Nav>

      {session?.user && (
        <Sidebar.Footer>
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
              {session.user.name?.charAt(0)?.toUpperCase() ?? session.user.email?.charAt(0)?.toUpperCase() ?? '?'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{session.user.name ?? 'User'}</p>
              <p className="truncate text-xs text-muted-foreground">{session.user.email}</p>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
        </Sidebar.Footer>
      )}
    </Sidebar.Aside>

    <WorkspaceFormDialog
      open={workspaceDialogOpen}
      onOpenChange={setWorkspaceDialogOpen}
    />
    </>
  );
}
