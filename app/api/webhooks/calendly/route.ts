import { NextRequest, NextResponse } from 'next/server';

// Lead Engine Supabase connection
const SUPABASE_URL = process.env.LEAD_ENGINE_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.LEAD_ENGINE_SUPABASE_SERVICE_KEY || '';
const LEAD_ENGINE_AGENT_ID = process.env.LEAD_ENGINE_AGENT_ID || '';
const CALENDLY_WEBHOOK_TOKEN = process.env.CALENDLY_WEBHOOK_TOKEN || '';

export async function POST(request: NextRequest) {
  // Optional: verify Calendly webhook signature
  if (CALENDLY_WEBHOOK_TOKEN) {
    const token = request.headers.get('x-calendly-webhook-signing-key');
    if (token !== CALENDLY_WEBHOOK_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    const body = await request.json();
    const event = body.event;
    const payload = body.payload;

    // Only process new bookings
    if (event !== 'invitee.created') {
      return NextResponse.json({ received: true, skipped: true });
    }

    const invitee = payload?.invitee || payload;
    const name = invitee?.name || invitee?.first_name || 'Unknown';
    const email = invitee?.email?.toLowerCase()?.trim();
    const eventName = payload?.event_type?.name || payload?.scheduled_event?.name || 'Free Audit';
    const startTime = payload?.scheduled_event?.start_time || payload?.event?.start_time || null;

    if (!email) {
      return NextResponse.json({ error: 'No email in webhook payload' }, { status: 400 });
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !LEAD_ENGINE_AGENT_ID) {
      console.log('Calendly booking received but Lead Engine not configured:', { name, email, eventName });
      return NextResponse.json({ received: true, configured: false });
    }

    // Check for duplicate contact
    const dupRes = await fetch(
      `${SUPABASE_URL}/rest/v1/contacts?agent_id=eq.${LEAD_ENGINE_AGENT_ID}&email=ilike.${encodeURIComponent(email)}&select=id,pipeline_stage&limit=1`,
      {
        headers: {
          apikey: SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        },
      }
    );
    const existing = await dupRes.json();

    let contactId: string;

    if (existing && existing.length > 0) {
      // Existing contact — upgrade their pipeline stage
      contactId = existing[0].id;

      await fetch(`${SUPABASE_URL}/rest/v1/contacts?id=eq.${contactId}`, {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pipeline_stage: 'consultation_booked',
          intent_level: 'active',
          notes: `Booked "${eventName}"${startTime ? ` for ${new Date(startTime).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}` : ''}.`,
          updated_at: new Date().toISOString(),
        }),
      });
    } else {
      // Create new contact
      const contactRes = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          agent_id: LEAD_ENGINE_AGENT_ID,
          full_name: name,
          email,
          lead_type: 'unknown',
          lead_source: 'website',
          source_platform: 'calendly',
          intent_level: 'active',
          pipeline_stage: 'consultation_booked',
          funnel_stage: 'intake',
          notes: `Booked "${eventName}" via Calendly${startTime ? ` for ${new Date(startTime).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}` : ''}.`,
          tags: ['calendly', 'inbound', 'booked'],
          opt_out: false,
          custom_fields: {
            calendly_event: eventName,
            calendly_start_time: startTime,
            source_page: 'operateai.ca',
          },
        }),
      });

      const contactData = await contactRes.json();
      contactId = Array.isArray(contactData) ? contactData[0]?.id : contactData?.id;
    }

    // Create conversation with booking context
    if (contactId) {
      // Check for existing conversation
      const convoCheckRes = await fetch(
        `${SUPABASE_URL}/rest/v1/conversations?agent_id=eq.${LEAD_ENGINE_AGENT_ID}&contact_id=eq.${contactId}&select=id&limit=1`,
        {
          headers: {
            apikey: SUPABASE_SERVICE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          },
        }
      );
      const existingConvo = await convoCheckRes.json();

      let conversationId: string;

      if (existingConvo && existingConvo.length > 0) {
        conversationId = existingConvo[0].id;
      } else {
        const convoRes = await fetch(`${SUPABASE_URL}/rest/v1/conversations`, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_SERVICE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=representation',
          },
          body: JSON.stringify({
            agent_id: LEAD_ENGINE_AGENT_ID,
            contact_id: contactId,
            platform: 'calendly',
            ai_enabled: true,
            is_flagged: false,
            last_message_at: new Date().toISOString(),
          }),
        });
        const convoData = await convoRes.json();
        conversationId = Array.isArray(convoData) ? convoData[0]?.id : convoData?.id;
      }

      // Add a system message about the booking
      if (conversationId) {
        const bookingMsg = startTime
          ? `Booked a ${eventName} for ${new Date(startTime).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}.`
          : `Booked a ${eventName} via Calendly.`;

        await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_SERVICE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            conversation_id: conversationId,
            agent_id: LEAD_ENGINE_AGENT_ID,
            contact_id: contactId,
            role: 'contact',
            content: bookingMsg,
            status: 'received',
          }),
        });
      }

      // Log event
      await fetch(`${SUPABASE_URL}/rest/v1/events`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: LEAD_ENGINE_AGENT_ID,
          contact_id: contactId,
          event_type: 'calendly_booking',
          event_data: {
            event_name: eventName,
            start_time: startTime,
            invitee_email: email,
            invitee_name: name,
          },
        }),
      });
    }

    return NextResponse.json({ received: true, contact_id: contactId });
  } catch (err) {
    console.error('Calendly webhook error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}