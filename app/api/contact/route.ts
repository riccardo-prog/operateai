import { NextRequest, NextResponse } from 'next/server';

// Lead Engine Supabase connection (uses service key for server-side writes)
const SUPABASE_URL = process.env.LEAD_ENGINE_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.LEAD_ENGINE_SUPABASE_SERVICE_KEY || '';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'riccardo@operateaihq.com';

// The agent_id in Lead Engine that owns these inbound leads
const LEAD_ENGINE_AGENT_ID = process.env.LEAD_ENGINE_AGENT_ID || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, business, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // ─── Create lead in Lead Engine ────────────────────────────
    let contactId: string | null = null;

    if (SUPABASE_URL && SUPABASE_SERVICE_KEY && LEAD_ENGINE_AGENT_ID) {
      try {
        // Check for duplicate by email
        const dupRes = await fetch(
          `${SUPABASE_URL}/rest/v1/contacts?agent_id=eq.${LEAD_ENGINE_AGENT_ID}&email=ilike.${encodeURIComponent(email)}&select=id&limit=1`,
          {
            headers: {
              apikey: SUPABASE_SERVICE_KEY,
              Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
            },
          }
        );
        const existing = await dupRes.json();

        if (existing && existing.length > 0) {
          // Existing contact — just add a new message to their conversation
          contactId = existing[0].id;
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
              email: email.toLowerCase().trim(),
              lead_type: 'unknown',
              lead_source: 'website',
              source_platform: 'website',
              intent_level: 'curious',
              pipeline_stage: 'new_lead',
              funnel_stage: 'intake',
              notes: `Website form submission.\nBusiness: ${business || 'Not provided'}\nMessage: ${message}`,
              tags: ['website', 'inbound'],
              opt_out: false,
              custom_fields: {
                business_name: business || null,
                source_page: 'operateai.ca',
                form_message: message,
              },
            }),
          });

          const contactData = await contactRes.json();
          contactId = Array.isArray(contactData) ? contactData[0]?.id : contactData?.id;
        }

        // Create conversation + initial message
        if (contactId) {
          // Create or find conversation
          const convoCheckRes = await fetch(
            `${SUPABASE_URL}/rest/v1/conversations?agent_id=eq.${LEAD_ENGINE_AGENT_ID}&contact_id=eq.${contactId}&platform=eq.website&select=id&limit=1`,
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
                platform: 'website',
                ai_enabled: true,
                is_flagged: false,
                last_message_at: new Date().toISOString(),
              }),
            });
            const convoData = await convoRes.json();
            conversationId = Array.isArray(convoData) ? convoData[0]?.id : convoData?.id;
          }

          // Insert the lead's message
          if (conversationId) {
            const msgParts = [];
            if (business) msgParts.push(`Business: ${business}`);
            msgParts.push(message);

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
                content: msgParts.join('\n\n'),
                status: 'received',
              }),
            });

            // Update conversation timestamp
            await fetch(`${SUPABASE_URL}/rest/v1/conversations?id=eq.${conversationId}`, {
              method: 'PATCH',
              headers: {
                apikey: SUPABASE_SERVICE_KEY,
                Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                last_message_at: new Date().toISOString(),
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
              event_type: 'website_form_submission',
              event_data: {
                source: 'operateai.ca',
                business: business || null,
                has_message: !!message,
              },
            }),
          });
        }
      } catch (err) {
        // Log but don't fail the form submission
        console.error('Lead Engine integration error:', err);
      }
    }

    // ─── Send notification email via Resend ───────────────────
    if (RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'OperateAI <hello@operateaihq.com>',
            to: [NOTIFICATION_EMAIL],
            subject: `New lead from operateai.ca: ${name}`,
            html: `
              <div style="font-family:system-ui,sans-serif;max-width:500px;">
                <h2 style="color:#333;margin-bottom:16px;">New Website Lead</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Business:</strong> ${business || 'Not provided'}</p>
                <p><strong>Message:</strong></p>
                <p style="background:#f5f5f5;padding:12px;border-radius:8px;">${message}</p>
                ${contactId ? `<p style="margin-top:16px;"><a href="${process.env.LEAD_ENGINE_URL || 'https://lead-engine.vercel.app'}/contacts/${contactId}" style="color:#38BDF8;">View in Lead Engine →</a></p>` : ''}
              </div>
            `.trim(),
          }),
        });
      } catch (err) {
        console.error('Notification email error:', err);
      }
    }

    return NextResponse.json(
      { success: true, message: "Message received. We'll be in touch shortly." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}