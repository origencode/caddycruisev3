'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Phone, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
import { LOGO_URL } from '@/lib/constants';

const PrivacyPolicyDialog = dynamic(() => import('@/components/privacy-policy-dialog'), {
  ssr: false
});
const TermsOfServiceDialog = dynamic(() => import('@/components/terms-of-service-dialog'), {
  ssr: false
});
const CancellationPolicyDialog = dynamic(() => import('@/components/cancellation-policy-dialog'), {
  ssr: false
});

export default function Footer() {
  const handleBookTour = () => {
    const tourSection = document.querySelector('[data-tour-section]');
    if (tourSection) {
      const event = new CustomEvent('openCruiseSelection');
      tourSection.dispatchEvent(event);
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (typeof window === 'undefined') return;
    const isHomePage = window.location.pathname === '/';
    if (!isHomePage) {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-teal py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-start mb-8">
              <a href="/" aria-label="CaddyCruise home" className="inline-flex items-center">
                <Image
                  src={LOGO_URL}
                  alt="CaddyCruise.com logo"
                  width={500}
                  height={160}
                  className="h-24 w-auto md:h-28 lg:h-32 object-contain"
                />
              </a>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed max-w-xl">
              Experience Sarasota Bay like never before on our unique pink Cadillac boat.
              BYOB friendly tours with unforgettable views and memories that last a lifetime.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61578742487999"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-brand-mint hover:text-brand-teal transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-brand-mint hover:text-brand-teal transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-brand-mint hover:text-brand-teal transition-colors"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.12 20.9a6.34 6.34 0 0 0 10.86-4.43V7.93a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.16-.36z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="self-start">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-white/80 hover:text-brand-mint transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/#tours"
                  onClick={(e) => {
                    if (typeof window !== 'undefined' && window.location.pathname === '/') {
                      e.preventDefault();
                      scrollToSection('tours');
                    }
                  }}
                  className="text-white/80 hover:text-brand-mint transition-colors"
                >
                  Tours
                </a>
              </li>
              <li>
                <a href="/our-story" className="text-white/80 hover:text-brand-mint transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <button onClick={handleBookTour} className="text-white/80 hover:text-brand-mint transition-colors">
                  Book Now
                </button>
              </li>
              <li>
                <a
                  href="/#contact"
                  onClick={(e) => {
                    if (typeof window !== 'undefined' && window.location.pathname === '/') {
                      e.preventDefault();
                      scrollToSection('contact');
                    }
                  }}
                  className="text-white/80 hover:text-brand-mint transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="self-start">
            <h3 className="text-xl font-semibold text-white mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-brand-mint mt-1 flex-shrink-0" />
                <div className="pt-0.5">
                  <a
                    href="tel:+19417777465"
                    className="text-white hover:text-brand-mint transition-colors font-medium"
                  >
                    (941) 777-7465
                  </a>
                  <p className="text-white/60 text-sm">Available 7 days a week</p>
                </div>
              </div>
              
            <div className="flex items-baseline gap-4">
              <MapPin className="h-6 w-6 text-brand-mint flex-shrink-0" />
                <div className="pt-0.5">
                  <p className="text-white/80">
                    <span className="block font-medium">7650 S Tamiami Trl</span>
                    <span className="block">Sarasota, FL 34231</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-brand-mint mt-1 flex-shrink-0" />
                <div className="pt-0.5">
                  <p className="text-white/80 text-sm">
                    Tours: 8 AM - 9 PM<br />
                    Booking: 8 AM - 9 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-white/80 text-center md:text-left">
              © {currentYear} Caddy Cruise. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <PrivacyPolicyDialog>
                <button className="text-white/80 hover:text-brand-mint transition-colors">
                  Privacy Policy
                </button>
              </PrivacyPolicyDialog>
              <TermsOfServiceDialog>
                <button className="text-white/80 hover:text-brand-mint transition-colors">
                  Terms of Service
                </button>
              </TermsOfServiceDialog>
              <CancellationPolicyDialog>
                <button className="text-white/80 hover:text-brand-mint transition-colors">
                  Cancellation Policy
                </button>
              </CancellationPolicyDialog>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}