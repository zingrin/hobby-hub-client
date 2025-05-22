import { useState, useEffect } from 'react';
import { Link } from 'react-router';

const slides = [
  {
    id: 1,
    title: 'Find Your Community',
    description: 'Discover groups of people who share your passions and interests.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2532&auto=format&fit=crop',
    buttonText: 'Explore Groups',
    buttonLink: '/groups',
  },
  {
    id: 2,
    title: 'Share Your Passion',
    description: 'Create a group around your hobby and connect with like-minded individuals.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2670&auto=format&fit=crop',
    buttonText: 'Start a Group',
    buttonLink: '/create-group',
  },
  {
    id: 3,
    title: 'Make Lasting Connections',
    description: 'Build friendships and connections through shared experiences and activities.',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?q=80&w=2574&auto=format&fit=crop',
    buttonText: 'Join Now',
    buttonLink: '/login',
  },
];

const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="container px-4 text-center text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-[fadeIn_1s_ease-in]">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-[fadeIn_1s_ease-in_0.2s_both]">
                {slide.description}
              </p>
              {/* Replace Button with styled Link */}
              <Link
                to={slide.buttonLink}
                className="inline-block px-6 py-3 bg-hobbyhub-500 hover:bg-hobbyhub-600 transition-colors rounded text-white text-lg font-medium animate-[fadeIn_1s_ease-in_0.4s_both]"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-30 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-30 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition-all"
        aria-label="Next slide"
      >
        <ChevronRightIcon />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
