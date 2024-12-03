import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { env } from "@/app/data/env/server";
import {
  createUserSubscription,
  deleteUserSubscription,
} from "@/app/server/db/subscription";
import { UsersSubscriptionTable } from "@/app/drizzle/schema";

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
      const {
        id,
        email_addresses,
        first_name,
        last_name,
        created_at,
        profile_image_url,
      } = event.data;
      const userData: typeof UsersSubscriptionTable.$inferInsert = {
        id,
        name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
        email: email_addresses[0]?.email_address ?? "",
        firstName: first_name ?? null,
        lastName: last_name ?? null,
        profileImageUrl: profile_image_url ?? null,
        emailVerified: email_addresses[0]?.verification?.status === "verified",
        providers: [],
        currentTier: "Free",
        hasActiveSubscription: false,
        preferredPlatform: null,
        preferredViewType: null,
        lastConversationAt: null,
        totalConversations: 0,
        createdAt: new Date(created_at),
        updatedAt: new Date(created_at),
        lastSignInAt: new Date(created_at),
        lastIp: event.event_attributes?.http_request?.client_ip ?? null,
        userAgent: event.event_attributes?.http_request?.user_agent ?? null,
      };

      try {
        await createUserSubscription(userData);
      } catch (error) {
        console.error("Error creating user subscription:", error);
        return new Response("Error creating user subscription", {
          status: 500,
        });
      }
      break;
    }
    case "user.deleted": {
      const { id } = event.data;
      if (id) {
        await deleteUserSubscription(id);
      }
    }
  }

  return new Response("", { status: 200 });
}
