'use client';

import { Button } from '@/components/ui/button';
import { Calendar, Clock, Wine } from 'lucide-react';

export default function BookingSection() {

  const handleBookTour = () => {
    window.dispatchEvent(new Event('openCruiseSelection'));
  };

  const steps = [
    {
      number: '1',
      icon: Calendar,
      title: 'Pick Your Tour',
      description: 'Choose between our 2-hour Bay Cruise or 4-hour Adventure based on your schedule and preferences.'
    },
    {
      number: '2',
      icon: Clock,
      title: 'Choose a Time',
      description: 'Select from our available time slots that work best for you. Morning, afternoon, and sunset tours available.'
    },
    {
      number: '3',
      icon: Wine,
      title: 'Bring Your Drinks & Cruise!',
      description: 'Pack your favorite beverages, meet us at Nora Patterson Bay Island Park, and get ready for an unforgettable Sarasota Bay experience!'
    }
  ];

  return (
    <section id="booking" className="py-16 bg-white scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-teal mb-4">
            How to Book Your Adventure
          </h2>
          <p className="text-xl text-brand-teal/80 max-w-2xl mx-auto">
            Getting on board is as easy as 1-2-3. Start your Caddy Cruise experience today!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-brand-mint rounded-full flex items-center justify-center mx-auto group-hover:bg-brand-teal transition-colors duration-300">
                  <step.icon className="h-10 w-10 text-brand-teal group-hover:text-white transition-colors" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-brand-teal mb-3">
                {step.title}
              </h3>
              <p className="text-brand-teal/80 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Booking Widget Placeholder */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-brand-light rounded-2xl p-6 shadow-lg border-2 border-brand-mint/30 text-center">
            <h3 className="text-2xl font-semibold text-brand-teal mb-3">Ready to Book?</h3>
            <p className="text-brand-teal/80 mb-4">
              Click below to see available times and secure your spot on our pink Cadillac boat!
            </p>

            <Button onClick={handleBookTour} size="lg" className="mb-3">
              Book a Tour
            </Button>
            
            <p className="text-sm text-brand-teal/70">
              Questions about booking? Call us at{' '}
              <a href="tel:+19417777465" className="text-brand-accent font-medium hover:underline">
                (941) 777-7465
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}