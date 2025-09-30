export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f2ee] to-white">
      {/* Hero Skeleton */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="space-y-8 animate-pulse">
            <div className="space-y-4">
              <div className="h-16 bg-gray-200 rounded-lg w-3/4"></div>
              <div className="h-16 bg-gray-200 rounded-lg w-2/3"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-full mt-6"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-5/6"></div>
            </div>
            <div className="flex gap-4">
              <div className="h-12 bg-gray-200 rounded-lg w-40"></div>
              <div className="h-12 bg-gray-200 rounded-lg w-40"></div>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Skeleton */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16 animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-96 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 border border-gray-100">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Skeleton */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-[#f7f2ee]">
        <div className="text-center mb-16 animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-96 mx-auto"></div>
        </div>
        <div className="flex gap-2 mb-8 justify-center animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-lg w-24"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white p-4">
              <div className="h-80 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}