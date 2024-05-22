'use client';

import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
  ArrowsPointingInIcon,
  Bars3BottomLeftIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import DropdownMenu from './dropdown';
import { NameTopBarSkeleton } from '../skeletons';
import { useSidebar } from '../../lib/context-sidebar';
import { useSession } from '../../lib/context-session';
import ThemeToggle from './theme-toggle';
import { ArrowsPointingOutIcon } from '@heroicons/react/20/solid';

export function refresh() {
  window.location.reload();
}

export default function TopBar() {
  const { name, img, loading } = useSession();
  const { isOpen, toggleSidebar } = useSidebar();

  if (!name || !img) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-between rounded-md border-b border-gray-200 bg-gray-100 p-2 md:rounded-none">
      <div className="flex items-center transition-all duration-500">
        <button className="ml-4" onClick={toggleSidebar}>
          {isOpen ? (
            <ArrowsPointingInIcon className="h-6 w-6 text-gray-600" />
          ) : (
            <ArrowsPointingOutIcon className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>
      <div className="flex items-center">
        <ThemeToggle />
        <button
          className="mr-0 rounded-md border border-gray-300 bg-white p-2 shadow-sm hover:bg-gray-50"
          onClick={refresh}
        >
          <ArrowPathIcon className="h-6 w-6 text-gray-600" />
        </button>
        <div className="mx-4 hidden h-6 border-l border-gray-400 sm:block"></div>
        {loading ? (
          <NameTopBarSkeleton />
        ) : (
          <h1 className="text-lg font-light text-black">{name}</h1>
        )}
        <DropdownMenu img={img} name={name} />
      </div>
    </div>
  );
}
