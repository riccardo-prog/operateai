import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  // TODO: Handle Calendly webhook events
  console.log('Calendly webhook:', body);
  return NextResponse.json({ received: true });
}
