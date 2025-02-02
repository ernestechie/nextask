'use client';
import useWorkspaceId from '@/features/workspaces/hooks/useWorkspaceId';
import { cn } from '@/lib/utils';
import { SettingsIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from 'react-icons/go';

const routes = [
  {
    label: 'Home',
    href: '',
    icons: {
      default: GoHome,
      active: GoHomeFill,
    },
  },
  {
    label: 'My Tasks',
    href: '/tasks',
    icons: {
      default: GoCheckCircle,
      active: GoCheckCircleFill,
    },
  },
  {
    label: 'Settings',
    href: '/settings',
    icons: {
      default: SettingsIcon,
      active: SettingsIcon,
    },
  },
  {
    label: 'Members',
    href: '/members',
    icons: {
      default: UsersIcon,
      active: UsersIcon,
    },
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();

  return (
    <nav>
      <ul className='flex flex-col gap-2'>
        {routes.map(({ href, label, icons }) => {
          const fullHref = `/workspaces/${workspaceId}${href}`;
          const isActive = pathname === fullHref;
          const Icon = isActive ? icons.active : icons.default;

          return (
            <li key={fullHref}>
              <Link href={fullHref}>
                <span
                  className={cn(
                    'flex items-center gap-2 p-3 rounded-md font-medium hover:text-primary transition text-neutral-600 hover:bg-gray-100',
                    isActive && 'bg-gray-50 hover:opacity-100 text-primary'
                  )}
                >
                  <Icon className='size-5 text-neutral-600' />
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
