// DropdownMenu.tsx
import { useState } from 'react';
import Link from 'next/link';
import {
  UserIcon,
  CogIcon,
  ListBulletIcon,
  ArrowRightOnRectangleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { handleLogout } from '@/app/lib/logout-actions';

interface DropdownMenuProps {
  img: string;
  name: string;
}

export default function DropdownMenu({ img, name }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ml-[-6px] inline-block">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src={`${img}`}
            className="rounded-full"
            alt={`${name}'s profile picture`}
            width={28}
            height={28}
          />
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute right-0 z-10 mr-1 mt-3 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <Link
              href="/perfil"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <UserIcon className="mr-2 h-5 w-5 text-gray-400" />
              Perfil
            </Link>
            <Link
              href="/preferencias"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <CogIcon className="mr-2 h-5 w-5 text-gray-400" />
              Ajustes
            </Link>
            <Link
              href="/access_log"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <ListBulletIcon className="mr-2 h-5 w-5 text-gray-400" />
              Access Log
            </Link>
            <div className="border-t border-gray-100"></div>
            <button
              className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => {
                handleLogout();
              }}
            >
              <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5 text-gray-400" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
