"use client";
import { useSpring, useTrail, animated } from "@react-spring/web";
import { FiMessageCircle, FiSmartphone, FiShare2 } from "react-icons/fi";
const PlaceholderIcon = () => (
  <div className="size-10 bg-primary rounded-full"></div>
);
const steps = [
  {
    icon: <FiMessageCircle className="w-10 h-10 text-primary" />,
    title: "Type Your Chat",
    description:
      "Craft your conversation with ease using our intuitive editor.",
  },
  {
    icon: <FiSmartphone className="w-10 h-10 text-primary" />,
    title: "Pick a Platform",
    description:
      "Choose from WhatsApp, Telegram, Instagram, X, Facebook, and Snap.",
  },
  {
    icon: <FiShare2 className="w-10 h-10 text-primary" />,
    title: "Export & Share",
    description: "Export as video or image and share on any social platform.",
  },
];

export default function HowItWorks() {
  const titleSpring = useSpring({
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 24 },
    delay: 100,
  });
  const descSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 24 },
    delay: 300,
  });
  const trail = useTrail(steps.length, {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 24 },
    delay: 500,
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
          How It Works
        </animated.h2>
        <animated.p
          style={{
            opacity: descSpring.opacity,
            transform: descSpring.y.to((y) => `translateY(${y}px)`),
          }}
          className="text-lg text-muted-foreground"
        >
          Create, customize, and share your chat stories in three simple steps.
        </animated.p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 max-w-4xl mx-auto">
        {trail.map((style, i) => (
          <animated.div
            key={steps[i].title}
            style={{
              opacity: style.opacity,
              transform: style.y.to((y) => `translateY(${y}px)`),
            }}
            className="bg-accent/40 rounded-2xl shadow-lg p-8 flex flex-col items-center w-72"
          >
            <div className="mb-4">{steps[i].icon}</div>
            <h3 className="text-xl font-semibold mb-2">{steps[i].title}</h3>
            <p className="text-base text-muted-foreground">
              {steps[i].description}
            </p>
          </animated.div>
        ))}
      </div>
    </section>
  );
}
