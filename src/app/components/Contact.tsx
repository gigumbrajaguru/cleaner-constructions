import { useState, useRef } from "react";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Send,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Extensions & Additions",
    message: "",
    website: "", // honeypot field
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const lastSubmitTime = useRef(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Honeypot check — if filled, silently succeed
    if (formData.website) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "Extensions & Additions",
          message: "",
          website: "",
        });
        setSubmitted(false);
      }, 3000);
      return;
    }

    // Rate limiting — 10 seconds between submissions
    const now = Date.now();
    if (now - lastSubmitTime.current < 10_000) {
      setError("Please wait a moment before submitting another enquiry.");
      return;
    }
    lastSubmitTime.current = now;

    // Input validation
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();

    if (trimmedName.length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!trimmedPhone && !trimmedEmail) {
      setError("Please provide a contact phone number or email address.");
      return;
    }
    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "Extensions & Additions",
        message: "",
        website: "",
      });
      setSubmitted(false);
    }, 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* ── HEADER BANNER ── */}
      <section className="bg-[#1C2B3A] text-white py-16 border-b-2 border-[#C8922A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8922A]">
            Letchworth Garden City &amp; Surrounding Counties
          </span>
          <h1 className="font-bebas text-4xl sm:text-6xl tracking-wide text-white mt-2 mb-4">
            Visit or Get in Touch
          </h1>
          <div className="w-16 h-1 bg-[#C8922A] mx-auto mb-6"></div>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Planning a home extension, structural renovation, loft conversion, or property maintenance
            project? Get in touch for an itemised, no-obligation written quote.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTACT SECTION ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Contact Info */}
            <div className="space-y-8 bg-[#F7F4EF] p-8 sm:p-10 rounded-2xl border border-[#E8E2D9]">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C8922A]">
                  Direct Contact
                </span>
                <h2 className="font-bebas text-3xl sm:text-4xl text-[#1C2B3A] mt-1 mb-3">
                  DS2 Building Solutions Ltd
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We are based in Letchworth Garden City and provide comprehensive building,
                  structural engineering support, and finishing services across Hertfordshire and
                  beyond.
                </p>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E2D9] shadow-sm flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#C8922A]" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
                      Registered Address
                    </h3>
                    <p className="text-[#1C2B3A] font-semibold text-base leading-relaxed">
                      40 Eldefield, Letchworth Garden City,
                    </p>
                    <p className="text-slate-600 text-sm">Hertfordshire, SG6 4BL, England</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E2D9] shadow-sm flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-[#C8922A]" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
                      Direct Telephone
                    </h3>
                    <a
                      href="tel:07728547674"
                      className="text-[#1C2B3A] font-bold text-lg hover:text-[#C8922A] transition-colors"
                    >
                      +44 7728 547 674
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fast response &bull; Direct trade communication
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E2D9] shadow-sm flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-[#C8922A]" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
                      Email Address
                    </h3>
                    <a
                      href="mailto:ds2buildingsolution@gmail.com"
                      className="text-[#1C2B3A] font-bold text-base hover:text-[#C8922A] transition-colors break-all"
                    >
                      ds2buildingsolution@gmail.com
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">Send plans &amp; tender documents</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E2D9] shadow-sm flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-[#C8922A]" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
                      Working Hours
                    </h3>
                    <p className="text-[#1C2B3A] text-sm font-semibold">
                      Monday &ndash; Friday: 7:30am &ndash; 6:00pm
                    </p>
                    <p className="text-slate-600 text-sm">Saturday: 8:00am &ndash; 2:00pm</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Sunday: Emergency repairs &amp; pre-booked viewings
                    </p>
                  </div>
                </div>

                {/* Coverage */}
                <div className="flex items-start gap-4 pt-4 border-t border-[#E8E2D9]">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E2D9] shadow-sm flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-[#C8922A]" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
                      Service Coverage Area
                    </h3>
                    <p className="text-[#1C2B3A] text-sm font-semibold">
                      Hertfordshire &bull; Bedfordshire &bull; Cambridgeshire &bull; North London
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Letchworth, Stevenage, Hitchin, Baldock, Welwyn, Luton, St Albans, Royston
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Call Action Strip */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:07728547674"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#1C2B3A] hover:bg-[#25394d] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#C8922A]" />
                  <span>Call 07728 547 674</span>
                </a>
                <a
                  href="mailto:ds2buildingsolution@gmail.com"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#C8922A] hover:bg-[#d8a033] text-[#1C2B3A] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Plans</span>
                </a>
              </div>
            </div>

            {/* Right: Request a Free Quote Form */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl border-2 border-gray-200 shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C8922A]">
                  Free Written Estimate
                </span>
                <h2 className="font-bebas text-3xl sm:text-4xl text-[#1C2B3A] mt-1 mb-2">
                  Request a Free Quote
                </h2>
                <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                  Fill in your project requirements below. We provide transparent, itemised cost
                  breakdowns with zero hidden surprises.
                </p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-8 text-center animate-in zoom-in-95">
                  <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-emerald-950 mb-2">Thank You!</h3>
                  <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                    We've received your enquiry. A senior building specialist from DS2 Building
                    Solutions will review your details and contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
                  {/* Honeypot field */}
                  <div className="absolute opacity-0 -z-10" aria-hidden="true" tabIndex={-1}>
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3.5 text-red-700 text-xs font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm text-slate-900 focus:border-[#C8922A] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="e.g. 07700 900000"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm text-slate-900 focus:border-[#C8922A] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. sarah@example.co.uk"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm text-slate-900 focus:border-[#C8922A] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Type of Work Required *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm text-slate-900 focus:border-[#C8922A] focus:outline-none bg-white transition-colors"
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
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Project Details / Approximate Dimensions
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about the property, your timeline, drawings available, or specific questions..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm text-slate-900 focus:border-[#C8922A] focus:outline-none resize-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-lg bg-[#C8922A] hover:bg-[#d8a033] text-[#1C2B3A] font-bold text-sm uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Quote Request</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    🔒 Your details are kept strictly private and used only to prepare your quote.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE GOOGLE MAP ── */}
      <section className="bg-[#15222E] py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8922A]">
              Service Headquarters
            </span>
            <h2 className="font-bebas text-3xl sm:text-4xl text-white mt-1 mb-2">
              Based in Letchworth Garden City
            </h2>
            <p className="text-slate-300 text-sm">
              Covering projects throughout Hertfordshire, Bedfordshire, Cambridgeshire &amp; North London.
            </p>
          </div>

          <div className="w-full h-96 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
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
        </div>
      </section>
    </div>
  );
}
