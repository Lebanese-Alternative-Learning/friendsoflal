import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import { resolve } from "@/utils/dataLoader";
import logoAsset from "@/assets/friends-of-lal-logo-light.png.asset.json";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#impact", label: "Impact" },
  { href: "#why-lal", label: "Why LAL" },
  { href: "#stories", label: "Stories" },
  { href: "#faq", label: "FAQ" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const data = useSiteData();
  const logo = logoAsset.url;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border">
      <nav className="container-narrow flex items-center justify-between py-4 px-6 md:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="Friends of LAL home">
          <img
            src={logo}
            alt="Friends of Lebanese Alternative Learning"
            className="h-10 md:h-12 w-auto"
          />
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-bold text-brand-grey/85 hover:text-brand-magenta transition-colors"
            >
              {resolve(data, `nav-link-${l.label.toLowerCase()}`, l.label)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://buy.stripe.com/6oUdR82Za3TX8Rv5Ys3cc00"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-brand-magenta px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-bold text-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2"
          >
            {resolve(data, "nav-donate", "Donate")}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full text-brand-grey hover:bg-brand-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-narrow px-6 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-bold text-brand-grey hover:text-brand-magenta"
              >
                {resolve(data, `nav-link-mobile-${l.label.toLowerCase()}`, l.label)}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
