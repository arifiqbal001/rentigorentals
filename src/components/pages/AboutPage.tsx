import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Seo } from '@/components/Seo';
import { CountUp } from '@/components/Shared';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Seo title="About Rentigo Rental | Self Drive Car Rental in Kolkata" description="Rentigo Rental is a Kolkata self drive car rental company focused on clean, insured cars and transparent pricing." path="/about" />
      <Header />
      <main>
        <div className="bg-gradient-to-b from-secondary to-white px-5 pb-8 pt-14"><div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-paragraph text-foreground/60"><Link to="/" className="text-primary">Home</Link> / About Us</p>
          <h1 className="text-4xl font-heading md:text-5xl">About Rentigo Rental</h1>
          <p className="mt-2 font-paragraph text-foreground/70">Kolkata’s trusted self drive car rental, built around freedom, safety and honest pricing.</p>
        </div></div>
        <section className="px-5 py-14"><div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {[['Our story', 'We started Rentigo to make renting a car in Kolkata simple: no paperwork maze, no surprise charges.'], ['Our promise', 'Every car is cleaned, serviced and insured before it reaches you.'], ['Pickup point', 'Collect and return your car at our location in Arjunpur, Kaikhali, Kolkata 700080.']].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-foreground/10 p-6"><h2 className="mb-2 text-xl font-heading">{t}</h2><p className="font-paragraph text-foreground/70">{d}</p></div>))}
        </div></section>
        <section className="bg-foreground px-5 py-14 text-white"><div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-4 text-center">
          {[[<CountUp key="c" to={1200} />, 'Trusted drivers'], ['4.8 ★', 'Rating'], ['24x7', 'Support']].map(([b, s], i) => (<div key={i} className="min-w-[170px] rounded-2xl border border-white/20 bg-white/10 px-6 py-5 backdrop-blur-xl"><b className="block text-3xl font-heading">{b}</b><small className="font-paragraph text-[#c7d2ff]">{s as string}</small></div>))}
        </div></section>
      </main>
      <Footer />
    </div>
  );
}
