const CARD_BASE =
  "group relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300";

const CTA_BASE =
  "w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium group-hover:text-black group-hover:border-transparent transition-all duration-300";

const PACKAGE_ACCENTS = {
  emerald: {
    card: "hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]",
    title: "group-hover:text-emerald-400",
    cta: "group-hover:bg-emerald-500",
  },
  amber: {
    card: "hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]",
    title: "group-hover:text-amber-400",
    cta: "group-hover:bg-amber-500",
  },
  white: {
    card: "hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]",
    title: "",
    cta: "group-hover:bg-white",
  },
};

const PACKAGES = [
  {
    name: "Hollywood Smile",
    tagline: "Transformim i plotë estetik",
    price: "€3,900",
    priceNote: " / gjithëpërfshirëse",
    accent: "emerald",
    ribbon: "Më e Populluara",
    features: [
      "20 Faseta (Veneers) E-Max",
      "Akomodim në Hotel me 5★",
      "Transfertë Private VIP",
    ],
  },
  {
    name: "Paketa All-on-4",
    tagline: "Rikonstruksion i plotë i harkut",
    price: "€4,500",
    priceNote: " / për hark",
    accent: "amber",
    features: [
      "4 Implante Premium (Straumann)",
      "Protezë fikse e përkohshme",
      "Guatë Turistike dhe Përkthyes",
    ],
  },
  {
    name: "Implant VIP Individual",
    tagline: "Zgjidhje specifike dhe e shpejtë",
    price: "€650",
    priceNote: " / për dhëmb",
    accent: "white",
    features: [
      "Implant Zirkoni / Titanium",
      "Kuronë e përfshirë",
      "Konsultë dhe skanim 3D falas",
    ],
  },
];

const ITINERARY = [
  {
    day: "DITA 01",
    title: "Mbrritja VIP",
    text: "Pritja në aeroport dhe akomodimi në hotel.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80",
  },
  {
    day: "DITA 02",
    title: "Konsulta & Skanimi",
    text: "Skanim 3D Dixhital dhe plani final i buzëqeshjes.",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80",
  },
  {
    day: "DITA 03",
    title: "Relaks & Turizëm",
    text: "Eksploroni qytetin dhe shijoni gastronominë vendase.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
  },
  {
    day: "DITA 04",
    title: "Vendosja Finale",
    text: "Cementimi i fasetave/kuronave të reja.",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=400&q=80",
  },
  {
    day: "DITA 05",
    title: "Kthimi me Shkëlqim",
    text: "Check-out dhe fluturimi i kthimit me buzëqeshjen e ëndrrave.",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80",
  },
];

const FAQS = [
  {
    question: "Sa vite garanci kanë materialet tona?",
    answer:
      "Të gjitha fasetat E-Max dhe implantet Straumann vijnë me një garanci të plotë ndërkombëtare nga 10 vite deri në garanci të përjetshme (për implantet), të certifikuara me pasaportë mjekësore.",
  },
  {
    question: "A është i përfshirë hoteli dhe transporti në çmim?",
    answer:
      'Po, absolutisht. Paketat tona "All-inclusive" mbulojnë akomodimin në hotele luksoze me 5 yje në qendër të qytetit dhe të gjitha transfertat me shofer privat nga aeroporti tek klinika dhe anasjelltas.',
  },
  {
    question: "Sa ditë duhet të qëndroj gjithsej?",
    answer:
      'Për shumicën e trajtimeve estetike si Hollywood Smile, mjaftojnë vetëm 5 deri në 7 ditë qëndrimi falë laboratorëve tanë digjitalë "In-House" që përshpejtojnë procesin.',
  },
];

function SectionHeading({ title, subtitle, className = "mb-8" }) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="text-2xl md:text-3xl font-serif text-amber-100">{title}</h2>
      <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
    </div>
  );
}

function PackageCard({ pkg }) {
  const accent = PACKAGE_ACCENTS[pkg.accent];
  return (
    <div className={`${CARD_BASE} ${accent.card}`}>
      {pkg.ribbon && (
        <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-tr-2xl rounded-bl-xl border-bl border-white/10">
          {pkg.ribbon}
        </div>
      )}
      <h3 className={`text-xl font-bold text-white transition-colors ${accent.title}`}>
        {pkg.name}
      </h3>
      <p className="text-xs text-gray-400 mt-1">{pkg.tagline}</p>
      <div className="my-6">
        <span className="text-3xl font-serif font-bold text-amber-400">{pkg.price}</span>
        <span className="text-xs text-gray-400">{pkg.priceNote}</span>
      </div>
      <ul className="space-y-2.5 text-sm text-gray-300 mb-6">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            ✓ {feature}
          </li>
        ))}
      </ul>
      <button className={`${CTA_BASE} ${accent.cta}`}>Zgjidh Paketën</button>
    </div>
  );
}

function ItineraryCard({ stop }) {
  return (
    <div className="group relative h-72 rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:scale-[1.03] hover:border-emerald-500/30 cursor-pointer shadow-lg">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url('${stop.image}')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 p-4 w-full">
        <span className="text-xs font-bold text-amber-400 tracking-widest block mb-1">
          {stop.day}
        </span>
        <h4 className="text-base font-bold text-white">{stop.title}</h4>
        <p className="text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
          {stop.text}
        </p>
      </div>
    </div>
  );
}

function FaqItem({ faq }) {
  return (
    <details className="group bg-white/[0.02] border border-white/5 rounded-xl transition-all duration-300 open:bg-white/[0.04] open:border-emerald-500/20">
      <summary className="flex justify-between items-center p-5 cursor-pointer list-none focus:outline-none select-none">
        <span className="font-medium text-white group-open:text-emerald-400 transition-colors">
          {faq.question}
        </span>
        <span className="transition-transform duration-300 group-open:rotate-180 text-amber-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </summary>
      <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3">
        {faq.answer}
      </div>
    </details>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B1313] text-gray-100 font-sans relative overflow-hidden selection:bg-emerald-500 selection:text-black">
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <header className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-400/20">
            Premium Dental Experience
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-200 to-amber-200 tracking-tight">
            Bëni Realitet Buzëqeshjen Tuaj
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-lg">
            Udhëtimi juaj drejt ekselencës dentare, i kombinuar me luks dhe kujdes maksimal.
          </p>
        </header>

        <section className="mb-20">
          <SectionHeading
            title="Zgjidhni Paketën Tuaj Ekskluzive"
            subtitle="Transparencë e plotë, pa kosto të fshehura."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))}
          </div>
        </section>

        <section className="mb-20">
          <SectionHeading
            title="Itinerari Juaj i Luksit"
            subtitle="Si duken 5 ditët e transformimit tuaj të madh."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ITINERARY.map((stop) => (
              <ItineraryCard key={stop.day} stop={stop} />
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-24">
          <SectionHeading
            title="Pyetjet e Shpeshta"
            subtitle="Çdo gjë që duhet të dini për garancinë dhe procesin."
            className="mb-10"
          />
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <FaqItem key={faq.question} faq={faq} />
            ))}
          </div>
        </section>
      </div>

      <div className="sticky bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0B1313] via-[#0B1313]/90 to-transparent z-50 md:hidden">
        <button className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-black font-bold text-center rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:brightness-110 active:scale-[0.98] transition-all">
          Rezervo Konsultën VIP falas
        </button>
      </div>

      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        <button className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold rounded-full shadow-[0_4px_25px_rgba(245,158,11,0.2)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-amber-300/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-900"></span>
          </span>
          Konsultë e Shpejtë VIP
        </button>
      </div>
    </div>
  );
}
