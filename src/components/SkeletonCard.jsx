export default function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      <div className="aspect-video bg-gray-300" />
      <div className="p-4 md:p-5 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-1/4" />
        <div className="h-5 bg-gray-300 rounded w-3/4" />
        <div className="h-5 bg-gray-300 rounded w-2/3" />
        <div className="h-3 bg-gray-300 rounded w-1/3" />
      </div>
    </div>
  );
}
