import { Mail, MapPin, Phone } from "lucide-react";
import { dealer } from "../data/dealer";
import { FacebookIcon, InstagramIcon, YoutubeIcon, TiktokIcon } from "./SocialIcons";

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
