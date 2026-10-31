import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Seo } from '@/components/Seo';
import { BookingForm } from '@/components/Shared';

// Stand-alone booking page: handy as an ad landing page. Example: /book-now?car=Swift%20Dzire
export default function BookingPage() {
  const [params] = useSearchParams();
  const car = params.get('car') || undefined;
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Seo title="Book a Self Drive Car in Kolkata | Rentigo Rental" description="Book a self drive car in Kolkata in just a few minutes. Choose pickup and drop date and time." path="/book-now" />
      <Header />
      <main className="bg-secondary px-5 py-14"><div className="mx-auto max-w-xl rounded-3xl border border-white/80 bg-white/70 p-6 shadow-lg backdrop-blur-xl">
        <h1 className="text-3xl font-heading">Book {car || 'your self drive car'}</h1>
        <p className="font-paragraph text-foreground/70">Fill in your details. Our team will confirm within minutes.</p>
        <BookingForm vehicleName={car} />
      </div></main>
      <Footer />
    </div>
  );
}
