import { NextResponse } from 'next/server';

const LEAD_ENGINE_URL = process.env.LEAD_ENGINE_URL || 'https://app.operateai.ca';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const res = await fetch(`${LEAD_ENGINE_URL}/api/intake`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...body,
        sourceId: 'website-ora',
      }),
    });

    if (!res.ok) {
      console.error('[contact] Lead Engine intake failed:', res.status);
      return NextResponse.json({ success: false }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Lead Engine intake error:', err);
    return NextResponse.json({ success: false }, { status: 502 });
  }
}
