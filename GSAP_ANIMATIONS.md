# GSAP Animations Implementation

## Overview
This project now includes comprehensive GSAP (GreenSock Animation Platform) animations for smooth page transitions and interactive elements throughout the application.

## Features Implemented

### 1. **Page Transitions**
- Smooth fade-in/fade-out animations when navigating between pages
- Implemented via `components/PageTransition.tsx`
- Uses GSAP timeline for coordinated animations
- Duration: 0.5s with `power2.out` easing

### 2. **Home Page Animations**
- **Hero Section**: Title, subtitle, and search bar animate in sequence
  - Title: 0.8s fade-in + slide-up
  - Subtitle: 0.8s fade-in + slide-up (staggered -0.6s)
  - Search bar: 0.8s fade-in + scale (staggered -0.6s)

- **Categories Grid**: Cards animate in on scroll using ScrollTrigger
  - Staggered entrance with 0.4s total delay
  - Scale effect from 0.95 to 1

- **Featured Properties**: Scroll-triggered card animations
  - Staggered entrance animation
  - Smooth scale and opacity transitions

- **Why Choose Section**: Animated reason cards on scroll
  - Individual card entrance animations
  - Hover scale effects

- **Testimonials**: Scroll-triggered testimonial cards
  - Sequential fade-in animations
  - Scale and shadow effects on hover

- **CTA Section**: Call-to-action animation
  - Heading, description, and button animate in sequence
  - Once triggered by scroll

### 3. **Listings Page Animations**
- **Filter Section**: Smooth entrance animation
  - Fade-in + slide-up on page load
  - Duration: 0.6s

- **Property Cards**: GSAP-powered staggered animation
  - Entrance animation on initial load and when filters change
  - Back.out easing for elastic effect
  - Cards stagger over 0.4s

- **Loading State**: Smooth transitions
  - Skeleton loaders with pulse effect
  - Search debounce visual feedback

### 4. **Property Details Page Animations**
- **Image Carousel**: Fade-in + slide-up
  - Duration: 0.6s with power2.out easing

- **Property Info Card**: Secondary animation
  - Staggered entrance (starts at -0.4s)
  - Smooth fade and slide effects

- **Amenities Section**: Scroll-triggered animation
  - Individual amenity items slide in from left
  - Staggered with 0.1s delay between items
  - Triggered when section comes into view

- **Floor Plan**: Scroll-triggered scale animation
  - Smooth scale-in with back.out easing
  - Triggered on scroll into view

- **Agent Card**: Sidebar animation
  - Staggered entrance with slide and fade
  - Slight horizontal translation from right

- **Contact Form**: Sidebar animation
  - Delayed entrance (0.2s after agent card)
  - Smooth slide and fade animation

- **Favorite Button**: Interactive animation
  - Pulse effect when toggled (scale 1 → 1.1 → 1)
  - Uses yoyo repeat for bounce effect

### 5. **Interactive Animations**
- **Button Hover**: Scale effects (1 → 1.05 → 1)
  - Duration: 0.3s with power2.out easing
  - Smooth scale transitions

- **Card Hover**: Elevation effect
  - Y-translation with shadow changes
  - 0.4s smooth transition
  - Applied to property cards and category cards

- **Form Inputs**: Focus states
  - Smooth color and border transitions
  - Dark mode compatible

## File Structure

```
lib/
├── animations.ts          # Core GSAP animation functions
├── store.ts              # Zustand store (includes favorites)
└── debounce.ts          # Debounce utility

components/
├── PageTransition.tsx     # Page transition wrapper
├── ImageCarousel.tsx      # Image carousel with animations
├── Header.tsx            # Header with theme toggle
├── PropertyCard.tsx      # Property card with hover effects
└── ...

app/
├── page.tsx              # Home page with GSAP animations
├── listings/
│   ├── page.tsx          # Listings with scroll triggers
│   └── [id]/page.tsx     # Details page with section animations
└── ...
```

## Core Animation Functions

### `lib/animations.ts`

#### Page Transitions
- `animatePageIn(element)` - Fade in on page load
- `animatePageOut(element)` - Fade out on page exit

#### Section Animations
- `animateSectionIn(element, delay)` - Scroll-triggered section fade-in
- `animateCardsIn(elements)` - Staggered card entrance

#### Interactive Animations
- `setupButtonAnimation(button)` - Button hover scale effect
- `setupCardAnimation(card)` - Card hover elevation effect
- `animateHero(titleEl, subtitleEl, searchEl)` - Hero section timeline

#### Utility Animations
- `animateCounter(element, endValue, duration)` - Number counter
- `observeElements(selector)` - Scroll reveal intersection observer
- `smoothScrollTo(element, offset)` - Smooth scroll to element
- `animateModalIn/Out(element)` - Modal open/close animations
- `animateFloating(element, speed)` - Floating animation loop
- `animatePulse(element)` - Pulse animation loop
- `animateRotate(element, degrees, duration)` - Rotation animation

## Usage Examples

### Basic Page Transition
```tsx
import { animatePageIn } from "@/lib/animations";

useEffect(() => {
  animatePageIn(containerRef.current!);
}, []);
```

### Scroll-Triggered Animation
```tsx
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.to(element, {
  scrollTrigger: {
    trigger: element,
    start: "top 70%",
    onEnter: () => {
      animateCardsIn(element.querySelectorAll(".card"));
    },
    once: true,
  },
});
```

### Timeline Animation
```tsx
const tl = gsap.timeline();
tl.fromTo(title, {...}, 0)
  .fromTo(subtitle, {...}, "-=0.6")
  .fromTo(button, {...}, "-=0.6");
```

## Performance Considerations

1. **ScrollTrigger Cleanup**: All ScrollTrigger instances are properly killed on component unmount
2. **Timeline Cleanup**: GSAP timelines are killed to prevent memory leaks
3. **GPU Acceleration**: Animations use `transform` and `opacity` for better performance
4. **Easing**: Optimized easing functions (power2, power3, back, sine) for smooth motion
5. **Stagger**: Proper stagger implementation to prevent animation overload

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support with touch optimization

## Future Enhancements

1. **SVG Path Animations**: Animate SVG illustrations
2. **Parallax Scrolling**: GSAP parallax effects
3. **Gesture Animations**: Touch and swipe animations
4. **Advanced Transitions**: Morphing shapes and complex transitions
5. **Sound Effects**: Integrate animations with audio feedback

## Performance Metrics

- Page transition: ~0.5s
- Section entrance: ~0.6-0.8s
- Card stagger: ~0.4s total (distributed)
- Hover effects: ~0.3s
- Scroll-triggered animations: ~0.5-0.8s

All animations use GPU acceleration for smooth 60fps performance.
