import { dealer } from "./dealer";

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${dealer.whatsapp}?text=${encodeURIComponent(message)}`;
}
