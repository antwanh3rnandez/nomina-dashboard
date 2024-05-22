'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useSidebar } from '../../lib/context-sidebar';
import Image from 'next/image';
import { poppins } from '../fonts';
import ThemeToggle from './theme-toggle';

export default function SideNav() {
  const { isOpen } = useSidebar();

  return (
    <div
      className={`flex h-full flex-col bg-white px-3 pb-2 pt-3 transition-all duration-300 dark:bg-black md:px-0 md:pt-0
      ${isOpen ? 'w-full md:w-64' : 'w-16'}`}
    >
      <div
        className={`mb-2 flex h-20 items-center justify-between rounded-md bg-primary p-4 md:justify-start 
          ${
            isOpen
              ? 'md:h-40 md:justify-center md:rounded-none'
              : 'rounded-none'
          }
        `}
      >
        <Link
          href="/"
          className={`text-white ${isOpen ? 'w-32 md:w-40' : 'w-8'}`}
        >
          {/* <Logo color="black" /> */}
          <div
            className={`${poppins.className} flex ${
              isOpen ? 'text-md flex-row' : 'flex-col'
            } items-center justify-center leading-none text-black`}
          >
            <Image
              src="/logo.png"
              alt="Hola"
              width={10}
              height={10}
              className={`${isOpen ? 'mr-2 h-10 w-10' : 'mb-2 w-10'}`}
            />
            <p className={`${isOpen ? 'text-3xl' : 'hidden text-lg'}`}>Gethy</p>
          </div>
        </Link>
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 md:bg-white md:text-black md:dark:bg-black md:dark:text-white">
        <NavLinks open={isOpen} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 dark:bg-black md:block"></div>
        {/* Solo Modo Mobile */}
        <div className="md:hidden">
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-primaryA hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3 md:hover:bg-gray-50 md:hover:bg-opacity-10">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </div>
        <footer
          className={`hidden h-[36px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-center font-medium hover:bg-primaryA hover:text-primary md:flex md:flex-none md:justify-center md:p-2 md:px-3 md:dark:bg-black md:dark:hover:bg-gray-50 md:dark:hover:bg-opacity-10 ${
            isOpen ? 'text-[10px]' : 'text-[8px]'
          }`}
        >
          <div className="hidden md:block">Nomina Dashboard Version 0.7</div>
        </footer>
      </div>
    </div>
  );
}
