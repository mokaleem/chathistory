"use client";
import { useSpring, useTrail, animated } from "@react-spring/web";
import { FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";

const platforms = [
  {
    name: "YouTube Shorts",
    icon: <FaYoutube className="w-10 h-10 text-red-500" />,
  },
  { name: "TikTok", icon: <FaTiktok className="w-10 h-10 text-black" /> },
  {
    name: "Instagram Reels",
    icon: <FaInstagram className="w-10 h-10 text-pink-500" />,
  },
];

export default function ExportShare() {
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
          Export & Share Anywhere
        </animated.h2>
        <animated.p
          style={{
            opacity: descSpring.opacity,
            transform: descSpring.y.to((y) => `translateY(${y}px)`),
          }}
          className="text-lg text-muted-foreground"
        >
          Download your chat as a video or image and share it instantly on your
          favorite platforms.
        </animated.p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 max-w-3xl mx-auto">
        {trail.map((style, i) => (
          <animated.div
            key={platforms[i].name}
            style={{
              opacity: style.opacity,
              transform: style.y.to((y) => `translateY(${y}px)`),
            }}
            className="bg-accent/40 rounded-2xl shadow-lg p-8 flex flex-col items-center w-64"
          >
            <div className="mb-4">{platforms[i].icon}</div>
            <h3 className="text-xl font-semibold mb-2">{platforms[i].name}</h3>
            <p className="text-base text-muted-foreground">
              Perfect for viral content and storytelling.
            </p>
          </animated.div>
        ))}
      </div>
    </section>
  );
}
