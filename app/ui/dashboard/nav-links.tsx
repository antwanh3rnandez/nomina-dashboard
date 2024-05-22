'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserCircleIcon,
  StarIcon,
  PencilIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useSidebar } from '../../lib/context-sidebar';
import Link from 'next/link';
import { NavLinkSkeleton } from '../skeletons';
import { useSession } from '@/app/lib/context-session';

// Map of links to display in the side navigation.
const links = [
  {
    id: 1,
    name: 'Home',
    href: '/dashboard',
    icon: HomeIcon,
    permissions: ['admin', 'user'],
  },
  {
    id: 2,
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
    permissions: ['admin', 'user'],
  },
  {
    id: 3,
    name: 'Customers',
    href: '/dashboard/customers',
    icon: UserGroupIcon,
    permissions: ['admin', 'user'],
  },
  {
    id: 4,
    name: 'Users',
    href: '/dashboard/users',
    icon: UserCircleIcon,
    permissions: ['admin'],
    children: [
      {
        name: 'Create User',
        href: '/dashboard/users/create',
        icon: <UserPlusIcon/>,
      },
      {
        name: 'User List',
        href: '/dashboard/user-list',
        icon: <PencilIcon />,
      },
    ],
  },
];

interface NavLinkProps {
  open: boolean;
}

export default function NavLinks({ open }: NavLinkProps) {
  /* const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); */
  const { role, loading } = useSession();
  const pathname = usePathname();
  const { isOpen } = useSidebar();
  const [isOpenChildren, setIsOpenChildren] = useState<number | null>(null);
  const menuRefs = useRef<{ [key: number]: HTMLElement | null }>({});

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      let clickedOutside = true;
      for (const ref of Object.values(menuRefs.current)) {
        if (ref && ref.contains(event.target)) {
          clickedOutside = false;
          break;
        }
      }
      if (clickedOutside) {
        setIsOpenChildren(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <>
        {links.map((link) => (
          <NavLinkSkeleton key={link.id} />
        ))}
      </>
    );
  }

  if (!role) {
    return null;
  }

  const toggleChildren = (id: number) => {
    setIsOpenChildren((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isDropdownOpen = isOpenChildren === link.id;
        return (
          role &&
          link.permissions.includes(role) && (
            <div
              key={link.id}
              className="group relative grow md:grow-0"
              ref={(el) => (menuRefs.current[link.id] = el)}
            >
              <Link
                href={link.href}
                onClick={(e) => {
                  if (link.children) {
                    /* e.preventDefault(); */
                    toggleChildren(link.id);
                  }
                }}
                className={`flex grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-primaryA hover:text-primary dark:rounded-md dark:hover:text-primary md:px-3  md:dark:hover:bg-gray-50 md:dark:hover:bg-opacity-10
                  ${
                    isOpen
                      ? 'h-[48px] md:flex-none md:justify-start md:p-2 md:px-4'
                      : 'md:h-16 md:grow-0 md:flex-col md:justify-center md:p-1 md:text-[10px]'
                  }
                  ${
                    pathname === link.href
                      ? 'bg-primaryA text-primary md:dark:bg-gray-50 md:dark:bg-opacity-10 md:dark:text-primary'
                      : 'md:dark:bg-black md:dark:text-white'
                  }
                `}
              >
                <LinkIcon
                  className={`w-6 ${isOpen ? 'md:mr-1 md:w-6' : 'md:w-4'}`}
                />
                <p className="hidden md:block">{link.name}</p>
              </Link>
              {link.children && isDropdownOpen && (
                <>
                  <div
                    className={`absolute -right-[-40%] bottom-[-75%] 
                      ${
                        isOpen
                          ? 'md:-right-7 md:top-[80%]'
                          : 'md:-right-7 md:top-[80%]'
                      }  
                    -translate-y-1/2 transform`}
                  >
                    <div
                      className={`z-0 h-5 w-5 rotate-45 transform bg-gray-100 dark:bg-black shadow-md`}
                    ></div>
                  </div>
                  <div
                    className={`absolute right-0 top-16 z-10 w-48
                      ${
                        isOpen
                          ? 'md:left-full md:top-0 md:ml-3'
                          : 'md:left-full md:top-0 md:ml-3'
                      }
                    rounded-md bg-gray-100 dark:bg-black dark:text-white shadow-lg`}
                  >
                    <div className={`relative space-y-1 p-2`}>
                      {link.children.map((child, idx) => (
                        <Link
                          key={idx}
                          href={child.href}
                          className={`z-10 flex flex-row items-center rounded-md bg-white dark:bg-black p-2 text-sm font-medium hover:bg-primaryA hover:text-primary dark:hover:bg-gray-50 dark:hover:bg-opacity-10`}
                        >
                          <div
                            className={`mr-1 w-6 ${
                              isOpen ? 'md:w-4' : 'md:w-4'
                            }`}
                          >
                            {child.icon}
                          </div>
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        );
      })}
    </>
  );
}
