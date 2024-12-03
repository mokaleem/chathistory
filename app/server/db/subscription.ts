import { db } from "@/app/drizzle/db";
import { UsersSubscriptionTable } from "@/app/drizzle/schema";
import { eq } from "drizzle-orm";

export function createUserSubscription(
  data: typeof UsersSubscriptionTable.$inferSelect
) {
  return db.insert(UsersSubscriptionTable).values(data).onConflictDoNothing({
    target: UsersSubscriptionTable.id,
  });
}

/**
 * TODO: Handle deletion on other tables
 * messages
 * strip subscription
 */
export function deleteUserSubscription(userId: string) {
  db.delete(UsersSubscriptionTable).where(
    eq(UsersSubscriptionTable.id, userId)
  );
}
