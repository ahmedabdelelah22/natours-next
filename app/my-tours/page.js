'use client';

import { useEffect, useState } from 'react';
import { getMyBookings } from '../_lib/api';
import TourCard from '../_components/TourCard';

export default function MyBookings() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyBookings();
        setTours(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <div className="grid grid-cols-4 gap-10">
        {tours.map((tour) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>
    </main>
  );
}