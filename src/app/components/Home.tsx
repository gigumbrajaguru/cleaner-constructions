import { useState } from "react";
import { Link } from "react-router";
import {
  ShieldCheck,
  FileText,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  HardHat,
  Hammer,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Layers,
  Award,
  Users,
  Building,
  Check,
  X,
  Send,
} from "lucide-react";
import { ClientReviews } from "./ClientReviews";

// ── 12 FULL-SPECTRUM BUILDING SOLUTIONS ──
const fullSpectrumServices = [
  {
    icon: "🏗️",
    title: "Extensions & Additions",
    description:
      "Single and double-storey extensions, rear and side extensions designed to blend seamlessly with your existing property and maximise living space.",
    category: "Structural",
  },
  {
    icon: "🔨",
    title: "Full Renovations & Refurbishments",
    description:
      "Complete property makeovers — we strip back, rebuild and finish to the highest standard, breathing new life into your home or commercial space.",
    category: "Renovation",
  },
  {
    icon: "🪟",
    title: "Loft Conversions",
    description:
      "Transform unused attic space into beautiful bedrooms, en-suites, home offices or studios. Velux, dormer and hip-to-gable conversions available.",
    category: "Structural",
  },
  {
    icon: "🍳",
    title: "Kitchen & Bathroom Fitting",
    description:
      "Full kitchen and bathroom installations — from stripping out to precision tiling, plumbing, electrics, cabinetry and sanitaryware. One team, zero stress.",
    category: "Interior",
  },
  {
    icon: "🧱",
    title: "Brickwork & Masonry",
    description:
      "Structural and decorative brickwork, blockwork, repointing, chimney repairs, and garden walls built to last using high-grade British standard materials.",
    category: "Exterior",
  },
  {
    icon: "🪵",
    title: "Carpentry & Joinery",
    description:
      "First and second-fix carpentry, bespoke fitted furniture, staircase construction, door hanging, architrave, skirting boards and structural framing.",
    category: "Interior",
  },
  {
    icon: "⚡",
    title: "Electrical & Plumbing",
    description:
      "Full rewiring, consumer unit upgrades, certified safety testing, first/second-fix plumbing, boiler installation support and heating connections.",
    category: "Utilities",
  },
  {
    icon: "🎨",
    title: "Plastering & Decorating",
    description:
      "Glass-smooth plaster skim coats, dry lining, Artex removal, internal and exterior painting with flawless finishes and sharp clean edges.",
    category: "Interior",
  },
  {
    icon: "🏠",
    title: "Roofing & Guttering",
    description:
      "Pitched and flat roofing, tile/slate replacement, high-performance felt, leadwork, fascias, soffits, and uPVC guttering installation and repair.",
    category: "Exterior",
  },
  {
    icon: "🏢",
    title: "New Build & Groundworks",
    description:
      "Site clearance, trenching, foundations, sub-base compaction, drainage, concrete slabs and ground-up new build construction management.",
    category: "Structural",
  },
  {
    icon: "🪨",
    title: "Driveways & Paving",
    description:
      "Block paving, tarmac, resin-bound driveways, natural stone patios, pathways and external hard landscaping to boost your kerb appeal.",
    category: "Exterior",
  },
  {
    icon: "🏗️",
    title: "Commercial Construction",
    description:
      "Retail shop fits, commercial office refurbishments, warehouse alterations and commercial builds delivered on tight deadlines and strict budgets.",
    category: "Commercial",
  },
];

