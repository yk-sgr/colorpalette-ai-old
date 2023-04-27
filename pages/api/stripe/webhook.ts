import {NextApiRequest, NextApiResponse} from "next";
import {stripe} from '@/lib/stripe';
import {env} from '@/env';
import {buffer} from 'micro';
import {prisma} from '@/server/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return
  }
  const sig = req.headers["stripe-signature"] as string;
  const buf = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, env.STRIPE_ENDPOINT_SECRET);
  } catch (err) {
    console.error(err)
    res.status(400).send(`Webhook Error: ${err.message}`);
    return
  }

  switch (event.type) {
    case 'customer.subscription.created':
      const customerSubscriptionCreated = event.data.object;
      await prisma.user.update({
        where: {
          id: customerSubscriptionCreated.metadata.userId,
        },
        data: {
          plan: env.STRIPE_PRICE_PRO_PLAN === customerSubscriptionCreated.plan.id ? 'PRO' : 'NONE',
        }
      });
      break;
    case 'customer.subscription.deleted':
      const customerSubscriptionDeleted = event.data.object;
      await prisma.user.update({
        where: {
          id: customerSubscriptionDeleted.metadata.userId,
        },
        data: {
          plan: env.STRIPE_PRICE_PRO_PLAN === customerSubscriptionDeleted.plan.id ? 'PRO' : 'NONE',
        }
      });
      break;
    case 'customer.subscription.updated':
      const customerSubscriptionUpdated = event.data.object;
      await prisma.user.update({
        where: {
          id: customerSubscriptionUpdated.metadata.userId,
        },
        data: {
          plan: env.STRIPE_PRICE_PRO_PLAN === customerSubscriptionUpdated.plan.id ? 'PRO' : 'NONE',
        }
      });
      break;
  }

  res.status(200).send({});
}
