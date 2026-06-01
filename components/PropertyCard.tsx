import Image from "next/image";
import Link from "next/link";
import { Property } from "@/lib/types";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const priceInCr = (property.price / 10000000).toFixed(2);

  return (
    <Link href={`/listings/${property.id}`}>
      <div className="bg-zinc-950 dark:bg-black rounded-lg overflow-hidden shadow-xl dark:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 cursor-pointer h-full transform hover:scale-105 active:scale-95">
        <div className="relative h-48 w-full bg-zinc-900 dark:bg-zinc-800">
          {property.images[0] && (
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
            />
          )}
          {property.featured && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold animate-pulse shadow-lg shadow-yellow-500/20">
              Featured
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2 line-clamp-2">{property.title}</h3>
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            <p className="font-semibold text-gray-800 dark:text-white">₹{priceInCr} Cr</p>
            <p className="text-gray-600 dark:text-gray-400">{property.location}</p>
          </div>
          <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <span>🛏️ {property.bedrooms} BHK</span>
            <span>📐 {property.area} sqft</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-yellow-400 font-semibold">{property.propertyType}</span>
            {property.rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm font-semibold dark:text-white">{property.rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
