import { db } from "@/app/drizzle/db";
import { UsersSubscriptionTable } from "@/app/drizzle/schema";

export function createUserSubscription(
  data: typeof UsersSubscriptionTable.$inferSelect
) {
  return db.insert(UsersSubscriptionTable).values(data);
}
