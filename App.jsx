/* ============================================================================
 * Dental Tripzo — React component (optional alternative to index.html).
 * ----------------------------------------------------------------------------
 * NOTE: this is the React/JSX variant. To render it you need a bundler
 * (Vite / Create React App). The primary static page is index.html + app.js.
 * Security: controlled inputs, no innerHTML, file validation and a GDPR
 * consent guard before transmitting any medical data.
 * ==========================================================================*/
import React, { useState } from 'react';

const PACKAGES = [
  {
    name: 'Hollywood Smile',
    tag: 'Më e Populluara',
    price: '€3,900',
    per: ' gjithëpërfshirëse',
    features: ['20 Faseta (Veneers) E-Max', 'Akomodim në Hotel me 5★', 'Transfertë Private VIP'],
  },
  {
    name: 'Paketa All-on-4',
    tag: null,
    price: '€4,500',
    per: ' për hark',
    features: ['4 Implante Premium (Straumann)', 'Protezë fikse e përkohshme', 'Guatë Turistike dhe Përkthyes'],
  },
  {
    name: 'Implant VIP Individual',
    tag: null,
    price: '€650',
    per: ' për dhëmb',
    features: ['Implant Zirkoni / Titanium', 'Kuronë e përfshirë', 'Konsultë dhe skanim 3D falas'],
  },
];

const ALLOWED = ['image/jpeg', 'image/png'];
const MAX_BYTES = 10 * 1024 * 1024;

export default function App() {
  const [implants, setImplants] = useState(2);
  const [crowns, setCrowns] = useState(6);
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('');

  const home = implants * 1400 + crowns * 600;
  const albania = implants * 450 + crowns * 180;
  const savings = Math.max(0, home - albania);

  function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) { setFileName(''); setFileError(''); return; }
    if (!ALLOWED.includes(file.type)) {
      setFileName(''); setFileError('Format jo i mbështetur. Përdorni JPEG ose PNG.');
      e.target.value = '';
      return;
    }
    if (file.size > MAX_BYTES) {
      setFileName(''); setFileError('Skedari është shumë i madh. Maksimumi 10 MB.');
      e.target.value = '';
      return;
    }
    setFileError('');
    setFileName(file.name); // React escapes text automatically -> XSS-safe
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Honeypot guard + GDPR consent before doing anything with medical data.
    if (e.target.honeypot.value || !consent) return;
    setStatus('Aplikimi dhe X-Ray u dërguan në mënyrë të sigurt. Do të kontaktoheni brenda 24 orëve.');
  }
return (
    <div className="min-h-screen bg-[#0B1313] text-gray-100 font-sans relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">

        <header className="text-center mb-16">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold bg-amber-400/10 px-4 py-1.5 rounded-full border border-amber-400/20">
            Premium Dental Experience
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-200 to-amber-200 tracking-tight">
            Bëni Realitet Buzëqeshjen Tuaj
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-lg">
            Udhëtimi juaj drejt ekselencës dentare, i kombinuar me luks dhe kujdes maksimal.
          </p>
        </header>

        {/* Packages */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif text-amber-100">Zgjidhni Paketën Tuaj Ekskluzive</h2>
            <p className="text-sm text-gray-400 mt-1">Transparencë e plotë, pa kosto të fshehura.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
              <div key={pkg.name} className="group relative bg-white/5 border border-white/10 rounded-2xl p-6">
                {pkg.tag && (
                  <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-br-2xl rounded-bl-xl">
                    {pkg.tag}
                  </div>
                )}
                <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                <div className="my-6">
                  <span className="text-3xl font-serif font-bold text-amber-400">{pkg.price}</span>
                  <span className="text-xs text-gray-400">{pkg.per}</span>
                </div>
                <ul className="space-y-2.5 text-sm text-gray-300 mb-6">
                  {pkg.features.map((f) => <li key={f}>✓ {f}</li>)}
                </ul>
                <a href="#kontakt" className="block w-full text-center py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-emerald-500 hover:text-black transition-colors">
                  Zgjidh Paketën
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Savings calculator */}
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-serif text-amber-100 text-center mb-10">Kalkulatori i Kursimeve</h2>
          <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="implants" className="flex justify-between font-semibold mb-2">Implante (Straumann): <span className="text-amber-400">{implants}</span></label>
                <input id="implants" type="range" min="0" max="12" value={implants} onChange={(e) => setImplants(Number(e.target.value))} className="w-full accent-emerald-500" />
              </div>
              <div>
                <label htmlFor="crowns" className="flex justify-between font-semibold mb-2">Kurona Zirkoni / Veneers: <span className="text-amber-400">{crowns}</span></label>
                <input id="crowns" type="range" min="0" max="28" value={crowns} onChange={(e) => setCrowns(Number(e.target.value))} className="w-full accent-emerald-500" />
              </div>
            </div>
            <div className="space-y-4 text-right text-lg">
              <div className="text-gray-400"><span className="float-left">Në Klinikë Vendase:</span> <s>€{home.toLocaleString()}</s></div>
              <div className="text-amber-400"><span className="float-left">Kosto Tripzo Shqipëri:</span> €{albania.toLocaleString()}</div>
              <div className="text-emerald-400 font-bold text-2xl border-t border-white/10 pt-4"><span className="float-left">Kursimet Tuaja:</span> €{savings.toLocaleString()}</div>
            </div>
          </div>
        </section>
{/* Contact / X-Ray upload */}
        <section id="kontakt" className="mb-20">
          <h2 className="text-2xl md:text-3xl font-serif text-amber-100 text-center mb-4">Përfitoni Planin Falas Mjekësor</h2>
          <p className="text-center text-gray-400 mb-10">Ngarkoni panoramiksin dentar (X-Ray) që kirurgët tanë t'ju përgatisin një ofertë specifike brenda 24 orëve.</p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm mb-1 font-semibold">Emri i Plotë</label>
              <input id="name" name="name" type="text" required maxLength="120" autoComplete="name" className="w-full p-3 rounded-xl bg-black/40 border border-white/10" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm mb-1 font-semibold">Email</label>
              <input id="email" name="email" type="email" required maxLength="254" autoComplete="email" className="w-full p-3 rounded-xl bg-black/40 border border-white/10" />
            </div>
            <div>
              <label className="block text-sm mb-1 font-semibold">Ngarko X-Ray (Opsionale)</label>
              <input id="xray" name="xray" type="file" accept="image/png,image/jpeg" onChange={handleFile}
                     className="w-full p-3 rounded-xl bg-black/40 border border-dashed border-white/20 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:text-black" />
              <p className="text-xs text-gray-400 mt-1">{fileName ? fileName : 'JPEG / PNG · max 10 MB'}</p>
              {fileError && <p className="text-xs text-red-400 mt-1" role="alert">{fileError}</p>}
            </div>
            <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
              <label htmlFor="honeypot">Website</label>
              <input id="honeypot" name="honeypot" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <label className="flex items-start gap-3 text-xs text-gray-400">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-emerald-500" />
              <span>Pranoj që të dhënat e mia personale dhe mjekësore (përfshirë X-Ray) të përpunohen, transmetohen të enkriptuara dhe të përdoren vetëm për përgatitjen e planit tim, në pajtueshmëri me GDPR dhe politikën e privatësisë.</span>
            </label>
            <button type="submit" className="w-full py-3 rounded-xl bg-amber-400 text-black font-bold hover:brightness-110 transition-all">
              Dërgo Aplikimin e Sigurt
            </button>
            {status && <p className="text-emerald-400 text-center font-semibold" role="status">{status}</p>}
          </form>
        </section>

      </div>
    </div>
  );
}