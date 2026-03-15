import Image from 'next/image';

export default function OurStoryHero() {
  return (
    <section className="relative min-h-[60vh] bg-brand-light overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://ik.imagekit.io/l1mhaygkv/DJI_0676%202.webp?updatedAt=1755624142125"
          alt="Pink Cadillac boat on Sarasota Bay"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
          fetchPriority="high"
          placeholder="empty"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-[60vh] flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-teal mb-6">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-brand-teal/80 max-w-2xl mx-auto">
            The journey behind Sarasota&rsquo;s most unique boat tour experience
          </p>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}