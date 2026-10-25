import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import {
  HardHat,
  Phone,
  Mail,
  MapPin,
  Clock,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingScrollTarget, setPendingScrollTarget] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;

  // Handle smooth scroll when navigating or clicking on hash anchors
  useEffect(() => {
    if (!pendingScrollTarget) return;

    const timer = window.setTimeout(() => {
      const target = document.getElementById(pendingScrollTarget);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setPendingScrollTarget(null);
      }
    }, 150);

    return () => window.clearTimeout(timer);
  }, [location.pathname, pendingScrollTarget]);

  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname === "/") {
      const target = document.getElementById(anchorId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      setPendingScrollTarget(anchorId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* ── TOP ANNOUNCEMENT BAR ── */}
      <div className="bg-blue-950 text-slate-200 text-xs py-2.5 border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-600/30 text-blue-200 font-semibold text-[11px] whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              Hertfordshire &amp; Surrounds
            </span>
            <span className="hidden md:inline text-slate-600">&bull;</span>
            <span className="hidden md:inline text-slate-300 font-medium whitespace-nowrap truncate">
              Free Written Estimates &bull; 100% Fully Insured
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs shrink-0">
            <a
              href="tel:08002461980"
              className="flex items-center gap-1.5 text-blue-300 hover:text-white font-semibold transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>0800 246 1980</span>
            </a>
            <span className="hidden sm:inline text-slate-700">|</span>
            <a
              href="mailto:hello@apexbuildingsolutions.co.uk"
              className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>hello@apexbuildingsolutions.co.uk</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── CLEAN WHITE & BLUE STICKY NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 shrink-0 group py-1"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors shrink-0">
              <HardHat className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bebas text-2xl sm:text-3xl tracking-wider text-slate-900 leading-none whitespace-nowrap">
                APEX <span className="text-blue-600">BUILDING</span>
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-semibold whitespace-nowrap leading-tight mt-0.5">
                Solutions Ltd &bull; Quality Construction
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-7 shrink-0">
            <Link
              to="/"
              className={`text-xs uppercase font-bold tracking-wider whitespace-nowrap transition-colors py-1 ${
                isActive("/") ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`text-xs uppercase font-bold tracking-wider whitespace-nowrap transition-colors py-1 ${
                isActive("/services") ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Services
            </Link>
            <Link
              to="/"
              onClick={() => handleNavClick("about")}
              className="text-xs uppercase font-bold tracking-wider whitespace-nowrap text-slate-700 hover:text-blue-600 transition-colors py-1"
            >
              About
            </Link>
            <Link
              to="/"
              onClick={() => handleNavClick("gallery")}
              className="text-xs uppercase font-bold tracking-wider whitespace-nowrap text-slate-700 hover:text-blue-600 transition-colors py-1"
            >
              Projects
            </Link>
            <Link
              to="/"
              onClick={() => handleNavClick("why-us")}
              className="text-xs uppercase font-bold tracking-wider whitespace-nowrap text-slate-700 hover:text-blue-600 transition-colors py-1"
            >
              Why Us
            </Link>
            <Link
              to="/"
              onClick={() => handleNavClick("reviews")}
              className="text-xs uppercase font-bold tracking-wider whitespace-nowrap text-slate-700 hover:text-blue-600 transition-colors py-1"
            >
              Reviews
            </Link>
            <Link
              to="/contact"
              className={`text-xs uppercase font-bold tracking-wider whitespace-nowrap transition-colors py-1 ${
                isActive("/contact") ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Header Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <a
              href="tel:08002461980"
              className="hidden xl:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-800 text-xs font-bold hover:border-blue-600 hover:text-blue-600 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="whitespace-nowrap">0800 246 1980</span>
            </a>
            <Link
              to="/contact"
              onClick={() => handleNavClick("location")}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all whitespace-nowrap shrink-0 transform hover:-translate-y-0.5"
            >
              <span className="whitespace-nowrap">Get Free Quote</span>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-blue-600 focus:outline-none shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 animate-in slide-in-from-top-3 shadow-lg">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`text-sm font-bold tracking-wider uppercase py-1 ${
                  isActive("/") ? "text-blue-600" : "text-slate-800 hover:text-blue-600"
                }`}
              >
                Home
              </Link>
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-bold tracking-wider uppercase py-1 ${
                  isActive("/services") ? "text-blue-600" : "text-slate-800 hover:text-blue-600"
                }`}
              >
                Services (12+ Solutions)
              </Link>
              <Link
                to="/"
                onClick={() => handleNavClick("about")}
                className="text-sm font-bold tracking-wider uppercase py-1 text-slate-800 hover:text-blue-600"
              >
                About Us
              </Link>
              <Link
                to="/"
                onClick={() => handleNavClick("gallery")}
                className="text-sm font-bold tracking-wider uppercase py-1 text-slate-800 hover:text-blue-600"
              >
                Projects &amp; Gallery
              </Link>
              <Link
                to="/"
                onClick={() => handleNavClick("why-us")}
                className="text-sm font-bold tracking-wider uppercase py-1 text-slate-800 hover:text-blue-600"
              >
                Why Choose Us
              </Link>
              <Link
                to="/"
                onClick={() => handleNavClick("reviews")}
                className="text-sm font-bold tracking-wider uppercase py-1 text-slate-800 hover:text-blue-600"
              >
                Client Reviews
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-bold tracking-wider uppercase py-1 ${
                  isActive("/contact") ? "text-blue-600" : "text-slate-800 hover:text-blue-600"
                }`}
              >
                Contact &amp; Map
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href="tel:08002461980"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm hover:bg-blue-100 transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Call 0800 246 1980</span>
              </a>
              <Link
                to="/contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick("location");
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-600 text-white font-bold text-sm uppercase tracking-wider shadow-md"
              >
                <span>Request Free Quote</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── FLOATING QUICK CALL BUTTON ── */}
      <aside
        aria-label="Quick contact"
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
      >
        <a
          href="tel:08002461980"
          className="group inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:scale-105 transition-all border-2 border-white"
          aria-label="Direct call to 0800 246 1980"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold">
            <Phone className="w-4 h-4" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[10px] text-blue-100 uppercase tracking-widest font-semibold">
              Instant Call
            </span>
            <span className="text-sm font-bold">0800 246 1980</span>
          </div>
        </a>
      </aside>

      {/* ── FOOTER: DEEP BLUE & CRISP WHITE ── */}
      <footer className="bg-slate-950 text-white pt-16 pb-12 border-t-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                  <HardHat className="w-6 h-6" />
                </div>
                <span className="font-bebas text-2xl tracking-wider text-white">
                  APEX <span className="text-blue-400">BUILDING</span>
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Apex Building Solutions Ltd delivers professional construction, house extensions,
                full renovations, structural alterations, and property maintenance across Hertfordshire
                and surrounding regions.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 border border-white/15 text-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Fully Insured
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 border border-white/15 text-slate-200">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> 10+ Years Experience
                </span>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-blue-400 font-bold uppercase text-xs tracking-widest mb-4">
                Full-Spectrum Services
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link to="/services" className="hover:text-blue-400 transition-colors">
                    Extensions &amp; Additions
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-blue-400 transition-colors">
                    Full Renovations &amp; Refurbishments
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-blue-400 transition-colors">
                    Loft Conversions
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-blue-400 transition-colors">
                    Kitchen &amp; Bathroom Fitting
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-blue-400 transition-colors">
                    Brickwork &amp; Masonry
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-blue-400 transition-colors">
                    Roofing &amp; Guttering
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-blue-400 transition-colors">
                    Driveways &amp; Groundworks
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-blue-400 transition-colors">
                    Post-Construction Handover Detailing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="text-blue-400 font-bold uppercase text-xs tracking-widest mb-4">
                Company &amp; Work
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link to="/" onClick={() => handleNavClick("about")} className="hover:text-blue-400 transition-colors">
                    About Apex Building
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => handleNavClick("gallery")} className="hover:text-blue-400 transition-colors">
                    Projects Showcase
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => handleNavClick("why-us")} className="hover:text-blue-400 transition-colors">
                    Why Choose Us
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => handleNavClick("reviews")} className="hover:text-blue-400 transition-colors">
                    Client Testimonials
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-blue-400 transition-colors">
                    Request a Free Quote
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => handleNavClick("submit-review")} className="hover:text-blue-400 transition-colors">
                    Submit Client Review
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Details Column */}
            <div>
              <h4 className="text-blue-400 font-bold uppercase text-xs tracking-widest mb-4">
                Contact Details
              </h4>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    Unit 8, The Sovereign Centre,<br />
                    Letchworth, Hertfordshire, SG6 2NW
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                  <a href="tel:08002461980" className="hover:text-blue-400 transition-colors">
                    0800 246 1980 / +44 1462 419 820
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                  <a
                    href="mailto:hello@apexbuildingsolutions.co.uk"
                    className="hover:text-blue-400 transition-colors break-all"
                  >
                    hello@apexbuildingsolutions.co.uk
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p>Mon–Fri: 8:00am – 5:30pm</p>
                    <p>Sat: 8:30am – 1:30pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <p>&copy; 2026 Apex Building Solutions Ltd. All rights reserved.</p>
              <span className="hidden sm:inline">&bull;</span>
              <p className="text-blue-400 font-medium">Registered in England &amp; Wales</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-500">Professional Building Services</span>
              <span>&bull;</span>
              <Link
                to="/admin/reviews"
                className={`transition-colors ${
                  isActive("/admin/reviews") ? "text-blue-400 font-semibold" : "hover:text-white"
                }`}
              >
                Review Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
