import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Seo } from '@/components/Seo';
import { VehicleCard } from '@/components/Shared';
import { useVehicles } from '@/lib/vehicles';

export default function FleetPage() {
  const vehicles = useVehicles();
  const [filter, setFilter] = useState('All');
  const types = ['All', ...Array.from(new Set((vehicles || []).map((v) => v.type).filter(Boolean) as string[]))];
  const shown = (vehicles || []).filter((v) => filter === 'All' || v.type === filter);
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Seo title="Self Drive Cars in Kolkata – Fleet & Prices | Rentigo Rental" description="Browse self drive cars in Kolkata: hatchback, sedan and SUV. Rent cars in Kolkata with transparent daily prices." path="/fleet" />
      <Header />
      <main>
        <div className="bg-gradient-to-b from-secondary to-white px-5 pb-8 pt-14"><div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-paragraph text-foreground/60"><Link to="/" className="text-primary">Home</Link> / Fleet</p>
          <h1 className="text-4xl font-heading md:text-5xl">Self Drive Cars in Kolkata</h1>
          <p className="mt-2 font-paragraph text-foreground/70">Rent cars in Kolkata with clean, insured vehicles and flat daily pricing.</p>
        </div></div>
        <section className="relative overflow-hidden bg-secondary px-5 pb-20 pt-8">
          <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[#7aa2ff]/60 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-primary/30 blur-[90px]" />
          <div className="relative mx-auto max-w-6xl">
            <div className="mb-8 flex flex-wrap gap-2">{types.map((t) => (<button key={t} onClick={() => setFilter(t)} className={`rounded-full border px-5 py-2 font-heading ${filter === t ? 'border-foreground bg-foreground text-white' : 'border-foreground/15 bg-white'}`}>{t}</button>))}</div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{shown.map((v, i) => <VehicleCard key={v._id} v={v} index={i} />)}</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
