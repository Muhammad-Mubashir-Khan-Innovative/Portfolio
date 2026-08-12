import { motion } from "framer-motion";
import { Cog, Fuel, Gauge, MessageCircle, Settings2 } from "lucide-react";
import {
  vehicleInquiryMessage,
  vehicleMileageLabel,
  vehiclePriceLabel,
  vehicleTitle,
} from "../data/vehicles";
import { buildWhatsAppUrl } from "../data/whatsapp";

export default function VehicleCard({ vehicle, index }) {
  const specs = [
    { icon: Gauge, label: vehicleMileageLabel(vehicle) },
    { icon: Settings2, label: vehicle.transmission },
    { icon: Cog, label: `${vehicle.engineCc.toLocaleString()}cc` },
    { icon: Fuel, label: vehicle.fuel },
  ];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-sm border border-white/10 bg-charcoal/60 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={vehicle.image}
          alt={`${vehicleTitle(vehicle)}, ${vehicleMileageLabel(vehicle)}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        {vehicle.badge && (
          <span className="absolute left-4 top-4 rounded-sm bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
            {vehicle.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div>
          <h3 className="text-lg font-bold text-offwhite">{vehicleTitle(vehicle)}</h3>
          <p className="mt-1 text-sm font-semibold text-accent-light">
            {vehiclePriceLabel(vehicle)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {specs.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-xs text-mist">
              <Icon size={15} className="shrink-0 text-accent-light" aria-hidden="true" />
              <span className="truncate">{label}</span>
            </div>
          ))}
        </div>

        <a
          href={buildWhatsAppUrl(vehicleInquiryMessage(vehicle))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-offwhite transition-all duration-300 hover:border-accent-light hover:text-accent-light"
        >
          <MessageCircle size={16} aria-hidden="true" />
          Enquire on WhatsApp
        </a>
      </div>
    </motion.article>
  );
}
