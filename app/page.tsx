"use client";

import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { mockProperties, mockTestimonials } from "@/lib/mockData";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { animateHero, animateCardsIn, observeElements } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroSearchRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const featuredProperties = mockProperties.filter(p => p.featured);
  const categories = [
    { name: "Apartments", icon: "🏢", count: 245 },
    { name: "Villas", icon: "🏡", count: 89 },
    { name: "Houses", icon: "🏠", count: 156 },
    { name: "Townhouses", icon: "🏘️", count: 72 },
    { name: "Commercial", icon: "🏬", count: 45 },
  ];

  const reasons = [
    {
      title: "Verified Properties",
      description: "All properties are verified and authentic",
      icon: "✓",
    },
    {
      title: "Expert Agents",
      description: "Work with experienced real estate professionals",
      icon: "👤",
    },
    {
      title: "Easy Searching",
      description: "Filter by price, location, and more",
      icon: "🔍",
    },
    {
      title: "Secure Transactions",
      description: "Safe and transparent property deals",
      icon: "🔒",
    },
  ];

  useEffect(() => {
    // Hero animation
    if (heroTitleRef.current && heroSubtitleRef.current && heroSearchRef.current) {
      animateHero(heroTitleRef.current, heroSubtitleRef.current, heroSearchRef.current);
    }

    // Categories animation
    if (categoriesRef.current) {
      gsap.to(categoriesRef.current, {
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top 70%",
          onEnter: () => {
            animateCardsIn(categoriesRef.current!.querySelectorAll(".category-card"));
          },
          once: true,
        },
      });
    }

    // Featured properties animation
    if (featuredRef.current) {
      gsap.to(featuredRef.current, {
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 70%",
          onEnter: () => {
            animateCardsIn(featuredRef.current!.querySelectorAll(".property-card-wrapper"));
          },
          once: true,
        },
      });
    }

    // Why choose section animation
    if (whyChooseRef.current) {
      gsap.to(whyChooseRef.current, {
        scrollTrigger: {
          trigger: whyChooseRef.current,
          start: "top 70%",
          onEnter: () => {
            animateCardsIn(whyChooseRef.current!.querySelectorAll(".reason-card"));
          },
          once: true,
        },
      });
    }

    // Testimonials animation
    if (testimonialsRef.current) {
      gsap.to(testimonialsRef.current, {
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 70%",
          onEnter: () => {
            animateCardsIn(testimonialsRef.current!.querySelectorAll(".testimonial-card"));
          },
          once: true,
        },
      });
    }

    // CTA section animation
    if (ctaRef.current) {
      const ctaHeading = ctaRef.current.querySelector("h2");
      const ctaParagraph = ctaRef.current.querySelector("p");
      const ctaButton = ctaRef.current.querySelector("a");

      gsap.to(ctaRef.current, {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 70%",
          onEnter: () => {
            const tl = gsap.timeline();

            if (ctaHeading) {
              tl.fromTo(
                ctaHeading,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
                0
              );
            }

            if (ctaParagraph) {
              tl.fromTo(
                ctaParagraph,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
                "-=0.4"
              );
            }

            if (ctaButton) {
              tl.fromTo(
                ctaButton,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.6, ease: "back.out" },
                "-=0.4"
              );
            }
          },
          once: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="flex-1 bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-linear-to-r from-black via-zinc-950 to-yellow-700 text-white transition-colors">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200"
            alt="hero"
            fill
            className="object-cover"
            loading="eager"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 ref={heroTitleRef} className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Home</h1>
          <p ref={heroSubtitleRef} className="text-xl md:text-2xl mb-8 max-w-2xl">
            Explore thousands of properties across India. Your perfect home is just a search away.
          </p>
          
          {/* Search Bar */}
          <div ref={heroSearchRef} className="bg-zinc-950 dark:bg-black rounded-lg p-4 shadow-lg max-w-2xl transition-colors border border-yellow-500/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Enter location"
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
              />
              <select className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors">
                <option>Property Type</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>House</option>
              </select>
              <input
                type="number"
                placeholder="Max Price"
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
              />
              <Link
                href="/listings"
                className="bg-yellow-500 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-400 flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-16 bg-zinc-950 dark:bg-black transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">Browse by Category</h2>
          <div ref={categoriesRef} className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href="/listings">
                <div className="category-card bg-zinc-950 dark:bg-black p-8 rounded-lg shadow-md hover:shadow-lg hover:border-yellow-400 border-2 border-transparent transition-all text-center cursor-pointer transform hover:scale-105 active:scale-95">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">{category.name}</h3>
                  <p className="text-yellow-400 font-semibold">{category.count} Properties</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4 text-white">Featured Listings</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12">Handpicked properties for you</p>
          <div ref={featuredRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div key={property.id} className="property-card-wrapper">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/listings"
              className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 inline-block transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-zinc-950 dark:bg-black transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Why Choose PrimeNest?</h2>
          <div ref={whyChooseRef} className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {reasons.map((reason, index) => (
              <div key={index} className="reason-card bg-zinc-950 dark:bg-black p-8 rounded-lg shadow-md shadow-yellow-500/10 text-center hover:shadow-lg transition-all transform hover:scale-105 active:scale-95">
                <div className="text-4xl mb-4">{reason.icon}</div>
                <h3 className="font-bold text-lg text-white mb-2">{reason.title}</h3>
                <p className="text-gray-300 dark:text-gray-400">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">What Our Clients Say</h2>
          <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card bg-zinc-950 dark:bg-black p-8 rounded-lg shadow-md shadow-yellow-500/10 hover:shadow-lg transition-all">
                <div className="flex items-center mb-4 gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">{testimonial.name}</h3>
                    <div className="text-yellow-500">{"⭐".repeat(testimonial.rating)}</div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-16 bg-yellow-500 text-black transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Home?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their perfect properties on PrimeNest.
          </p>
          <Link
            href="/listings"
            className="bg-black text-yellow-400 px-8 py-3 rounded-lg font-semibold hover:bg-zinc-900 inline-block transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Start Exploring Now
          </Link>
        </div>
      </section>
    </main>
  );
}
