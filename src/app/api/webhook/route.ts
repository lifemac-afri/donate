import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest('hex');

    if (hash === req.headers.get('x-paystack-signature')) {
      const event = JSON.parse(body);

      // Handle different event types
      switch (event.event) {
        case 'charge.success':
          // Handle successful payment
          break;
        // Add other cases as needed
      }

      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }
} 