"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { mockProperties } from "@/lib/mockData";
import { useFavoritesStore } from "@/lib/store";
import gsap from "gsap";
import { animateCardsIn } from "@/lib/animations";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavoritesStore();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const emptyStateRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const favoriteProperties = mockProperties.filter((p) => favorites.includes(p.id));

  // GSAP animations
  useEffect(() => {
    if (!mounted) return;

    const tl = gsap.timeline();

    // Header animation
    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0
      );
    }

    // Grid animation if favorites exist
    if (gridRef.current && favoriteProperties.length > 0) {
      const cards = gridRef.current.querySelectorAll(".favorite-card-wrapper");
      if (cards.length > 0) {
        tl.to(gridRef.current, { opacity: 1, duration: 0.3 }, 0.3);
        animateCardsIn(cards);
      }
    }

    // Empty state animation
    if (emptyStateRef.current && favoriteProperties.length === 0) {
      gsap.fromTo(
        emptyStateRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out", delay: 0.3 }
      );
    }

    return () => {
      tl.kill();
    };
  }, [mounted, favoriteProperties.length]);

  const handleRemoveFavorite = (propertyId: string) => {
    // Animate card out before removing
    if (gridRef.current) {
      const card = gridRef.current.querySelector(`[data-property-id="${propertyId}"]`);
      if (card) {
        gsap.to(card, {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: "back.in",
          onComplete: () => {
            removeFavorite(propertyId);
          },
        });
        return;
      }
    }
    removeFavorite(propertyId);
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="flex-1 py-12 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef}>
          <h1 className="text-4xl font-bold mb-2 dark:text-white">My Favorites</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Saved properties - {favorites.length} items</p>
        </div>

        {favoriteProperties.length > 0 ? (
          <>
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 opacity-0">
              {favoriteProperties.map((property) => (
                <div
                  key={property.id}
                  data-property-id={property.id}
                  className="favorite-card-wrapper relative"
                >
                  <PropertyCard property={property} />
                  <button
                    onClick={() => handleRemoveFavorite(property.id)}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center z-10 transition-all duration-200 transform hover:scale-110 active:scale-95 font-bold shadow-lg hover:shadow-xl"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center animate-fade-in">
              <Link
                href="/listings"
                className="text-yellow-400 dark:text-yellow-300 hover:underline font-semibold transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        ) : (
          <div ref={emptyStateRef} className="text-center py-12">
            <div className="text-6xl mb-4">💔</div>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">No favorites yet</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mb-6">Save your favorite properties to view them later</p>
            <Link
              href="/listings"
              className="bg-yellow-500 dark:bg-yellow-600 text-black px-6 py-3 rounded-lg hover:bg-yellow-400 dark:hover:bg-yellow-500 inline-block transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Explore Properties
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
