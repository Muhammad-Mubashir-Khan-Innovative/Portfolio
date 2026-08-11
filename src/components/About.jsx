import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { dealer } from "../data/dealer";

const ABOUT_IMAGE = "/images/about.svg";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 bg-paper py-24 sm:py-32">
      <div className="section-container grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute -left-4 -top-4 h-24 w-24 border-l-2 border-t-2 border-accent sm:-left-6 sm:-top-6 sm:h-32 sm:w-32"
            aria-hidden="true"
          />
          <div className="group relative overflow-hidden rounded-sm shadow-[0_30px_60px_-20px_rgba(10,10,10,0.3)]">
            <img
              src={ABOUT_IMAGE}
              alt="Decorative illustration of a premium alloy wheel, symbolizing precision Japanese engineering"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          </div>
          <div
            className="absolute -bottom-4 -right-4 h-24 w-24 border-b-2 border-r-2 border-accent sm:-bottom-6 sm:-right-6 sm:h-32 sm:w-32"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-sm bg-ink px-5 py-4 text-offwhite shadow-xl sm:left-10"
          >
            <span className="text-2xl font-extrabold text-accent-light">
              {dealer.stats.experience.value}
              {dealer.stats.experience.suffix}
            </span>
            <span className="max-w-[7rem] text-xs font-medium uppercase leading-tight tracking-wide text-mist">
              Years in Japanese Automotive
            </span>
          </motion.div>
        </motion.div>

        <div className="flex flex-col gap-6 lg:pl-4">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="eyebrow text-accent"
          >
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            About Me
          </motion.span>

          <motion.h2
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl"
          >
            Putting the Customer First,
            <br className="hidden sm:block" /> Every Time
          </motion.h2>

          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-base leading-relaxed text-steel sm:text-lg"
          >
            With over {dealer.stats.experience.value} years of experience in
            the Japanese automotive industry, I have built my reputation on
            one simple principle — putting the customer first.
          </motion.p>

          <motion.p
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-base leading-relaxed text-steel sm:text-lg"
          >
            From sourcing carefully selected Japanese vehicles to helping
            customers find the right car for their needs, every transaction
            is handled with transparency, attention to detail, and personal
            care.
          </motion.p>

          <motion.div
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="mt-2 flex items-center gap-3 border-t border-charcoal/10 pt-6"
          >
            <span
              className="font-serif text-2xl italic text-accent"
              style={{ fontFamily: "var(--font-jp)" }}
            >
              — Your Trusted Car Partner
            </span>
          </motion.div>

          <motion.div
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <a
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#experience")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:text-accent"
            >
              My Journey
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
