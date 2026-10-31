import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Seo } from '@/components/Seo';
import { BookingDialog, Faq, VehicleImage } from '@/components/Shared';
import { MAP_LINK, SITE, telLink } from '@/lib/site';
import { loveOf, ratingOf, reviewsOf, useLive, useVehicles } from '@/lib/vehicles';

export default function VehicleDetailPage() {
  const { slug = '' } = useParams();
  const vehicles = useVehicles();
  const v = (vehicles || []).find((x) => x.vehicleSlug === slug || x._id === slug);
  const [open, setOpen] = useState(false);
  const { booked, viewers } = useLive(slug);

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Header />
      {!vehicles ? <div className="px-5 py-32 text-center font-paragraph">Loading…</div> : !v ? (
        <div className="px-5 py-32 text-center"><h1 className="text-3xl font-heading">Car not found</h1><Link to="/fleet" className="mt-4 inline-block text-primary">Back to fleet</Link></div>
      ) : (
        <main>
          <Seo title={`Rent ${v.name} Self Drive in Kolkata | Rentigo Rental`} description={`Book ${v.name} self drive in Kolkata from ₹${v.rentalPricePerDay}/day. ${v.fuelType || ''} ${v.transmissionType || ''}, ${v.numberOfSeats || ''} seats. Instant booking at Rentigo Rental.`} path={`/fleet/${slug}`}
            schema={{ '@context': 'https://schema.org', '@type': 'Product', name: v.name, description: v.description, offers: { '@type': 'Offer', priceCurrency: 'INR', price: v.rentalPricePerDay, availability: 'https://schema.org/InStock' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: ratingOf(slug), reviewCount: reviewsOf(slug) } }} />
          <div className="bg-gradient-to-b from-secondary to-white px-5 pb-4 pt-12"><p className="mx-auto max-w-6xl text-sm font-paragraph text-foreground/60"><Link to="/" className="text-primary">Home</Link> / <Link to="/fleet" className="text-primary">Fleet</Link> / {v.name}</p></div>
          <section className="relative overflow-hidden bg-secondary px-5 pb-16 pt-4">
            <div className="pointer-events-none absolute -left-20 -top-16 h-96 w-96 rounded-full bg-[#7aa2ff]/60 blur-[90px]" />
            <div className="relative mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <div className="rounded-3xl border border-white/80 bg-white/55 p-5 shadow-[0_12px_40px_rgba(30,91,255,0.14)] backdrop-blur-xl"><VehicleImage v={v} className="h-72 md:h-96" /></div>
                <h1 className="mt-6 text-3xl font-heading md:text-4xl">Rent {v.name} Self Drive in Kolkata</h1>
                <div className="my-4 flex flex-wrap gap-2 text-sm font-heading">
                  <span className="rounded-full border border-[#ffd5c9] bg-[#fff1ed] px-4 py-2 text-[#d6401f]">🔥 {booked} booked in last 24 hours</span>
                  <span className="rounded-full border border-[#bfe8cd] bg-[#eaf8ef] px-4 py-2 text-[#13803f]">● {viewers} people viewing now</span>
                  <span className="rounded-full border border-foreground/10 bg-white px-4 py-2">★ {ratingOf(slug)} ({reviewsOf(slug)} reviews)</span>
                  <span className="rounded-full border border-foreground/10 bg-white px-4 py-2">{loveOf(slug)}% renters love this car</span>
                </div>
                <div className="mb-6 flex flex-wrap gap-2 text-sm font-paragraph">
                  {[v.type, v.numberOfSeats ? `${v.numberOfSeats} Seats` : '', v.fuelType, v.transmissionType, v.hasAc ? 'AC' : '', v.luggageCapacity ? `Luggage: ${v.luggageCapacity}` : ''].filter(Boolean).map((t) => <span key={t as string} className="rounded-full border border-foreground/10 bg-white/70 px-3 py-1">{t}</span>)}
                </div>
                {v.description && <p className="mb-6 font-paragraph text-foreground/70">{v.description}</p>}
                <div className="rounded-2xl border border-foreground/10 bg-white p-6"><h2 className="mb-2 text-xl font-heading">What’s included</h2>
                  <ul className="space-y-1 font-paragraph text-foreground/70">{['Comprehensive insurance', 'Sanitised, serviced car', '24x7 roadside assistance', 'No hidden charges'].map((t) => <li key={t}>✓ {t}</li>)}</ul></div>
              </div>
              <aside className="lg:sticky lg:top-24">
                <div className="rounded-3xl border border-white/80 bg-white/60 p-6 shadow-[0_12px_40px_rgba(30,91,255,0.14)] backdrop-blur-xl">
                  <div className="text-4xl font-heading">₹{(v.rentalPricePerDay || 0).toLocaleString('en-IN')}<span className="text-base font-paragraph text-foreground/60"> / day</span></div>
                  <p className="my-3 font-paragraph text-foreground/70">Refundable security deposit applies. Fuel not included.</p>
                  <p className="mb-4 text-sm font-paragraph text-foreground/70"><b className="font-heading">Pickup &amp; drop:</b> {SITE.address}</p>
                  <button onClick={() => setOpen(true)} className="w-full rounded-full bg-primary py-3 font-heading text-white transition hover:opacity-90">Book Now</button>
                  <a href={telLink} className="mt-3 block rounded-full border-2 border-foreground py-3 text-center font-heading">Call to confirm</a>
                  <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="mt-3 block rounded-full border-2 border-foreground py-3 text-center font-heading">Get Directions</a>
                  <p className="mt-4 text-sm font-paragraph text-foreground/70">Limited cars available for this week. Reserve yours today.</p>
                </div>
              </aside>
            </div>
          </section>
          <section className="px-5 py-16"><h2 className="mb-8 text-center text-3xl font-heading">{v.name} self drive: FAQs</h2><Faq /></section>
          <BookingDialog vehicleName={v.name || 'this car'} open={open} onOpenChange={setOpen} />
        </main>
      )}
      <Footer />
    </div>
  );
}
