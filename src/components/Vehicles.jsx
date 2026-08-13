import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "./SectionTitle";
import VehicleCard from "./VehicleCard";
import { vehicles } from "../data/vehicles";

function useItemsPerView() {
  const [items, setItems] = useState(1);

  useEffect(() => {
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mqSm = window.matchMedia("(min-width: 640px)");
    const update = () => setItems(mqLg.matches ? 3 : mqSm.matches ? 2 : 1);
    update();
    mqLg.addEventListener("change", update);
    mqSm.addEventListener("change", update);
    return () => {
      mqLg.removeEventListener("change", update);
      mqSm.removeEventListener("change", update);
    };
  }, []);

  return items;
}

export default function Vehicles() {
  const itemsPerView = useItemsPerView();
  const prefersReducedMotion = useReducedMotion();
  const maxIndex = Math.max(0, vehicles.length - itemsPerView);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (prefersReducedMotion || paused || maxIndex === 0) return;
    const id = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(id);
  }, [paused, maxIndex, prefersReducedMotion]);

  const go = (dir) => {
    setIndex((i) => {
      const next = i + dir;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
  };

  return (
    <section id="cars" className="scroll-mt-20 bg-ink py-24 sm:py-32">
      <div className="section-container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle
            eyebrow="Our Inventory"
            title="Featured Vehicles"
            subtitle="A curated selection of our current inventory — carefully inspected and ready for their next owner."
            light
          />
          {maxIndex > 0 && (
            <div className="mb-2 hidden shrink-0 items-center gap-3 sm:flex">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous vehicle"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-offwhite transition-colors duration-300 hover:border-accent-light hover:text-accent-light"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next vehicle"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-offwhite transition-colors duration-300 hover:border-accent-light hover:text-accent-light"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <div
          className="relative mt-10 -mx-3 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            className="flex cursor-grab active:cursor-grabbing"
            drag={maxIndex > 0 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragEnd={(_, info) => {
              const threshold = 60;
              if (info.offset.x < -threshold) go(1);
              else if (info.offset.x > threshold) go(-1);
            }}
            animate={{ x: `-${index * (100 / itemsPerView)}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {vehicles.map((vehicle, i) => (
              <div
                key={vehicle.id}
                className="shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <VehicleCard vehicle={vehicle} index={i} />
              </div>
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-ink to-transparent sm:w-16" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-ink to-transparent sm:w-16" aria-hidden="true" />
        </div>

        {maxIndex > 0 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous vehicle"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-offwhite transition-colors duration-300 hover:border-accent-light hover:text-accent-light sm:hidden"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Vehicle slides">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-accent-light" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next vehicle"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-offwhite transition-colors duration-300 hover:border-accent-light hover:text-accent-light sm:hidden"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
