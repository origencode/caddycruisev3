'use client';

import { MapPin, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactSection() {
  const handleBookTour = () => {
    const tourSection = document.querySelector('[data-tour-section]');
    if (tourSection) {
      const event = new CustomEvent('openCruiseSelection');
      tourSection.dispatchEvent(event);
    }
  };

  return (
    <section id="contact" className="py-20 bg-brand-mint scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Find Us in Beautiful Sarasota
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            We&rsquo;re conveniently located at Sarasota Bay, making it easy to start your pink Cadillac boat adventure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-brand-mint rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-brand-teal transition-colors duration-300 group">
                  <MapPin className="h-8 w-8 text-brand-teal group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-teal mb-2">
                    Departure Location
                  </h3>
                  <p className="text-brand-teal/80">
                    7650 S Tamiami Trl<br />
                    Sarasota, FL 34231
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-brand-mint rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-brand-teal transition-colors duration-300 group">
                  <Phone className="h-8 w-8 text-brand-teal group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-teal mb-2">
                    Contact Information
                  </h3>
                  <p className="text-brand-teal/80 mb-2">
                    <a href="tel:+19417777465" className="hover:text-brand-accent transition-colors">
                      (941) 777-7465
                    </a>
                  </p>
                  <p className="text-sm text-brand-teal/70">
                    Available 7 days a week, 8 AM - 9 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-brand-mint rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-brand-teal transition-colors duration-300 group">
                  <Clock className="h-8 w-8 text-brand-teal group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-teal mb-2">
                    Tour Schedule
                  </h3>
                  <div className="text-brand-teal/80 space-y-1">
                    <p>Morning Tours: 8:00 AM & 11:30 AM</p>
                    <p>Afternoon Tours: 1:30 PM & 5:30 PM</p>
                    <p>Sunset Tours: 6:00 PM & 9:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleBookTour} size="lg" className="mb-4">
                Book a Tour
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="mb-4 border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-teal"
              >
                <a
                href="tel:+19417777465"
                >
                  Call (941) 777-7465
                </a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                title="Map showing Sarasota Bay"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3544.8!2d-82.5!3d27.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s7650+S+Tamiami+Trl%2C+Sarasota%2C+FL+34231!5e0!3m2!1sen!2sus!4v1706873301234"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-white/20 rounded-full"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-brand-accent/60 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}