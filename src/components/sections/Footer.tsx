import lalLogoDark from "@/assets/lal-logo-dark.png";
import { useSiteData } from "@/context/SiteDataContext";
import { resolve } from "@/utils/dataLoader";

const Footer = () => {
  const data = useSiteData();

  return (
    <footer className="bg-brand-grey text-white">
      <div className="container-narrow px-6 md:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-md">
            <img
              src={lalLogoDark}
              alt="Lebanese Alternative Learning"
              className="h-10 md:h-12 w-auto mb-5"
            />
            <p className="text-sm md:text-base text-white/85 leading-relaxed">
              {resolve(data, "footer-org", "Friends of Lebanese Alternative Learning · Washington, D.C. · U.S. 501(c)(3) · EIN 99-3511136")}
            </p>
          </div>

          <div className="flex flex-col gap-2 md:items-end text-sm md:text-base">
            <a
              href="mailto:hello@friendsoflal.org"
              className="text-white hover:text-brand-blue transition-colors font-semibold"
            >
              {resolve(data, "footer-email", "hello@friendsoflal.org")}
            </a>
            <a
              href="https://lal.ngo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-blue transition-colors font-semibold"
            >
              {resolve(data, "footer-lal-link", "lal.ngo →")}
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/15 text-center text-xs text-white/60">
          © {resolve(data, "footer-copyright-year", "2025")} Friends of Lebanese Alternative Learning
        </div>
      </div>
    </footer>
  );
};

export default Footer;
