'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerPage = 4;
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [cardFixedHeight, setCardFixedHeight] = useState<number | undefined>(undefined);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize reviews array to prevent unnecessary re-renders
  const reviews = useMemo(() => [
    {
      id: 1,
      name: 'Sarah M.',
      location: 'Tampa, FL',
      rating: 5,
      text: "The Caddy Cruise was an absolute vibe! Cruising in a Cadillac-shaped boat was the highlight of our trip — smooth ride, amazing views, and total style. Highly recommend!",
      date: '2 weeks ago'
    },
    {
      id: 2,
      name: 'Mike & Jessica R.',
      location: 'Orlando, FL',
      rating: 5,
      text: "Couples Cruise to Remember My partner and I took an evening cruise with Captain Jo, and it honestly felt like a scene from a movie. The boat is charming and just quirky enough to be romantic. We toasted champagne under the stars and didn't want it to end.",
      date: '1 month ago'
    },
    {
      id: 3,
      name: 'The Johnson Family',
      location: 'Sarasota, FL',
      rating: 5,
      text: "Music, Dancing & Sunset Views The vibe was perfect—good tunes, warm breeze, and the best view of the sunset. Captain Marcus knew all the best photo spots and let us hook up our playlist to the boat's speaker system. Felt like our own little party on the water.",
      date: '3 weeks ago'
    },
    {
      id: 4,
      name: 'David L.',
      location: 'Naples, FL',
      rating: 5,
      text: "Sandbar Fun with Friends We booked a private Pink Caddy Cruise to the sandbar with six of our closest friends. Captain Layla was so friendly and fun. She brought beach games and even helped us take group photos. This was hands-down the best beach day we've had in years.",
      date: '1 week ago'
    },
    {
      id: 5,
      name: 'Amanda K.',
      location: 'St. Petersburg, FL',
      rating: 5,
      text: "Chill Day, No Crowds My wife and I booked a midday cruise with Captain Eli, and it was everything we needed. Quiet, peaceful, and not crowded at all. Floating on the water with a cold drink and great conversation—it was the highlight of our trip to Sarasota.",
      date: '4 days ago'
    },
    {
      id: 6,
      name: 'Robert & Linda T.',
      location: 'Bradenton, FL',
      rating: 5,
      text: "Birthday Bash on the Water We surprised my sister with a Pink Caddy Cruise for her birthday, and it was a total hit! Captain Sierra made the whole ride feel like a VIP celebration. We had music, drinks, and gorgeous views—what more could you want? This will definitely become a birthday tradition.",
      date: '1 week ago'
    },
    {
      id: 7,
      name: 'The Martinez Group',
      location: 'Miami, FL',
      rating: 5,
      text: "First Time, Won't Be the Last! It was our first time on a Pink Caddy Cruise boat, and we were blown away. Floating on clear water with a drink in hand, good company, and a great captain—Leo—it just doesn't get better than this. We'll definitely be back!",
      date: '5 days ago'
    },
    {
      id: 8,
      name: 'Emily & Jake W.',
      location: 'Fort Myers, FL',
      rating: 5,
      text: "Bachelorette Party Perfection We booked a 4-hour Pink Caddy Cruise sandbar adventure for a bachelorette party—and it couldn't have gone better. Captain Zane knew exactly where to take us for fun and privacy. From lounging in the water to dancing on the boat, every second was a blast.",
      date: '3 days ago'
    }
  ], []);

  // Memoize calculated values
  const totalPages = useMemo(() => Math.ceil(reviews.length / reviewsPerPage), [reviews.length, reviewsPerPage]);
  const currentReviews = useMemo(() => reviews.slice(currentIndex, currentIndex + reviewsPerPage), [reviews, currentIndex, reviewsPerPage]);

  // Debounced height calculation function
  const calculateHeight = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    
    resizeTimeoutRef.current = setTimeout(() => {
      const container = gridRef.current;
      if (!container) return;
      
      const cardElements = Array.from(
        container.querySelectorAll('[data-review-card]')
      ) as HTMLElement[];
      
      if (cardElements.length === 0) return;
      
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        const maxHeight = Math.max(
          ...cardElements.map((el) => el.getBoundingClientRect().height)
        );
        setCardFixedHeight(Math.ceil(maxHeight));
      });
    }, 100); // Debounce by 100ms
  }, []);

  // Fix: Add proper dependencies and cleanup
  useEffect(() => {
    calculateHeight();
    
    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [currentReviews, calculateHeight]);

  // Add resize listener for responsive height adjustments
  useEffect(() => {
    const handleResize = () => calculateHeight();
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateHeight]);

  // Optimized navigation functions
  const nextReviews = useCallback(() => {
    setCurrentIndex(prevIndex => {
      const nextIndex = prevIndex + reviewsPerPage;
      return nextIndex < reviews.length ? nextIndex : prevIndex;
    });
  }, [reviewsPerPage, reviews.length]);

  const prevReviews = useCallback(() => {
    setCurrentIndex(prevIndex => prevIndex > 0 ? prevIndex - reviewsPerPage : 0);
  }, [reviewsPerPage]);

  const goToPage = useCallback((pageIndex: number) => {
    setCurrentIndex(pageIndex * reviewsPerPage);
  }, [reviewsPerPage]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-teal mb-4">
            What Our Guests Say
          </h2>
          <p className="text-xl text-brand-teal/80 max-w-2xl mx-auto">
            Don&rsquo;t just take our word for it. Here&rsquo;s what our happy passengers have to say about their Caddy Cruise experience.
          </p>
        </div>

        <div className="relative">
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {currentReviews.map((review) => (
              <div
                key={review.id}
                className="bg-brand-light p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-brand-pink/30 h-full flex flex-col overflow-hidden"
                data-review-card
                style={{ height: cardFixedHeight }}
              >
                <div className="flex items-center justify-between mb-3 h-5">
                  <div className="flex text-brand-accent">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-brand-mint opacity-50" />
                </div>
                
                <p className="text-brand-teal/90 mb-3 leading-snug italic flex-1 text-left overflow-hidden text-sm">
                  &ldquo;{review.text}&rdquo;
                </p>
                
                <div className="border-t border-brand-pink/20 pt-3 mt-auto text-left">
                  <div className="font-semibold text-brand-teal">{review.name}</div>
                  <div className="text-sm text-brand-teal/60">{review.location}</div>
                  <div className="text-xs text-brand-teal/50 mt-1">{review.date}</div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-8 space-x-4">
              <button
                onClick={prevReviews}
                disabled={currentIndex === 0}
                className={`p-2 rounded-full transition-colors ${
                  currentIndex === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-brand-mint text-brand-teal hover:bg-brand-teal hover:text-white'
                }`}
                aria-label="Previous reviews"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <div className="flex space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      Math.floor(currentIndex / reviewsPerPage) === index
                        ? 'bg-brand-teal'
                        : 'bg-brand-mint'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextReviews}
                disabled={currentIndex + reviewsPerPage >= reviews.length}
                className={`p-2 rounded-full transition-colors ${
                  currentIndex + reviewsPerPage >= reviews.length
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-brand-mint text-brand-teal hover:bg-brand-teal hover:text-white'
                }`}
                aria-label="Next reviews"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <p className="text-brand-teal/70 mb-4">
            Join hundreds of satisfied guests who&rsquo;ve experienced the magic of Caddy Cruise
          </p>
          <div className="flex items-center justify-center space-x-1">
            <div className="flex text-brand-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="text-brand-teal font-semibold ml-2">5.0/5 Average Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}