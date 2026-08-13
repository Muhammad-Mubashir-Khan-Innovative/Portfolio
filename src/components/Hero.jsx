import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HERO_IMAGE = "/images/hero.jpg";
const HERO_VIDEO_WEBM = "/images/hero-bg.webm";
const HERO_VIDEO_MP4 = "/images/hero-bg.mp4";
const HERO_VIDEO_POSTER = "/images/hero-bg-poster.jpg";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const onScroll = () => setOffset(window.scrollY * 0.28);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [prefersReducedMotion]);

  const scrollToContact = (e) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToAbout = (e) => {
    e.preventDefault();
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-ink"
    >
      <div
        className="absolute inset-0 h-[130%] w-full will-change-transform"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <video
          className="h-full w-full object-cover object-center"
          poster={HERO_VIDEO_POSTER}
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          preload="auto"
          fetchPriority="high"
          aria-hidden="true"
        >
          <source src={HERO_VIDEO_WEBM} type="video/webm" />
          <source src={HERO_VIDEO_MP4} type="video/mp4" />
          <img
            src={HERO_IMAGE}
            alt="A Nissan Skyline GT-R parked on a rain-slicked waterfront at night, city skyline glowing in the background"
            className="h-full w-full object-cover object-[78%_58%] sm:object-[70%_55%]"
          />
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/30 to-ink/70" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="section-container relative z-10 flex flex-col gap-6 pt-24 pb-20 sm:gap-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.span variants={item} className="eyebrow text-accent-light">
          <span className="h-px w-8 bg-accent-light" aria-hidden="true" />
          Japanese Automotive Excellence
        </motion.span>

        <motion.h1
          variants={item}
          className="max-w-4xl text-4xl font-extrabold leading-[1.08] text-offwhite sm:text-6xl lg:text-7xl"
        >
          Your Trusted Partner
          <br className="hidden sm:block" /> for Japanese Cars
        </motion.h1>

        <motion.p
          variants={item}
          className="max-w-xl text-base leading-relaxed text-mist sm:text-lg"
        >
          Premium Japanese vehicles, carefully selected and delivered with
          trust, transparency, and exceptional service.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <a href="#about" onClick={scrollToAbout} className="btn-primary">
            Explore My Journey
          </a>
          <a href="#contact" onClick={scrollToContact} className="btn-secondary">
            Contact Me
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute inset-x-0 bottom-8 z-10 mx-auto flex w-fit flex-col items-center gap-2 text-mist transition-colors hover:text-offwhite"
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.span
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.span>
      </motion.a>
    </section>
  );
}
