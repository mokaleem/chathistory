"use client";
import { useSpring, animated } from "@react-spring/web";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    q: "Is ChatHistory free to use?",
    a: "Yes! You can get started for free and upgrade anytime for more features.",
  },
  {
    q: "What platforms can I mimic?",
    a: "You can create chat stories for WhatsApp, Telegram, Signal, Messenger, Instagram, Snapchat, and X (Twitter).",
  },
  {
    q: "Can I export my chat as a video?",
    a: "Absolutely! Export your chat as a video or image and share it anywhere.",
  },
  {
    q: "Do I need to install anything?",
    a: "No downloads required. Everything works right in your browser.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, you can cancel or change your plan at any time with no commitment.",
  },
];

export default function FAQ() {
  const [open, setOpen] = React.useState<number | null>(null);
  const titleSpring = useSpring({
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 24 },
    delay: 100,
  });
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto text-center mb-12">
        <animated.h2
          style={{
            opacity: titleSpring.opacity,
            transform: titleSpring.y.to((y) => `translateY(${y}px)`),
          }}
          className="text-4xl font-bold mb-4"
        >
          Frequently Asked Questions
        </animated.h2>
      </div>
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {faqs.map((faq, i) => {
          const answerSpring = useSpring({
            opacity: open === i ? 1 : 0,
            height: open === i ? "auto" : 0,
            config: { tension: 200, friction: 24 },
          });
          return (
            <Card key={faq.q} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer select-none flex flex-row items-center justify-between"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <CardTitle className="text-lg font-semibold">{faq.q}</CardTitle>
                <span className="ml-4 text-primary text-2xl">
                  {open === i ? "-" : "+"}
                </span>
              </CardHeader>
              <animated.div style={{ ...answerSpring, overflow: "hidden" }}>
                {open === i && (
                  <CardContent className="text-muted-foreground text-base py-4">
                    {faq.a}
                  </CardContent>
                )}
              </animated.div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
