import { NextResponse } from 'next/server';

const LEAD_ENGINE_URL = process.env.LEAD_ENGINE_URL || 'https://app.operateai.ca';
const LEAD_ENGINE_CLIENT_ID = process.env.LEAD_ENGINE_CLIENT_ID || 'operate-ai';
const LEAD_ENGINE_SECRET = process.env.INTERNAL_API_SECRET;

type ContactBody = {
  name?: string;
  email?: string;
  business?: string;
  message?: string;
};

export async function POST(request: Request) {
  if (!LEAD_ENGINE_SECRET) {
    console.error('[contact] INTERNAL_API_SECRET not configured');
    return NextResponse.json({ success: false, reason: 'misconfigured' }, { status: 500 });
  }

  const body = (await request.json()) as ContactBody;

  if (!body.email) {
    return NextResponse.json({ success: false, reason: 'missing_email' }, { status: 400 });
  }

  const { firstName, lastName } = splitName(body.name);
  const business = body.business?.trim() || '';
  const note = body.message?.trim() || 'Lead captured via Ora chat widget on operateai.ca';

  const intakePayload = {
    sourceId: 'website-ora',
    clientId: LEAD_ENGINE_CLIENT_ID,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    email: body.email.trim().toLowerCase(),
    customFields: business ? { business, capturedVia: 'ora' } : { capturedVia: 'ora' },
    initialMessage: {
      channel: 'email' as const,
      content: note,
    },
  };

  try {
    const res = await fetch(`${LEAD_ENGINE_URL}/api/intake`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LEAD_ENGINE_SECRET}`,
      },
      body: JSON.stringify(intakePayload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('[contact] Lead Engine intake failed:', res.status, text);
      return NextResponse.json({ success: false }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Lead Engine intake error:', err);
    return NextResponse.json({ success: false }, { status: 502 });
  }
}

function splitName(raw: string | undefined): { firstName: string; lastName: string } {
  const trimmed = (raw || '').trim();
  if (!trimmed) return { firstName: '', lastName: '' };
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}
