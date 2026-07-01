'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Plus, Calendar } from 'lucide-react';
import { Sidebar, Logo } from '@facter/ds-core';
import { mainNavigation } from '@/config/navigation';
import { useWorkspaces } from '@/features/workspaces/hooks/use-workspaces';
import { useRecentMeetings } from '@/features/meetings/hooks/use-meetings';
import { WorkspaceFormDialog } from '@/features/workspaces/components/workspace-form-dialog';

export function MainSidebar() {
  const pathname = usePathname();
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
    </Sidebar.Aside>

    <WorkspaceFormDialog
      open={workspaceDialogOpen}
      onOpenChange={setWorkspaceDialogOpen}
    />
    </>
  );
}
