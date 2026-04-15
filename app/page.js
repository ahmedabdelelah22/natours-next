'use client';

import { useEffect, useState } from 'react';
import { getMyBookings } from './_lib/api';
import TourCard from './_components/TourCard';

export default function HomePage() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setTours(data);
      } catch (err) {
        console.log('Not logged in or no bookings');
      }
    };

    fetchBookings();
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <h1>Explore the world 🌍</h1>
      </section>

      {/* 🔥 MY TOURS SECTION */}
      {tours.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">
            Your Booked Tours
          </h2>

          <div className="grid grid-cols-4 gap-10">
            {tours.slice(0, 4).map(tour => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}