'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

// Remote ImageKit URL formerly used for overlay image; keep as video poster only
// Use ImageKit-hosted HD MP4 for broad compatibility and fast CDN delivery
const HERO_VIDEO_MP4 = 'https://ik.imagekit.io/l1mhaygkv/Caddy%20Cruise%20Hero%20Video.mp4/ik-video.mp4?updatedAt=1755624198810';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const pathname = usePathname();

  // Preconnect to the video/image CDN for faster first-byte
  useEffect(() => {
    const makeLink = (rel: string) => {
      const l = document.createElement('link');
      l.rel = rel;
      l.href = 'https://ik.imagekit.io';
      l.crossOrigin = '';
      document.head.appendChild(l);
      return l;
    };
    const preconnect = makeLink('preconnect');
    const dnsPrefetch = makeLink('dns-prefetch');
    return () => {
      [preconnect, dnsPrefetch].forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    };
  }, []);

  useEffect(() => {
    // Do not run any video logic if we are not on the home page
    if (pathname !== '/') {
      return;
    }

    const video = videoRef.current;
    const container = containerRef.current;
    if (!container || !video) return;

    // Respect users who prefer reduced motion: do not autoplay video in that case
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Check for data-saver mode to respect user's bandwidth preferences
    const navConn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const saveData = !!(navConn && navConn.saveData);

    // Only disable video for reduced motion preference or explicit data-saver mode
    // Removed small screen detection to allow video on mobile and tablets
    const shouldDisableVideo = prefersReducedMotion || saveData;
    if (shouldDisableVideo) {
      // Ensure poster image remains visible
      setIsPlaying(false);
      setVideoLoaded(false);
      return;
    }

    let observer: IntersectionObserver | null = null;

    const onIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Lazy-load the video when the hero enters the viewport
          if (!videoLoaded) {
            // Keep preload minimal; let the browser fetch as needed upon play
            video.setAttribute('preload', 'metadata');

            // Inject MP4 source from CDN for maximum compatibility
            if (!video.querySelector('source')) {
              const srcMp4 = document.createElement('source');
              srcMp4.src = HERO_VIDEO_MP4;
              srcMp4.type = 'video/mp4';
              video.appendChild(srcMp4);
            }

            // load and attempt to play (muted autoplay should be allowed in modern browsers)
            video.load();
            const playPromise = video.play();
            if (playPromise && typeof playPromise.then === 'function') {
              playPromise
                .then(() => {
                  setIsPlaying(true);
                  setVideoLoaded(true);
                })
                .catch(() => {
                  // Autoplay failed (some browsers or network conditions). We'll keep the poster image visible.
                  setIsPlaying(false);
                  setVideoLoaded(true);
                });
            } else {
              // Older browsers: assume playing
              setIsPlaying(true);
              setVideoLoaded(true);
            }
          }

          // We don't need the observer after we've attempted load
          if (observer) {
            observer.disconnect();
            observer = null;
          }
        }
      });
    };

    observer = new IntersectionObserver(onIntersect, { root: null, threshold: 0.25 });
    observer.observe(container);

    // Pause video when the document becomes hidden to save resources
    const onVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
        setIsPlaying(false);
      } else if (videoLoaded && video.muted) {
        // Attempt to resume if previously playing
        const p = video.play();
        if (p && typeof p.then === 'function') p.catch(() => {});
        setIsPlaying(!video.paused);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (observer) observer.disconnect();
    };
  }, [videoLoaded, pathname]);

  // Pause on explicit user interaction (click, focus via keyboard)
  const handleUserPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      video.pause();
      setIsPlaying(false);
    } else {
      // If user clicks to resume, attempt to play (muted autoplay allowed)
      const p = video.play();
      if (p && typeof p.then === 'function') p.catch(() => {});
      setIsPlaying(!video.paused);
    }
  };

  return (
    <section id="hero" className="relative min-h-[85vh] lg:min-h-screen overflow-hidden" ref={containerRef}>
      {/* Background Video only: no poster to avoid any preloaded image */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        preload="none"
        muted
        loop
        playsInline
        autoPlay
        aria-hidden="true"
      >
        {/* MP4 source hosted on ImageKit (HD). Kept as a <source> so browsers can decide best usage. */}
      </video>

      {/* Overlay to ensure contrast over the video */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" />

      {/* Small accessible control to pause/play the background video (visible to assistive tech). */}
      <div className="absolute top-4 right-4 z-20">
        <button
          type="button"
          className="sr-only focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white text-white bg-black/40 rounded px-3 py-2"
          aria-pressed={!isPlaying}
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          onClick={(e) => {
            e.stopPropagation();
            handleUserPause();
          }}
        >
          {isPlaying ? 'Pause video' : 'Play video'}
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-[85vh] lg:min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-xl mb-6 animate-fade-in">
            Cruise Sarasota in a{' '}
            <span className="text-brand-accent">Pink Cadillac Boat</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in">
            Bring your own drinks and enjoy an unforgettable ride through beautiful Sarasota Bay!
          </p>
          <div className="animate-fade-in">
            <Button 
              onClick={() => {
                window.dispatchEvent(new Event('openCruiseSelection'));
              }} 
              size="lg" 
              className="text-lg px-12 py-4 shadow-lg shadow-black/20"
            >
              Book a Tour
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
}