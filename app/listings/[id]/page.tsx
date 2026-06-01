"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import ImageCarousel from "@/components/ImageCarousel";
import { SkeletonDetailsPage } from "@/components/Skeleton";
import { mockProperties, mockAgents } from "@/lib/mockData";
import { useFavoritesStore } from "@/lib/store";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PropertyDetailsPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { addFavorite, removeFavorite, isFavorite: checkFavorite } = useFavoritesStore();

  const carouselRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const floorPlanRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const favoriteRef = useRef<HTMLButtonElement>(null);

  const property = mockProperties.find((p) => p.id === propertyId);
  const agent = property ? mockAgents.find((a) => a.id === property.agentId) : null;
  const similarProperties = mockProperties.filter(
    (p) => p.propertyType === property?.propertyType && p.id !== propertyId
  ).slice(0, 3);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [propertyId]);

  useEffect(() => {
    if (property) {
      setIsFavorite(checkFavorite(property.id));
    }
  }, [property, checkFavorite]);

  // GSAP animations
  useEffect(() => {
    if (isLoading) return;

    const tl = gsap.timeline();

    // Carousel animation
    if (carouselRef.current) {
      tl.fromTo(
        carouselRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0
      );
    }

    // Info card animation
    if (infoRef.current) {
      tl.fromTo(
        infoRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }

    // Amenities section animation
    if (amenitiesRef.current) {
      gsap.to(amenitiesRef.current, {
        scrollTrigger: {
          trigger: amenitiesRef.current,
          start: "top 70%",
          onEnter: () => {
            gsap.fromTo(
              amenitiesRef.current!.querySelectorAll(".amenity-item"),
              { opacity: 0, x: -20 },
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
              }
            );
          },
          once: true,
        },
      });
    }

    // Floor plan animation
    if (floorPlanRef.current) {
      gsap.to(floorPlanRef.current, {
        scrollTrigger: {
          trigger: floorPlanRef.current,
          start: "top 70%",
          onEnter: () => {
            gsap.fromTo(
              floorPlanRef.current,
              { opacity: 0, scale: 0.9 },
              { opacity: 1, scale: 1, duration: 0.6, ease: "back.out" }
            );
          },
          once: true,
        },
      });
    }

    // Agent card animation
    if (agentRef.current) {
      gsap.fromTo(
        agentRef.current,
        { opacity: 0, y: 20, x: 20 },
        { opacity: 1, y: 0, x: 0, duration: 0.6, ease: "power2.out" }
      );
    }

    // Form animation
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 20, x: 20 },
        { opacity: 1, y: 0, x: 0, duration: 0.6, ease: "power2.out", delay: 0.2 }
      );
    }

    // Favorite button animation
    if (favoriteRef.current) {
      gsap.fromTo(
        favoriteRef.current,
        { opacity: 0, y: 20, x: 20 },
        { opacity: 1, y: 0, x: 0, duration: 0.6, ease: "power2.out", delay: 0.3 }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, [isLoading]);

  const handleToggleFavorite = () => {
    if (property) {
      if (isFavorite) {
        removeFavorite(property.id);
      } else {
        addFavorite(property.id);
      }
      setIsFavorite(!isFavorite);

      // Pulse animation on favorite button
      if (favoriteRef.current) {
        gsap.to(favoriteRef.current, {
          scale: 1.1,
          duration: 0.3,
          ease: "back.out",
          yoyo: true,
          repeat: 1,
        });
      }
    }
  };

  if (isLoading) {
    return (
      <main className="flex-1 py-12 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkeletonDetailsPage />
        </div>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="flex-1 py-12 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold dark:text-white mb-4">Property not found</h1>
          <Link href="/listings" className="text-yellow-400 dark:text-yellow-300 hover:underline">
            Back to listings
          </Link>
        </div>
      </main>
    );
  }

  const priceInCr = (property.price / 10000000).toFixed(2);

  return (
    <main className="flex-1 py-12 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image Carousel */}
        <div ref={carouselRef} className="mb-8">
          <ImageCarousel images={property.images} title={property.title} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Info */}
            <div ref={infoRef} className="bg-zinc-950 dark:bg-black p-6 rounded-lg shadow-md shadow-yellow-500/5 mb-8 transition-colors">
              <h1 className="text-3xl font-bold text-white mb-2">{property.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">{property.location}</p>
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-bold text-yellow-400">₹{priceInCr} Cr</span>
                {property.rating && (
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 text-xl">⭐</span>
                    <span className="font-bold dark:text-white">{property.rating}</span>
                    <span className="text-gray-600 dark:text-gray-400">({property.reviews} reviews)</span>
                  </div>
                )}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">{property.description}</p>

              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-zinc-900 dark:bg-zinc-950 rounded-lg transition-colors border border-yellow-500/10">
                  <p className="text-2xl font-bold text-yellow-400">{property.bedrooms}</p>
                  <p className="text-gray-600 dark:text-gray-400">Bedrooms</p>
                </div>
                <div className="text-center p-4 bg-zinc-900 dark:bg-zinc-950 rounded-lg transition-colors border border-yellow-500/10">
                  <p className="text-2xl font-bold text-yellow-400">{property.bathrooms}</p>
                  <p className="text-gray-600 dark:text-gray-400">Bathrooms</p>
                </div>
                <div className="text-center p-4 bg-zinc-900 dark:bg-zinc-950 rounded-lg transition-colors border border-yellow-500/10">
                  <p className="text-2xl font-bold text-yellow-400">{property.area}</p>
                  <p className="text-gray-600 dark:text-gray-400">Sq Ft</p>
                </div>
                <div className="text-center p-4 bg-zinc-900 dark:bg-zinc-950 rounded-lg transition-colors border border-yellow-500/10">
                  <p className="text-2xl font-bold text-yellow-400">{property.propertyType}</p>
                  <p className="text-gray-600 dark:text-gray-400">Type</p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div ref={amenitiesRef} className="bg-zinc-950 dark:bg-black p-6 rounded-lg shadow-md shadow-yellow-500/5 mb-8 transition-colors">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item flex items-center gap-3 p-3 bg-zinc-900 dark:bg-zinc-950 rounded-lg hover:bg-yellow-500/10 dark:hover:bg-yellow-500/15 transition-colors">
                    <span className="text-xl">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floor Plan */}
            {property.floorPlan && (
              <div ref={floorPlanRef} className="bg-zinc-950 dark:bg-black p-6 rounded-lg shadow-md shadow-yellow-500/5 mb-8 transition-colors">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Floor Plan</h2>
                <div className="relative h-64 bg-zinc-900 dark:bg-zinc-800 rounded-lg overflow-hidden">
                  <Image
                    src={property.floorPlan}
                    alt="Floor Plan"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <div className="bg-zinc-950 dark:bg-black p-6 rounded-lg shadow-md shadow-yellow-500/5 transition-colors">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Similar Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {similarProperties.map((prop) => {
                    const priceInCr = (prop.price / 10000000).toFixed(2);
                    return (
                      <Link key={prop.id} href={`/listings/${prop.id}`}>
                        <div className="bg-zinc-950 dark:bg-zinc-950 rounded-lg overflow-hidden hover:shadow-lg shadow-yellow-500/10 transition-all duration-300 transform hover:scale-105 cursor-pointer border border-yellow-500/10">
                          <div className="relative h-32 bg-zinc-900 dark:bg-zinc-800">
                            <Image
                              src={prop.images[0]}
                              alt={prop.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <h3 className="font-bold text-sm line-clamp-2 dark:text-white">{prop.title}</h3>
                            <p className="text-yellow-400 font-semibold text-sm">₹{priceInCr} Cr</p>
                            <p className="text-gray-600 dark:text-gray-400 text-xs">{prop.location}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Agent Card */}
            {agent && (
              <div ref={agentRef} className="bg-zinc-950 dark:bg-black p-6 rounded-lg shadow-md shadow-yellow-500/5 mb-8 transition-colors">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Agent Details</h3>
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white">{agent.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{agent.yearsExperience} years exp.</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{agent.agency}</p>
                <div className="space-y-3">
                  <a
                    href={`tel:${agent.phone}`}
                    className="block w-full bg-yellow-500 dark:bg-yellow-600 text-black text-center py-2 rounded-lg hover:bg-yellow-400 dark:hover:bg-yellow-500 font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95"
                  >
                    Call Agent
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="block w-full border-2 border-yellow-400 dark:border-yellow-300 text-yellow-400 dark:text-yellow-300 text-center py-2 rounded-lg hover:bg-yellow-500/10 dark:hover:bg-zinc-900 font-semibold transition-colors"
                  >
                    Email Agent
                  </a>
                </div>
              </div>
            )}

            {/* Contact Form */}
            <div ref={formRef} className="bg-zinc-950 dark:bg-black p-6 rounded-lg shadow-md shadow-yellow-500/10 sticky top-24 mb-4 transition-colors">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Get More Info</h3>
              {!isFormSubmitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsFormSubmitted(true);
                    setTimeout(() => setIsFormSubmitted(false), 3000);
                  }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    required
                    className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 dark:bg-yellow-600 text-black py-2 rounded-lg hover:bg-yellow-400 dark:hover:bg-yellow-500 font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95"
                  >
                    Send Inquiry
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 animate-fade-in">
                  <p className="text-green-600 dark:text-green-400 font-semibold mb-2">✓ Thank you!</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">We'll contact you shortly with more details.</p>
                </div>
              )}
            </div>

            {/* Favorite Button */}
            <button
              ref={favoriteRef}
              onClick={handleToggleFavorite}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                isFavorite
                  ? "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
                  : "bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-400 dark:hover:bg-yellow-500 text-black dark:text-black"
              }`}
            >
              {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
