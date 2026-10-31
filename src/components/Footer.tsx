import { Link } from 'react-router-dom';
import logo from '@/assets/logo';
import { MAP_LINK, SITE, telLink, waLink } from '@/lib/site';

export default function Footer() {
  return (
    <>
      <footer className="bg-[#05060d] px-5 pb-6 pt-14 text-[#aab3d4]">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
          <div><img src={logo} alt={SITE.name} className="mb-3 h-9 w-auto invert" /><p className="font-paragraph">Kolkata’s trusted self drive car rental. Clean, insured cars with transparent pricing.</p></div>
          <div className="flex flex-col gap-1 font-paragraph"><h4 className="mb-2 font-heading text-white">Company</h4><Link to="/">Home</Link><Link to="/about">About Us</Link><Link to="/contact">Contact</Link></div>
          <div className="flex flex-col gap-1 font-paragraph"><h4 className="mb-2 font-heading text-white">Rent</h4><Link to="/fleet">Self Drive Cars in Kolkata</Link><Link to="/book-now">Book Now</Link></div>
          <div className="flex flex-col gap-1 font-paragraph"><h4 className="mb-2 font-heading text-white">Get in touch</h4><a href={telLink}>{SITE.phoneDisplay}</a><a href={MAP_LINK} target="_blank" rel="noopener noreferrer">{SITE.address}</a><span>Open 24x7</span></div>
        </div>
        <p className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-4 text-sm">© 2026 {SITE.name}. Self drive car rental in Kolkata · self drive cars in Kolkata · rent cars in Kolkata.</p>
      </footer>
      <a href={waLink()} target="_blank" rel="noopener noreferrer" className="fixed bottom-4 right-4 z-40 rounded-full bg-[#25d366] px-5 py-3 font-heading text-white shadow-lg">WhatsApp</a>
    </>
  );
}
