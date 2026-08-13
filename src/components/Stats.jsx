import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { dealer } from "../data/dealer";

function Counter({ value, suffix, duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });

    return () => controls.stop();
  }, [inView, value, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const stats = Object.values(dealer.stats);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-paper to-paper py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-dark/40 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#0d1b2a 1px, transparent 1px), linear-gradient(90deg, #0d1b2a 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-accent/15 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-steel/20 blur-[130px]"
        aria-hidden="true"
      />

      <div className="section-container relative grid grid-cols-1 gap-10 divide-y divide-charcoal/10 sm:grid-cols-3 sm:gap-6 sm:divide-x sm:divide-y-0">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3 pt-8 text-center first:pt-0 sm:pt-0"
          >
            <span className="text-5xl font-extrabold text-ink drop-shadow-[0_2px_20px_rgba(212,175,55,0.1)] sm:text-6xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="h-px w-10 bg-accent-dark/40" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-steel sm:text-sm">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
