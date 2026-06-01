"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { animateCardsIn, animateCounter } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export default function AboutContactPage() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutImageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // About section animation
  useEffect(() => {
    if (aboutRef.current && aboutImageRef.current) {
      const textContent = aboutRef.current.querySelector(".about-text");
      if (textContent) {
        gsap.fromTo(
          textContent,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
        );
      }

      gsap.fromTo(
        aboutImageRef.current,
        { opacity: 0, x: 40, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
      );
    }
  }, []);

  // Stats section animation
  useEffect(() => {
    if (statsRef.current) {
      const statItems = statsRef.current.querySelectorAll(".stat-item");
      gsap.to(statsRef.current, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 70%",
          onEnter: () => {
            statItems.forEach((item, index) => {
              const numberEl = item.querySelector<HTMLElement>(".stat-number");
              if (numberEl) {
                const targetNumber = parseInt(numberEl.textContent?.replace(/\D/g, "") || "0");
                animateCounter(numberEl, targetNumber, 2);
              }

              gsap.fromTo(
                item,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: "back.out", delay: index * 0.1 }
              );
            });
          },
          once: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Team section animation
  useEffect(() => {
    if (teamRef.current) {
      gsap.to(teamRef.current, {
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 70%",
          onEnter: () => {
            const cards = teamRef.current!.querySelectorAll(".team-card");
            gsap.fromTo(
              cards,
              { opacity: 0, y: 40, scale: 0.9 },
              { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out" }
            );
          },
          once: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Contact section animation
  useEffect(() => {
    if (contactFormRef.current) {
      const contactInfo = contactFormRef.current.querySelector(".contact-info");
      const form = contactFormRef.current.querySelector(".contact-form");

      gsap.to(contactFormRef.current, {
        scrollTrigger: {
          trigger: contactFormRef.current,
          start: "top 70%",
          onEnter: () => {
            if (contactInfo) {
              gsap.fromTo(
                contactInfo,
                { opacity: 0, x: -40 },
                { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
              );
            }

            if (form) {
              gsap.fromTo(
                form,
                { opacity: 0, x: 40 },
                { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", delay: 0.2 }
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

  // FAQ section animation
  useEffect(() => {
    if (faqRef.current) {
      gsap.to(faqRef.current, {
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 70%",
          onEnter: () => {
            const faqItems = faqRef.current!.querySelectorAll(".faq-item");
            gsap.fromTo(
              faqItems,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
            );
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
    <main className="flex-1">
      {/* About Section */}
      <section className="py-16 bg-black dark:bg-black transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={aboutRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="about-text">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">About PrimeNest</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                PrimeNest is India's leading real estate platform dedicated to helping you find
                your perfect home. With thousands of verified properties across major cities, we
                make the property search journey simple, transparent, and enjoyable.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                Our mission is to revolutionize the real estate industry by connecting buyers,
                sellers, and agents through innovative technology and exceptional service.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Since our launch, we've helped over 50,000 families find their dream homes and
                supported thousands of property transactions across India.
              </p>
            </div>
            <div ref={aboutImageRef} className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600"
                alt="About PrimeNest"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-yellow-500 dark:bg-yellow-600 text-black transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="stat-item">
              <p className="stat-number text-4xl font-bold mb-2">50K+</p>
              <p className="text-lg">Happy Customers</p>
            </div>
            <div className="stat-item">
              <p className="stat-number text-4xl font-bold mb-2">2K+</p>
              <p className="text-lg">Active Properties</p>
            </div>
            <div className="stat-item">
              <p className="stat-number text-4xl font-bold mb-2">100+</p>
              <p className="text-lg">Expert Agents</p>
            </div>
            <div className="stat-item">
              <p className="stat-number text-4xl font-bold mb-2">15+</p>
              <p className="text-lg">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-16 bg-zinc-950 dark:bg-black transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
              },
              {
                name: "Priya Sharma",
                role: "Head of Operations",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
              },
              {
                name: "Arjun Patel",
                role: "Head of Technology",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
              },
            ].map((member, index) => (
              <div key={index} className="team-card bg-zinc-950 dark:bg-black p-6 rounded-lg shadow-md shadow-yellow-500/10 hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-zinc-900 dark:bg-zinc-800">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-zinc-950 dark:bg-black transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Get In Touch</h2>
          <div ref={contactFormRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="contact-info">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">Address</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      123 Tech Park, Marina Bay,<br />
                      Chennai - 600001, India
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-3xl">📞</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      +91 9876543210<br />
                      +91 9876543211
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-3xl">✉️</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      info@primenest.com<br />
                      support@primenest.com
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-3xl">🕐</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">Hours</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday - Sunday: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form bg-zinc-900 dark:bg-black p-8 rounded-lg shadow-md shadow-yellow-500/5 transition-colors">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Send us a Message</h3>
              {!isFormSubmitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsFormSubmitted(true);
                    setTimeout(() => setIsFormSubmitted(false), 3000);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                      placeholder="+91 xxxxxxxxxx"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 dark:bg-yellow-600 text-black py-3 rounded-lg hover:bg-yellow-400 dark:hover:bg-yellow-500 font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95"
                  >
                    Send Message
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 animate-fade-in">
                  <div className="text-4xl mb-4">✓</div>
                  <p className="text-green-600 dark:text-green-400 font-bold text-lg mb-2">Thank You!</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your message has been sent successfully. We'll get back to you soon!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-16 bg-zinc-950 dark:bg-black transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "How do I list my property on PrimeNest?",
                a: "Contact our team and we'll help you list your property. Visit our contact page or call us for more details.",
              },
              {
                q: "Are all properties verified?",
                a: "Yes, all properties on PrimeNest are thoroughly verified and authenticated before listing.",
              },
              {
                q: "What's the best way to find properties in my budget?",
                a: "Use our advanced filters on the Properties page to filter by price, location, bedrooms, and more.",
              },
              {
                q: "Can I save my favorite properties?",
                a: "Absolutely! Click the heart icon on any property to add it to your Favorites list.",
              },
            ].map((faq, index) => (
              <div key={index} className="faq-item bg-zinc-950 dark:bg-black p-6 rounded-lg shadow-md shadow-yellow-500/5 hover:shadow-lg transition-all duration-300 border border-white/5">
                <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-lg">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
