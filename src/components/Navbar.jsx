import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { dealer } from "../data/dealer";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const sections = dealer.nav
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="section-container flex h-[4.5rem] items-center justify-between py-4"
        aria-label="Primary"
      >
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="group flex flex-col leading-none"
        >
          <span className="text-lg font-extrabold tracking-[0.15em] text-offwhite sm:text-xl">
            {dealer.name.toUpperCase()}
          </span>
          <span className="mt-1 text-[10px] font-medium tracking-[0.2em] text-mist uppercase sm:text-xs">
            {dealer.tagline}
          </span>
        </a>

        <ul className="hidden items-center gap-1 xl:flex">
          {dealer.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                aria-current={active === item.href ? "page" : undefined}
                className={`relative px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors duration-300 ${
                  active === item.href
                    ? "text-accent-light"
                    : "text-offwhite/80 hover:text-offwhite"
                }`}
              >
                {item.label}
                {active === item.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent-light"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className="hidden rounded-sm border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-offwhite backdrop-blur-sm transition-all duration-300 hover:border-accent-light hover:text-accent-light xl:inline-flex"
        >
          Get In Touch
        </a>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-sm border border-white/20 bg-white/5 p-2.5 text-offwhite backdrop-blur-sm xl:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-white/10 bg-ink/95 backdrop-blur-xl xl:hidden"
          >
            <ul className="section-container flex flex-col gap-1 py-4">
              {dealer.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block rounded-sm px-3 py-3 text-base font-semibold uppercase tracking-wide transition-colors ${
                      active === item.href
                        ? "text-accent-light"
                        : "text-offwhite/85 hover:text-offwhite"
                    }`}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <li className="mt-2">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="btn-primary w-full"
                >
                  Get In Touch
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