// ── GALLERY SHOWCASE DATA ──
const galleryProjects = [
  {
    id: 1,
    title: "Rear Extension & Open Living",
    category: "Extensions",
    image: "https://images.unsplash.com/photo-1590725140246-20acddc1ec6d?w=800&q=80",
    client: "Sarah H. · Letchworth Garden City",
    description:
      "Single-storey rear extension with bi-fold doors, lantern roof light, structural steel installation, and seamless kitchen integration.",
  },
  {
    id: 2,
    title: "Modern Designer Kitchen Installation",
    category: "Kitchens",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    client: "Johnson Family · Stevenage",
    description:
      "Complete rip-out and installation of luxury shaker kitchen with quartz worktops, integrated appliances, recessed LED lighting and tiled splashbacks.",
  },
  {
    id: 3,
    title: "Luxury Master Bathroom Renovation",
    category: "Bathrooms",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    client: "Mark K. · Hitchin",
    description:
      "Walk-in wet room shower with frameless glass screen, concealed plumbing valves, freestanding bath, and large format porcelain tiling.",
  },
  {
    id: 4,
    title: "Dormer Loft Conversion with En-Suite",
    category: "Loft Conversions",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
    client: "David & Emma · Baldock",
    description:
      "Creation of an expansive master bedroom with Velux windows, bespoke built-in eaves storage, and a modern private en-suite shower room.",
  },
  {
    id: 5,
    title: "Structural Brickwork & Boundary Walls",
    category: "Brickwork",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
    client: "Tom W. · Letchworth",
    description:
      "Hand-crafted facing brickwork with Flemish bond detailing, matching historical local architecture with engineer-certified foundations.",
  },
  {
    id: 6,
    title: "Block Paved Driveway & Hard Landscaping",
    category: "Driveways",
    image: "https://images.unsplash.com/photo-1584463699042-6a6c429712a4?w=800&q=80",
    client: "Commercial & Private · Welwyn",
    description:
      "Excavation, permeable sub-base preparation, charcoal border block paving, and integrated surface water drainage channels.",
  },
];

// ── THE DS2 DIFFERENCE (6 PILLARS) ──
const ds2Difference = [
  {
    icon: "🛡️",
    title: "Fully Insured",
    description:
      "Full public liability and employer's liability insurance on every single build. Your home and property are safely protected at all times.",
  },
  {
    icon: "📋",
    title: "Free Detailed Quotes",
    description:
      "No obligation, zero hidden costs. We provide transparent, fully itemised written estimates before any hammer strikes a nail.",
  },
  {
    icon: "⏱️",
    title: "On Time, On Budget",
    description:
      "We set realistic schedules and stick to them. Professional project management ensures materials and trades arrive on schedule.",
  },
  {
    icon: "🤝",
    title: "One Point of Contact",
    description:
      "Deal directly with DS2 throughout the entire build. No subcontractor confusion, just clear, honest, and prompt daily communication.",
  },
  {
    icon: "🏅",
    title: "Quality Materials",
    description:
      "We source from certified, trusted UK suppliers. Every build is designed and constructed to meet and exceed British building regulations.",
  },
  {
    icon: "🌍",
    title: "Local Hertfordshire Experts",
    description:
      "Deep knowledge of local planning permissions, building control, and architectural heritage across Hertfordshire and neighbouring counties.",
  },
];

