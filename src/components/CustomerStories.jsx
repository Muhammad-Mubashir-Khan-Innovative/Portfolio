import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { testimonials } from "../data/dealer";

export default function CustomerStories() {
  return (
    <section id="stories" className="scroll-mt-20 bg-paper py-24 sm:py-32">
      <div className="section-container">
        <SectionTitle
          eyebrow="Testimonials"
          title="Customer Stories"
          subtitle="Real experiences from customers who trusted us with their next vehicle."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.figure
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="relative flex flex-col gap-6 rounded-sm border border-charcoal/10 bg-ink p-8 shadow-[0_20px_50px_-25px_rgba(10,10,10,0.5)] sm:p-10"
            >
              <Quote
                className="absolute right-8 top-8 text-accent/20"
                size={48}
                strokeWidth={1.5}
                aria-hidden="true"
              />

              <div
                className="flex gap-1 text-accent-light"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: testimonial.rating }).map((_, idx) => (
                  <Star key={idx} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>

              <blockquote className="relative z-10 text-base leading-relaxed text-offwhite/90 sm:text-lg">
                "{testimonial.quote}"
              </blockquote>

              <figcaption className="mt-2 flex items-center gap-4 border-t border-white/10 pt-6">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent-light"
                  aria-hidden="true"
                >
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-offwhite">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-mist">{testimonial.location}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
