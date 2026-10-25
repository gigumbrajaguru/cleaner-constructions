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
  Sparkles,
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
    <div className="min-h-screen flex flex-col bg-[#F7F4EF] text-[#1C2B3A] selection:bg-[#C8922A] selection:text-white">
      {/* ── TOP ANNOUNCEMENT BAR ── */}
      <div className="bg-[#15222E] text-slate-300 text-xs sm:text-sm py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-medium text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              Serving Letchworth Garden City & Hertfordshire
            </span>
            <span className="hidden md:inline text-slate-400">·</span>
            <span className="hidden md:inline text-slate-300">
              Free Detailed Estimates & Written Quotes
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href="tel:07728547674"
              className="flex items-center gap-1.5 hover:text-amber-400 font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+44 7728 547 674</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="mailto:ds2buildingsolution@gmail.com"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">ds2buildingsolution@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── STICKY MAIN NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-[#1C2B3A]/95 backdrop-blur-md border-b-2 border-[#C8922A] shadow-md transition-all">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-md group-hover:scale-105 transition-transform">
              <HardHat className="w-6 h-6 text-[#1C2B3A]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bebas text-2xl sm:text-3xl tracking-wider text-white flex items-center gap-1.5 leading-none">
                DS2 <span className="text-[#C8922A]">BUILDING</span>
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-300 font-medium">
                Solutions Ltd &bull; Quality Construction
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/"
              className={`text-xs uppercase font-semibold tracking-wider transition-colors ${
                isActive("/") ? "text-[#C8922A]" : "text-white/85 hover:text-[#C8922A]"
              }`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`text-xs uppercase font-semibold tracking-wider transition-colors ${
                isActive("/services") ? "text-[#C8922A]" : "text-white/85 hover:text-[#C8922A]"
              }`}
            >
              Services
            </Link>
            <Link
              to="/"
              onClick={() => handleNavClick("about")}
              className="text-xs uppercase font-semibold tracking-wider text-white/85 hover:text-[#C8922A] transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/"
              onClick={() => handleNavClick("gallery")}
              className="text-xs uppercase font-semibold tracking-wider text-white/85 hover:text-[#C8922A] transition-colors"
            >
              Our Work
            </Link>
            <Link
              to="/"
              onClick={() => handleNavClick("why-us")}
              className="text-xs uppercase font-semibold tracking-wider text-white/85 hover:text-[#C8922A] transition-colors"
            >
              Why Choose Us
            </Link>
            <Link
              to="/"
              onClick={() => handleNavClick("reviews")}
              className="text-xs uppercase font-semibold tracking-wider text-white/85 hover:text-[#C8922A] transition-colors"
            >
              Reviews
            </Link>
            <Link
              to="/contact"
              className={`text-xs uppercase font-semibold tracking-wider transition-colors ${
                isActive("/contact") ? "text-[#C8922A]" : "text-white/85 hover:text-[#C8922A]"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Header Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:07728547674"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded border border-amber-500/40 text-amber-300 text-xs font-semibold hover:bg-amber-500/10 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>07728 547 674</span>
            </a>
            <Link
              to="/contact"
              onClick={() => handleNavClick("location")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#C8922A] hover:bg-[#d8a033] text-[#1C2B3A] font-bold text-xs uppercase tracking-wider shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              <span>Get Free Quote</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded text-white hover:text-amber-400 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#15222E] border-b border-amber-500/30 px-6 py-6 space-y-4 animate-in slide-in-from-top-3">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`text-sm font-semibold tracking-wider uppercase py-1 ${
                  isActive("/") ? "text-amber-400" : "text-white hover:text-amber-400"
                }`}
              >
                Home
              </Link>
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold tracking-wider uppercase py-1 ${
                  isActive("/services") ? "text-amber-400" : "text-white hover:text-amber-400"
                }`}
              >
                Services (12+ Solutions)
              </Link>
              <Link
                to="/"
                onClick={() => handleNavClick("about")}
                className="text-sm font-semibold tracking-wider uppercase py-1 text-white hover:text-amber-400"
              >
                About DS2
              </Link>
              <Link
                to="/"
                onClick={() => handleNavClick("gallery")}
                className="text-sm font-semibold tracking-wider uppercase py-1 text-white hover:text-amber-400"
              >
                Our Work / Gallery
              </Link>
              <Link
                to="/"
                onClick={() => handleNavClick("why-us")}
                className="text-sm font-semibold tracking-wider uppercase py-1 text-white hover:text-amber-400"
              >
                The DS2 Difference
              </Link>
              <Link
                to="/"
                onClick={() => handleNavClick("reviews")}
                className="text-sm font-semibold tracking-wider uppercase py-1 text-white hover:text-amber-400"
              >
                Client Reviews
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold tracking-wider uppercase py-1 ${
                  isActive("/contact") ? "text-amber-400" : "text-white hover:text-amber-400"
                }`}
              >
                Contact &amp; Map
              </Link>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href="tel:07728547674"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded bg-white/10 text-amber-300 font-semibold text-sm hover:bg-white/15"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call +44 7728 547 674</span>
              </a>
              <Link
                to="/contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick("location");
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded bg-[#C8922A] text-[#1C2B3A] font-bold text-sm uppercase tracking-wider"
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

      {/* ── FLOATING CALL / WHATSAPP PILL ── */}
      <aside
        aria-label="Quick contact"
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
      >
        <a
          href="tel:07728547674"
          className="group inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#1C2B3A] text-white border-2 border-[#C8922A] shadow-xl hover:bg-[#15222E] hover:scale-105 transition-all"
          aria-label="Direct call to +44 7728 547 674"
        >
          <div className="w-8 h-8 rounded-full bg-[#C8922A] flex items-center justify-center text-[#1C2B3A]">
            <Phone className="w-4 h-4" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[10px] text-amber-300 uppercase tracking-widest font-semibold">
              Instant Call
            </span>
            <span className="text-sm font-bold">+44 7728 547 674</span>
          </div>
        </a>
      </aside>

      {/* ── FOOTER ── */}
      <footer className="bg-[#15222E] text-white pt-16 pb-12 border-t-4 border-[#C8922A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#C8922A] flex items-center justify-center text-[#1C2B3A] font-bold">
                  <HardHat className="w-6 h-6" />
                </div>
                <span className="font-bebas text-2xl tracking-wider text-white">
                  DS2 <span className="text-[#C8922A]">BUILDING</span>
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                DS2 Building Solutions Ltd delivers quality construction, home extensions, loft
                conversions, full refurbishments, groundworks, and property services across
                Hertfordshire, Bedfordshire, Cambridgeshire, and North London.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Fully Insured
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> 10+ Years Exp.
                </span>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-amber-400 font-bold uppercase text-xs tracking-widest mb-4">
                Full-Spectrum Services
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link to="/services" className="hover:text-amber-400 transition-colors">
                    Extensions &amp; Additions
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-amber-400 transition-colors">
                    Full Renovations &amp; Refurbishments
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-amber-400 transition-colors">
                    Loft Conversions
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-amber-400 transition-colors">
                    Kitchen &amp; Bathroom Fitting
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-amber-400 transition-colors">
                    Brickwork &amp; Masonry
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-amber-400 transition-colors">
                    Roofing &amp; Guttering
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-amber-400 transition-colors">
                    Driveways &amp; Groundworks
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-amber-400 transition-colors">
                    Post-Construction Detailing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="text-amber-400 font-bold uppercase text-xs tracking-widest mb-4">
                Company &amp; Work
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link to="/" onClick={() => handleNavClick("about")} className="hover:text-amber-400 transition-colors">
                    About DS2 Building Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => handleNavClick("gallery")} className="hover:text-amber-400 transition-colors">
                    Projects Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => handleNavClick("why-us")} className="hover:text-amber-400 transition-colors">
                    The DS2 Difference
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => handleNavClick("reviews")} className="hover:text-amber-400 transition-colors">
                    Client Testimonials
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-amber-400 transition-colors">
                    Request a Free Quote
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => handleNavClick("submit-review")} className="hover:text-amber-400 transition-colors">
                    Submit Client Review
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Details Column */}
            <div>
              <h4 className="text-amber-400 font-bold uppercase text-xs tracking-widest mb-4">
                Contact Information
              </h4>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    40 Eldefield, Letchworth Garden City,<br />
                    Hertfordshire, SG6 4BL, England
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                  <a href="tel:07728547674" className="hover:text-amber-400 transition-colors">
                    +44 7728 547 674
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                  <a
                    href="mailto:ds2buildingsolution@gmail.com"
                    className="hover:text-amber-400 transition-colors break-all"
                  >
                    ds2buildingsolution@gmail.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p>Mon–Fri: 7:30am – 6:00pm</p>
                    <p>Sat: 8:00am – 2:00pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <p>&copy; 2026 DS2 Building Solutions Ltd. All rights reserved.</p>
              <span className="hidden sm:inline">&bull;</span>
              <p className="text-amber-400/90 font-medium">Registered in England &amp; Wales</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://gigumbrajaguru.me"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Engineering by GBRSystems
              </a>
              <span>&bull;</span>
              <Link
                to="/admin/reviews"
                className={`transition-colors ${
                  isActive("/admin/reviews") ? "text-amber-400 font-semibold" : "hover:text-white"
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
