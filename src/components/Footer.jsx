import { Mail, MapPin, Phone } from "lucide-react";
import { dealer } from "../data/dealer";

// lucide-react no longer ships brand/social icons, so these are minimal
// hand-drawn placeholders kept consistent with the rest of the icon set.
function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.9h2.65l.4-3.08H13.5V8.06c0-.89.25-1.5 1.52-1.5h1.63V3.8A21.8 21.8 0 0 0 14.3 3.7c-2.35 0-3.96 1.44-3.96 4.06v2.26H7.68v3.08h2.66V21h3.16Z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.6 7.6a2.9 2.9 0 0 0-2.05-2.06C17.8 5 12 5 12 5s-5.8 0-7.55.54A2.9 2.9 0 0 0 2.4 7.6 30.6 30.6 0 0 0 1.9 12c0 1.48.16 2.96.5 4.4a2.9 2.9 0 0 0 2.05 2.06C6.2 19 12 19 12 19s5.8 0 7.55-.54a2.9 2.9 0 0 0 2.05-2.06c.34-1.44.5-2.92.5-4.4 0-1.48-.16-2.96-.5-4.4ZM10 15.2V8.8l5.4 3.2-5.4 3.2Z" />
    </svg>
  );
}

function TiktokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 5.82c-.9-.6-1.5-1.5-1.68-2.57h-3.03v13.3a2.6 2.6 0 1 1-1.87-2.5V10.6a5.86 5.86 0 0 0-.75-.05A5.85 5.85 0 1 0 15 16.4V9.36a7.55 7.55 0 0 0 4.4 1.4V7.72a4.85 4.85 0 0 1-2.8-1.9Z" />
    </svg>
  );
}

const socialLinks = [
  { icon: FacebookIcon, label: "Facebook", href: dealer.social.facebook },
  { icon: InstagramIcon, label: "Instagram", href: dealer.social.instagram },
  { icon: YoutubeIcon, label: "YouTube", href: dealer.social.youtube },
  { icon: TiktokIcon, label: "TikTok", href: dealer.social.tiktok },
];

export default function Footer() {
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
        <div className="section-container flex flex-col items-center gap-2 py-6 text-center text-xs text-mist sm:flex-row sm:justify-between sm:text-left">
          <p>© 2026 {dealer.name}. All Rights Reserved.</p>
          <p>Designed with passion for Japanese automobiles.</p>
        </div>
      </div>
    </footer>
  );
}
