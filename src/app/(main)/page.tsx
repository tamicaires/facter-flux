'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Inbox,
  Star,
  CheckSquare,
  PlayCircle,
  Radio,
  Square,
  ArrowRight,
  Link2,
  Keyboard,
} from 'lucide-react';
import { Card, CardContent, Badge, Button, Skeleton, toast } from '@facter/ds-core';
import { useEntries } from '@/features/timeline/hooks/use-entries';
import { useRecentMeetings } from '@/features/meetings/hooks/use-meetings';
import { useMeetingSession } from '@/features/meetings/hooks/use-meeting-session';
import { useEnvironmentLinks } from '@/features/links/hooks/use-environment-links';
import { StartMeetingDialog } from '@/features/meetings/components/start-meeting-dialog';
import { EntryCard } from '@/features/timeline/components/entry-card';
import { formatRelativeTime } from '@/shared/utils/date.utils';

function StatCard({
  icon: Icon,
  label,
  count,
  href,
  color,
}: {
  icon: React.ElementType;
  label: string;
  count: number;
  href: string;
  color: string;
}) {
  return (
    <Link href={href}>
      <Card className="transition-colors hover:bg-accent/50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className={`rounded-lg p-2 ${color}`}>
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-2xl font-semibold">{count}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function HomePage() {
  const [showStartDialog, setShowStartDialog] = useState(false);
  const { start: startSession, isActive: meetingActive, session, end: endMeeting } = useMeetingSession();

  const { data: inboxData, isLoading: inboxLoading } = useEntries({ status: 'INBOX' });
  const { data: pinnedData, isLoading: pinsLoading } = useEntries({ pinned: true });
  const { data: tasksData, isLoading: tasksLoading } = useEntries({ type: 'TASK', status: 'ACTIVE' });
  const { data: recentData, isLoading: recentLoading } = useEntries({ perPage: 5 });
  const { data: recentMeetings, isLoading: meetingsLoading } = useRecentMeetings(3);
  const { data: linksData } = useEnvironmentLinks();

  const inboxCount = inboxData?.total ?? 0;
  const linksCount = linksData?.length ?? 0;
  const pinsCount = pinnedData?.total ?? 0;
  const tasksCount = tasksData?.total ?? 0;

  const statsLoading = inboxLoading || pinsLoading || tasksLoading;

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-lg" />
          ))
        ) : (
          <>
            <StatCard icon={Inbox} label="Inbox" count={inboxCount} href="/inbox" color="bg-orange-500/10 text-orange-500" />
            <StatCard icon={Star} label="Pins" count={pinsCount} href="/pins" color="bg-yellow-500/10 text-yellow-500" />
            <StatCard icon={CheckSquare} label="Tasks ativas" count={tasksCount} href="/tasks" color="bg-green-500/10 text-green-500" />
            <StatCard icon={Link2} label="Links" count={linksCount} href="/links" color="bg-blue-500/10 text-blue-500" />
          </>
        )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {inboxCount > 0 && (
          <Link href="/inbox/review">
            <Card className="border-orange-500/30 transition-colors hover:bg-orange-500/5">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <PlayCircle className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium">Processar Inbox</p>
                    <p className="text-xs text-muted-foreground">
                      {inboxCount} {inboxCount === 1 ? 'entrada pendente' : 'entradas pendentes'}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        )}

        {meetingActive && session ? (
          <Card className="border-red-500/30 bg-red-500/5">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <Radio className="h-5 w-5 text-red-500" />
                  <span className="absolute h-5 w-5 rounded-full bg-red-500/30 animate-ping" />
                </div>
                <div>
                  <p className="font-medium">{session.meeting.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Reuniao em andamento
                  </p>
                </div>
              </div>
              <Button variant="destructive" size="sm" className="gap-1.5" onClick={endMeeting}>
                <Square className="h-3 w-3" />
                Encerrar
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card
            className="border-primary/30 cursor-pointer transition-colors hover:bg-primary/5"
            onClick={() => setShowStartDialog(true)}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Radio className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Iniciar Reuniao</p>
                  <p className="text-xs text-muted-foreground">
                    Ctrl+M para captura contextualizada
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                <Keyboard className="h-3 w-3 mr-1" />
                Ctrl+M
              </Badge>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Two columns: Recent entries + Recent meetings */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent entries - 2/3 */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-muted-foreground">Entradas recentes</h2>
            <Link href="/inbox" className="text-xs text-muted-foreground hover:text-foreground">
              Ver todas
            </Link>
          </div>

          {recentLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          ) : recentData?.data && recentData.data.length > 0 ? (
            <div className="space-y-2">
              {recentData.data.map((entry) => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                Use Ctrl+K para capturar sua primeira entrada
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent meetings - 1/3 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-muted-foreground">Reunioes recentes</h2>
            <Link href="/meetings" className="text-xs text-muted-foreground hover:text-foreground">
              Ver todas
            </Link>
          </div>

          {meetingsLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          ) : recentMeetings && recentMeetings.length > 0 ? (
            <div className="space-y-2">
              {recentMeetings.map((meeting) => (
                <Link key={meeting.id} href={`/meetings/${meeting.id}`}>
                  <Card className="transition-colors hover:bg-accent/50">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{meeting.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatRelativeTime(new Date(meeting.startedAt))}
                          </p>
                        </div>
                        {meeting.workspace && (
                          <div
                            className="h-2.5 w-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: meeting.workspace.color }}
                            title={meeting.workspace.name}
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-sm text-muted-foreground">
                Nenhuma reuniao ainda
              </CardContent>
            </Card>
          )}

          {/* Shortcuts hint */}
          <Card>
            <CardContent className="p-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Atalhos</p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Capturar</span>
                  <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">Ctrl+K</kbd>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Iniciar reuniao</span>
                  <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">Ctrl+M</kbd>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Encerrar reuniao</span>
                  <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">Ctrl+Shift+M</kbd>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Buscar</span>
                  <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">Ctrl+F</kbd>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <StartMeetingDialog
        open={showStartDialog}
        onOpenChange={setShowStartDialog}
        activeMeeting={meetingActive && session ? session.meeting : null}
        onStarted={(meeting) => {
          startSession(meeting);
          setShowStartDialog(false);
          toast.success(`Reuniao "${meeting.name}" iniciada`);
        }}
      />
    </div>
  );
}
