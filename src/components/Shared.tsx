import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Vehicles } from '@/entities';
import { MAP_LINK, SITE, TIMES } from '@/lib/site';
import { ratingOf, reviewsOf, saveBooking, useLive } from '@/lib/vehicles';

const CAR_COLORS = ['#1E5BFF', '#0B0B0F', '#5B6170'];

export function CarArt({ name = 'Car', index = 0 }: { name?: string; index?: number }) {
  const c = CAR_COLORS[index % 3];
  return (
    <svg viewBox="0 0 220 90" role="img" aria-label={name} className="h-auto w-4/5">
      <path d="M12 62 L24 42 Q34 30 54 29 L128 29 Q152 30 168 46 L200 52 Q208 54 208 62 L208 68 L12 68Z" fill={c} />
      <path d="M60 34 L90 34 L90 48 L44 48Q50 36 60 34ZM98 34 L126 34Q142 36 154 48 L98 48Z" fill="#dbe6ff" opacity=".9" />
      <circle cx="58" cy="69" r="13" fill="#111" stroke="#fff" strokeWidth="4" />
      <circle cx="162" cy="69" r="13" fill="#111" stroke="#fff" strokeWidth="4" />
    </svg>
  );
}

export function VehicleImage({ v, index = 0, className = '' }: { v: Vehicles; index?: number; className?: string }) {
  return (
    <div className={`flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-white/70 to-primary/10 ${className}`}>
      {v.mainImage ? <Image src={v.mainImage} alt={`${v.name || 'Self drive car'} for rent in Kolkata`} width={700} className="h-full w-full object-cover" /> : <CarArt name={v.name} index={index} />}
    </div>
  );
}

// Glassmorphism vehicle card
export function VehicleCard({ v, index = 0 }: { v: Vehicles; index?: number }) {
  const key = v.vehicleSlug || v._id;
  const { booked } = useLive(key);
  return (
    <article className="flex flex-col rounded-3xl border border-white/80 bg-white/55 p-5 shadow-[0_12px_40px_rgba(30,91,255,0.14)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(30,91,255,0.24)]">
      <VehicleImage v={v} index={index} className="mb-4 h-40" />
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-foreground px-3 py-1 text-xs font-heading text-white">{v.type || 'Car'}</span>
        <span className="text-sm font-heading">★ {ratingOf(key)} <span className="font-paragraph text-foreground/60">({reviewsOf(key)})</span></span>
      </div>
      <h3 className="mt-3 text-xl font-heading">{v.name}</h3>
      <p className="mt-2 text-sm font-heading text-[#d6401f]">{booked} booked in last 24 hours</p>
      <div className="my-3 flex flex-wrap gap-2 text-xs">
        {[v.numberOfSeats ? `${v.numberOfSeats} Seats` : '', v.fuelType, v.transmissionType, v.hasAc ? 'AC' : ''].filter(Boolean).map((t) => (
          <span key={t as string} className="rounded-full border border-foreground/10 bg-white/70 px-3 py-1 font-paragraph">{t}</span>
        ))}
      </div>
      <div className="mb-4 text-2xl font-heading">₹{(v.rentalPricePerDay || 0).toLocaleString('en-IN')}<span className="text-sm font-paragraph text-foreground/60"> / day</span></div>
      <Link to={`/fleet/${key}`} className="mt-auto rounded-full bg-foreground py-3 text-center font-heading text-white transition hover:bg-primary">View &amp; Book</Link>
    </article>
  );
}

// Kolkata skyline: Howrah Bridge, Victoria Memorial and the river
export function Skyline() {
  const lines = useMemo(() => {
    const pts = [[250, 240], [350, 150], [450, 100], [600, 150], [750, 100], [850, 150], [950, 240]];
    const out: { x: number; y: number }[] = [];
    for (let x = 262; x < 950; x += 22) {
      let i = 0; while (i < pts.length - 2 && x > pts[i + 1][0]) i++;
      const [a, b] = [pts[i], pts[i + 1]]; out.push({ x, y: a[1] + (b[1] - a[1]) * ((x - a[0]) / (b[0] - a[0])) });
    }
    return { pts: pts.map((p) => p.join(',')).join(' L'), out };
  }, []);
  return (
    <svg className="pointer-events-none absolute inset-x-0 bottom-0 w-full opacity-90" viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <g stroke="#8fb0ff" strokeWidth="2.2" fill="none" opacity=".85">
        <path d={`M${lines.pts}`} /><line x1="0" y1="240" x2="1000" y2="240" strokeWidth="4" />
        {lines.out.map((l) => <line key={l.x} x1={l.x} y1={l.y} x2={l.x} y2="240" />)}
      </g>
      <g fill="#8fb0ff" opacity=".55"><rect x="60" y="205" width="170" height="35" /><path d="M110 205 Q145 110 180 205Z" /><rect x="142" y="92" width="6" height="22" /><circle cx="75" cy="196" r="9" /><circle cx="215" cy="196" r="9" /></g>
      <path d="M0 250 Q60 242 120 250 T240 250 T360 250 T480 250 T600 250 T720 250 T840 250 T960 250 T1080 250 V300 H0Z" fill="#0b1b5c" />
      <path d="M0 268 Q70 260 140 268 T280 268 T420 268 T560 268 T700 268 T840 268 T980 268 V300 H0Z" fill="#05060d" />
    </svg>
  );
}

