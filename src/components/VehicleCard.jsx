import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Cog, Fuel, Gauge, Settings2 } from "lucide-react";
import {
  vehicleInquiryMessage,
  vehicleMileageLabel,
  vehiclePriceLabel,
  vehicleTitle,
} from "../data/vehicles";
import { buildWhatsAppUrl } from "../data/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

export default function VehicleCard({ vehicle, index }) {
  const images = vehicle.images?.length ? vehicle.images : [vehicle.image];
  const [photoIndex, setPhotoIndex] = useState(0);

  const specs = [
    { icon: Gauge, label: vehicleMileageLabel(vehicle) },
    { icon: Settings2, label: vehicle.transmission },
    { icon: Cog, label: `${vehicle.engineCc.toLocaleString()}cc` },
    { icon: Fuel, label: vehicle.fuel },
  ];

  const changePhoto = (e, dir) => {
    e.stopPropagation();
    setPhotoIndex((i) => (i + dir + images.length) % images.length);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-sm border border-white/10 bg-charcoal/60 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={photoIndex}
            src={images[photoIndex]}
            alt={`${vehicleTitle(vehicle)}, ${vehicleMileageLabel(vehicle)}`}
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        {vehicle.badge && (
          <span className="absolute left-4 top-4 rounded-sm bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
            {vehicle.badge}
          </span>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => changePhoto(e, -1)}
              aria-label={`Previous photo of ${vehicleTitle(vehicle)}`}
              className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-offwhite opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:bg-ink/80 group-hover:opacity-100"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(e) => changePhoto(e, 1)}
              aria-label={`Next photo of ${vehicleTitle(vehicle)}`}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-offwhite opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:bg-ink/80 group-hover:opacity-100"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
            <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoIndex(i);
                  }}
                  aria-label={`Show photo ${i + 1} of ${vehicleTitle(vehicle)}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === photoIndex ? "w-4 bg-accent-light" : "w-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
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
          <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
          Enquire on WhatsApp
        </a>
      </div>
    </motion.article>
  );
}
