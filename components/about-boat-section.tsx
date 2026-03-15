'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BOAT_IMAGES = [
  {
    url: 'https://ik.imagekit.io/l1mhaygkv/DJI_0676%202.webp?updatedAt=1755624142125',
    alt: 'Pink Cadillac boat cruising on Sarasota Bay'
  },
  {
    url: 'https://ik.imagekit.io/l1mhaygkv/Grid/DJI_0759.webp?updatedAt=1755624098723',
    alt: 'Aerial view of the pink Cadillac boat'
  },
  {
    url: 'https://ik.imagekit.io/l1mhaygkv/Grid/DJI_0783.webp?updatedAt=1755624098417',
    alt: 'Pink Cadillac boat with passengers enjoying the cruise'
  },
  {
    url: 'https://ik.imagekit.io/l1mhaygkv/Grid/DJI_0711.webp?updatedAt=1755624098288',
    alt: 'Close-up view of the unique pink Cadillac boat design'
  },
  {
    url: 'https://ik.imagekit.io/l1mhaygkv/Grid/DSC_2542.webp?updatedAt=1755624097974',
    alt: 'Pink Cadillac boat at the sandbar'
  }
];

export default function AboutBoatSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % BOAT_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + BOAT_IMAGES.length) % BOAT_IMAGES.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <section id="about" className="py-20 bg-brand-pink">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-teal">
              Meet Our Pink Cadillac Boat
            </h2>
            <p className="text-lg text-brand-teal/90 leading-relaxed">
              Our one-of-a-kind pink Cadillac boat isn&rsquo;t just a vessel – it&rsquo;s an experience! 
              Designed to turn heads and create memories, this unique boat combines classic 
              Cadillac style with modern comfort and safety.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-brand-accent mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-brand-teal mb-1">Unique Appearance</h3>
                  <p className="text-brand-teal/80">The only pink Cadillac-shaped boat in Sarasota Bay</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-brand-accent mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-brand-teal mb-1">BYOB Friendly</h3>
                  <p className="text-brand-teal/80">Bring your favorite beverages and enjoy the ride</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-brand-accent mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-brand-teal mb-1">Comfort & Fun</h3>
                  <p className="text-brand-teal/80">Spacious seating, shade, and all the amenities you need</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src={BOAT_IMAGES[currentImageIndex].url}
                alt={BOAT_IMAGES[currentImageIndex].alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-opacity duration-300"
                // Preload for faster LCP and set high fetch priority
                priority
                fetchPriority="high"
                // Remote image: no blurDataURL available
                placeholder="empty"
              />
              
              {/* Navigation Arrows */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {BOAT_IMAGES.length}
              </div>
            </div>
            
            {/* Dot Navigation */}
            <div className="flex justify-center mt-4 space-x-2">
              {BOAT_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentImageIndex
                      ? 'bg-brand-teal'
                      : 'bg-brand-teal/30 hover:bg-brand-teal/60'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-mint rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-brand-accent rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
}