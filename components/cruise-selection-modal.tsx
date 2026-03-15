'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function CruiseSelectionModal() {
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [bookingUrl, setBookingUrl] = useState<string | null>(null);

  // Listen for global cruise selection events
  useEffect(() => {
    const handleOpenCruiseSelection = () => {
      setIsSelectionModalOpen(true);
    };

    window.addEventListener('openCruiseSelection', handleOpenCruiseSelection);
    
    return () => {
      window.removeEventListener('openCruiseSelection', handleOpenCruiseSelection);
    };
  }, []);

  const handleCruiseSelection = (cruiseType: '2-hour' | '4-hour') => {
    setIsSelectionModalOpen(false);
    setSelectedTour(cruiseType);
    if (cruiseType === '2-hour') {
      setBookingUrl("https://order.caddycruise.com/widget/booking/XQ55Qz19xzQU683UmA0U");
    } else if (cruiseType === '4-hour') {
      setBookingUrl("https://order.caddycruise.com/widget/booking/rGax0odBeaPlWQ5cah0n");
    }
    setIsBookingModalOpen(true);
  };

  return (
    <>
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
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
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
    </>
  );
}