import { dealer } from "./dealer";

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${dealer.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildContactMessage({ name, phone, email, vehicle, message }) {
  const lines = [
    "Hello Zayn Khan,",
    "I would like to enquire about a vehicle.",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
  ];

  if (email) lines.push(`Email: ${email}`);
  if (vehicle) lines.push(`Vehicle Interested In: ${vehicle}`);

  lines.push(`Message: ${message}`, "", "Thank you.");

  return lines.join("\n");
}
