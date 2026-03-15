import { Anchor, Heart, Eye, Users } from 'lucide-react';

export default function WhyChooseSection() {
  const features = [
    {
      icon: Anchor,
      title: 'Unique Pink Cadillac Boat',
      description: 'The only pink Cadillac-shaped boat in Sarasota Bay. Instagram-worthy and unforgettable!'
    },
    {
      icon: Heart,
      title: 'BYOB Freedom',
      description: 'Bring your favorite drinks and make the experience truly your own. We provide the cooler and ice!'
    },
    {
      icon: Eye,
      title: 'Stunning Views',
      description: 'Experience breathtaking sunsets, dolphin sightings, and pristine Florida waters.'
    },
    {
      icon: Users,
      title: 'Relaxed Local Vibes',
      description: 'No crowds, no rush. Just you, your group, and the beautiful bay with local captain expertise.'
    }
  ];

  return (
    <section className="py-20 bg-brand-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-teal mb-4">
            Why Choose Caddy Cruise?
          </h2>
          <p className="text-xl text-brand-teal/80 max-w-2xl mx-auto">
            We&rsquo;re not just another boat tour. We&rsquo;re your ticket to a one-of-a-kind Sarasota experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-20 h-20 bg-brand-mint rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-teal transition-colors">
                <feature.icon className="h-10 w-10 text-brand-teal group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-brand-teal mb-3">
                {feature.title}
              </h3>
              <p className="text-brand-teal/80 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative divider */}
        <div className="flex justify-center mt-16">
          <div className="w-24 h-1 bg-gradient-to-r from-brand-mint to-brand-accent rounded-full"></div>
        </div>
      </div>
    </section>
  );
}