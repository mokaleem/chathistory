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
	"first_name" text,
	"last_name" text,
	"profile_image_url" text,
	"email_verified" boolean DEFAULT false,
	"providers" jsonb DEFAULT '[]'::jsonb,
	"current_tier" "tier" DEFAULT 'Free' NOT NULL,
	"has_active_subscription" boolean DEFAULT false,
	"preferred_platform" varchar(50),
	"preferred_view_type" varchar(20),
	"last_conversation_at" timestamp,
	"total_conversations" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"last_sign_in_at" timestamp,
	"last_ip" text,
	"user_agent" text
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
CREATE INDEX IF NOT EXISTS "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "users" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tier_idx" ON "users" USING btree ("current_tier");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "last_conversation_idx" ON "users" USING btree ("last_conversation_at");