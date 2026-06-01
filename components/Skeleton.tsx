"use client";

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="h-48 bg-gray-300 w-full"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
        <div className="flex gap-4 mb-3">
          <div className="h-4 bg-gray-200 rounded flex-1"></div>
          <div className="h-4 bg-gray-200 rounded flex-1"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export function SkeletonDetailsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 animate-pulse">
          <div className="h-96 bg-gray-300 rounded mb-4"></div>
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg">
                <div className="h-8 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8 animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-6"></div>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-6"></div>
          <div className="flex gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md sticky top-24 animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonListingsPage() {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 animate-pulse">
        <div className="grid grid-cols-6 gap-4 mb-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(9)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
