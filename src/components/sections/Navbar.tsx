import lalLogo from "@/assets/lal-logo-light.png";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border">
      <nav className="container-narrow flex items-center justify-between py-4 px-6 md:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="Friends of LAL home">
          <span className="text-brand-grey font-extrabold text-base md:text-lg leading-none">
            Friends of
          </span>
          <img
            src={lalLogo}
            alt="Lebanese Alternative Learning"
            className="h-8 md:h-10 w-auto"
          />
        </a>
        <a
          href="#donate"
          className="inline-flex items-center justify-center rounded-full bg-brand-magenta px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-bold text-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2"
        >
          Donate
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
