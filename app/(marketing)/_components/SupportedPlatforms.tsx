"use client";
import { useSpring, useTrail, animated } from "@react-spring/web";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaFacebookMessenger,
  FaInstagram,
  FaSnapchatGhost,
  FaTwitter,
} from "react-icons/fa";
import { SiSignal } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";

const platforms = [
  {
    name: "WhatsApp",
    icon: <FaWhatsapp className="w-12 h-12 text-green-500" />,
  },
  {
    name: "Telegram",
    icon: <FaTelegramPlane className="w-12 h-12 text-blue-400" />,
  },
  { name: "Signal", icon: <SiSignal className="w-12 h-12 text-blue-600" /> },
  {
    name: "Messenger",
    icon: <FaFacebookMessenger className="w-12 h-12 text-blue-500" />,
  },
  {
    name: "Instagram",
    icon: <FaInstagram className="w-12 h-12 text-pink-500" />,
  },
  {
    name: "Snapchat",
    icon: <FaSnapchatGhost className="w-12 h-12 text-yellow-400" />,
  },
  {
    name: "X (Twitter)",
    icon: <BsTwitterX className="w-12 h-12 text-black" />,
  },
];

export default function SupportedPlatforms() {
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
  const trail = useTrail(platforms.length, {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    config: { tension: 200, friction: 24 },
    delay: 500,
  });

  return (
    <section className="py-20 bg-accent/10">
      <div className="container mx-auto text-center mb-12">
        <animated.h2
          style={{
            opacity: titleSpring.opacity,
            transform: titleSpring.y.to((y) => `translateY(${y}px)`),
          }}
          className="text-4xl font-bold mb-4"
        >
          Supported Platforms
        </animated.h2>
        <animated.p
          style={{
            opacity: descSpring.opacity,
            transform: descSpring.y.to((y) => `translateY(${y}px)`),
          }}
          className="text-lg text-muted-foreground"
        >
          Mimic the look and feel of all your favorite chat and social apps.
        </animated.p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-8 max-w-4xl mx-auto items-center justify-center">
        {trail.map((style, i) => (
          <animated.div
            key={platforms[i].name}
            style={{
              opacity: style.opacity,
              transform: style.scale.to((s) => `scale(${s})`),
            }}
            className="flex flex-col items-center gap-2"
          >
            {platforms[i].icon}
            <span className="text-sm font-medium mt-2">
              {platforms[i].name}
            </span>
          </animated.div>
        ))}
      </div>
    </section>
  );
}
