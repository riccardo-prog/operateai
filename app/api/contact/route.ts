import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  // TODO: Store lead in database
  console.log('Lead captured:', body);
  return NextResponse.json({ success: true });
}
