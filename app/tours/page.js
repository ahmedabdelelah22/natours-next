// app/tours/page.jsx
// import TourCard from '@/components/TourCard';
import TourCard from '../_components/TourCard';
import { getAllTours } from '../_lib/api';

export default async function ToursPage() {
  const tours = await getAllTours();

  return (
    <main>

  <div className="grid grid-cols-4 gap-10 ">
    {tours.map(tour => (
       <TourCard  key={tour.id} tour={tour} />
       ))}
  </div>
</main>
  );
}