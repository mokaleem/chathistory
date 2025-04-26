"use client";
import { useSpring, useTrail, animated } from "@react-spring/web";

const testimonials = [
  {
    name: "Alex R.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "ChatHistory made my meme videos go viral! The export feature is a game changer for content creators.",
  },
  {
    name: "Priya S.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "I love how easy it is to create realistic chat stories for Instagram Reels. Super intuitive and fun!",
  },
  {
    name: "Jordan T.",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    quote:
      "The platform support is unmatched. I can mimic any chat app and share it everywhere!",
  },
];

export default function Testimonials() {
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
  const trail = useTrail(testimonials.length, {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 24 },
    delay: 500,
  });

  return (
    <section className="py-20 bg-accent/5">
      <div className="container mx-auto text-center mb-12">
        <animated.h2
          style={{
            opacity: titleSpring.opacity,
            transform: titleSpring.y.to((y) => `translateY(${y}px)`),
          }}
          className="text-4xl font-bold mb-4"
        >
          What Our Users Say
        </animated.h2>
        <animated.p
          style={{
            opacity: descSpring.opacity,
            transform: descSpring.y.to((y) => `translateY(${y}px)`),
          }}
          className="text-lg text-muted-foreground"
        >
          Join thousands of creators using ChatHistory to tell their stories.
        </animated.p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-5xl mx-auto">
        {trail.map((style, i) => (
          <animated.div
            key={testimonials[i].name}
            style={{
              opacity: style.opacity,
              transform: style.y.to((y) => `translateY(${y}px)`),
            }}
            className="bg-white dark:bg-background rounded-2xl shadow-lg p-8 flex flex-col items-center w-full md:w-96"
          >
            <img
              src={testimonials[i].avatar}
              alt={testimonials[i].name}
              className="rounded-full size-16 mb-4 border-4 border-accent"
            />
            <blockquote className="italic text-lg mb-4">
              “{testimonials[i].quote}”
            </blockquote>
            <span className="font-semibold text-primary">
              {testimonials[i].name}
            </span>
          </animated.div>
        ))}
      </div>
    </section>
  );
}
