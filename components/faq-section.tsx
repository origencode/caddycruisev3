'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const handleBookTour = () => {
    window.dispatchEvent(new Event('openCruiseSelection'));
  };

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: 'Do I need to book in advance?',
      answer: 'Yes—it’s highly recommended to reserve your spot ahead of time. Walk-in availability is not guaranteed.'
    },
    {
      question: ' What is the cancellation and weather policy?',
      answer: 'You may cancel up to 30+ days in advance for a full refund. If we cancel due to unsafe weather, you\'ll receive a full refund or the option to reschedule.'
    },
    {
      question: 'How do I pay, and when?',
      answer: 'We accept credit cards via stripe, 4% convenience fee may apply at checkout. Payment is typically due at the time of booking unless otherwise arranged.'
    },
    {
      question: 'What happens if the weather is bad on tour day?',
      answer: 'Tours may continue in light rain, but if conditions are unsafe, we’ll cancel or reschedule at no extra cost.'
    },
    {
      question: 'What should I bring—are food and drinks allowed?',
      answer: 'Bring essentials like sunscreen, water, and a snack. You can bring your own drinks and ice. We provide the cooler.'
    },
    {
      question: 'Is it safe if I can’t swim or am bringing kids?',
      answer: 'Absolutely. Life jackets are provided to all passengers, and children and non-swimmers are welcome. Safety is our top priority.'
    }
  ];

  return (
    <section className="py-20 bg-brand-pink">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-teal mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-brand-teal/80 max-w-2xl mx-auto">
            Everything you need to know for your perfect Caddy Cruise experience.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-brand-mint/20 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-brand-light transition-colors"
                aria-expanded={openItems.includes(index)}
              >
                <h3 className="text-lg font-semibold text-brand-teal pr-4">
                  {faq.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-brand-accent flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-brand-accent flex-shrink-0" />
                )}
              </button>
              
              <div
                className={cn(
                  'px-6 overflow-hidden transition-all duration-300',
                  openItems.includes(index) 
                    ? 'max-h-96 pb-6' 
                    : 'max-h-0'
                )}
              >
                <p className="text-brand-teal/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-brand-teal mb-6 text-lg">
            Still have questions? We&rsquo;re here to help!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={handleBookTour}
              size="lg"
              className="w-full sm:w-56 bg-brand-teal text-white hover:bg-brand-teal/90 rounded-xl"
            >
              Book a Tour
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-56 border-2 border-brand-teal bg-transparent text-brand-teal hover:bg-brand-teal hover:text-white rounded-xl"
            >
              <a href="tel:+19417777465">
                Call (941) 777-7465
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}