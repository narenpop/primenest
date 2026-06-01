"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!containerRef.current) return;

    // Animate in when component mounts or path changes
    const tl = gsap.timeline();

    tl.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }
    );

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div ref={containerRef} className="transition-container">
      {children}
    </div>
  );
}