export function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof galleryProjects[0] | null>(null);

  // Quick Quote Form State for Home Section
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Extensions & Additions",
    message: "",
    website: "", // Honeypot
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteError, setQuoteError] = useState("");

  const filteredProjects =
    activeCategory === "All"
      ? galleryProjects
      : galleryProjects.filter((p) => p.category === activeCategory);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteError("");

    // Honeypot check
    if (quoteForm.website) {
      setQuoteSubmitted(true);
      return;
    }

    if (quoteForm.name.trim().length < 2) {
      setQuoteError("Please enter your name.");
      return;
    }
    if (!quoteForm.phone.trim() && !quoteForm.email.trim()) {
      setQuoteError("Please provide a phone number or email so we can respond.");
      return;
    }

    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteForm({
        name: "",
        phone: "",
        email: "",
        service: "Extensions & Additions",
        message: "",
        website: "",
      });
      setQuoteSubmitted(false);
    }, 4000);
  };

  return (
    <div>
      {/* ── HERO SECTION ── */}
      <section
        id="home"
        className="relative overflow-hidden bg-[#1C2B3A] text-white py-24 sm:py-32 border-b-2 border-[#C8922A]"
      >
        {/* Background Image with Dark Blueprint Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?w=1800&q=80"
            alt="Construction and building site with high quality craftsmanship"
            className="w-full h-full object-cover opacity-20 scale-105 transform motion-safe:animate-pulse"
            style={{ animationDuration: "8s" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C2B3A] via-[#1C2B3A]/90 to-[#1C2B3A]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8922A]/20 border border-[#C8922A]/50 text-[#C8922A] text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-[#C8922A] animate-ping"></span>
              ✦ Letchworth Garden City &amp; Surrounding Areas
            </div>

            {/* Headline */}
            <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-wider uppercase text-white leading-none mb-6">
              Built Right.{" "}
              <span className="font-playfair italic font-medium text-[#C8922A] lowercase tracking-normal">
                Every Time.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-light mb-8 max-w-2xl">
              DS2 Building Solutions Ltd delivers professional construction, extensions, renovations,
              and property building services across Hertfordshire, Bedfordshire, Cambridgeshire,
              and North London. Quality is never optional.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#location"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded bg-[#C8922A] hover:bg-[#d8a033] text-[#1C2B3A] font-bold text-sm uppercase tracking-wider shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <span>Get a Free Quote</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="tel:07728547674"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded border-2 border-white/80 hover:border-white text-white hover:bg-white/10 font-bold text-sm uppercase tracking-wider transition-all"
              >
                <Phone className="w-4 h-4 text-[#C8922A]" />
                <span>+44 7728 547 674</span>
              </a>
            </div>

            {/* 4 Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/15">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-[#C8922A]"></span>
                Fully Insured
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-[#C8922A]"></span>
                Free Estimates
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-[#C8922A]"></span>
                10+ Years Exp.
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-[#C8922A]"></span>
                Local Specialists
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#15222E] border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0">
              <div className="font-bebas text-4xl sm:text-5xl text-[#C8922A] leading-none">
                500+
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-300 font-medium mt-1">
                Projects Completed
              </div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="font-bebas text-4xl sm:text-5xl text-[#C8922A] leading-none">
                10+
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-300 font-medium mt-1">
                Years Experience
              </div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="font-bebas text-4xl sm:text-5xl text-[#C8922A] leading-none">
                100%
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-300 font-medium mt-1">
                Satisfaction Guarantee
              </div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="font-bebas text-4xl sm:text-5xl text-[#C8922A] leading-none">
                24h
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-300 font-medium mt-1">
                Quote Response
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION: FULL-SPECTRUM BUILDING SOLUTIONS ── */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8922A]">
              What We Do
            </span>
            <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-[#1C2B3A] mt-2 mb-4">
              Full-Spectrum Building Solutions
            </h2>
            <div className="w-16 h-1 bg-[#C8922A] mx-auto mb-4"></div>
            <p className="text-slate-600 text-base sm:text-lg">
              From groundworks to finishing touches, DS2 handles every stage of your build with
              precision, compliance, and dedicated craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fullSpectrumServices.map((service, index) => (
              <div
                key={index}
                className="group relative bg-[#F7F4EF] border border-[#E8E2D9] rounded-lg p-7 hover:border-[#C8922A] hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded bg-white group-hover:bg-[#1C2B3A] text-2xl flex items-center justify-center shadow-sm mb-5 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1C2B3A] mb-3 group-hover:text-[#C8922A] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-between">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
                    {service.category}
                  </span>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#C8922A] hover:text-[#1C2B3A] transition-colors"
                  >
                    <span>View Projects</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded bg-[#1C2B3A] hover:bg-[#25394d] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              <span>Explore All 12+ Building Services &amp; Case Studies</span>
              <ChevronRight className="w-4 h-4 text-[#C8922A]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT DS2 SECTION: A NAME YOU CAN BUILD ON ── */}
      <section id="about" className="py-20 bg-[#1C2B3A] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image with Badge */}
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl border-2 border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                  alt="DS2 Building Solutions master craftsmen at work"
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C2B3A] via-transparent to-transparent opacity-60"></div>
              </div>
              {/* Floating Accent Box */}
              <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:right-6 bg-[#C8922A] text-[#1C2B3A] p-6 rounded shadow-2xl border-4 border-[#1C2B3A] max-w-[220px]">
                <div className="text-xs uppercase font-extrabold tracking-widest opacity-80 mb-1">
                  Established
                </div>
                <div className="font-bebas text-3xl sm:text-4xl leading-tight">
                  10+ Years<br />Of Excellence
                </div>
              </div>
            </div>

            {/* Right Story & Checklist */}
            <div className="lg:pl-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C8922A]">
                  About DS2 Building Solutions
                </span>
                <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white mt-2 mb-3">
                  A Name You Can Build On
                </h2>
                <div className="w-16 h-1 bg-[#C8922A] mb-5"></div>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  Based in Letchworth Garden City, Hertfordshire, DS2 Building Solutions Ltd is a
                  trusted regional contractor with over a decade of delivering exceptional building,
                  renovation, and structural work for homeowners and commercial clients.
                </p>
              </div>

              <ul className="space-y-3.5 text-slate-200 text-sm">
                {[
                  "Fully insured — comprehensive public liability and employer's liability",
                  "All trades under one roof — one reliable point of contact throughout",
                  "Transparent pricing with clear, itemised written quotes",
                  "Clean, tidy working practices — we respect your property daily",
                  "All work guaranteed with dedicated post-handover aftercare",
                  "Planning permission and local building regulations assistance",
                  "Hertfordshire, Bedfordshire, Cambridgeshire & North London covered",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#C8922A]/20 border border-[#C8922A] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#C8922A]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="#location"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-[#C8922A] hover:bg-[#d8a033] text-[#1C2B3A] font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <span>Request an Estimate</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:07728547674"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded border border-white/20 hover:border-white text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C8922A]" />
                  <span>Call the Team</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY SECTION: PROJECTS WE'RE PROUD OF ── */}
      <section id="gallery" className="py-20 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8922A]">
              Our Work
            </span>
            <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-[#1C2B3A] mt-2 mb-4">
              Projects We're Proud Of
            </h2>
            <div className="w-16 h-1 bg-[#C8922A] mx-auto mb-4"></div>
            <p className="text-slate-600 text-base sm:text-lg">
              Every build tells a story. Here's a glimpse at the standard of quality and attention to
              detail we deliver on site every day.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {["All", "Extensions", "Kitchens", "Bathrooms", "Loft Conversions", "Brickwork", "Driveways"].map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                      activeCategory === cat
                        ? "bg-[#1C2B3A] text-[#C8922A] shadow-md"
                        : "bg-white text-slate-700 border border-[#E8E2D9] hover:border-[#C8922A]"
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-white rounded-lg overflow-hidden border border-[#E8E2D9] hover:border-[#C8922A] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  <span className="absolute top-4 left-4 px-3 py-1 rounded bg-[#1C2B3A]/90 text-[#C8922A] text-xs font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C8922A]" />
                      {project.client}
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#C8922A]">
                    <span>View Project Details</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl">
              <div className="relative h-72">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <span className="text-xs uppercase font-bold tracking-widest text-[#C8922A]">
                  {selectedProject.category} Case Study
                </span>
                <h3 className="text-2xl font-bold text-[#1C2B3A] mt-1 mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-sm font-semibold text-slate-500 mb-4 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#C8922A]" />
                  {selectedProject.client}
                </p>
                <p className="text-slate-700 text-sm leading-relaxed mb-6">
                  {selectedProject.description}
                </p>
                <div className="flex gap-3">
                  <a
                    href="#location"
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 text-center py-3 rounded bg-[#C8922A] hover:bg-[#d8a033] text-[#1C2B3A] font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Request a Similar Quote
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-3 rounded border border-gray-300 text-gray-700 font-semibold text-xs uppercase tracking-wider hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── THE DS2 DIFFERENCE SECTION (6 PILLARS) ── */}
      <section id="why-us" className="py-20 bg-white border-t border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8922A]">
              Why Choose Us
            </span>
            <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-[#1C2B3A] mt-2 mb-4">
              The DS2 Difference
            </h2>
            <div className="w-16 h-1 bg-[#C8922A] mx-auto mb-4"></div>
            <p className="text-slate-600 text-base sm:text-lg">
              We know building work is an investment in your property and peace of mind. Here is how
              we guarantee a reliable, stress-free build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ds2Difference.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F7F4EF] p-8 rounded-lg border border-[#E8E2D9] hover:border-[#C8922A] hover:bg-white hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#1C2B3A] mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT REVIEWS SECTION ── */}
      <ClientReviews />

      {/* ── MAP + GET IN TOUCH SECTION (`#location`) ── */}
      <section id="location" className="py-20 bg-[#15222E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8922A]">
              Find Us
            </span>
            <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white mt-2 mb-4">
              Visit or Get in Touch
            </h2>
            <div className="w-16 h-1 bg-[#C8922A] mx-auto mb-4"></div>
            <p className="text-slate-300 text-base sm:text-lg">
              We're based in Letchworth Garden City and cover Hertfordshire, Bedfordshire,
              Cambridgeshire, North London and surrounding communities.
            </p>
          </div>

          {/* Embedded Google Map */}
          <div className="w-full h-80 rounded-xl overflow-hidden border-2 border-white/10 shadow-2xl mb-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2463.7!2d-0.24498!3d51.98306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s40+Eldefield%2C+Letchworth+Garden+City%2C+SG6+4BL!5e0!3m2!1sen!2suk!4v1699999999999"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="DS2 Building Solutions Headquarters in Letchworth Garden City"
            ></iframe>
          </div>

          {/* Contact Details & Interactive Quote Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Details */}
            <div className="space-y-6 bg-[#1C2B3A] p-8 rounded-xl border border-white/10">
              <h3 className="font-bebas text-3xl tracking-wide text-white mb-6">
                Contact Information
              </h3>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded bg-[#C8922A]/20 border border-[#C8922A] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#C8922A]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                    Address
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    40 Eldefield, Letchworth Garden City,<br />
                    Hertfordshire, SG6 4BL, England
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded bg-[#C8922A]/20 border border-[#C8922A] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#C8922A]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                    Phone
                  </h4>
                  <a
                    href="tel:07728547674"
                    className="text-base text-amber-300 font-bold hover:underline"
                  >
                    +44 7728 547 674
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded bg-[#C8922A]/20 border border-[#C8922A] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#C8922A]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                    Email
                  </h4>
                  <a
                    href="mailto:ds2buildingsolution@gmail.com"
                    className="text-sm text-amber-300 hover:underline break-all"
                  >
                    ds2buildingsolution@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded bg-[#C8922A]/20 border border-[#C8922A] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#C8922A]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                    Working Hours
                  </h4>
                  <p className="text-sm text-slate-300">Mon–Fri: 7:30am – 6:00pm</p>
                  <p className="text-sm text-slate-300">Sat: 8:00am – 2:00pm</p>
                  <p className="text-xs text-slate-400 mt-1">Sun: Emergency &amp; Pre-booked</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-white/10">
                <div className="w-11 h-11 rounded bg-[#C8922A]/20 border border-[#C8922A] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#C8922A]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                    Coverage Area
                  </h4>
                  <p className="text-sm text-slate-300">
                    Hertfordshire · Bedfordshire · Cambridgeshire · North London
                  </p>
                </div>
              </div>
            </div>

            {/* Request a Free Quote Form */}
            <div className="bg-[#1C2B3A] p-8 rounded-xl border border-white/10 shadow-xl">
              <h3 className="font-bebas text-3xl tracking-wide text-white mb-2">
                Request a Free Quote
              </h3>
              <p className="text-sm text-slate-300 mb-6">
                Tell us about your project. We provide clear, itemised written estimates with no
                obligation.
              </p>

              {quoteSubmitted ? (
                <div className="bg-emerald-900/40 border-2 border-emerald-500 rounded-lg p-6 text-center animate-in zoom-in-95">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h4 className="text-xl font-bold text-white mb-1">Thank You!</h4>
                  <p className="text-sm text-emerald-200">
                    We've received your enquiry and will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4" autoComplete="off">
                  {/* Honeypot field */}
                  <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
                    <input
                      type="text"
                      name="website"
                      value={quoteForm.website}
                      onChange={(e) => setQuoteForm({ ...quoteForm, website: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {quoteError && (
                    <div className="bg-red-900/40 border border-red-500 rounded p-3 text-xs text-red-200">
                      {quoteError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                        placeholder="John Smith"
                        className="w-full px-4 py-2.5 rounded bg-[#15222E] border border-white/20 text-white placeholder-slate-500 text-sm focus:border-[#C8922A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                        placeholder="+44 7700 900077"
                        className="w-full px-4 py-2.5 rounded bg-[#15222E] border border-white/20 text-white placeholder-slate-500 text-sm focus:border-[#C8922A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 rounded bg-[#15222E] border border-white/20 text-white placeholder-slate-500 text-sm focus:border-[#C8922A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Type of Work Required *
                    </label>
                    <select
                      value={quoteForm.service}
                      onChange={(e) => setQuoteForm({ ...quoteForm, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded bg-[#15222E] border border-white/20 text-white text-sm focus:border-[#C8922A] focus:outline-none"
                    >
                      <option>Extensions &amp; Additions</option>
                      <option>Full Renovations &amp; Refurbishments</option>
                      <option>Loft Conversions</option>
                      <option>Kitchen &amp; Bathroom Fitting</option>
                      <option>Brickwork &amp; Masonry</option>
                      <option>Carpentry &amp; Joinery</option>
                      <option>Electrical &amp; Plumbing</option>
                      <option>Plastering &amp; Decorating</option>
                      <option>Roofing &amp; Guttering</option>
                      <option>New Build &amp; Groundworks</option>
                      <option>Driveways &amp; Paving</option>
                      <option>Commercial Construction</option>
                      <option>Post-Construction Cleanup</option>
                      <option>Other Custom Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Project Details
                    </label>
                    <textarea
                      rows={4}
                      value={quoteForm.message}
                      onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                      placeholder="Describe your property, plans, approximate dimensions, or timeline..."
                      className="w-full px-4 py-2.5 rounded bg-[#15222E] border border-white/20 text-white placeholder-slate-500 text-sm focus:border-[#C8922A] focus:outline-none resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded bg-[#C8922A] hover:bg-[#d8a033] text-[#1C2B3A] font-bold text-sm uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Enquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER STRIP ── */}
      <section className="bg-[#C8922A] text-[#1C2B3A] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-bebas text-3xl sm:text-4xl tracking-wide uppercase">
              Ready to Start Your Project?
            </h2>
            <p className="text-sm font-medium text-[#1C2B3A]/90">
              Get a free, no-obligation quote from DS2 Building Solutions today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="tel:07728547674"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-[#1C2B3A] hover:bg-[#25394d] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C8922A]" />
              <span>Call +44 7728 547 674</span>
            </a>
            <a
              href="mailto:ds2buildingsolution@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-white hover:bg-slate-100 text-[#1C2B3A] font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
            >
              <Mail className="w-4 h-4 text-[#C8922A]" />
              <span>Email the Team</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
