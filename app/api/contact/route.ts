import { NextRequest, NextResponse } from 'next/server';

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

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // TODO: Integrate with an email service provider
    // Recommended: Resend (resend.com) — simple API, generous free tier
    //
    // Example with Resend:
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'OperateAI <hello@operateai.ca>',
    //   to: ['your@email.com'],
    //   subject: `New audit request from ${name}`,
    //   html: `<p><strong>Name:</strong> ${name}</p>
    //          <p><strong>Email:</strong> ${email}</p>
    //          <p><strong>Business:</strong> ${business || 'Not provided'}</p>
    //          <p><strong>Message:</strong> ${message}</p>`,
    // });

    console.log('Contact form submission:', { name, email, business, message });

    return NextResponse.json(
      { success: true, message: "Message received. We'll be in touch within 2 hours." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
