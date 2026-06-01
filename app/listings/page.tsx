"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import PropertyCard from "@/components/PropertyCard";
import { SkeletonCard, SkeletonListingsPage } from "@/components/Skeleton";
import { mockProperties } from "@/lib/mockData";
import { debounce } from "@/lib/debounce";
import { animateCardsIn } from "@/lib/animations";
import gsap from "gsap";
import { Property } from "@/lib/types";

const ITEMS_PER_PAGE = 9;

export default function ListingsPage() {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedLocation, setDebouncedLocation] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedLocation(value);
      setIsLoading(false);
    }, 300),
    []
  );

  const handleLocationChange = (e: string) => {
    setSearchLocation(e);
    setIsLoading(true);
    debouncedSearch(e);
  };

  // Animate filters on mount
  useEffect(() => {
    if (filtersRef.current) {
      gsap.fromTo(
        filtersRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  const filteredProperties = mockProperties.filter((property) => {
    const matchLocation =
      !debouncedLocation ||
      property.location.toLowerCase().includes(debouncedLocation.toLowerCase()) ||
      property.city.toLowerCase().includes(debouncedLocation.toLowerCase());

    const matchType = !selectedPropertyType || property.propertyType === selectedPropertyType;

    const matchPrice =
      (!minPrice || property.price >= parseInt(minPrice) * 10000000) &&
      (!maxPrice || property.price <= parseInt(maxPrice) * 10000000);

    const matchBedrooms = !bedrooms || property.bedrooms === parseInt(bedrooms);

    return matchLocation && matchType && matchPrice && matchBedrooms;
  });

  let sortedProperties = [...filteredProperties];
  if (sortBy === "price-low") {
    sortedProperties.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    sortedProperties.sort((a, b) => b.price - a.price);
  } else if (sortBy === "featured") {
    sortedProperties.sort((a, b) => (b.featured ? 1 : -1));
  }

  const displayedProperties = sortedProperties.slice(0, displayedItems);
  const hasMore = displayedItems < sortedProperties.length;

  const handleLoadMore = () => {
    setDisplayedItems((prev) => prev + ITEMS_PER_PAGE);
  };

  // Animate grid when properties change
  useEffect(() => {
    if (gridRef.current && !isLoading) {
      const cards = gridRef.current.querySelectorAll(".property-card-wrapper");
      if (cards.length > 0) {
        animateCardsIn(cards);
      }
    }
  }, [displayedProperties, isLoading]);

  useEffect(() => {
    setDisplayedItems(ITEMS_PER_PAGE);
  }, [selectedPropertyType, minPrice, maxPrice, bedrooms, sortBy]);

  return (
    <main className="flex-1 py-12 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-8 dark:text-white transition-colors">Find Your Property</h1>

          {/* Filters */}
          <div ref={filtersRef} className="bg-zinc-950 dark:bg-black p-6 rounded-lg shadow-md shadow-yellow-500/10 mb-8 transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
              <input
                type="text"
                placeholder="Search by location"
                value={searchLocation}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
              />
              <select
                value={selectedPropertyType}
                onChange={(e) => setSelectedPropertyType(e.target.value)}
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
              >
                <option value="">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Commercial">Commercial</option>
              </select>
              <input
                type="number"
                placeholder="Min Price (Cr)"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
              />
              <input
                type="number"
                placeholder="Max Price (Cr)"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
              />
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
              >
                <option value="">All Bedrooms</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-gray-700 dark:text-gray-300 font-semibold">
                {isLoading ? (
                  <span className="animate-pulse">Searching...</span>
                ) : (
                  `Found ${sortedProperties.length} properties`
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {isLoading ? (
          <SkeletonListingsPage />
        ) : sortedProperties.length > 0 ? (
          <>
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayedProperties.map((property) => (
                <div key={property.id} className="property-card-wrapper">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-12 animate-fade-in">
                <button
                  onClick={handleLoadMore}
                  className="bg-yellow-500 dark:bg-yellow-600 text-black px-8 py-3 rounded-lg hover:bg-yellow-400 dark:hover:bg-yellow-500 font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  Load More Properties ({sortedProperties.length - displayedItems} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">No properties found matching your criteria.</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </main>
  );
}
