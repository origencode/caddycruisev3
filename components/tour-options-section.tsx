'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Clock, Users, Waves, MapPin } from 'lucide-react';
import { BOOKING_URL, BOOKING_2_HOUR_URL, BOOKING_4_HOUR_URL } from '@/lib/constants';

export default function TourOptionsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [bookingUrl, setBookingUrl] = useState<string | null>(null);

  const handleBookTour = (tourType?: string) => {
    if (tourType === '2-hour' || tourType === '4-hour') {
      setSelectedTour(tourType);
      setIsModalOpen(true);
    } else if (tourType === 'general') {
      setIsSelectionModalOpen(true);
    }
  };

  // Listen for general booking events from other components
  useEffect(() => {
    const handleOpenCruiseSelection = () => {
      setIsSelectionModalOpen(true);
    };

    const tourSection = document.querySelector('[data-tour-section]');
    if (tourSection) {
      tourSection.addEventListener('openCruiseSelection', handleOpenCruiseSelection);
      return () => {
        tourSection.removeEventListener('openCruiseSelection', handleOpenCruiseSelection);
      };
    }
  }, []);

  const handleCruiseSelection = (cruiseType: '2-hour' | '4-hour') => {
    setIsSelectionModalOpen(false);
    setSelectedTour(cruiseType);
    if (cruiseType === '2-hour') {
      setBookingUrl("https://order.caddycruise.com/widget/booking/XQ55Qz19xzQU683UmA0U");
    } else if (cruiseType === '4-hour') {
      setBookingUrl("https://order.caddycruise.com/widget/booking/rGax0odBeaPlWQ5cah0n");
    }
    setIsModalOpen(true);
  };

  const tours = [
    {
      id: '2-hour',
      title: '2-Hour Bay Cruise',
      price: '$400',
      duration: '2 Hours',
      capacity: 'Up to 6 People',
      description: 'Perfect for a quick escape! Cruise the beautiful Sarasota Bay, see dolphins, and enjoy stunning views.',
      features: [
        'USCG-certified captain',
        'Cooler available',
        'Bluetooth speaker',
        'Karaoke machine',
        'Floating trampoline',
        'Unforgettable vibes'
      ],
      popular: true,
    },
    {
      id: '4-hour',
      title: '4-Hour Adventure',
      price: '$700',
      duration: '4 Hours',
      capacity: 'Up to 6 People',
      description: 'Our signature experience! Extended cruise with multiple stops, wildlife viewing, and more time to relax.',
      features: [
        'USCG-certified captain',
        'Cooler available',
        'Bluetooth speaker',
        'Karaoke machine',
        'Floating trampoline',
        'Unforgettable vibes'
      ],
      popular: false,
    }
  ];

  return (
    <section id="tours" className="py-20 bg-white scroll-mt-24" data-tour-section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-teal mb-4">
            Choose Your Adventure
          </h2>
          <p className="text-xl text-brand-teal/80 max-w-2xl mx-auto">
            Whether you want a quick cruise or a full adventure, we have the perfect tour for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-2xl hover:border-brand-teal group h-full flex flex-col ${
                tour.popular ? 'border-brand-accent' : 'border-gray-200'
              }`}
            >
              {tour.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-brand-accent text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8 flex flex-col h-full">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-brand-teal mb-2">{tour.title}</h3>
                  <div className="text-4xl font-bold text-brand-accent mb-2">
                    {tour.price}
                    <span className="text-lg text-brand-teal/60 font-normal">/party</span>
                  </div>
                </div>

                <div className="flex justify-center space-x-6 mb-6">
                  <div className="flex items-center text-brand-teal">
                    <Clock className="h-5 w-5 mr-2 text-brand-mint" />
                    <span className="text-sm font-medium">{tour.duration}</span>
                  </div>
                  <div className="flex items-center text-brand-teal">
                    <Users className="h-5 w-5 mr-2 text-brand-mint" />
                    <span className="text-sm font-medium">{tour.capacity}</span>
                  </div>
                </div>

                <p className="text-brand-teal/80 text-center mb-6">{tour.description}</p>

                <div className="space-y-3 mb-8">
                  {tour.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Waves className="h-4 w-4 text-brand-mint mr-3 flex-shrink-0" />
                      <span className="text-brand-teal">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => handleBookTour(tour.id)}
                  className="w-full group-hover:scale-105 transition-transform mt-auto"
                  size="lg"
                >
                  Book a Tour
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-brand-teal/70 mb-4">
            All tours depart from our Sarasota location
          </p>
          <div className="flex items-center justify-center text-brand-teal">
            <MapPin className="h-5 w-5 mr-2 text-brand-mint" />
            <span>7650 S Tamiami Trl, Sarasota, FL 34231</span>
          </div>
        </div>
      </div>

      {/* Cruise Selection Modal */}
      <Dialog open={isSelectionModalOpen} onOpenChange={setIsSelectionModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-brand-teal text-center">
              Choose Your Cruise
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-6 pt-0">
            <div className="space-y-4">
              <div className="text-center p-6 bg-brand-light rounded-xl border border-brand-pink/30">
                <h3 className="text-xl font-semibold text-brand-teal mb-2">2 Hour Bay Cruise</h3>
                <p className="text-brand-teal/80 text-sm mb-4">Perfect for a quick escape with stunning bay views</p>
                <Button 
                  onClick={() => handleCruiseSelection('2-hour')}
                  className="w-full h-14 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  Reserve
                </Button>
              </div>
              
              <div className="text-center p-6 bg-brand-light rounded-xl border border-brand-pink/30">
                <h3 className="text-xl font-semibold text-brand-teal mb-2">4 Hour Adventure</h3>
                <p className="text-brand-teal/80 text-sm mb-4">Extended cruise with multiple stops and more time to relax</p>
                <Button 
                  onClick={() => handleCruiseSelection('4-hour')}
                  className="w-full h-14 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  Reserve
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[95vh] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold text-brand-teal">
              {selectedTour === '2-hour' ? 'Book 2 Hour Bay Cruise' : 
               selectedTour === '4-hour' ? 'Book 4 Hour Adventure' : 'Book a Tour'}
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-0 overflow-auto">
            {bookingUrl && (
              <iframe
                src={bookingUrl}
                style={{ width: "100%", height: "80vh", border: "none" }}
                scrolling="yes"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}