import { cn } from '@/lib/utils';
import { SettingsIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
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
  return (
    <nav>
      <ul className='flex flex-col gap-2'>
        {routes.map(({ href, label, icons }) => {
          const isActive = false;
          const Icon = isActive ? icons.active : icons.default;

          return (
            <li key={href}>
              <Link href={href}>
                <span
                  className={cn(
                    'flex items-center gap-2 p-3 rounded-md font-medium hover:text-primary transition text-neutral-600 hover:bg-gray-100',
                    isActive &&
                      'bg-white shadow-sm hover:opacity-100 text-primary'
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
