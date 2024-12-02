import {
  boolean,
  index,
  integer,
  json,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { TierEnum } from "../data/subscriptionTiers";

export const UsersSubscriptionTable = pgTable(
  "users",
  {
    id: text("id").primaryKey(), // Clerk user ID
    name: text("name").notNull(),
    email: text("email").notNull(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    profileImageUrl: text("profile_image_url"),

    // Authentication related fields
    emailVerified: boolean("email_verified").default(false),
    providers: jsonb("providers").default([]).$type<string[]>(),

    // Subscription-related fields
    currentTier: TierEnum("current_tier").default("Free").notNull(),
    hasActiveSubscription: boolean("has_active_subscription").default(false),

    // Preferences
    preferredPlatform: varchar("preferred_platform", { length: 50 }),
    preferredViewType: varchar("preferred_view_type", { length: 20 }),

    // Usage tracking
    lastConversationAt: timestamp("last_conversation_at", { mode: "date" }),
    totalConversations: integer("total_conversations").default(0),

    // Timestamps and metadata
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
    lastSignInAt: timestamp("last_sign_in_at", { mode: "date" }),

    // Security
    lastIp: text("last_ip"),
    userAgent: text("user_agent"),
  },
  (users) => [
    index("email_idx").on(users.email),
    index("name_idx").on(users.name),
    index("tier_idx").on(users.currentTier),
    index("last_conversation_idx").on(users.lastConversationAt),
  ]
);

export const ConversationsTable = pgTable(
  "conversations",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").references(() => UsersSubscriptionTable.id),
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

export const SubscriptionsTable = pgTable(
  "subscriptions",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => UsersSubscriptionTable.id),
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
