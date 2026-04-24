
# FLAL Landing Page

A single-page, donor-facing site for Friends of Lebanese Alternative Learning — clean, warm, trustworthy. English only, no images, soft geometric shapes for visual interest.

## Design system
- **Colors**: magenta `#c40f70` (primary/CTA), warm grey `#615d59` (text), light blue `#9ecbd0` (soft accent), white + `#F5F5F5` (alternating section backgrounds) — all wired into `index.css` as HSL tokens and exposed via Tailwind.
- **Typography**: Nunito (rounded, friendly sans-serif) loaded from Google Fonts, applied globally.
- **Buttons**: rounded-full, magenta primary with white text, comfortable padding, subtle hover lift.
- **Motion**: smooth scroll behavior, gentle fade/slide-in on section reveal.

## Sections (in order, each its own component)

1. **Navbar** — Sticky white bar. Left: bold "Friends of LAL" wordmark in warm grey. Right: magenta "Donate" pill linking to `#donate`. Mobile: same layout, condensed.

2. **Hero** — White background with a soft light-blue blurred blob/geometric wash in the upper-right (airy, not full bleed). Centered content: headline "Education Changes Everything." in warm grey, supporting subheading, large magenta "Support Our Work" CTA → `#donate`, and small muted "U.S. 501(c)(3) · EIN 99-3511136" line.

3. **About FLAL** — White. Magenta uppercase eyebrow "WHO WE ARE", title "Funding Education at the Roots.", full body copy as provided. Left magenta border accent on the text block. Trailing link "Learn more about LAL's work at lal.ngo →" opens https://lal.ngo in a new tab.

4. **Impact Numbers** — Light blue `#9ecbd0` section background. Eyebrow "LAL'S IMPACT SO FAR". Four white rounded stat cards in a responsive grid (1 col mobile → 2 → 4): **1,200+** Digital Lessons · **Thousands** of Learners Reached · **Multiple** Countries · **K–12** Coverage. Big magenta numbers, warm-grey labels. Footnote: "All programs funded through donor support."

5. **Get Involved** (`id="donate"`) — `#F5F5F5` background. Eyebrow "GET INVOLVED", title "Be Part of the Change.", body copy. Centered email input + magenta "Notify Me" button (UI only, shows a toast on submit, no backend). Muted placeholder line "[Donation options coming soon]".

6. **Footer** — Warm grey `#615d59` background, white text. Left: org name, location, 501(c)(3), EIN. Right: `hello@friendsoflal.org` mailto + `lal.ngo` external link. Bottom center: "© 2025 Friends of Lebanese Alternative Learning" in muted small text.

## Structure
- Update `src/index.css` with brand color tokens, Nunito import, smooth-scroll, base styles.
- Update `tailwind.config.ts` to expose brand tokens (`brand-magenta`, `brand-grey`, `brand-blue`, `brand-soft`) and `font-sans` → Nunito.
- Create `src/components/sections/` with `Navbar.tsx`, `Hero.tsx`, `About.tsx`, `Impact.tsx`, `GetInvolved.tsx`, `Footer.tsx`.
- Replace `src/pages/Index.tsx` to compose the sections in order.
- Set page `<title>` and meta description for FLAL.

Fully responsive, mobile-first, accessible (semantic landmarks, focus states, sufficient contrast, labeled email input).
