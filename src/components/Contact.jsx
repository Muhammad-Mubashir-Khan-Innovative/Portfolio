import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { dealer } from "../data/dealer";
import { buildContactMessage, buildWhatsAppUrl } from "../data/whatsapp";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  vehicle: "",
  message: "",
};

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!form.phone.trim()) errors.phone = "Please enter your phone number.";
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

const contactDetails = [
  { icon: Phone, label: "Phone", value: dealer.phone, href: dealer.phoneHref },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: dealer.phone,
    href: buildWhatsAppUrl("Hello Kaze Motors, I would like to enquire about a vehicle."),
  },
  { icon: Mail, label: "Email", value: dealer.email, href: `mailto:${dealer.email}` },
  { icon: MapPin, label: "Location", value: dealer.location, href: null },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const message = buildContactMessage(form);
    const whatsappUrl = buildWhatsAppUrl(message);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-paper py-24 sm:py-32">
      <div className="section-container">
        <SectionTitle
          eyebrow="Get In Touch"
          title="Let's Find Your Next Japanese Car"
          subtitle="Have a question or looking for a specific vehicle? Send me a message and I'll get back to you."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8 lg:col-span-2"
          >
            <div className="rounded-sm border border-charcoal/10 bg-ink p-8 text-offwhite">
              <h3 className="text-xl font-extrabold tracking-wide">
                {dealer.name.toUpperCase()}
              </h3>
              <p className="mt-1 text-sm text-mist">{dealer.tagline}</p>

              <ul className="mt-8 flex flex-col gap-6">
                {contactDetails.map((detail) => {
                  const Icon = detail.icon;
                  const content = (
                    <>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-accent-light">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-wide text-mist">
                          {detail.label}
                        </span>
                        <span className="block text-sm font-medium text-offwhite">
                          {detail.value}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={detail.label} className="flex items-center gap-4">
                      {detail.href ? (
                        <a
                          href={detail.href}
                          target={detail.href.startsWith("http") ? "_blank" : undefined}
                          rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-4 transition-colors hover:text-accent-light"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-6 rounded-sm border border-charcoal/10 bg-ink/5 p-6 sm:p-10 lg:col-span-3"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wide text-steel">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={handleChange("name")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className={`rounded-sm border bg-white px-4 py-3 text-sm text-ink placeholder:text-steel/60 focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                    errors.name ? "border-accent" : "border-charcoal/15"
                  }`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p id="contact-name-error" className="text-xs text-accent">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-phone" className="text-xs font-semibold uppercase tracking-wide text-steel">
                  Phone
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                  className={`rounded-sm border bg-white px-4 py-3 text-sm text-ink placeholder:text-steel/60 focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                    errors.phone ? "border-accent" : "border-charcoal/15"
                  }`}
                  placeholder="03XX XXXXXXX"
                />
                {errors.phone && (
                  <p id="contact-phone-error" className="text-xs text-accent">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wide text-steel">
                  Email <span className="normal-case text-steel/70">(optional)</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={`rounded-sm border bg-white px-4 py-3 text-sm text-ink placeholder:text-steel/60 focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                    errors.email ? "border-accent" : "border-charcoal/15"
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p id="contact-email-error" className="text-xs text-accent">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-vehicle" className="text-xs font-semibold uppercase tracking-wide text-steel">
                  Car You're Interested In
                </label>
                <input
                  id="contact-vehicle"
                  type="text"
                  value={form.vehicle}
                  onChange={handleChange("vehicle")}
                  className="rounded-sm border border-charcoal/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-steel/60 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="e.g. Toyota Land Cruiser"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wide text-steel">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={form.message}
                onChange={handleChange("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={`resize-none rounded-sm border bg-white px-4 py-3 text-sm text-ink placeholder:text-steel/60 focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                  errors.message ? "border-accent" : "border-charcoal/15"
                }`}
                placeholder="I would like to know the price and availability."
              />
              {errors.message && (
                <p id="contact-message-error" className="text-xs text-accent">
                  {errors.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn-primary mt-2 bg-[#25D366] shadow-[0_8px_30px_-8px_rgba(37,211,102,0.6)] hover:bg-[#20bd5a] hover:shadow-[0_8px_40px_-6px_rgba(37,211,102,0.75)]">
              <MessageCircle size={18} aria-hidden="true" />
              Send Message on WhatsApp
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
