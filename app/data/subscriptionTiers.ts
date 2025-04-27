import { pgEnum } from "drizzle-orm/pg-core";

// export type TierName = keyof typeof subscriptionTiers;

export const TierEnum = pgEnum("tier", [
  "Free",
  "Standard",
  "Premium",
] as const);

export const subscriptionTiers = {
  Free: {
    name: "Free",
    description: "For users trying out",
    price: 0,
    disclaimer: "No credit card required",
    isMostPopular: false,
    features: [
      "10 mins/wk of AI generation",
      "10 GB storage",
      "4 exports/wk with logo",
      "2.5M+ standard media",
    ],
    // stripePriceId: undefined,
  },
  Standard: {
    name: "Standard",
    description: "For creatives and storytellers creators",
    price: 5.99,
    disclaimer: "Unlimited Story Creation",
    isMostPopular: false,
    features: [
      "50 mins/mo of AI generation",
      "80/mo iStock assets",
      "60 sec Generative credits",
      "100 GB storage",
      "Unlimited exports",
      "2 voice clones",
    ],
    // stripePriceId: env.STANDARD_STRIPE_PRICE_ID,
  },
  Premium: {
    name: "Premium",
    description: "",
    price: 9.99,
    disclaimer: "Unlimited AI-powered Story Creation",
    isMostPopular: true,
    features: [
      "200 mins/mo of AI generation",
      "320/mo iStock assets",
      "15 min Generative credits",
      "400 GB storage",
      "Unlimited exports",
      "5 voice clones",
    ],
    // stripePriceId: env.STANDARD_STRIPE_PRICE_ID,
  },
} as const;

export const subTierOrder = [
  subscriptionTiers.Free,
  subscriptionTiers.Standard,
  subscriptionTiers.Premium,
] as const;
