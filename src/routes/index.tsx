import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Menu as MenuIcon,
  X,
  Award,
  Search,
  Droplets,
  Waves,
  Filter,
  Shield,
  Flame,
  Zap,
  Wrench,
  Clock,
  ThermometerSun,
  CheckCircle2,
  Star,
  ArrowRight,
  Users,
  Sparkles,
} from "lucide-react";
import heroImg from "@/assets/hero-desembouage.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Action Désembouage",
          description:
            "Spécialiste du désembouage de systèmes de chauffage : planchers chauffants, radiateurs et installations solaires dans le Morbihan et le Sud-Finistère.",
          areaServed: ["Morbihan", "Sud-Finistère"],
          telephone: "+33200000000",
          priceRange: "€€",
        }),
      },
    ],
  }),
});

const PHONE_DISPLAY = "07 59 75 02 18";
const PHONE_LINK = "tel:+33759750218";
const EMAIL = "contact@actiondesembouage.fr";

const NAV = [
  { id: "accueil", label: "Accueil" },
  { id: "zone", label: "Zone d'intervention" },
  { id: "qualifications", label: "Qualifications" },
  { id: "desembouage", label: "Le désembouage" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "bg-white/95 backdrop-blur shadow-[0_4px_20px_-12px_rgba(27,54,89,0.25)]" : "bg-white/80 backdrop-blur"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#accueil" onClick={(e) => { e.preventDefault(); scrollToId("accueil"); }} className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-navy grid place-items-center shadow-soft">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-navy text-base sm:text-lg">Action Désembouage</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground tracking-wide uppercase">Morbihan · Sud-Finistère</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-3">
            <a href={PHONE_LINK} className="inline-flex items-center gap-2 text-navy font-semibold hover:text-blue-secondary transition-colors">
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
            <button onClick={() => scrollToId("contact")} className="btn-cta text-sm">
              Demander un devis
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button className="lg:hidden p-2 text-navy" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Sub-nav */}
        <nav className="hidden lg:flex items-center justify-center gap-1 border-t border-border py-2">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => { e.preventDefault(); scrollToId(n.id); }}
              className="px-3 py-1.5 rounded-full text-sm text-navy/80 hover:text-navy hover:bg-accent transition-colors font-medium"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => { e.preventDefault(); scrollToId(n.id); setOpen(false); }}
                className="px-3 py-2.5 rounded-lg text-navy font-medium hover:bg-accent"
              >
                {n.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 pt-3 border-t border-border">
              <a href={PHONE_LINK} className="btn-navy text-sm">
                <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
              </a>
              <button onClick={() => { scrollToId("contact"); setOpen(false); }} className="btn-cta text-sm">
                Demander un devis
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="accueil" className="relative pt-32 lg:pt-40 pb-16 lg:pb-24 overflow-hidden">
      {/* Decorative blobs */}
      <div aria-hidden className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, var(--turquoise), transparent 70%)" }} />
      <div aria-hidden className="absolute top-40 -left-24 w-[380px] h-[380px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, var(--blue-secondary), transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-navy text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-turquoise" />
            Entreprise qualifiée Qualisav
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-navy">
            Votre spécialiste du <span className="text-blue-secondary">désembouage</span> dans le Morbihan et Sud-Finistère
          </h1>
          <p className="mt-6 text-lg text-navy/70 max-w-xl leading-relaxed">
            Entretien, nettoyage et optimisation de vos installations de chauffage :
            planchers chauffants, radiateurs et systèmes solaires. Une intervention locale,
            propre et durable pour retrouver toute la performance de votre chauffage.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => scrollToId("contact")} className="btn-cta">
              Demander un devis <ArrowRight className="w-4 h-4" />
            </button>
            <a href={PHONE_LINK} className="btn-ghost">
              <Phone className="w-4 h-4" /> Appeler maintenant
            </a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {[
              { n: "15+", l: "années d'expertise" },
              { n: "500+", l: "installations traitées" },
              { n: "100%", l: "clients satisfaits" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl sm:text-3xl font-bold text-navy font-display">{s.n}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal relative">
          <div className="relative rounded-3xl overflow-hidden shadow-elevated">
            <img
              src={heroImg}
              alt="Technicien Action Désembouage intervenant sur un système de chauffage"
              width={1536}
              height={1152}
              className="w-full h-[420px] lg:h-[520px] object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, color-mix(in oklab, var(--navy) 65%, transparent) 100%)" }} />
          </div>
          {/* Floating card */}
          <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white rounded-2xl shadow-elevated p-4 sm:p-5 max-w-[260px] border border-border">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-brand-red/10 grid place-items-center">
                <ThermometerSun className="w-6 h-6 text-brand-red" />
              </div>
              <div>
                <div className="font-semibold text-navy text-sm">Rendement optimisé</div>
                <div className="text-xs text-muted-foreground">jusqu'à -25% de conso</div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-2 sm:-right-6 bg-white rounded-2xl shadow-elevated p-4 border border-border">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-secondary" />
              <div className="text-sm font-semibold text-navy">Qualisav Désembouage</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, subtitle, children, tone = "white" }: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  tone?: "white" | "muted";
}) {
  return (
    <section id={id} className={`py-20 lg:py-28 ${tone === "muted" ? "bg-accent/40" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 reveal">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border text-navy text-xs font-semibold mb-4 uppercase tracking-wider">
              {eyebrow}
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy leading-tight">{title}</h2>
          {subtitle && <p className="mt-4 text-lg text-navy/70 leading-relaxed">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function BretagneMap() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-lg mx-auto reveal">
      <svg viewBox="0 0 500 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mor" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#04B2D9" />
            <stop offset="100%" stopColor="#048ABF" />
          </linearGradient>
          <linearGradient id="fin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#048ABF" />
            <stop offset="100%" stopColor="#1B3659" />
          </linearGradient>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        {/* Base brittany silhouette (stylized) */}
        <path
          d="M40,180 C60,140 100,120 160,115 C220,110 260,90 320,95 C380,100 430,130 460,170 C475,200 470,235 450,255 C420,285 380,300 340,305 C300,310 270,325 230,325 C180,325 130,315 90,290 C55,270 30,235 40,180 Z"
          fill="#EAF3F9"
          stroke="#CFE1EC"
          strokeWidth="1.5"
        />
        {/* Sud Finistère (west) */}
        <path
          d="M40,180 C60,140 100,120 160,115 C190,113 205,120 210,150 C215,190 195,235 165,270 C130,300 90,290 65,270 C40,250 30,215 40,180 Z"
          fill="url(#fin)"
          opacity="0.9"
          filter="url(#soft)"
        />
        {/* Morbihan (south) */}
        <path
          d="M180,220 C200,205 240,205 285,215 C330,225 370,245 385,275 C395,300 375,315 340,318 C300,322 250,325 210,315 C180,308 165,285 170,260 C172,245 175,232 180,220 Z"
          fill="url(#mor)"
          opacity="0.95"
          filter="url(#soft)"
        />
        {/* labels */}
        <g fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700">
          <text x="115" y="200" fill="#fff" fontSize="14" textAnchor="middle">Sud Finistère</text>
          <text x="275" y="275" fill="#fff" fontSize="16" textAnchor="middle">Morbihan</text>
        </g>
        {/* pins */}
        <g>
          <circle cx="275" cy="270" r="6" fill="#D90D1E" />
          <circle cx="275" cy="270" r="12" fill="#D90D1E" opacity="0.25">
            <animate attributeName="r" values="10;18;10" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="120" cy="195" r="5" fill="#D90D1E" />
          <circle cx="120" cy="195" r="10" fill="#D90D1E" opacity="0.25">
            <animate attributeName="r" values="8;16;8" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="bg-white rounded-3xl shadow-soft border border-border p-6 sm:p-8 grid gap-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Nom" name="nom" required />
        <Input label="Prénom" name="prenom" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Téléphone" name="tel" type="tel" required />
        <Input label="Email" name="email" type="email" required />
      </div>
      <Input label="Adresse" name="adresse" />
      <div className="grid sm:grid-cols-2 gap-4">
        <Select label="Type de client" name="type_client" options={["Particulier", "Professionnel"]} />
        <Select label="Type d'installation" name="type_install" options={["Plancher chauffant", "Radiateurs", "Solaire", "Autre"]} />
      </div>
      <div>
        <label className="block text-sm font-medium text-navy mb-1.5">Décrivez votre besoin</label>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-xl border border-input bg-white px-4 py-3 text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-turquoise/40"
          placeholder="Symptômes constatés, âge de l'installation, surface concernée..."
        />
      </div>
      <button type="submit" className="btn-cta w-full sm:w-auto justify-center">
        {sent ? "Demande envoyée ✓" : "Envoyer ma demande"}
        {!sent && <ArrowRight className="w-4 h-4" />}
      </button>
      {sent && (
        <p className="text-sm text-navy/70">Merci ! Nous vous recontactons sous 24h ouvrées.</p>
      )}
    </form>
  );
}

function Input({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy mb-1.5">
        {label} {required && <span className="text-brand-red">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-xl border border-input bg-white px-4 py-3 text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-turquoise/40"
      />
    </div>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy mb-1.5">{label}</label>
      <select
        name={name}
        className="w-full rounded-xl border border-input bg-white px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-turquoise/40"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

const STEPS = [
  { icon: Search, title: "Diagnostic", text: "Analyse complète de votre installation et détection des points critiques." },
  { icon: Droplets, title: "Injection", text: "Introduction du produit désembouant adapté à votre réseau." },
  { icon: Waves, title: "Circulation", text: "Mise en circulation forcée pour décoller les dépôts internes." },
  { icon: Filter, title: "Évacuation", text: "Extraction complète des boues et impuretés du circuit." },
  { icon: Shield, title: "Protection", text: "Ajout d'un inhibiteur pour protéger et optimiser durablement." },
];

const BENEFITS = [
  { icon: Waves, t: "Meilleure circulation de l'eau" },
  { icon: Flame, t: "Rendement du chauffage optimisé" },
  { icon: Zap, t: "Consommations énergétiques réduites" },
  { icon: Shield, t: "Prévention des pannes coûteuses" },
  { icon: Clock, t: "Durée de vie des équipements prolongée" },
];

const SYMPTOMS = [
  "Radiateurs froids en partie basse",
  "Bruits inhabituels dans l'installation",
  "Chauffage moins performant",
  "Zones de plancher chauffant irrégulières",
  "Plusieurs années sans entretien",
];

const REASONS = [
  { icon: Wrench, t: "Expertise technique", d: "Une maîtrise complète des installations hydrauliques." },
  { icon: MapPin, t: "Intervention locale", d: "Proximité et réactivité dans tout le Morbihan et Sud-Finistère." },
  { icon: Sparkles, t: "Solutions adaptées", d: "Chaque installation reçoit un traitement sur-mesure." },
  { icon: Users, t: "Accompagnement pro", d: "Un interlocuteur unique, du diagnostic au suivi." },
  { icon: CheckCircle2, t: "Travail soigné", d: "Chantier propre, protégé et parfaitement rangé." },
];

const FAQ = [
  { q: "Qu'est-ce qu'un désembouage ?", a: "Le désembouage est une opération d'entretien qui consiste à éliminer les boues (mélange de rouille, calcaire et micro-organismes) accumulées dans un circuit de chauffage à eau chaude." },
  { q: "Pourquoi mon chauffage chauffe moins bien ?", a: "L'accumulation de boues freine la circulation de l'eau et réduit les échanges thermiques. Un désembouage restaure la performance d'origine." },
  { q: "À quelle fréquence faut-il réaliser un désembouage ?", a: "En moyenne tous les 5 à 10 ans selon la qualité de l'eau, l'âge de l'installation et la nature du réseau (mixte, ferreux, PER)." },
  { q: "Est-ce obligatoire ?", a: "Ce n'est pas obligatoire au sens légal mais fortement recommandé, et parfois exigé par les constructeurs pour maintenir les garanties." },
  { q: "Combien de temps dure une intervention ?", a: "Une intervention classique dure entre une demi-journée et une journée complète selon la complexité et la taille du réseau." },
  { q: "Est-ce adapté aux planchers chauffants ?", a: "Oui, c'est même l'installation la plus concernée : les diamètres réduits des boucles PER retiennent facilement les boues." },
  { q: "Est-ce adapté aux installations solaires ?", a: "Oui, nous traitons les circuits solaires thermiques avec des produits spécifiques compatibles glycol." },
  { q: "Quelle différence entre rinçage et désembouage ?", a: "Le rinçage évacue l'eau sale, le désembouage utilise un produit chimique adapté puis un cycle complet pour éliminer les dépôts incrustés." },
];

const REVIEWS = [
  { name: "Sophie L.", city: "Vannes", text: "Intervention impeccable sur notre plancher chauffant. Chauffage redevenu homogène partout. Merci !" },
  { name: "Jean-Marc P.", city: "Lorient", text: "Professionnels, ponctuels et pédagogues. Devis clair et respecté à l'euro près." },
  { name: "Marie D.", city: "Quimperlé", text: "Après 12 ans sans entretien, mes radiateurs chauffent enfin correctement. Bravo pour le travail soigné." },
  { name: "Fabrice R.", city: "Auray", text: "Un vrai artisan local qui prend le temps d'expliquer. Je recommande sans hésitation." },
];

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(i === 0);
  return (
    <div className="border border-border rounded-2xl bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5 hover:bg-accent/40 transition-colors"
      >
        <span className="font-semibold text-navy">{q}</span>
        <ChevronDown className={`w-5 h-5 text-blue-secondary shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="px-5 sm:px-6 pb-5 text-navy/75 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

function Index() {
  useReveal();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <Hero />

        {/* Zone d'intervention */}
        <Section
          id="zone"
          eyebrow="Zone d'intervention"
          title="Une intervention locale dans le Morbihan et le Sud-Finistère"
          subtitle="Action Désembouage intervient auprès des particuliers et des professionnels sur l'ensemble du Morbihan ainsi que dans le Sud-Finistère."
          tone="muted"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <BretagneMap />
            <div className="reveal">
              <ul className="space-y-4 mb-8">
                {[
                  "Vannes, Lorient, Auray, Quimperlé",
                  "Interventions particuliers et professionnels",
                  "Devis gratuit et sans engagement",
                  "Déplacement rapide sur toute la zone",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-turquoise/15 grid place-items-center mt-0.5 shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-blue-secondary" />
                    </div>
                    <span className="text-navy/80">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => scrollToId("contact")} className="btn-cta">
                  Prendre rendez-vous <ArrowRight className="w-4 h-4" />
                </button>
                <a href={PHONE_LINK} className="btn-ghost">
                  <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* Qualifications */}
        <Section
          id="qualifications"
          eyebrow="Confiance"
          title="Une entreprise qualifiée et reconnue"
          subtitle="Nos qualifications attestent de notre savoir-faire et garantissent une prestation conforme aux normes en vigueur."
        >
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="md:col-span-2 reveal">
              <div className="relative rounded-3xl p-8 sm:p-10 border-2 border-navy/10 bg-gradient-to-br from-white to-accent/50 shadow-soft">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-navy grid place-items-center shrink-0 shadow-soft">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold tracking-widest text-blue-secondary mb-1">Qualification</div>
                    <h3 className="text-2xl font-bold text-navy">Qualisav Désembouage</h3>
                    <p className="mt-3 text-navy/70 leading-relaxed">
                      La certification Qualisav garantit l'expertise et la conformité de nos interventions
                      de désembouage. Elle est délivrée après audit de nos compétences techniques,
                      de notre équipement et de notre respect des règles de l'art.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal grid gap-4">
              <div className="rounded-2xl border border-border p-6 bg-white text-center flex flex-col items-center justify-center min-h-[140px]">
                <Shield className="w-8 h-8 text-blue-secondary mb-2" />
                <div className="text-sm font-semibold text-navy">Assurance décennale</div>
              </div>
              <div className="rounded-2xl border border-border p-6 bg-white text-center flex flex-col items-center justify-center min-h-[140px]">
                <CheckCircle2 className="w-8 h-8 text-turquoise mb-2" />
                <div className="text-sm font-semibold text-navy">Produits certifiés</div>
              </div>
            </div>
          </div>
        </Section>

        {/* Comment ça marche */}
        <Section
          id="desembouage"
          eyebrow="Le désembouage"
          title="Comment se déroule une intervention ?"
          subtitle="Un protocole rigoureux en 5 étapes pour redonner à votre installation toute sa performance."
          tone="muted"
        >
          <div className="relative">
            {/* progress line */}
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-turquoise via-blue-secondary to-navy opacity-40" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="reveal text-center" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="relative mx-auto w-16 h-16 rounded-2xl bg-white shadow-soft grid place-items-center border border-border">
                      <Icon className="w-7 h-7 text-blue-secondary" />
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-red text-white text-xs font-bold grid place-items-center">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 font-bold text-navy">{s.title}</h3>
                    <p className="mt-2 text-sm text-navy/70 leading-relaxed">{s.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>

        {/* Pourquoi désembouer */}
        <Section
          eyebrow="Performance & économies"
          title="Pourquoi faire un désembouage ?"
          subtitle="Une opération d'entretien indispensable pour préserver votre confort, votre budget et vos équipements."
        >
          <div className="grid lg:grid-cols-2 gap-10">
            {/* A */}
            <div className="reveal rounded-3xl border border-border p-8 bg-gradient-to-br from-white to-accent/30">
              <div className="inline-flex items-center gap-2 text-brand-red font-bold text-sm uppercase tracking-wider mb-3">
                <span className="w-8 h-8 rounded-full bg-brand-red/10 grid place-items-center">A</span>
                D'où viennent les boues ?
              </div>
              <p className="text-navy/75 leading-relaxed">
                Les boues résultent de la <strong>corrosion interne</strong> des métaux, de{" "}
                <strong>l'oxydation</strong>, des <strong>dépôts calcaires</strong> et de la{" "}
                <strong>prolifération de bactéries</strong>. Elles s'accumulent progressivement
                dans les circuits, obstruant les diamètres les plus fins comme les boucles de plancher chauffant.
              </p>
            </div>

            {/* B */}
            <div className="reveal rounded-3xl border border-border p-8 bg-white">
              <div className="inline-flex items-center gap-2 text-brand-red font-bold text-sm uppercase tracking-wider mb-4">
                <span className="w-8 h-8 rounded-full bg-brand-red/10 grid place-items-center">B</span>
                Les bénéfices concrets
              </div>
              <ul className="space-y-3">
                {BENEFITS.map((b) => {
                  const Icon = b.icon;
                  return (
                    <li key={b.t} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-turquoise/15 grid place-items-center shrink-0">
                        <Icon className="w-4.5 h-4.5 text-blue-secondary" />
                      </div>
                      <span className="text-navy/80">{b.t}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* C */}
            <div className="reveal rounded-3xl border border-border p-8 bg-white">
              <div className="inline-flex items-center gap-2 text-brand-red font-bold text-sm uppercase tracking-wider mb-4">
                <span className="w-8 h-8 rounded-full bg-brand-red/10 grid place-items-center">C</span>
                Quand faut-il désembouer ?
              </div>
              <ul className="space-y-3">
                {SYMPTOMS.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                    <span className="text-navy/80">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* D */}
            <div className="reveal rounded-3xl p-8 text-white shadow-elevated" style={{ background: "linear-gradient(135deg, var(--navy), var(--blue-secondary))" }}>
              <div className="inline-flex items-center gap-2 text-turquoise font-bold text-sm uppercase tracking-wider mb-4">
                <span className="w-8 h-8 rounded-full bg-white/15 grid place-items-center">D</span>
                Pourquoi Action Désembouage ?
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {REASONS.map((r) => {
                  const Icon = r.icon;
                  return (
                    <div key={r.t} className="rounded-xl bg-white/10 backdrop-blur p-4 border border-white/10">
                      <Icon className="w-5 h-5 text-turquoise mb-2" />
                      <div className="font-semibold text-white text-sm">{r.t}</div>
                      <div className="text-xs text-white/75 mt-1 leading-relaxed">{r.d}</div>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => scrollToId("contact")} className="btn-cta mt-6">
                Recevoir mon devis <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" eyebrow="FAQ" title="Vos questions, nos réponses" tone="muted">
          <div className="max-w-3xl mx-auto space-y-3 reveal">
            {FAQ.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} i={i} />
            ))}
          </div>
        </Section>

        {/* Avis clients */}
        <Section id="avis" eyebrow="Témoignages" title="Nos clients nous recommandent" subtitle="Des interventions réussies partout dans le Morbihan et le Sud-Finistère.">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((r) => (
              <div key={r.name} className="reveal rounded-2xl border border-border bg-white p-6 shadow-soft flex flex-col">
                <div className="flex text-brand-red mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-navy/80 text-sm leading-relaxed flex-1">"{r.text}"</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="font-semibold text-navy text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.city}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Contact final */}
        <Section
          id="contact"
          eyebrow="Contact"
          title="Demandez votre devis gratuit"
          subtitle="Un projet, une question ? Nous vous répondons rapidement."
          tone="muted"
        >
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 reveal space-y-6">
              <div className="rounded-3xl bg-navy text-white p-8 shadow-elevated">
                <h3 className="text-2xl font-bold text-white mb-2">Action Désembouage</h3>
                <p className="text-white/70 text-sm mb-6">Spécialiste chauffage — Morbihan & Sud-Finistère</p>
                <div className="space-y-4">
                  <a href={PHONE_LINK} className="flex items-center gap-3 group">
                    <div className="w-11 h-11 rounded-xl bg-brand-red grid place-items-center group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-white/60 uppercase tracking-wide">Téléphone</div>
                      <div className="font-semibold">{PHONE_DISPLAY}</div>
                    </div>
                  </a>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 group">
                    <div className="w-11 h-11 rounded-xl bg-white/10 grid place-items-center group-hover:bg-white/20 transition-colors">
                      <Mail className="w-5 h-5 text-turquoise" />
                    </div>
                    <div>
                      <div className="text-xs text-white/60 uppercase tracking-wide">Email</div>
                      <div className="font-semibold text-sm">{EMAIL}</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/10 grid place-items-center">
                      <MapPin className="w-5 h-5 text-turquoise" />
                    </div>
                    <div>
                      <div className="text-xs text-white/60 uppercase tracking-wide">Zone d'intervention</div>
                      <div className="font-semibold text-sm">Morbihan · Sud-Finistère</div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a href={PHONE_LINK} className="btn-cta justify-center flex-1">
                    <Phone className="w-4 h-4" /> Appeler
                  </a>
                  <a href={`mailto:${EMAIL}`} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-navy font-semibold hover:bg-turquoise hover:text-white transition-colors flex-1">
                    <Mail className="w-4 h-4" /> Écrire
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 reveal">
              <ContactForm />
            </div>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="bg-navy text-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 grid place-items-center">
                  <Droplets className="w-5 h-5 text-turquoise" />
                </div>
                <div>
                  <div className="font-display font-bold text-white text-lg">Action Désembouage</div>
                  <div className="text-xs text-white/60 uppercase tracking-wide">Morbihan · Sud-Finistère</div>
                </div>
              </div>
              <p className="text-sm text-white/70 max-w-md leading-relaxed">
                Spécialiste du désembouage de planchers chauffants, radiateurs et systèmes solaires.
                Entreprise locale qualifiée Qualisav.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white mb-3">Navigation</div>
              <ul className="space-y-2 text-sm">
                {NAV.map((n) => (
                  <li key={n.id}>
                    <a href={`#${n.id}`} onClick={(e) => { e.preventDefault(); scrollToId(n.id); }} className="hover:text-turquoise transition-colors">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-3">Contact</div>
              <ul className="space-y-2 text-sm">
                <li><a href={PHONE_LINK} className="hover:text-turquoise transition-colors">{PHONE_DISPLAY}</a></li>
                <li><a href={`mailto:${EMAIL}`} className="hover:text-turquoise transition-colors break-all">{EMAIL}</a></li>
                <li className="text-white/60">Morbihan · Sud-Finistère</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/60">
            <div>© {new Date().getFullYear()} Action Désembouage. Tous droits réservés.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-turquoise">Mentions légales</a>
              <a href="#" className="hover:text-turquoise">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating mobile call button */}
      <a
        href={PHONE_LINK}
        className="lg:hidden fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-brand-red text-white grid place-items-center shadow-elevated"
        aria-label="Appeler"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}
