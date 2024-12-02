CREATE TYPE "public"."tier" AS ENUM('Free', 'Standard', 'Premium');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "conversations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"title" varchar(255) NOT NULL,
	"platform" varchar(50) NOT NULL,
	"view_type" varchar(20) NOT NULL,
	"messages" json NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"stripe_customer_id" text NOT NULL,
	"stripe_price_id" text NOT NULL,
	"stripe_subscription_id" text NOT NULL,
	"status" varchar(50) NOT NULL,
	"tier" "tier" NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"canceled_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversations" ADD CONSTRAINT "conversations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_conversations_idx" ON "conversations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_conversations_title_idx" ON "conversations" USING btree ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "recent_conversations_idx" ON "conversations" USING btree ("updatedAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "stripe_customer_idx" ON "subscriptions" USING btree ("stripe_customer_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "plan_type_idx" ON "subscriptions" USING btree ("tier");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "active_subscriptions_idx" ON "subscriptions" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subscription_expiry_idx" ON "subscriptions" USING btree ("end_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "emailIdx" ON "users" USING btree ("email");