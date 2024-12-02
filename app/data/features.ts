// Example feature flag configuration in code
export const PLAN_FEATURES = {
  FREE: {
    maxConversations: 5,
    platforms: ["whatsapp", "telegram"],
    exportFormats: ["pdf"],
    viewTypes: ["mobile"],
    storageLimit: "100MB",
  },
  STANDARD: {
    maxConversations: 20,
    platforms: ["whatsapp", "telegram", "facebook", "instagram"],
    exportFormats: ["pdf", "json"],
    viewTypes: ["mobile", "desktop"],
    storageLimit: "500MB",
  },
  PREMIUM: {
    maxConversations: "unlimited",
    platforms: [
      "whatsapp",
      "telegram",
      "facebook",
      "instagram",
      "x",
      "snapchat",
    ],
    exportFormats: ["pdf", "json", "html"],
    viewTypes: ["mobile", "desktop"],
    storageLimit: "2GB",
  },
};

export const hasAccess = (
  userPlan: "FREE" | "STANDARD" | "PREMIUM",
  feature: string
) => {
  return PLAN_FEATURES[userPlan][feature];
};
