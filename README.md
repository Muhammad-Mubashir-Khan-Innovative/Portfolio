# Zayn Khan — Japanese Car Dealer Portfolio

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
  components/   Reusable section components (Navbar, Hero, Vehicles, About, ...)
  data/         dealer.js (config), vehicles.js (inventory), whatsapp.js (WhatsApp link helper), forms.js (form submission endpoint)
  App.jsx       Assembles all sections
  main.jsx      App entry point
public/
  images/       Hero, About, and vehicle imagery (vehicle photos live in images/cars/)
```

## Images

The hero section uses `public/images/hero.jpg` and the About section uses `public/images/AboutMe.jpeg`. To swap in different imagery, drop a file into `public/images/` and update the `HERO_IMAGE` / `ABOUT_IMAGE` constants in `src/components/Hero.jsx` and `src/components/About.jsx`.

## Featured Vehicles

The "Featured Vehicles" section (right after the Hero) renders a card per entry in `src/data/vehicles.js` — add, remove, or edit cars there without touching any component code. Each entry needs a photo in `public/images/cars/`; resize new photos so the longer edge is ~1400px and compress to JPEG (quality ~80) to keep page weight down before adding them. Leave `price` as `null` to show "Contact for Price," or set it to a number/string to display a real price. Each card's WhatsApp button pre-fills an inquiry naming that specific vehicle.

## Form submissions

The Contact, Feedback, and footer "Contact the Developer" forms all POST to the same Google Apps Script Web App endpoint, configured once in `src/data/forms.js` (`FORM_ENDPOINT`). Each form sends a `formType` field so the script can tell them apart:

| Form | Payload |
| --- | --- |
| Contact | `{ name, email, phone, message }` |
| Feedback | `{ formType: "feedback", name, email, rating, message }` |
| Contact the Developer | `{ formType: "developer", contact, message }` |

Requests are sent with `Content-Type: text/plain` rather than `application/json` — Apps Script web apps don't respond to CORS preflight requests, so a JSON content-type gets blocked by the browser before it reaches the script. The script's `doPost` can still call `JSON.parse(e.postData.contents)` regardless of this header.

## WhatsApp integration

The floating WhatsApp button opens `https://wa.me/<number>` with a pre-filled message. The number is set once in `src/data/dealer.js` (`whatsapp` field).

## SEO

The site ships with meta descriptions, Open Graph/Twitter cards, a JSON-LD `AutomotiveBusiness` schema, `robots.txt`, and `sitemap.xml`. Before launch, replace the placeholder domain (`https://zaynkhan.example.com`) with the real production URL in:

- `src/data/dealer.js` (`siteUrl`)
- `index.html` (canonical link, `og:url`, `og:image`, `twitter:image`, and the JSON-LD block)
- `public/robots.txt` (`Sitemap:` line)
- `public/sitemap.xml` (`<loc>`)

The social preview image lives at `public/images/og-image.png` (1200×630) — regenerate it if the hero design changes.
