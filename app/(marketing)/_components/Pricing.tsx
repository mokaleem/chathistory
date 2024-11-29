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

function Pricing() {
  return (
    <section id="pricing" className="px-8 py-16 bg-accent/5">
      <h2 className="text-3xl text-center text-balance font-semibold mb-8">
        Creative/Storytelling Potential
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-xl mx-auto">
        {subTierOrder.map((tier) => (
          <Card key={tier.name}>
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="text-2xl">
                  <span className="font-bold">${tier.price} </span>
                  <span className="text-sm text-slate-600">/month</span>
                  <p className="text-sm text-slate-600">{tier.disclaimer}</p>
                </div>
                <SignUpButton>
                  <Button
                    variant={tier.isMostPopular ? "accent" : "default"}
                    size="lg"
                    className="rounded-full w-40 font-bold"
                  >
                    Get started <ArrowRightIcon size="size-5" />
                  </Button>
                </SignUpButton>
                <div className="flex flex-col gap-2 bg-gray-100 p-4">
                  {tier.features.map((feature) => (
                    <Feature key={feature}>{feature}</Feature>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <CheckIcon className="size-4" />
      <span>{children}</span>
    </div>
  );
}

export default Pricing;
