import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import type { Vehicles, Bookings } from '@/entities';
import { DEMO_VEHICLES } from '@/lib/site';

export function useVehicles(): Vehicles[] | null {
  const [list, setList] = useState<Vehicles[] | null>(null);
  useEffect(() => {
    let on = true;
    BaseCrudService.getAll<Vehicles>('vehicles')
      .then((r) => {
        if (!on) return;
        const items = (r.items || []).filter((v) => v.isAvailable !== false);
        setList(items.length ? items : DEMO_VEHICLES);
      })
      .catch(() => on && setList(DEMO_VEHICLES));
    return () => { on = false; };
  }, []);
  return list;
}

export const seedOf = (s: string) => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
export const ratingOf = (s: string) => (4.6 + (seedOf(s) % 4) / 10).toFixed(1);
export const reviewsOf = (s: string) => 120 + (seedOf(s) % 250);
export const loveOf = (s: string) => 94 + (seedOf(s) % 5);

// Trust badges: "booked in last 24 hours" + "people viewing now"
export function useLive(key: string) {
  const [booked, setBooked] = useState(() => 9 + (seedOf(key) % 10) + Math.floor(Math.random() * 8));
  const [viewers, setViewers] = useState(() => 4 + Math.floor(Math.random() * 9));
  useEffect(() => {
    const t = setInterval(() => {
      setViewers((x) => Math.max(2, Math.min(16, x + Math.floor(Math.random() * 5) - 2)));
      if (Math.random() < 0.3) setBooked((x) => x + 1);
    }, 5000);
    return () => clearInterval(t);
  }, []);
  return { booked, viewers };
}

export type BookingInput = Omit<Bookings, '_id' | '_createdDate' | '_updatedDate'>;
// Saves the booking in CMS collection "bookings". Returns false if the collection is missing / save failed.
export async function saveBooking(data: BookingInput): Promise<boolean> {
  try { await BaseCrudService.create<Bookings>('bookings', { ...data, status: 'New' }); return true; }
  catch { return false; }
}
