"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "Luxury Apartment",
    location: "Kilimani",
    price: "KSh 45,000",
  },
  {
    title: "Bedsitter",
    location: "Nakuru CBD",
    price: "KSh 8,500",
  },
  {
    title: "Family House",
    location: "Eldoret",
    price: "KSh 30,000",
  },
];

export default function HeroCards() {
  return (
    <div className="relative hidden h-[550px] lg:block">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          animate={{
            y: [0, -18, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: index,
          }}
          className="absolute w-72 rounded-3xl border bg-background p-6 shadow-xl"
          style={{
            top: index * 130,
            right: index * 20,
          }}
        >
          <h3 className="text-lg font-bold">
            {card.title}
          </h3>

          <p className="mt-3 text-muted-foreground">
            {card.location}
          </p>

          <p className="mt-6 text-xl font-bold text-primary">
            {card.price}
          </p>
        </motion.div>
      ))}
    </div>
  );
}