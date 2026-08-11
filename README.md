# Kaze Motors — Japanese Car Dealer Portfolio

A premium, single-page portfolio website for a Japanese automotive dealer, built with React, Vite, Tailwind CSS, and Framer Motion.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Framer Motion (animations)
- Lucide React (icons)

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build (outputs to dist/)
npm run preview  # preview the production build
npm run lint      # run oxlint
```

## Customizing the dealer

All dealer-specific content — name, tagline, contact details, WhatsApp number, stats, and social links — lives in a single config file:

```
src/data/dealer.js
```

Update the values there to rebrand the site without touching any component code. Customer testimonials live in the same file under `testimonials`.

## Project structure

```
src/
  components/   Reusable section components (Navbar, Hero, About, Stats, ...)
  data/         dealer.js (config) and whatsapp.js (WhatsApp link helpers)
  App.jsx       Assembles all sections
  main.jsx      App entry point
public/
  images/       Local SVG artwork used by the Hero and About sections
```

## Images

The hero and about sections use bundled local SVG artwork (`public/images/hero.svg`, `public/images/about.svg`) so the site has zero external image dependencies out of the box. To swap in real photography, drop files into `public/images/` (e.g. `hero.jpg`, `dealer.jpg`) and update the `HERO_IMAGE` / `ABOUT_IMAGE` constants in `src/components/Hero.jsx` and `src/components/About.jsx`.

## WhatsApp integration

The contact form builds a pre-filled WhatsApp message and opens `https://wa.me/<number>` on submit. The number is set once in `src/data/dealer.js` (`whatsapp` field) and reused by the contact form and the floating WhatsApp button.
