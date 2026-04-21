import { streamText, tool, UIMessage, convertToModelMessages } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';
import { ORA_SYSTEM_PROMPT } from '@/lib/ora-system-prompt';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const capturedEmails = new Set<string>();
    for (const msg of messages) {
      if (msg.role === 'assistant' && msg.parts) {
        for (const part of msg.parts) {
          if (
            'toolName' in part &&
            part.toolName === 'capture_lead' &&
            'output' in part
          ) {
            const output = part.output as Record<string, unknown> | undefined;
            if (output?.email) {
              capturedEmails.add((output.email as string).toLowerCase());
            }
          }
        }
      }
    }

    const result = streamText({
      model: anthropic('claude-haiku-4-5-20251001'),
      system: ORA_SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      tools: {
        capture_lead: tool({
          description:
            'Capture a lead\'s contact information when they provide their name and email. Call this when a visitor shares their contact details.',
          inputSchema: z.object({
            name: z.string().describe('The visitor\'s name'),
            email: z.string().describe('The visitor\'s email address'),
            business: z
              .string()
              .optional()
              .describe('The visitor\'s business name, if provided'),
          }),
          execute: async ({ name, email, business }) => {
            if (!email || !EMAIL_REGEX.test(email)) {
              console.warn('[Ora] Invalid email from AI:', { name, email, business });
              return {
                success: false,
                reason: 'invalid_email',
                message: 'The email address doesn\'t look right. Could you double-check it?',
              };
            }

            if (!name || name.trim().length < 2) {
              console.warn('[Ora] Invalid name from AI:', { name, email, business });
              return {
                success: false,
                reason: 'invalid_name',
                message: 'I didn\'t catch the name clearly. Could you confirm?',
              };
            }

            const normalizedEmail = email.toLowerCase().trim();

            if (capturedEmails.has(normalizedEmail)) {
              console.log('[Ora] Duplicate email skipped:', normalizedEmail);
              return {
                success: true,
                reason: 'already_captured',
                message: 'Already got your details — the team will be in touch!',
              };
            }

            console.log('[Ora] capture_lead called:', {
              ai_intended: { name, email, business },
              validated: { name: name.trim(), email: normalizedEmail, business: business?.trim() || null },
            });

            try {
              const contactRes = await fetch(
                new URL('/api/contact', req.url).toString(),
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    name: name.trim(),
                    email: normalizedEmail,
                    business: business?.trim() || '',
                    message: 'Lead captured via Ora chat widget on operateai.ca',
                  }),
                }
              );

              if (!contactRes.ok) {
                console.error('[Ora] /api/contact failed:', contactRes.status);
                return {
                  success: false,
                  reason: 'server_error',
                  message: 'Got it — I\'ll make sure the team follows up with you.',
                };
              }

              capturedEmails.add(normalizedEmail);

              return {
                success: true,
                reason: 'captured',
                message: `Thanks ${name.trim()}! The team will reach out to ${normalizedEmail} shortly.`,
              };
            } catch (err) {
              console.error('[Ora] capture_lead error:', err);
              return {
                success: false,
                reason: 'server_error',
                message: 'Got it — I\'ll make sure the team follows up with you.',
              };
            }
          },
        }),
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('[Ora] Chat route error:', error);
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
