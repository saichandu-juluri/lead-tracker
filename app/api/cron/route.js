import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server'


export async function GET() {
  // If there is no signed in user, this will return a 404 error
  // await auth.protect()
  console.log(`Cron job executed at:------------------------> `);
  
  return NextResponse.json({ ok: true });
}
