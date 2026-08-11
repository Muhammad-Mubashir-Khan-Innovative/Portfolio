import { motion } from "framer-motion";
import { BadgeCheck, Handshake, Sparkles, Users } from "lucide-react";
import SectionTitle from "./SectionTitle";

const features = [
  {
    icon: BadgeCheck,
    title: "Carefully Selected",
    description:
      "Every vehicle is selected with attention to quality, condition, and value.",
  },
  {
    icon: Handshake,
    title: "Transparent Deals",
    description: "Clear communication and straightforward transactions.",
  },
  {
    icon: Sparkles,
    title: "Japanese Quality",
    description:
      "A passion for Japanese engineering, reliability, and automotive excellence.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Long-term relationships matter more than one-time sales.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 bg-ink py-24 sm:py-32">
      <div className="section-container">
        <SectionTitle
          eyebrow="Our Philosophy"
          title="A Journey Built on Trust"
          subtitle="Every relationship begins with honesty. Here's what guides how we do business, every single day."
          light
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col gap-5 rounded-sm border border-white/10 bg-charcoal/60 p-8 transition-colors duration-300 hover:border-accent/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-accent-light transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-offwhite">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-mist">
                  {feature.description}
                </p>
                <span
                  className="absolute bottom-0 left-8 h-0.5 w-0 bg-accent transition-all duration-500 group-hover:w-10"
                  aria-hidden="true"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
