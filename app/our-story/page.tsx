import Header from '@/components/header';
import OurStoryHero from '@/components/our-story-hero';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/footer'));
const OurStoryContent = dynamic(() => import('@/components/our-story-content'));
const OurStoryGallery = dynamic(() => import('@/components/our-story-gallery'));

export const metadata = {
  title: 'Our Story - Caddy Cruise Pink Cadillac Boat Tours',
  description: 'Learn about the story behind Caddy Cruise and our unique pink Cadillac boat tours in Sarasota Bay.',
};

export default function OurStoryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <OurStoryHero />
      <OurStoryContent />
      <OurStoryGallery />
      <Footer />
    </main>
  );
}