import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Seo, businessSchema } from '@/components/Seo';
import { BookingForm } from '@/components/Shared';
import { MAP_LINK, SITE, telLink, waLink } from '@/lib/site';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Seo title="Contact Rentigo Rental | Book Self Drive Car in Kolkata" description="Contact Rentigo Rental to book a self drive car in Kolkata. Call, WhatsApp or send a booking request." path="/contact" schema={businessSchema} />
      <Header />
      <main>
        <div className="bg-gradient-to-b from-secondary to-white px-5 pb-8 pt-14"><div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-paragraph text-foreground/60"><Link to="/" className="text-primary">Home</Link> / Contact</p>
          <h1 className="text-4xl font-heading md:text-5xl">Contact Rentigo Rental</h1>
          <p className="mt-2 font-paragraph text-foreground/70">Book a self drive car in Kolkata. We reply within minutes.</p>
        </div></div>
        <section className="px-5 pb-20 pt-6"><div className="mx-auto grid max-w-6xl items-start gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-foreground/10 p-6 font-paragraph">
            <h2 className="text-xl font-heading">Get in touch</h2>
            <p>Phone: <a href={telLink} className="font-heading">{SITE.phoneDisplay}</a></p>
            <p>WhatsApp: <a href={waLink()} target="_blank" rel="noopener noreferrer" className="font-heading text-primary">Chat now</a></p>
            <p>Address (pickup &amp; drop): {SITE.address}</p>
            <p>Hours: Open 24x7</p>
            <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full bg-primary px-6 py-3 font-heading text-white">Get Directions</a>
          </div>
          <div className="rounded-2xl border border-foreground/10 p-6"><h2 className="text-xl font-heading">Send a booking request</h2><BookingForm /></div>
        </div></section>
      </main>
      <Footer />
    </div>
  );
}
