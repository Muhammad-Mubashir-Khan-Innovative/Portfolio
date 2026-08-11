import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "../data/whatsapp";

const DEFAULT_MESSAGE =
  "Hello Kaze Motors, I would like to enquire about a vehicle.";

export default function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppUrl(DEFAULT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-5 z-40 flex items-center gap-3 sm:bottom-8 sm:right-8"
    >
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap rounded-sm bg-ink px-0 py-2.5 text-sm font-semibold text-offwhite opacity-0 shadow-lg transition-all duration-300 group-hover:max-w-xs group-hover:px-4 group-hover:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inset-0 -z-10 animate-pulse-slow rounded-full bg-[#25D366]/50" aria-hidden="true" />
        <MessageCircle size={26} fill="currentColor" strokeWidth={0} aria-hidden="true" />
      </span>
    </a>
  );
}
