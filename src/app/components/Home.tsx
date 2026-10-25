import { useState } from "react";
import { Link } from "react-router";
import {
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ChevronRight,
  Check,
  X,
  Send,
  Sparkles,
} from "lucide-react";
import { ClientReviews } from "./ClientReviews";

// ── 12 FULL-SPECTRUM BUILDING SOLUTIONS ──
const fullSpectrumServices = [
  {
    icon: "🏗️",
    title: "Extensions & Additions",
    description:
      "Single and double-storey extensions, rear kitchen additions and side returns designed to blend seamlessly with your existing architecture and maximise living space.",
    category: "Structural",
  },
  {
    icon: "🔨",
    title: "Full Renovations & Refurbishments",
    description:
      "Complete property makeovers — we strip back, re-engineer, rebuild and detail to the highest British building standards for homes and commercial premises.",
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
      "Full kitchen and bathroom installations — from precision demolition to luxury tiling, plumbing, electrics, cabinetry and sanitaryware. One team, zero stress.",
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
      "Certified rewiring, modern consumer units, heating systems, power showers, boiler connection support and certified compliance testing.",
    category: "Utilities",
  },
  {
    icon: "🎨",
    title: "Plastering & Decorating",
    description:
      "Glass-smooth plaster skim coats, dry lining, Artex removal, internal and exterior painting with durable trade finishes and sharp, clean edges.",
    category: "Interior",
  },
  {
    icon: "🏠",
    title: "Roofing & Guttering",
    description:
      "Pitched and flat roofing, tile/slate replacement, high-performance felt, leadwork, fascias, soffits, and uPVC rainwater systems installation and repair.",
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
    icon: "🏢",
    title: "Commercial Construction",
    description:
      "Retail shop fits, commercial office refurbishments, warehouse alterations and commercial builds delivered on tight deadlines and strict budgets.",
    category: "Commercial",
  },
];

// ── GALLERY SHOWCASE DATA (RANDOMIZED & ANONYMIZED) ──
const galleryProjects = [
  {
    id: 1,
    title: "Rear Extension & Open Plan Kitchen",
    category: "Extensions",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    client: "The Henderson Residence · Letchworth",
    description:
      "Single-storey rear extension featuring powder-coated bi-fold doors, lantern roof light, structural steel installation, and seamless kitchen integration.",
  },
  {
    id: 2,
    title: "Modern Designer Kitchen Installation",
    category: "Kitchens",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    client: "Westgate Property · Stevenage",
    description:
      "Complete rip-out and installation of a contemporary shaker kitchen with quartz worktops, integrated appliances, recessed LED lighting and tiled splashbacks.",
  },
  {
    id: 3,
    title: "Luxury Master Bathroom Renovation",
    category: "Bathrooms",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    client: "The Miller Property · Hitchin",
    description:
      "Walk-in wet room shower with frameless glass screen, concealed plumbing valves, freestanding bath, and large format porcelain tiling.",
  },
  {
    id: 4,
    title: "Dormer Loft Conversion with En-Suite",
    category: "Loft Conversions",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
    client: "Oakwood Cottage · Baldock",
    description:
      "Creation of an expansive master bedroom with Velux windows, bespoke built-in eaves storage, and a modern private en-suite shower room.",
  },
  {
    id: 5,
    title: "Structural Brickwork & Boundary Walls",
    category: "Brickwork",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
    client: "The Cavendish Project · St Albans",
    description:
      "Hand-crafted facing brickwork with decorative Flemish bond detailing, matching historical local architecture with engineer-certified foundations.",
  },
  {
    id: 6,
    title: "Block Paved Driveway & Hard Landscaping",
    category: "Driveways",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    client: "Kingsley Court · Welwyn",
    description:
      "Excavation, permeable sub-base preparation, charcoal border block paving, and integrated surface water drainage channels.",
  },
];

// ── THE APEX DIFFERENCE (6 PILLARS) ──
const apexDifference = [
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
      "Deal directly with your dedicated project supervisor throughout. No subcontractor confusion, just clear, honest daily communication.",
  },
  {
    icon: "🏅",
    title: "Quality Materials",
    description:
      "We source from certified, trusted UK suppliers. Every build is designed and constructed to meet and exceed British building regulations.",
  },
  {
    icon: "🌍",
    title: "Local Building Experts",
    description:
      "Deep knowledge of planning permissions, building control, and architectural standards across Hertfordshire and neighbouring counties.",
  },
];

