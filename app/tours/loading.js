// app/tours/loading.jsx
export default function Loading() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-300 h-48 rounded-lg mb-4" />
          <div className="bg-gray-300 h-4 rounded mb-2" />
          <div className="bg-gray-300 h-4 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}