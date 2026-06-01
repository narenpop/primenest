import gsap from "gsap";

// Page transition animations
export const animatePageIn = (element: HTMLElement) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    }
  );
};

export const animatePageOut = (element: HTMLElement) => {
  return gsap.to(element, {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: "power2.in",
  });
};

// Section animations
export const animateSectionIn = (element: HTMLElement, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      delay,
    }
  );
};

// Stagger animation for cards
export const animateCardsIn = (elements: NodeListOf<Element>) => {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "back.out",
      stagger: {
        amount: 0.4,
        from: "start",
      },
    }
  );
};

// Hero animation
export const animateHero = (titleEl: HTMLElement, subtitleEl: HTMLElement, searchEl: HTMLElement) => {
  const tl = gsap.timeline();

  tl.fromTo(
    titleEl,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
    0
  )
    .fromTo(
      subtitleEl,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(
      searchEl,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out" },
      "-=0.6"
    );

  return tl;
};

// Button hover animation
export const setupButtonAnimation = (button: HTMLElement) => {
  button.addEventListener("mouseenter", () => {
    gsap.to(button, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(button, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });
};

// Card hover animation
export const setupCardAnimation = (card: HTMLElement) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      y: -10,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
      duration: 0.4,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      y: 0,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      duration: 0.4,
      ease: "power2.out",
    });
  });
};

// Counter animation (for stats)
export const animateCounter = (element: HTMLElement, endValue: number, duration = 2) => {
  const obj = { value: 0 };

  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: "power1.inOut",
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toLocaleString();
    },
  });
};

// Scroll reveal animation
export const observeElements = (selector: string) => {
  if (typeof window === "undefined") return;

  const elements = document.querySelectorAll(selector);
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            entry.target,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            }
          );
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
  return observer;
};

// Smooth scroll to element
export const smoothScrollTo = (element: HTMLElement, offset = 80) => {
  gsap.to(window, {
    scrollTo: {
      y: element,
      offsetY: offset,
    },
    duration: 1,
    ease: "power2.inOut",
  });
};

// Modal animations
export const animateModalIn = (element: HTMLElement) => {
  const tl = gsap.timeline();

  // Backdrop
  tl.fromTo(
    element.querySelector(".modal-backdrop"),
    { opacity: 0 },
    { opacity: 1, duration: 0.3 },
    0
  );

  // Modal content
  tl.fromTo(
    element.querySelector(".modal-content"),
    { opacity: 0, scale: 0.8, y: 20 },
    { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out" },
    "-=0.2"
  );

  return tl;
};

export const animateModalOut = (element: HTMLElement) => {
  const tl = gsap.timeline();

  tl.to(element.querySelector(".modal-content"), {
    opacity: 0,
    scale: 0.8,
    y: 20,
    duration: 0.3,
    ease: "back.in",
  })
    .to(
      element.querySelector(".modal-backdrop"),
      { opacity: 0, duration: 0.2 },
      "-=0.2"
    );

  return tl;
};

// Floating animation
export const animateFloating = (element: HTMLElement, speed = 3) => {
  return gsap.to(element, {
    y: 10,
    duration: speed,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
};

// Pulse animation
export const animatePulse = (element: HTMLElement) => {
  return gsap.to(element, {
    scale: 1.05,
    opacity: 0.8,
    duration: 0.6,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
};

// Rotate animation
export const animateRotate = (element: HTMLElement, degrees = 360, duration = 2) => {
  return gsap.to(element, {
    rotation: degrees,
    duration,
    ease: "none",
    repeat: -1,
  });
};
