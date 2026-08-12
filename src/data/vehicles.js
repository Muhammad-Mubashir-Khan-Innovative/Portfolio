// Featured inventory shown in the Vehicles section.
// Add, remove, or edit cars here — each one renders as a card automatically.
// Set `price` to a number/string to show it, or leave it null to show
// "Contact for Price".
export const vehicles = [
  {
    id: "ford-raptor-2026",
    make: "Ford",
    model: "Raptor",
    trim: "Double Cab 3.0",
    year: 2026,
    mileageKm: 0,
    isNew: true,
    engineCc: 3000,
    transmission: "Automatic",
    fuel: "Petrol",
    price: null,
    image: "/images/cars/car-1.jpg",
    badge: "Brand New",
  },
  {
    id: "toyota-hilux-2018",
    make: "Toyota",
    model: "Hilux",
    trim: "Double Cab 2.4",
    year: 2018,
    mileageKm: 67500,
    engineCc: 2400,
    transmission: "Automatic",
    fuel: "Diesel",
    price: null,
    image: "/images/cars/car-2.jpg",
  },
  {
    id: "toyota-hiace-2002",
    make: "Toyota",
    model: "Hiace",
    trim: "Van 2.0",
    year: 2002,
    mileageKm: 386800,
    engineCc: 2000,
    transmission: "Automatic",
    fuel: "Petrol",
    price: null,
    image: "/images/cars/car-3.jpg",
  },
  {
    id: "toyota-coaster-2008",
    make: "Toyota",
    model: "Coaster",
    trim: "Mini Bus 4.0",
    year: 2008,
    mileageKm: 315700,
    engineCc: 4000,
    transmission: "Automatic",
    fuel: "Diesel",
    price: null,
    image: "/images/cars/car-4.jpg",
  },
  {
    id: "lexus-nx300-2019",
    make: "Lexus",
    model: "NX300",
    trim: null,
    year: 2019,
    mileageKm: 70000,
    engineCc: 1990,
    transmission: "Automatic",
    fuel: "Petrol",
    price: null,
    image: "/images/cars/car-5.jpg",
  },
  {
    id: "mercedes-gla250-2015",
    make: "Mercedes-Benz",
    model: "GLA250",
    trim: null,
    year: 2015,
    mileageKm: 108000,
    engineCc: 1990,
    transmission: "Automatic",
    fuel: "Petrol",
    price: null,
    image: "/images/cars/car-6.jpg",
  },
];

export function vehicleTitle(vehicle) {
  return [vehicle.year, vehicle.make, vehicle.model, vehicle.trim]
    .filter(Boolean)
    .join(" ");
}

export function vehicleMileageLabel(vehicle) {
  if (vehicle.isNew || vehicle.mileageKm === 0) return "Brand New";
  return `${vehicle.mileageKm.toLocaleString()} km`;
}

export function vehiclePriceLabel(vehicle) {
  if (!vehicle.price) return "Contact for Price";
  return typeof vehicle.price === "number"
    ? `PKR ${vehicle.price.toLocaleString()}`
    : vehicle.price;
}

export function vehicleInquiryMessage(vehicle) {
  return `Hello Zayn Khan, I'm interested in the ${vehicleTitle(vehicle)}. Is it still available?`;
}
