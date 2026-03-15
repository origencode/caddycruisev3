import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import dynamic from 'next/dynamic';

const AboutBoatSection = dynamic(() => import('@/components/about-boat-section'));
const TourOptionsSection = dynamic(() => import('@/components/tour-options-section'));
const WhyChooseSection = dynamic(() => import('@/components/why-choose-section'));
const ReviewsSection = dynamic(() => import('@/components/reviews-section'));
const FAQSection = dynamic(() => import('@/components/faq-section'));
const BookingSection = dynamic(() => import('@/components/booking-section'));
const ContactSection = dynamic(() => import('@/components/contact-section'));
const Footer = dynamic(() => import('@/components/footer'));

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutBoatSection />
      <TourOptionsSection />
      <WhyChooseSection />
      <ReviewsSection />
      <FAQSection />
      <BookingSection />
      <ContactSection />
      <Footer />
    </main>
  );
}