import { dealer } from "./dealer";

export function buildWhatsAppUrl(message, number = dealer.whatsapp) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildDeveloperMessage({ contact, message }) {
  return [
    "Hi! I'm reaching out about the Zayn Khan website.",
    "",
    `Contact: ${contact}`,
    `Message: ${message}`,
  ].join("\n");
}
