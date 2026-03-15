'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LOGO_URL } from '@/lib/constants';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const pathname = usePathname();
  const isOurStoryPage = pathname === '/our-story';

  useEffect(() => {
    let ticking = false;
    const DELTA_THRESHOLD = 8; // ignore tiny scrolls to prevent jitter
    const SCROLLED_BG_OFFSET = 100;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(currentScrollY > SCROLLED_BG_OFFSET);

          const delta = currentScrollY - lastScrollYRef.current;
          const isAtTop = currentScrollY < 80;

          if (isMenuOpen) {
            setIsVisible(true);
          } else if (isAtTop) {
            setIsVisible(true);
          } else if (Math.abs(delta) > DELTA_THRESHOLD) {
            // Hide on scroll down, show on scroll up
            setIsVisible(delta < 0);
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const isHomePage = typeof window !== 'undefined' && window.location.pathname === '/';
    if (!isHomePage) {
      // Hand off navigation to Next.js via anchor to ensure reliable cross-page routing
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const handleBookTour = () => {
    window.dispatchEvent(new Event('openCruiseSelection'));
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform',
        isMenuOpen ? 'bg-white shadow-lg' : isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent',
        (isMenuOpen || isVisible) ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center" aria-label="CaddyCruise home">
            <Image
              src={LOGO_URL}
              alt="CaddyCruise.com logo"
              width={400}
              height={120}
              priority
              fetchPriority="high"
              className="h-16 w-auto lg:h-20 scale-110 origin-left"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-8 flex-1">
            <a
              href="/"
              className={cn(
                'transition-colors font-medium',
                isScrolled 
                  ? 'text-brand-teal hover:text-brand-accent' 
                  : isOurStoryPage 
                    ? 'text-brand-teal hover:text-brand-accent' 
                    : 'text-white hover:text-brand-accent'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/#tours"
              onClick={(e) => {
                if (typeof window !== 'undefined' && window.location.pathname === '/') {
                  e.preventDefault();
                  scrollToSection('tours');
                }
              }}
              className={cn(
                'transition-colors font-medium',
                isScrolled 
                  ? 'text-brand-teal hover:text-brand-accent' 
                  : isOurStoryPage 
                    ? 'text-brand-teal hover:text-brand-accent' 
                    : 'text-white hover:text-brand-accent'
              )}
            >
              Tours
            </a>
            <a
              href="/our-story"
              className={cn(
                'transition-colors font-medium',
                isScrolled 
                  ? 'text-brand-teal hover:text-brand-accent' 
                  : isOurStoryPage 
                    ? 'text-brand-teal hover:text-brand-accent' 
                    : 'text-white hover:text-brand-accent'
              )}
            >
              Our Story
            </a>
            <a
              href="tel:+19417777465"
              className={cn(
                'transition-colors font-medium',
                isScrolled 
                  ? 'text-brand-teal hover:text-brand-accent' 
                  : isOurStoryPage 
                    ? 'text-brand-teal hover:text-brand-accent' 
                    : 'text-white hover:text-brand-accent'
              )}
              aria-label="Call (941) 777-7465"
            >
              (941) 777-7465
            </a>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Button onClick={handleBookTour} size="lg">
              Book a Tour
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              'lg:hidden p-2 transition-colors',
              isScrolled 
                ? 'text-brand-teal hover:text-brand-accent' 
                : isOurStoryPage 
                  ? 'text-brand-teal hover:text-brand-accent' 
                  : 'text-white hover:text-brand-accent'
            )}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300',
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
        id="mobile-menu"
      >
        <div className="container mx-auto px-4 py-6 space-y-4 text-center">
          <a
            href="/"
            className="block w-full py-2 text-brand-teal hover:text-brand-accent transition-colors font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="/#tours"
            onClick={(e) => {
              if (typeof window !== 'undefined' && window.location.pathname === '/') {
                e.preventDefault();
                scrollToSection('tours');
              }
              setIsMenuOpen(false);
            }}
            className="block w-full py-2 text-brand-teal hover:text-brand-accent transition-colors font-medium"
          >
            Tours
          </a>
          <a
            href="/our-story"
            className="block w-full py-2 text-brand-teal hover:text-brand-accent transition-colors font-medium"
          >
            Our Story
          </a>
          <a
            href="tel:+19417777465"
            onClick={() => setIsMenuOpen(false)}
            className="block w-full py-2 text-brand-teal hover:text-brand-accent transition-colors font-medium"
            aria-label="Call (941) 777-7465"
          >
            (941) 777-7465
          </a>
          <div className="pt-4">
            <Button onClick={handleBookTour} size="lg" className="w-full">
              Book a Tour
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}