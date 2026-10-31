import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Seo } from '@/components/Seo';
import { MAP_LINK, SITE, waLink } from '@/lib/site';

export default function ThankYouPage() {
  const b = useMemo(() => { try { return JSON.parse(sessionStorage.getItem('rentigo_booking') || 'null'); } catch { return null; } }, []);
  const msg = b ? `Hi Rentigo, I want to book ${b.vehicleName}. Name: ${b.customerName}. Phone: ${b.phone}. Pickup: ${b.pickupDate} ${b.pickupTime}. Drop: ${b.dropDate} ${b.dropTime}.` : undefined;
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Seo title="Thank You | Rentigo Rental" description="Your booking request has been received." path="/thank-you" noindex />
      <Header />
      <main className="bg-secondary px-5 py-20"><div className="mx-auto max-w-xl rounded-3xl border border-white/80 bg-white/70 p-8 text-center shadow-lg backdrop-blur-xl">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-4xl text-white">✓</div>
        <h1 className="text-3xl font-heading">Thank you{b ? `, ${String(b.customerName).split(' ')[0]}` : ''}!</h1>
        <p className="mt-2 font-paragraph text-foreground/70">{b ? <>Your booking request for <b className="font-heading">{b.vehicleName}</b> is received. Our team will call you shortly to confirm.</> : 'Our team will call you shortly to confirm your booking.'}</p>
        {b && <p className="mt-2 font-paragraph text-foreground/70">{b.pickupDate} {b.pickupTime} → {b.dropDate} {b.dropTime}</p>}
        <p className="mt-2 font-paragraph text-foreground/70">Pickup &amp; drop location: {SITE.address}</p>
        {b && !b.saved && <p className="mt-3 rounded-xl bg-[#fff1ed] p-3 text-sm font-heading text-[#d6401f]">Please tap “Send on WhatsApp” below so our team gets your details instantly.</p>}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary px-6 py-3 font-heading text-white">Send on WhatsApp</a>
          <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-foreground px-6 py-3 font-heading">Get Directions</a>
          <Link to="/fleet" className="rounded-full border-2 border-foreground px-6 py-3 font-heading">Browse more cars</Link>
        </div>
      </div></main>
      <Footer />
    </div>
  );
}
