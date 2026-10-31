import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Seo, businessSchema } from '@/components/Seo';
import { CountUp, Faq, Skyline, VehicleCard } from '@/components/Shared';
import { SITE, telLink } from '@/lib/site';
import { useVehicles } from '@/lib/vehicles';

const WHY = [
  ['Clean & insured cars', 'Sanitised, serviced and fully insured before every trip.'],
  ['Easy online booking', 'Choose a car, fill a short form and you are done.'],
  ['Flexible rental plans', 'Hourly, daily, weekly and monthly options.'],
  ['Transparent pricing', 'No hidden charges. Know the price before you book.'],
];
const STEPS = [
  ['Choose your car', 'Browse the fleet and pick what suits your trip.'],
  ['Submit the form', 'Share dates and times. We confirm quickly.'],
  ['Pick up & drive', 'Show your licence and ID at our Kaikhali location, then hit the road.'],
];
const REVIEWS = [
  ['Rohit S.', 'Smooth pickup and the car was spotless.'],
  ['Ananya D.', 'Best self drive rental in Kolkata. Pricing was clear.'],
  ['Imran K.', 'Booked online in two minutes. Great support on WhatsApp.'],
];

export default function HomePage() {
  const vehicles = useVehicles();
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Seo title="Self Drive Car Rental in Kolkata | Rentigo Rental" description="Self drive car rental in Kolkata. Rent clean, insured self drive cars with easy online booking and transparent pricing." path="/" schema={businessSchema} />
      <Header />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#05060d] via-[#0a1130] to-[#0b1b5c] px-5 pb-40 pt-20 text-white">
          <div className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[620px] rounded-full bg-primary/50 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-24 right-[12%] h-44 w-44 rounded-full bg-gradient-to-br from-[#ffb35c] to-[#ff7a3d] opacity-50 blur-sm" />
          <div className="relative mx-auto max-w-6xl">
            <span className="text-xs font-heading uppercase tracking-widest text-[#8fb0ff]">Kolkata’s Trusted Self Drive Car Rental</span>
            <h1 className="mt-3 max-w-3xl text-4xl font-heading md:text-6xl">Self Drive Car Rental in <span className="text-[#6f9bff]">Kolkata</span></h1>
            <p className="mt-4 max-w-xl text-lg font-paragraph text-[#c7d2ff]">Rent self drive cars in Kolkata that are clean, insured and ready. Book in minutes, drive at your own freedom.</p>
            <div className="my-6 flex flex-wrap gap-3">
              <Link to="/fleet" className="rounded-full bg-primary px-7 py-3 font-heading text-white transition hover:opacity-90">Book Your Car</Link>
              <a href={telLink} className="rounded-full border-2 border-white px-7 py-3 font-heading">Call {SITE.phone}</a>
            </div>
            <div className="relative z-10 flex flex-wrap gap-3">
              {[[<CountUp key="a" to={1200} />, 'Kolkata drivers trusted us'], ['4.8 ★', 'Average rating'], ['24x7', 'Support & assistance']].map(([b, s], i) => (
                <div key={i} className="min-w-[150px] rounded-2xl border border-white/35 bg-white/15 px-5 py-4 shadow-lg backdrop-blur-xl"><b className="block text-2xl font-heading">{b}</b><small className="font-paragraph text-[#c7d2ff]">{s as string}</small></div>
              ))}
            </div>
          </div>
          <Skyline />
        </section>

        {/* FLEET */}
        <section className="relative overflow-hidden bg-secondary px-5 py-20">
          <div className="pointer-events-none absolute -left-20 -top-24 h-96 w-96 rounded-full bg-[#7aa2ff]/60 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-28 -right-16 h-96 w-96 rounded-full bg-primary/30 blur-[90px]" />
          <div className="relative mx-auto max-w-6xl">
            <span className="text-xs font-heading uppercase tracking-widest text-primary">Our Fleet</span>
            <h2 className="mt-2 text-3xl font-heading md:text-4xl">Popular self drive cars in Kolkata</h2>
            <p className="mb-8 font-paragraph text-foreground/70">Pick from hatchbacks, sedans and SUVs.</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{(vehicles || []).slice(0, 3).map((v, i) => <VehicleCard key={v._id} v={v} index={i} />)}</div>
            <div className="mt-10 text-center"><Link to="/fleet" className="rounded-full bg-primary px-7 py-3 font-heading text-white">See all cars</Link></div>
          </div>
        </section>

        {/* WHY */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <span className="text-xs font-heading uppercase tracking-widest text-primary">Why Rentigo</span>
            <h2 className="mb-8 mt-2 text-3xl font-heading md:text-4xl">Why rent cars in Kolkata with us</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {WHY.map(([t, d], i) => (<div key={t} className="rounded-2xl border border-foreground/10 p-6"><div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary font-heading text-white">{i + 1}</div><h3 className="font-heading text-lg">{t}</h3><p className="font-paragraph text-foreground/70">{d}</p></div>))}
            </div>
          </div>
        </section>

        {/* STEPS */}
        <section className="bg-foreground px-5 py-20 text-white">
          <div className="mx-auto max-w-6xl">
            <span className="text-xs font-heading uppercase tracking-widest text-[#8fb0ff]">How it works</span>
            <h2 className="mb-8 mt-2 text-3xl font-heading md:text-4xl">Book a self drive car in 3 steps</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {STEPS.map(([t, d], i) => (<div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-6"><div className="text-4xl font-heading text-[#6f9bff]">0{i + 1}</div><h3 className="font-heading text-lg">{t}</h3><p className="font-paragraph text-[#aab3d4]">{d}</p></div>))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 text-3xl font-heading md:text-4xl">Loved by Kolkata drivers</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {REVIEWS.map(([n, t]) => (<div key={n} className="rounded-2xl border border-foreground/10 p-6"><p className="font-paragraph text-foreground/70">“{t}”</p><b className="font-heading">{n} ★★★★★</b></div>))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-secondary px-5 py-20"><h2 className="mb-8 text-center text-3xl font-heading md:text-4xl">Self drive car rental Kolkata: FAQs</h2><Faq /></section>
      </main>
      <Footer />
    </div>
  );
}
