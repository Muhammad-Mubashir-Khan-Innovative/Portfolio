// Centralized dealer configuration.
// Update these values to rebrand the site without touching component code.
export const dealer = {
  name: "Zayn Khan",
  shortName: "Zayn",
  tagline: "Japanese Automotive Excellence",
  taglineJp: "風",

  // Update to the real production domain before launch — used for
  // canonical/OG tags and public/sitemap.xml.
  siteUrl: "https://zaynkhan.example.com",

  phone: "0307 0456622",
  phoneHref: "tel:+923070456622",
  whatsapp: "923070456622",
  email: "info@zaynkhan.com",
  location: "Karachi, Pakistan",

  stats: {
    experience: { value: 7, suffix: "+", label: "Years of Experience" },
    deals: { value: 1500, suffix: "+", label: "Deals Closed" },
    clients: { value: 1000, suffix: "+", label: "Happy Clients" },
  },

  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
    tiktok: "#",
  },

  nav: [
    { label: "Home", href: "#home" },
    { label: "Cars", href: "#cars" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Stories", href: "#stories" },
    { label: "Feedback", href: "#feedback" },
    { label: "Contact", href: "#contact" },
  ],
};

export const testimonials = [
  {
    name: "Ahmed R.",
    location: "Lagos, Nigeria",
    quote:
      "I had a great experience dealing with Zayn Khan. The entire process was transparent and professional. I was kept informed throughout the process and received exactly what I was promised.",
    rating: 5,
    initials: "AR",
  },
  {
    name: "Hassan M.",
    location: "Nairobi, Kenya",
    quote:
      "From selecting the right car to completing the deal, everything was handled professionally. The dealer was extremely helpful and made the entire experience smooth and stress-free.",
    rating: 5,
    initials: "HM",
  },
  {
    name: "Grace N.",
    location: "Accra, Ghana",
    quote:
      "Buying my car from Zayn Khan was such a smooth experience. He understood exactly what I needed and made sure I got a great deal. I'll definitely be recommending him to friends and family.",
    rating: 5,
    initials: "GN",
  },
];
