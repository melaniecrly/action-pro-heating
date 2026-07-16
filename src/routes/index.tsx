import { createFileRoute, Link } from "@tanstack/react-router";
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
  // Star (archivé avec la section témoignages)
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
          telephone: "+33759750218",
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
                <div className="text-xs text-muted-foreground">jusqu'à -15% de conso</div>
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
  // Stylized Bretagne silhouette. East side (right) attaches to mainland France.
  // Departments approx:
  //   Finistère (west)      - top-left + bottom-left
  //   Côtes-d'Armor (north) - top-right
  //   Ille-et-Vilaine (east)- right
  //   Morbihan (south)      - bottom-center/right
  const bretagne =
    "M 560,140 " +
    "L 560,110 L 540,105 L 520,120 L 495,105 L 470,115 L 445,100 " + // north coast east
    "L 420,115 L 395,105 L 370,120 L 345,110 L 320,125 L 295,115 " + // north coast center
    "L 270,130 L 245,120 L 220,135 L 195,125 L 170,140 L 145,130 " + // north coast west
    "L 118,150 L 95,140 L 78,160 L 65,155 " +                        // Léon
    "L 55,175 L 40,180 L 30,200 L 42,215 L 60,210 " +                // Iroise / Pointe St Mathieu
    "L 55,230 L 40,240 L 30,255 L 45,265 L 65,258 L 55,275 " +       // Crozon peninsula (jag)
    "L 75,285 L 95,275 L 88,295 L 68,305 L 55,320 " +                // Pointe du Raz area
    "L 75,330 L 100,318 L 125,325 L 145,318 L 160,335 " +            // Cap Sizun / Audierne
    "L 185,325 L 200,340 L 225,332 L 245,342 " +                     // Quimper south
    "L 265,340 L 285,352 L 305,345 L 320,358 L 340,350 " +           // Concarneau / Quimperlé
    "L 360,360 L 380,352 L 395,365 L 410,355 " +                     // Lorient
    "L 420,370 L 400,378 L 415,382 L 435,372 L 455,378 " +           // Quiberon peninsula dip
    "L 475,368 L 490,378 L 510,370 L 530,362 " +                     // Golfe du Morbihan / Vannes
    "L 550,352 L 570,340 L 585,320 L 578,300 " +                     // south-east coast
    "L 588,280 L 580,260 L 590,240 L 580,220 L 588,200 L 578,180 L 585,160 Z";

  // Sud-Finistère: south-western portion
  const sudFinistere =
    "M 30,200 L 42,215 L 60,210 L 55,230 L 40,240 L 30,255 L 45,265 L 65,258 L 55,275 " +
    "L 75,285 L 95,275 L 88,295 L 68,305 L 55,320 L 75,330 L 100,318 L 125,325 L 145,318 L 160,335 " +
    "L 185,325 L 200,340 L 225,332 L 245,342 L 265,340 L 285,352 L 300,345 " +
    "L 305,300 L 285,270 L 250,250 L 210,235 L 170,225 L 130,220 L 90,215 L 55,205 Z";

  // Morbihan: south-eastern portion
  const morbihan =
    "M 300,345 L 305,340 L 320,358 L 340,350 L 360,360 L 380,352 L 395,365 L 410,355 " +
    "L 420,370 L 400,378 L 415,382 L 435,372 L 455,378 L 475,368 L 490,378 L 510,370 L 530,362 " +
    "L 550,352 L 555,335 L 540,320 L 515,308 L 485,300 L 450,295 L 415,292 L 380,290 " +
    "L 345,295 L 320,310 L 305,325 Z";

  return (
    <div className="relative w-full aspect-[4/3] max-w-lg mx-auto reveal">
      <svg viewBox="0 0 620 420" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mor" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#04B2D9" />
            <stop offset="100%" stopColor="#048ABF" />
          </linearGradient>
          <linearGradient id="fin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#048ABF" />
            <stop offset="100%" stopColor="#1B3659" />
          </linearGradient>
        </defs>

        {/* Base Bretagne silhouette */}
        <path d={bretagne} fill="#EAF3F9" stroke="#B8D3E3" strokeWidth="1.5" strokeLinejoin="round" />

        {/* Sud-Finistère highlighted */}
        <path d={sudFinistere} fill="url(#fin)" opacity="0.92" stroke="#ffffff" strokeWidth="1.2" />

        {/* Morbihan highlighted */}
        <path d={morbihan} fill="url(#mor)" opacity="0.95" stroke="#ffffff" strokeWidth="1.2" />

        {/* Labels */}
        <g fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700">
          <text x="150" y="290" fill="#ffffff" fontSize="14" textAnchor="middle">Sud-Finistère</text>
          <text x="430" y="340" fill="#ffffff" fontSize="16" textAnchor="middle">Morbihan</text>
          <text x="400" y="180" fill="#1B3659" fontSize="11" textAnchor="middle" opacity="0.55">Côtes-d'Armor</text>
          <text x="545" y="230" fill="#1B3659" fontSize="11" textAnchor="middle" opacity="0.55">Ille-et-Vilaine</text>
          <text x="150" y="180" fill="#1B3659" fontSize="11" textAnchor="middle" opacity="0.55">Finistère Nord</text>
        </g>

        {/* Pins - Vannes (Morbihan) */}
        <g>
          <circle cx="470" cy="355" r="6" fill="#D90D1E" />
          <circle cx="470" cy="355" r="12" fill="#D90D1E" opacity="0.25">
            <animate attributeName="r" values="10;18;10" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
          </circle>
          {/* Lorient */}
          <circle cx="380" cy="345" r="5" fill="#D90D1E" />
          <circle cx="380" cy="345" r="10" fill="#D90D1E" opacity="0.25">
            <animate attributeName="r" values="8;16;8" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
          </circle>
          {/* Quimperlé / Sud-Finistère */}
          <circle cx="240" cy="320" r="5" fill="#D90D1E" />
          <circle cx="240" cy="320" r="10" fill="#D90D1E" opacity="0.25">
            <animate attributeName="r" values="8;16;8" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (status === "sending") return;
        setStatus("sending");
        setErrorMsg(null);
        const fd = new FormData(e.currentTarget);
        const payload = Object.fromEntries(fd.entries());
        try {
          const res = await fetch("/api/public/quote-request", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          setStatus("sent");
          (e.target as HTMLFormElement).reset();
        } catch (err) {
          console.error(err);
          setErrorMsg("Impossible d'envoyer votre demande. Merci d'appeler ou d'écrire par email.");
          setStatus("error");
        }
      }}
      className="bg-white rounded-3xl shadow-soft border border-border p-6 sm:p-8 grid gap-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Nom" name="nom" required />
        <Input label="Prénom" name="prenom" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Téléphone" name="telephone" type="tel" required />
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
      {/* Honeypot anti-spam */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <button type="submit" disabled={status === "sending"} className="btn-cta w-full sm:w-auto justify-center disabled:opacity-70">
        {status === "sending" ? "Envoi en cours..." : status === "sent" ? "Demande envoyée ✓" : "Envoyer ma demande"}
        {status === "idle" && <ArrowRight className="w-4 h-4" />}
      </button>
      {status === "sent" && (
        <p className="text-sm text-navy/70">
          Merci ! Votre demande a bien été transmise à <strong>contact@actiondesembouage.fr</strong>. Nous vous recontactons sous 24h ouvrées.
        </p>
      )}
      {status === "error" && errorMsg && (
        <p className="text-sm text-brand-red">{errorMsg}</p>
      )}
      <p className="text-xs text-muted-foreground">
        En envoyant ce formulaire, vous acceptez notre{" "}
        <Link to="/politique-confidentialite" className="underline hover:text-blue-secondary">politique de confidentialité</Link>.
      </p>
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
  { icon: Droplets, title: "Nettoyage", text: "Injection du produit désembouant et mise en circulation forcée pour décoller les dépôts internes." },
  { icon: Waves, title: "Rinçage", text: "Rinçage complet du circuit et évacuation des boues et impuretés." },
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

// REVIEWS archivés — la section témoignages sera republiée avec de vrais avis clients.
// const REVIEWS = [ ... ];

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
                <div className="text-sm font-semibold text-navy">Responsabilité civile</div>
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
          subtitle="Un protocole rigoureux en 4 étapes pour redonner à votre installation toute sa performance."
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

        {/* Avis clients — archivé, sera publié lorsque de véritables avis seront collectés
        <Section id="avis" eyebrow="Témoignages" title="Nos clients nous recommandent">
          ...
        </Section>
        */}

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
              <Link to="/mentions-legales" className="hover:text-turquoise">Mentions légales</Link>
              <Link to="/politique-confidentialite" className="hover:text-turquoise">Politique de confidentialité</Link>
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
