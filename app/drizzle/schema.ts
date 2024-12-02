import {
  boolean,
  index,
  json,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { subscriptionTiers, TierName } from "../data/subscriptionTiers";

export const UsersTable = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  },
  (users) => [index("emailIdx").on(users.email)]
);

export const ConversationsTable = pgTable(
  "conversations",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").references(() => UsersTable.id),
    title: varchar("title", { length: 255 }).notNull(),
    platform: varchar("platform", { length: 50 }).notNull(), // WhatsApp, Telegram, etc.
    viewType: varchar("view_type", { length: 20 }).notNull(), // mobile or desktop
    messages: json("messages").notNull(), // Store chat messages as JSON
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  },
  (conversations) => [
    index("user_conversations_idx").on(conversations.userId),
    index("user_conversations_title_idx").on(conversations.title),
    index("recent_conversations_idx").on(conversations.updatedAt),
  ]
);

export const TierEnum = pgEnum(
  "tier",
  Object.keys(subscriptionTiers) as [TierName]
);

export const SubscriptionsTable = pgTable(
  "subscriptions",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => UsersTable.id),
    stripeCustomerId: text("stripe_customer_id").notNull(),
    stripePriceId: text("stripe_price_id").notNull(),
    stripeSubscriptionId: text("stripe_subscription_id").notNull(),
    status: varchar("status", { length: 50 }).notNull(),
    planType: TierEnum("tier").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    startDate: timestamp("start_date", { mode: "date" }).notNull(),
    endDate: timestamp("end_date", { mode: "date" }).notNull(),
    canceledAt: timestamp("canceled_at", { mode: "date" }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (subscriptions) => [
    index("stripe_customer_idx").on(subscriptions.stripeCustomerId),
    index("plan_type_idx").on(subscriptions.planType),
    index("active_subscriptions_idx").on(subscriptions.isActive),
    index("subscription_expiry_idx").on(subscriptions.endDate),
  ]
);
