import { getTour } from "@/app/_lib/api";
import TourHeader from "../../_components/TourHeader";
import TourOverview from "../../_components/TourOverview";
import TourReviews from "../../_components/TourReviews";
import BookButton from "@/app/_components/BookButton";

export default async function  TourPage({ params }) {
  const { id } = await params;
  const tour = await getTour(id);
  if (!tour) {
    return <p>Tour not found</p>;
  }
  return (
    <main >
      <TourHeader tour={tour} />
      <TourOverview tour={tour} /> 
      <TourReviews reviews={tour.reviews || []} /> 
      <BookButton tourId={tour.id}/>
    </main>
  );
}