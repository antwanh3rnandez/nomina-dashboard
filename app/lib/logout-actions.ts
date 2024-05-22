'use server';

import { set } from "@/app/lib/session-store";
import { signOut } from "@/auth";

export async function handleLogout() {
  await set('name', '');
  await set('email', '');
  await set('img', '');
  await set('role', '');
  await signOut();
}
