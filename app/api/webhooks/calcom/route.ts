import { NextResponse } from 'next/server';

const LEAD_ENGINE_URL = process.env.LEAD_ENGINE_URL || 'https://app.operateai.ca';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-cal-signature-256');

  try {
    const res = await fetch(`${LEAD_ENGINE_URL}/api/webhooks/calcom`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(signature ? { 'x-cal-signature-256': signature } : {}),
      },
      body: rawBody,
    });

    if (!res.ok) {
      console.error('[calcom webhook] Lead Engine forward failed:', res.status);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[calcom webhook] Forward error:', err);
    return NextResponse.json({ received: true });
  }
}
