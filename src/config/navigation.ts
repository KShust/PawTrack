import {
  House,
  BookHeart,
  BriefcaseMedical,
  CalendarClock,
  WandSparkles,
  UserRoundCog,
} from 'lucide-react';

export const navItems = [
  { key: 'Dashboard', href: '/dashboard', icon: House },
  { key: 'Health',    href: '/health',    icon: BookHeart },
  { key: 'Medical',   href: '/medical',   icon: BriefcaseMedical },
  { key: 'Calendar',  href: '/calendar',  icon: CalendarClock },
  { key: 'Chat',      href: '/chat',      icon: WandSparkles },
  { key: 'Settings',  href: '/settings',  icon: UserRoundCog },
];