'use client';

import Image from 'next/image';
// Remote ImageKit URLs mapped from previous local images for best performance
const IMG_0711 = 'https://ik.imagekit.io/l1mhaygkv/Grid/DJI_0759.webp?updatedAt=1755624098723'; // replaces public/images/DJI_0711.webp
const IMG_2646 = 'https://ik.imagekit.io/l1mhaygkv/Grid/DJI_0783.webp?updatedAt=1755624098417'; // replaces public/images/DSC_2646.webp
const IMG_0745 = 'https://ik.imagekit.io/l1mhaygkv/Grid/DJI_0711.webp?updatedAt=1755624098288'; // replaces public/images/DJI_0745-1.webp
const IMG_2572 = 'https://ik.imagekit.io/l1mhaygkv/Grid/DJI_0764.webp?updatedAt=1755624098240'; // replaces public/images/DSC_2572.webp
const IMG_0676 = 'https://ik.imagekit.io/l1mhaygkv/Grid/DSC_2542.webp?updatedAt=1755624097974'; // replaces public/images/DJI_0676.webp
const IMG_0764 = 'https://ik.imagekit.io/l1mhaygkv/Grid/DSC_2567.webp?updatedAt=1755624097260'; // replaces public/images/DJI_0764.webp
import { Button } from '@/components/ui/button';

export default function OurStoryGallery() {
  const galleryImages = [
    {
      src: IMG_0711,
      alt: "Pink Cadillac boat cruising on Sarasota Bay",
      title: "Aerial View of Our Pink Cadillac Boat"
    },
    {
      src: IMG_2646,
      alt: "Beautiful sunset over Sarasota Bay",
      title: "Iconic Pink Cadillac Style"
    },
    {
      src: IMG_0745,
      alt: "Marina Jack departure location",
      title: "Sandbar Chill on the Sunchill"
    },
    {
      src: IMG_2572,
      alt: "Classic car inspiration for our boat design",
      title: "BYOB Aboard the Pink Cadillac"
    },
    {
      src: IMG_0676,
      alt: "Happy guests enjoying their cruise",
      title: "Sandbar Adventures"
    },
    {
      src: IMG_0764,
      alt: "Dolphin watching opportunities",
      title: "Cruising Sarasota Bay"
    }
  ];

  const handleBookTour = () => {
    const tourSection = document.querySelector('[data-tour-section]');
    if (tourSection) {
      const event = new CustomEvent('openCruiseSelection');
      tourSection.dispatchEvent(event);
    }
  };

  return (
    <section className="py-20 bg-brand-pink">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-teal mb-4">
            Memories in the Making
          </h2>
          <p className="text-xl text-brand-teal/80 max-w-2xl mx-auto">
            Take a look at the experiences we create and the beautiful waters we call home.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                // Remote images do not have blurDataURL
                placeholder="empty"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">
                    {image.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-brand-teal/80 text-lg mb-6">
            Ready to become part of our story?
          </p>
          {/* Replace plain anchor with a button that triggers Setmore */}
          <Button onClick={handleBookTour} size="lg" className="inline-flex items-center px-8 py-3 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors font-medium">
            Book Your Adventure
          </Button>
        </div>
      </div>
    </section>
  );
}