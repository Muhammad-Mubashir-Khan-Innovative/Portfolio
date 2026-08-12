import SectionTitle from "./SectionTitle";
import VehicleCard from "./VehicleCard";
import { vehicles } from "../data/vehicles";

export default function Vehicles() {
  return (
    <section id="cars" className="scroll-mt-20 bg-ink py-24 sm:py-32">
      <div className="section-container">
        <SectionTitle
          eyebrow="Our Inventory"
          title="Featured Vehicles"
          subtitle="A curated selection of our current inventory — carefully inspected and ready for their next owner."
          light
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle, i) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