export function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof galleryProjects[0] | null>(null);

  // Quick Quote Form State
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
      {/* ── HERO SECTION: BLUE & WHITE THEME ── */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white py-24 sm:py-32 border-b-4 border-blue-600"
      >
        {/* Subtle background overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1800&q=80"
            alt="High-end building craftsmanship"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-slate-900/90 to-blue-900/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
              ✦ Hertfordshire &bull; Bedfordshire &bull; Cambridgeshire
            </div>

            {/* Headline */}
            <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-wider uppercase text-white leading-none mb-6">
              Built Right.{" "}
              <span className="font-playfair italic font-medium text-blue-400 lowercase tracking-normal">
                Every Time.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-light mb-8 max-w-2xl">
              Apex Building Solutions Ltd delivers professional construction, home extensions, full
              refurbishments, and property services. Quality craftsmanship, transparent pricing, and
              reliable handovers on every project.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#location"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-blue-900/50 transition-all transform hover:-translate-y-0.5"
              >
                <span>Get a Free Quote</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="tel:08002461980"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/80 hover:border-white text-white hover:bg-white/10 font-bold text-sm uppercase tracking-wider transition-all"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Call 0800 246 1980</span>
              </a>
            </div>

            {/* 4 Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/15">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Fully Insured
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Free Written Quotes
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                10+ Years Exp.
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Local Specialists
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR: CRISP BLUE & WHITE ── */}
      <section className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="pt-4 md:pt-0">
              <div className="font-bebas text-4xl sm:text-5xl text-blue-400 leading-none">
                500+
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-medium mt-1">
                Projects Completed
              </div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="font-bebas text-4xl sm:text-5xl text-blue-400 leading-none">
                10+
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-medium mt-1">
                Years Experience
              </div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="font-bebas text-4xl sm:text-5xl text-blue-400 leading-none">
                100%
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-medium mt-1">
                Satisfaction Guarantee
              </div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="font-bebas text-4xl sm:text-5xl text-blue-400 leading-none">
                24h
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-medium mt-1">
                Quote Response
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION: FULL-SPECTRUM BUILDING SOLUTIONS ── */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              What We Do
            </span>
            <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-slate-900 mt-2 mb-4">
              Full-Spectrum Building Solutions
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-4 rounded-full"></div>
            <p className="text-slate-600 text-base sm:text-lg">
              From initial groundworks to luxury finishing touches, Apex manages every stage of your
              build with precision, building regulations compliance, and dedicated craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fullSpectrumServices.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white border border-slate-200 rounded-xl p-7 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-600 text-2xl flex items-center justify-center shadow-sm mb-5 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {service.category}
                  </span>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              <span>Explore All 12+ Building Services &amp; Case Studies</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION: BLUE & WHITE AESTHETIC ── */}
      <section id="about" className="py-20 bg-white text-slate-900 overflow-hidden border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image with Floating Blue Badge */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                  alt="Apex Building Solutions master craftsmen"
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
              </div>
              {/* Floating Accent Box */}
              <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:right-6 bg-blue-600 text-white p-6 rounded-xl shadow-2xl border-4 border-white max-w-[220px]">
                <div className="text-xs uppercase font-extrabold tracking-widest text-blue-200 mb-1">
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
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  About Apex Building Solutions
                </span>
                <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-slate-900 mt-2 mb-3">
                  A Name You Can Build On
                </h2>
                <div className="w-16 h-1 bg-blue-600 mb-5 rounded-full"></div>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  Based in Hertfordshire, Apex Building Solutions Ltd is a trusted regional contractor
                  with over a decade of delivering exceptional building, extension, structural, and
                  renovation work for residential and commercial clients.
                </p>
              </div>

              <ul className="space-y-3.5 text-slate-700 text-sm">
                {[
                  "Fully insured — comprehensive public liability and employer's liability",
                  "All trades under one roof — one reliable point of contact throughout",
                  "Transparent pricing with clear, itemised written quotes",
                  "Clean, tidy working practices — we respect your property daily",
                  "All work guaranteed with dedicated post-handover aftercare",
                  "Planning permission and local building regulations assistance",
                  "Hertfordshire, Bedfordshire, Cambridgeshire & surrounding areas covered",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 border border-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-blue-600 font-bold" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="#location"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  <span>Request an Estimate</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:08002461980"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border-2 border-slate-300 hover:border-blue-600 text-slate-800 hover:text-blue-600 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Call the Team</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY SHOWCASE: BLUE & WHITE ── */}
      <section id="gallery" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Our Work
            </span>
            <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-slate-900 mt-2 mb-4">
              Projects We're Proud Of
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-4 rounded-full"></div>
            <p className="text-slate-600 text-base sm:text-lg">
              Every build tells a story. Here's a glimpse at the standard of quality, attention to
              detail, and tidy finishes we deliver on site every day.
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
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-blue-500"
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
                className="group relative bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-blue-600/90 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                    {project.category}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                    <p className="text-xs text-blue-200 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      {project.client}
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs font-bold text-blue-600">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200">
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
              <div className="p-6 sm:p-8">
                <span className="text-xs uppercase font-bold tracking-widest text-blue-600">
                  {selectedProject.category} Case Study
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-sm font-semibold text-slate-500 mb-4 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  {selectedProject.client}
                </p>
                <p className="text-slate-700 text-sm leading-relaxed mb-6">
                  {selectedProject.description}
                </p>
                <div className="flex gap-3">
                  <a
                    href="#location"
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                  >
                    Request a Similar Quote
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs uppercase tracking-wider hover:bg-slate-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── THE APEX DIFFERENCE SECTION ── */}
      <section id="why-us" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Why Choose Us
            </span>
            <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-slate-900 mt-2 mb-4">
              The Apex Difference
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-4 rounded-full"></div>
            <p className="text-slate-600 text-base sm:text-lg">
              We know building work is an investment in your property and peace of mind. Here is how
              we guarantee a reliable, stress-free build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apexDifference.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-8 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-white hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT REVIEWS SECTION ── */}
      <ClientReviews />

      {/* ── MAP + GET IN TOUCH SECTION (`#location`) ── */}
      <section id="location" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Find Us
            </span>
            <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white mt-2 mb-4">
              Visit or Get in Touch
            </h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto mb-4 rounded-full"></div>
            <p className="text-slate-300 text-base sm:text-lg">
              We cover projects throughout Hertfordshire, Bedfordshire, Cambridgeshire, and Greater London.
            </p>
          </div>

          {/* Embedded Google Map */}
          <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl mb-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2463.7!2d-0.24498!3d51.98306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sThe+Sovereign+Centre%2C+Letchworth%2C+SG6+2NW!5e0!3m2!1sen!2suk!4v1699999999999"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Apex Building Solutions Regional Location"
            ></iframe>
          </div>

          {/* Contact Details & Interactive Quote Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Details */}
            <div className="space-y-6 bg-slate-950 p-8 rounded-2xl border border-slate-800">
              <h3 className="font-bebas text-3xl tracking-wide text-white mb-6">
                Contact Information
              </h3>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    Regional Office
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Unit 8, The Sovereign Centre,<br />
                    Letchworth, Hertfordshire, SG6 2NW
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    Telephone
                  </h4>
                  <a
                    href="tel:08002461980"
                    className="text-base text-blue-400 font-bold hover:underline"
                  >
                    0800 246 1980 / +44 1462 419 820
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    Email
                  </h4>
                  <a
                    href="mailto:hello@apexbuildingsolutions.co.uk"
                    className="text-sm text-blue-400 hover:underline break-all"
                  >
                    hello@apexbuildingsolutions.co.uk
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    Working Hours
                  </h4>
                  <p className="text-sm text-slate-300">Mon–Fri: 8:00am – 5:30pm</p>
                  <p className="text-sm text-slate-300">Sat: 8:30am – 1:30pm</p>
                  <p className="text-xs text-slate-400 mt-1">Sun: Emergency &amp; Pre-booked</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-800">
                <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    Coverage Area
                  </h4>
                  <p className="text-sm text-slate-300">
                    Hertfordshire · Bedfordshire · Cambridgeshire · Greater London
                  </p>
                </div>
              </div>
            </div>

            {/* Request a Free Quote Form */}
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-xl">
              <h3 className="font-bebas text-3xl tracking-wide text-white mb-2">
                Request a Free Quote
              </h3>
              <p className="text-sm text-slate-300 mb-6">
                Tell us about your project. We provide clear, itemised written estimates with no
                obligation.
              </p>

              {quoteSubmitted ? (
                <div className="bg-blue-900/40 border-2 border-blue-500 rounded-xl p-6 text-center animate-in zoom-in-95">
                  <CheckCircle2 className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <h4 className="text-xl font-bold text-white mb-1">Thank You!</h4>
                  <p className="text-sm text-blue-200">
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
                        placeholder="e.g. David Clarke"
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-blue-500 focus:outline-none"
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
                        placeholder="e.g. 07700 900555"
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-blue-500 focus:outline-none"
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
                      placeholder="e.g. david@example.co.uk"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Type of Work Required *
                    </label>
                    <select
                      value={quoteForm.service}
                      onChange={(e) => setQuoteForm({ ...quoteForm, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-none"
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
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-blue-500 focus:outline-none resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2"
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

      {/* ── CTA BANNER STRIP: ROYAL BLUE ── */}
      <section className="bg-blue-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-bebas text-3xl sm:text-4xl tracking-wide uppercase">
              Ready to Start Your Project?
            </h2>
            <p className="text-sm font-medium text-blue-100">
              Get a free, no-obligation quote from Apex Building Solutions today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="tel:08002461980"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Call 0800 246 1980</span>
            </a>
            <a
              href="mailto:hello@apexbuildingsolutions.co.uk"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-blue-600 font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
            >
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Email the Team</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
