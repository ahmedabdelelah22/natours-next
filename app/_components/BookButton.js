// components/BookButton.jsx
'use client'
import { bookTour } from '../_lib/api';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function BookButton({ tourId }) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    // redirect to login if not logged in
    if (!user) return router.push('/login');

    setLoading(true);
    try {
      await bookTour(tourId);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBook}
      disabled={loading}
      className="btn btn--green span-all-rows"
    >
      {loading ? 'Processing...' : user ? 'Book Tour Now!' : 'Login to Book'}
    </button>
  );
}