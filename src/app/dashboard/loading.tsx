import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="h-8 bg-gray-200 rounded-md w-64 mb-2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded-md w-48 animate-pulse" />
        </div>
        <div className="h-10 bg-gray-200 rounded-md w-32 animate-pulse" />
      </div>

      {/* Search Skeleton */}
      <div className="max-w-md">
        <div className="h-10 bg-gray-200 rounded-md animate-pulse" />
      </div>

      {/* Notes Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3 animate-pulse" />
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
            </div>
            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}