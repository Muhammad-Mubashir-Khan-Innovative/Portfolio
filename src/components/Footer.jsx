import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { dealer } from "../data/dealer";
import { FacebookIcon, InstagramIcon, YoutubeIcon, TiktokIcon } from "./SocialIcons";
import { buildDeveloperMessage, buildWhatsAppUrl } from "../data/whatsapp";

const socialLinks = [
  { icon: FacebookIcon, label: "Facebook", href: dealer.social.facebook },
  { icon: InstagramIcon, label: "Instagram", href: dealer.social.instagram },
  { icon: YoutubeIcon, label: "YouTube", href: dealer.social.youtube },
  { icon: TiktokIcon, label: "TikTok", href: dealer.social.tiktok },
];

const initialDevForm = { contact: "", message: "" };

function validateDevForm(form) {
  const errors = {};
  if (!form.contact.trim()) errors.contact = "Please enter your email or phone number.";
  if (!form.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

export default function Footer() {
  const [devForm, setDevForm] = useState(initialDevForm);
  const [devErrors, setDevErrors] = useState({});

  const handleDevChange = (field) => (e) => {
    setDevForm((f) => ({ ...f, [field]: e.target.value }));
    if (devErrors[field]) setDevErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleDevSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateDevForm(devForm);
    setDevErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const message = buildDeveloperMessage(devForm);
    const whatsappUrl = buildWhatsAppUrl(message, dealer.developerWhatsapp);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setDevForm(initialDevForm);
  };

  const scrollTo = (href) => (e) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="bg-charcoal text-offwhite">
      <div className="section-container grid grid-cols-1 gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-[0.15em]">
              {dealer.name.toUpperCase()}
            </span>
            <span className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-mist">
              {dealer.tagline}
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-mist">
            Carefully selected Japanese vehicles, delivered with trust,
            transparency, and exceptional service.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-mist">
            Navigation
          </h3>
          <ul className="flex flex-col gap-3">
            {dealer.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={scrollTo(item.href)}
                  className="text-sm text-offwhite/85 transition-colors hover:text-accent-light"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-mist">
            Contact
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-offwhite/85">
            <li className="flex items-center gap-2">
              <Phone size={15} className="text-accent-light" aria-hidden="true" />
              <a href={dealer.phoneHref} className="transition-colors hover:text-accent-light">
                {dealer.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-accent-light" aria-hidden="true" />
              <a
                href={`mailto:${dealer.email}`}
                className="transition-colors hover:text-accent-light"
              >
                {dealer.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={15} className="text-accent-light" aria-hidden="true" />
              <span>{dealer.location}</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-mist">
            Follow Us
          </h3>
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-offwhite/80 transition-colors hover:border-accent-light hover:text-accent-light"
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-container py-12 sm:py-16">
          <div className="mx-auto max-w-2xl rounded-sm border border-white/10 bg-ink/40 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-offwhite">
              Want to contact the developer?
            </h3>
            <p className="mt-1 text-sm text-mist">
              Have feedback on the site itself, or want one like it? Send a
              message straight to WhatsApp.
            </p>

            <form onSubmit={handleDevSubmit} noValidate className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="dev-contact"
                  className="text-xs font-semibold uppercase tracking-wide text-mist"
                >
                  Your Email or Phone
                </label>
                <input
                  id="dev-contact"
                  type="text"
                  value={devForm.contact}
                  onChange={handleDevChange("contact")}
                  aria-invalid={Boolean(devErrors.contact)}
                  aria-describedby={devErrors.contact ? "dev-contact-error" : undefined}
                  className={`rounded-sm border bg-charcoal px-4 py-3 text-sm text-offwhite placeholder:text-steel focus:outline-none focus:ring-2 focus:ring-accent-light/60 ${
                    devErrors.contact ? "border-accent-light" : "border-white/15"
                  }`}
                  placeholder="you@example.com or 03XX XXXXXXX"
                />
                {devErrors.contact && (
                  <p id="dev-contact-error" className="text-xs text-accent-light">
                    {devErrors.contact}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="dev-message"
                  className="text-xs font-semibold uppercase tracking-wide text-mist"
                >
                  Message
                </label>
                <textarea
                  id="dev-message"
                  rows={3}
                  value={devForm.message}
                  onChange={handleDevChange("message")}
                  aria-invalid={Boolean(devErrors.message)}
                  aria-describedby={devErrors.message ? "dev-message-error" : undefined}
                  className={`resize-none rounded-sm border bg-charcoal px-4 py-3 text-sm text-offwhite placeholder:text-steel focus:outline-none focus:ring-2 focus:ring-accent-light/60 ${
                    devErrors.message ? "border-accent-light" : "border-white/15"
                  }`}
                  placeholder="Tell me what's on your mind..."
                />
                {devErrors.message && (
                  <p id="dev-message-error" className="text-xs text-accent-light">
                    {devErrors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn-primary mt-1 self-start bg-[#25D366] text-white shadow-[0_8px_30px_-8px_rgba(37,211,102,0.6)] hover:bg-[#20bd5a] hover:text-white hover:shadow-[0_8px_40px_-6px_rgba(37,211,102,0.75)]"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-container flex flex-col items-center gap-2 py-6 text-center text-xs text-mist sm:flex-row sm:justify-between sm:text-left">
          <p>© 2026 {dealer.name}. All Rights Reserved.</p>
          <p>Designed with passion for Japanese automobiles.</p>
        </div>
      </div>
    </footer>
  );
}
