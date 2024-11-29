// import { env } from "process";

export const subscriptionTiers = {
  Free: {
    name: "Free",
    description: "For users trying out",
    price: 0,
    disclaimer: "No credit card required",
    isMostPopular: false,
    features: [
      "Unlimited messages",
      "Unlimited words",
      "Unlimited characters",
      "Unlimited images",
      "Unlimited videos",
    ],
    // stripePriceId: undefined,
  },
  Standard: {
    name: "Standard",
    description: "For creatives and storytellers creators",
    price: 5,
    disclaimer: "No commitment, cancel anytime",
    isMostPopular: true,
    features: [
      "Unlimited messages",
      "Unlimited words",
      "Unlimited characters",
      "Unlimited images",
      "Unlimited videos",
    ],
    // stripePriceId: env.STANDARD_STRIPE_PRICE_ID,
  },
} as const;

export const subTierOrder = [
  subscriptionTiers.Free,
  subscriptionTiers.Standard,
] as const;