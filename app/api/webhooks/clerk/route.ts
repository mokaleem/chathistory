import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { env } from "@/app/data/env/server";
import { UsersTable } from "@/app/drizzle/schema";
import { db } from "@/app/drizzle/db";

export async function POST(req: Request) {
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET);
  let event: WebhookEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  switch (event.type) {
    case "user.created": {
      console.log("User created", event.data);
      await db.insert(UsersTable).values({
        id: event.data.id,
        name: "Test User",
        email: "Test email",
      });
      break;
    }
    // case "user.deleted": {
    //   if (event.data.id != null) {
    //     const userSubscription = await getUserSubscription(event.data.id);
    //     if (userSubscription?.stripeSubscriptionId != null) {
    //       await stripe.subscriptions.cancel(
    //         userSubscription?.stripeSubscriptionId
    //       );
    //     }
    //     await deleteUser(event.data.id);
    //   }
    // }
  }

  return new Response("", { status: 200 });
}
