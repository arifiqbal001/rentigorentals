import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo';
import { SITE } from '@/lib/site';

const NAV = [{ label: 'Home', href: '/' }, { label: 'Fleet', href: '/fleet' }, { label: 'About Us', href: '/about' }, { label: 'Contact', href: '/contact' }];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5">
        <Link to="/" aria-label={`${SITE.name} home`}><img src={logo} alt={`${SITE.name} logo`} className="h-10 w-auto" /></Link>
        <nav className="hidden items-center gap-7 font-heading md:flex" aria-label="Main">
          {NAV.map((n) => <NavLink key={n.href} to={n.href} end={n.href === '/'} className={({ isActive }) => (isActive ? 'text-primary' : 'hover:text-primary')}>{n.label}</NavLink>)}
          <Link to="/fleet" className="rounded-full bg-primary px-6 py-2.5 text-white transition hover:opacity-90">Book Now</Link>
        </nav>
        <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-foreground/10 bg-white px-5 py-5 font-heading md:hidden" aria-label="Mobile">
          {NAV.map((n) => <Link key={n.href} to={n.href} onClick={() => setOpen(false)}>{n.label}</Link>)}
          <Link to="/fleet" onClick={() => setOpen(false)} className="rounded-full bg-primary py-3 text-center text-white">Book Now</Link>
        </nav>
      )}
    </header>
  );
}
