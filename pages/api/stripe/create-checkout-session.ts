import {NextApiRequest, NextApiResponse} from 'next';
import {stripe} from '@/lib/stripe';
import {env} from '@/env';
import {getAuth} from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = getAuth(req);
  if (!auth.userId) {
    res.status(401).send('Unauthorized');
    return;
  }

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'required',
    mode: 'subscription',
    subscription_data: {
      metadata: {
        userId: auth.userId,
      }
    },
    line_items: [
      {
        price: env.STRIPE_PRICE_PRO_PLAN,
        quantity: 1,
      }
    ],
    success_url: `${env.NEXT_PUBLIC_DOMAIN}/app`,
    cancel_url: `${env.NEXT_PUBLIC_DOMAIN}`,
  });
  res.redirect(303, session.url ?? env.NEXT_PUBLIC_DOMAIN);
}
