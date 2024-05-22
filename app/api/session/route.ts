// app/api/session/route.ts
import { NextResponse } from 'next/server';
import { get } from '@/app/lib/session-store';

export async function GET() {
  try {
    const name = await get('name');
    const img = await get('img');
    const role = await get('role');
    return NextResponse.json({ name, img, role });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch session data' }, { status: 500 });
  }
}
