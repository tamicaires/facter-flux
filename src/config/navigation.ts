import { Inbox, Star, Link2, CheckSquare, Calendar, LayoutDashboard } from 'lucide-react';

export const mainNavigation = [
  {
    title: 'Home',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Inbox',
    href: '/inbox',
    icon: Inbox,
  },
  {
    title: 'Pins',
    href: '/pins',
    icon: Star,
  },
  {
    title: 'Links',
    href: '/links',
    icon: Link2,
  },
  {
    title: 'Tasks',
    href: '/tasks',
    icon: CheckSquare,
  },
  {
    title: 'Reunioes',
    href: '/meetings',
    icon: Calendar,
  },
];

export const mobileNavItems = mainNavigation.map((item) => ({
  icon: item.icon,
  label: item.title,
  href: item.href,
}));
