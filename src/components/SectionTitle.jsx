import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}) {
  const alignClass =
    align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <motion.div
      className={`mb-14 flex flex-col gap-4 sm:mb-16 ${alignClass}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeUp}
    >
      {eyebrow ? (
        <span className={`eyebrow ${light ? "text-accent-light" : "text-accent-dark"}`}>
          <span
            className={`h-px w-8 ${light ? "bg-accent-light" : "bg-accent-dark"}`}
            aria-hidden="true"
          />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={`text-3xl font-extrabold sm:text-4xl lg:text-5xl ${
          light ? "text-offwhite" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`max-w-2xl text-base sm:text-lg ${
            light ? "text-mist" : "text-steel"
          } ${align === "left" ? "" : "mx-auto"}`}
        >
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