export function CountUp({ to, suffix = '+' }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => { let i = 0; const t = setInterval(() => { i += Math.ceil(to / 40); if (i >= to) { i = to; clearInterval(t); } setN(i); }, 30); return () => clearInterval(t); }, [to]);
  return <>{n.toLocaleString('en-IN')}{suffix}</>;
}

const FAQS = [
  ['What documents do I need to rent a self drive car in Kolkata?', 'A valid driving licence, a government ID (Aadhaar) and a refundable security deposit.'],
  ['Is the car insured?', 'Yes. All our cars are clean, serviced and insured. Insurance details are shared at booking.'],
  ['Where do I pick up and drop the car?', `At our location: ${SITE.address}.`],
  ['Are there km limits?', 'Each car has a daily km limit shown on its page. Extra km are charged at a transparent rate.'],
  ['Can I book online?', 'Yes. Pick a car, click Book Now and submit the form. We confirm on call or WhatsApp.'],
];
export function Faq() {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {FAQS.map(([q, a]) => (
        <details key={q} className="rounded-2xl border border-foreground/10 bg-white px-5 py-4">
          <summary className="cursor-pointer font-heading">{q}</summary>
          <p className="mt-2 font-paragraph text-foreground/70">{a}</p>
        </details>
      ))}
    </div>
  );
}

const fieldCls = 'w-full rounded-xl border border-foreground/15 bg-white px-4 py-3 font-paragraph outline-none focus:border-primary focus:ring-2 focus:ring-primary/30';
const labelCls = 'mb-1 mt-4 block text-sm font-heading';

export function BookingForm({ vehicleName, onDone }: { vehicleName?: string; onDone?: () => void }) {
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const today = new Date().toISOString().slice(0, 10);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (f.dropDate < f.pickupDate) { setErr('Drop date must be after pickup date.'); return; }
    setErr(''); setBusy(true);
    const data = { customerName: f.customerName, phone: f.phone, vehicleName: f.vehicleName || vehicleName || 'Any available car', pickupDate: f.pickupDate, pickupTime: f.pickupTime, dropDate: f.dropDate, dropTime: f.dropTime, note: f.note || '' };
    const saved = await saveBooking(data);
    try { sessionStorage.setItem('rentigo_booking', JSON.stringify({ ...data, saved })); } catch { /* ignore */ }
    setBusy(false); onDone?.(); nav('/thank-you');
  }

  return (
    <form onSubmit={submit}>
      {!vehicleName && (<><label className={labelCls}>Car (optional)</label><input name="vehicleName" className={fieldCls} placeholder="e.g. Swift Dzire" /></>)}
      <label className={labelCls}>Full name</label><input name="customerName" required className={fieldCls} placeholder="Your name" />
      <label className={labelCls}>Phone / WhatsApp</label><input name="phone" required pattern="[0-9+ ]{10,14}" inputMode="tel" className={fieldCls} placeholder="10-digit mobile number" />
      <div className="grid grid-cols-2 gap-3">
        <div><label className={labelCls}>Pickup date</label><input type="date" name="pickupDate" min={today} required className={fieldCls} /></div>
        <div><label className={labelCls}>Pickup time</label><select name="pickupTime" defaultValue="10:00 AM" className={fieldCls}>{TIMES.map((t) => <option key={t}>{t}</option>)}</select></div>
        <div><label className={labelCls}>Drop date</label><input type="date" name="dropDate" min={today} required className={fieldCls} /></div>
        <div><label className={labelCls}>Drop time</label><select name="dropTime" defaultValue="10:00 AM" className={fieldCls}>{TIMES.map((t) => <option key={t}>{t}</option>)}</select></div>
      </div>
      <p className="mt-4 text-sm font-paragraph text-foreground/70"><b className="font-heading">Pickup &amp; drop location:</b> {SITE.address}. <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="font-heading text-primary">Get Directions</a></p>
      <label className={labelCls}>Note (optional)</label><textarea name="note" rows={2} className={fieldCls} />
      {err && <p className="mt-3 text-sm font-heading text-destructive">{err}</p>}
      <button type="submit" disabled={busy} className="mt-5 w-full rounded-full bg-primary py-3 font-heading text-white transition hover:opacity-90 disabled:opacity-60">{busy ? 'Submitting…' : 'Confirm Booking Request'}</button>
    </form>
  );
}

export function BookingDialog({ vehicleName, open, onOpenChange }: { vehicleName: string; open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-lg overflow-y-auto rounded-3xl bg-white">
        <DialogHeader><DialogTitle className="font-heading text-2xl">Book {vehicleName}</DialogTitle><DialogDescription>Fill in your details. Our team will confirm within minutes.</DialogDescription></DialogHeader>
        <BookingForm vehicleName={vehicleName} onDone={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
