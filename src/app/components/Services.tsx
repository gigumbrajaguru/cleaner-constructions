import { useState } from "react";
import { Link } from "react-router";
import {
  X,
  Phone,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

interface Project {
  title: string;
  client: string;
  description: string;
  result: string;
}

interface Service {
  icon: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  projects: Project[];
}

export function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      icon: "🏗️",
      title: "Extensions & Additions",
      category: "Structural Building",
      description:
        "Single and double-storey extensions, wrap-around extensions, rear kitchen extensions and side returns designed to blend seamlessly with your existing architecture.",
      features: [
        "Architectural plans & building regulations support",
        "Foundations, structural steel calculation & fitting",
        "Bi-fold doors, skylights & lantern roof integrations",
        "Seamless internal knock-throughs & open plan living",
      ],
      projects: [
        {
          title: "Rear Open-Plan Extension",
          client: "The Harrington Residence · Letchworth",
          description:
            "Complete 35 sq metre single-storey rear extension with anthracite aluminium bi-fold doors, pitched lantern roof, and underfloor heating throughout.",
          result:
            "Doubled the ground floor footprint, bringing in abundant natural daylight and creating a contemporary family dining and lounge area.",
        },
        {
          title: "Two-Storey Side Extension",
          client: "The Waverley Property · Stevenage",
          description:
            "Added an extra double bedroom and en-suite upstairs plus expanded utility and garage storage downstairs.",
          result:
            "Blended with original brickwork seamlessly, significantly increasing market valuation and living comfort.",
        },
      ],
    },
    {
      icon: "🔨",
      title: "Full Renovations & Refurbishments",
      category: "Property Transformation",
      description:
        "Complete property makeovers — we strip back, re-engineer, rebuild, and detail to the highest British building standards for residential homes and commercial units.",
      features: [
        "Full structural stripping back & timber treatment",
        "Complete re-plumbing and certified electrical rewiring",
        "Modern thermal insulation and soundproofing",
        "Plastering, woodwork, and designer decorative finishes",
      ],
      projects: [
        {
          title: "Victorian House Full Refurbishment",
          client: "Somerset House · Hitchin",
          description:
            "Complete structural overhaul of a period property including damp proofing, new floor joists, modern insulation, and luxury detailing.",
          result:
            "Modern energy efficiency achieved while preserving original period character and cornices.",
        },
      ],
    },
    {
      icon: "🪟",
      title: "Loft Conversions",
      category: "Space Maximisation",
      description:
        "Transform neglected attic space into luxurious master suites, guest rooms, quiet home offices, or creative studios.",
      features: [
        "Velux window, rear dormer, and hip-to-gable styles",
        "Staircase design compliant with UK building regulations",
        "Bespoke eaves storage and fitted wardrobes",
        "Compact en-suite shower room plumbing and ventilation",
      ],
      projects: [
        {
          title: "Master Suite Dormer Conversion",
          client: "Fairfield Manor · St Albans",
          description:
            "Added a full rear dormer with French doors and Juliet balcony, en-suite bathroom, and custom acoustic insulation.",
          result:
            "Created an expansive master retreat without losing any garden footprint.",
        },
      ],
    },
    {
      icon: "🍳",
      title: "Kitchen & Bathroom Fitting",
      category: "Interior Craftsmanship",
      description:
        "Bespoke kitchen and luxury bathroom installations. From initial tear-out and pipework to quartz worktops, tiles, and fixtures, all managed under one roof.",
      features: [
        "Rigid cabinet assembly & custom kitchen islands",
        "Quartz, granite, solid oak and laminate worktops",
        "Wet room walk-in showers & freestanding baths",
        "Wall and floor porcelain, ceramic, or marble tiling",
      ],
      projects: [
        {
          title: "Contemporary Open Kitchen & Island",
          client: "Langham Rise · Welwyn",
          description:
            "Handled complete cabinetry, induction downdraft hob, concealed LED task lighting, and designer breakfast bar.",
          result:
            "Delivered on time and within budget, with immaculate silicone and tile detailing.",
        },
      ],
    },
    {
      icon: "🧱",
      title: "Brickwork & Masonry",
      category: "Exterior & Structural",
      description:
        "Structural and decorative brickwork, blockwork, boundary walls, repointing, lintel replacements, and chimney repairs built for generational durability.",
      features: [
        "Facing brickwork matching local Hertfordshire architecture",
        "Damp proof course (DPC) installation and inspections",
        "Garden boundary walls, retaining walls & pillar piers",
        "Traditional lime mortar repointing & weatherproofing",
      ],
      projects: [
        {
          title: "Rebuilt Boundary Wall & Pillar Piers",
          client: "The Old Rectory · Baldock",
          description:
            "Demolished failing wall and reconstructed 25m decorative Flemish bond brick wall with matching coping stones.",
          result:
            "Extremely durable finish praised by neighbours, enhancing property kerb appeal.",
        },
      ],
    },
    {
      icon: "🪵",
      title: "Carpentry & Joinery",
      category: "Precision Woodwork",
      description:
        "High-calibre timber framing, roof trusses, bespoke staircases, engineered flooring, fire doors, architrave, and custom architectural joinery.",
      features: [
        "First-fix structural framing, stud walls & joists",
        "Second-fix internal door hanging & mouldings",
        "Hardwood and laminate flooring installation",
        "Bespoke media units and under-stair storage systems",
      ],
      projects: [
        {
          title: "Bespoke Fitted Cabinetry & Staircase",
          client: "Private Residence · Letchworth",
          description:
            "Built custom floor-to-ceiling alcove cupboards and renovated staircase with oak handrails and glass balustrades.",
          result:
            "Elevated the home interior with seamless, factory-finish woodwork.",
        },
      ],
    },
    {
      icon: "⚡",
      title: "Electrical & Plumbing",
      category: "Utilities & Safety",
      description:
        "Certified electrical rewires, fuse box / consumer unit upgrades, heating systems, power showers, boiler connection support, and emergency diagnostics.",
      features: [
        "NICEIC / Part P compliant electrical installations",
        "Full first and second-fix plumbing & heating runs",
        "Energy-efficient LED lighting schemes & EV chargers",
        "Comprehensive testing certificates and documentation",
      ],
      projects: [
        {
          title: "Full House Rewire & Consumer Unit",
          client: "Woodland Way · Stevenage",
          description:
            "Replaced legacy cabling throughout, installed RCBO surge protection board, and fitted smart switches.",
          result:
            "Safe, 100% compliant electrical installation with zero cosmetic damage to newly plastered rooms.",
        },
      ],
    },
    {
      icon: "🎨",
      title: "Plastering & Decorating",
      category: "Flawless Finishes",
      description:
        "Mirror-smooth skim coats, plasterboarding, Artex removal, dry lining, and precision interior and exterior painting with durable trade paints.",
      features: [
        "Bonding, hardwall and multi-finish skim coats",
        "Ceiling replacement and acoustic plasterboarding",
        "Interior woodwork priming, undercoating and eggshell",
        "Exterior masonry coatings & weather shield paints",
      ],
      projects: [
        {
          title: "Whole House Skim & Paint Detailing",
          client: "Ashbourne Property · Hitchin",
          description:
            "Skimmed all walls and ceilings across 4 bedrooms, followed by complete monochrome decoration and woodwork spray.",
          result: "Ready for immediate tenancy with ultra-sharp lines and zero blemishes.",
        },
      ],
    },
    {
      icon: "🏠",
      title: "Roofing & Guttering",
      category: "Weather Protection",
      description:
        "New pitched roofs, tile and slate repairs, flat roofs (EPDM & GRP fibreglass), lead flashing, fascias, soffits, and uPVC rainwater systems.",
      features: [
        "Leak diagnostics and emergency storm repairs",
        "Breathable membrane and dry verge installations",
        "Seamless aluminium and heavy-duty uPVC guttering",
        "Chimney stack repointing and lead flashing repairs",
      ],
      projects: [
        {
          title: "Flat Roof Replacement & Guttering",
          client: "Enterprise Unit · Hertfordshire",
          description:
            "Removed degraded mineral felt and laid 25-year guaranteed EPDM rubber membrane with new deep-flow gutters.",
          result: "100% watertight seal with improved thermal drainage performance.",
        },
      ],
    },
    {
      icon: "🏢",
      title: "New Build & Groundworks",
      category: "Civil & Ground-Up",
      description:
        "Site clearance, bulk excavation, strip and trench foundations, underground drainage, concrete slab pouring, and full project management.",
      features: [
        "Laser-levelled trench excavation and spoil removal",
        "Building control approved concrete foundation pours",
        "Foul and storm water drainage & soakaway crates",
        "Radon barrier membrane and thermal slab insulation",
      ],
      projects: [
        {
          title: "New Residential Groundworks & Slab",
          client: "Developer Partnership · St Albans",
          description:
            "Prepared 180 sq m site, excavated deep footings, and poured C35 power-floated structural slab.",
          result: "Signed off on first inspection by local building control inspector.",
        },
      ],
    },
    {
      icon: "🪨",
      title: "Driveways & Paving",
      category: "Hard Landscaping",
      description:
        "Block paving, tarmacadam, resin-bound aggregate, natural sandstone patios, garden terraces, and dropped kerb preparation.",
      features: [
        "Type 1 MOT compacted sub-base to prevent sinkage",
        "Weed-resistant geotextile membrane underlay",
        "Permeable block paving complying with SuDS regulations",
        "Precision edging restraints and drainage channels",
      ],
      projects: [
        {
          title: "Resin-Bound Driveway & Granite Setts",
          client: "The Croft · Baldock",
          description:
            "Installed modern charcoal border and golden quartz resin finish for a 4-vehicle driveway.",
          result: "Transformed property entrance with zero puddle accumulation.",
        },
      ],
    },
    {
      icon: "🏢",
      title: "Commercial Construction",
      category: "Retail & Offices",
      description:
        "Commercial retail shop fittings, office reconfigurations, acoustic partition walls, fire door sets, suspended ceilings, and industrial handovers.",
      features: [
        "Out-of-hours & weekend project scheduling",
        "Health & safety compliance documentation (RAMS)",
        "Durable commercial flooring and high-traffic paint",
        "Fast-turnaround handover to prevent business downtime",
      ],
      projects: [
        {
          title: "Commercial Retail Fit-Out",
          client: "Boutique Retail Group · Letchworth",
          description:
            "Complete transformation of commercial high street unit into designer retail store with display partition walls, LED track lighting, and stockroom.",
          result:
            "Opened on the exact scheduled launch day with zero snagging issues.",
        },
      ],
    },
    {
      icon: "✨",
      title: "Post-Construction Handover Detailing",
      category: "Cleaning & Handover",
      description:
        "Specialized post-build deep cleaning to eliminate micro-dust, mortar splashes, paint overspray, and debris so spaces are immediately move-in ready.",
      features: [
        "HEPA air filtration & fine plaster dust extraction",
        "Window and glazing scratch-free scraping & detailing",
        "Grout haze removal from tiles & silicone buffing",
        "Handover certificates for landlords & developers",
      ],
      projects: [
        {
          title: "New Build Multi-Unit Handover Clean",
          client: "Stirling Developments · Hertfordshire",
          description:
            "Detailed 6 newly built townhouses from ceilings to floor skirting before buyer viewings.",
          result: "All properties passed landlord inspection with praise for cleanliness.",
        },
      ],
    },
  ];

  return (
    <>
      {/* ── PROJECT DETAIL MODAL ── */}
      {selectedService && (
        <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="sticky top-0 bg-blue-900 text-white p-6 flex items-center justify-between z-10 border-b-2 border-blue-600">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedService.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold font-bebas tracking-wide text-white">
                    {selectedService.title}
                  </h2>
                  <span className="text-xs uppercase font-bold tracking-widest text-blue-300">
                    {selectedService.category}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
                  Service Overview
                </h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {selectedService.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
                  Scope &amp; Standards
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">
                  Past Case Studies
                </h4>
                <div className="space-y-4">
                  {selectedService.projects.map((project, index) => (
                    <div
                      key={index}
                      className="bg-slate-50 rounded-xl p-5 border border-slate-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <h5 className="font-bold text-base text-slate-900">
                          {project.title}
                        </h5>
                        <span className="text-xs font-bold text-blue-600">
                          {project.client}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded text-xs text-blue-900 font-medium">
                        <strong>Outcome: </strong>
                        {project.result}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                onClick={() => setSelectedService(null)}
                className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                Request a Quote for {selectedService.title}
              </Link>
              <a
                href="tel:08002461980"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-slate-300 text-slate-800 hover:border-blue-600 hover:text-blue-600 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Call 0800 246 1980</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── SERVICES PAGE HEADER: BLUE & WHITE ── */}
      <div>
        <section className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white py-16 border-b-4 border-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Comprehensive Construction &amp; Property Services
            </span>
            <h1 className="font-bebas text-4xl sm:text-6xl tracking-wide text-white mt-2 mb-4">
              Full-Spectrum Building Solutions
            </h1>
            <div className="w-16 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
              Apex Building Solutions Ltd provides end-to-end building, structural additions,
              renovations, and property maintenance across Hertfordshire, Bedfordshire,
              Cambridgeshire, and Greater London.
            </p>
          </div>
        </section>

        {/* ── SERVICES GRID ── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedService(service)}
                  className="bg-white border border-slate-200 rounded-xl p-8 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 rounded-xl bg-blue-50 group-hover:bg-blue-600 text-3xl flex items-center justify-center shadow-sm transition-colors">
                        {service.icon}
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-xs text-slate-700 font-medium"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-800 transition-colors">
                    <span>Click to view project details &rarr;</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CUSTOM BUILD BANNER ── */}
        <section className="py-16 bg-slate-900 text-white border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="font-bebas text-3xl sm:text-4xl tracking-wide text-white uppercase">
              Need a Combined Building &amp; Handover Package?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Every property is unique. Whether you require a single extension, a complete shop
              refit, or an end-to-end building and post-construction handover clean, we coordinate
              all trades seamlessly under one roof.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                to="/contact"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                Request a Custom Quote
              </Link>
              <a
                href="tel:08002461980"
                className="inline-flex items-center gap-2 border-2 border-white/80 hover:border-white text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Call 0800 246 1980</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
