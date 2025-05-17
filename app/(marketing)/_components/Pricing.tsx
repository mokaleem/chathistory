"use client";
import { subTierOrder } from "@/app/data/subscriptionTiers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import React from "react";
import { useSpring, animated } from "@react-spring/web";

function Pricing() {
  return (
    <section id="pricing" className="px-8 py-24 bg-accent/5">
      <h2 className="text-3xl text-center font-semibold mb-8">
        Viral Conversation Video Creation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-xl mx-auto">
        {subTierOrder.map((tier) => {
          const animatedBorder = useSpring({
            background: tier.isMostPopular
              ? "linear-gradient(90deg, red, yellow, blue, red)"
              : "transparent",
            config: { duration: 3000 },
            loop: tier.isMostPopular,
          });

          return (
            <animated.div
              key={tier.name}
              style={
                tier.isMostPopular
                  ? {
                      background: animatedBorder.background,
                      backgroundSize: "200% 200%",
                      animation: "gradient-animation 3s linear infinite",
                      borderRadius: "8px",
                      padding: "2px",
                      position: "relative",
                    }
                  : {}
              }
              className={`flex flex-col justify-between border ${
                tier.isMostPopular
                  ? "shadow-lg border-transparent"
                  : "border-muted shadow-lg"
              }`}
            >
              <Card className="h-full rounded-lg">
                <CardHeader className="text-center space-y-2">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="text-4xl font-bold">
                    ${tier.price}
                    <span className="text-base text-muted-foreground">
                      {" "}
                      /month
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {tier.disclaimer}
                  </p>
                </CardHeader>

                <CardContent className="flex flex-col gap-6">
                  <Button
                    variant={tier.isMostPopular ? "accent" : "default"}
                    size="lg"
                    className={`rounded-full w-full font-bold 
                      ${
                        tier.name === "Premium"
                          ? "bg-gradient-to-r from-red-500 to-blue-500 text-white"
                          : ""
                      }
                    `}
                  >
                    {tier.name === "Free" ? "Try Now" : "Get Started"}
                    <ArrowRightIcon className="ml-2 size-4" />
                  </Button>

                  <div className="flex flex-col gap-3 text-sm bg-accent rounded-lg p-6">
                    {tier.features.map((feature) => (
                      <Feature key={feature}>{feature}</Feature>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {tier.isMostPopular && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}
            </animated.div>
          );
        })}
      </div>
    </section>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <CheckIcon className="text-primary size-4" />
      <span>{children}</span>
    </div>
  );
}

export default Pricing;
