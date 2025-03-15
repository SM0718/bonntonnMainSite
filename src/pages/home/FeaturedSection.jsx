import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Next from '@/svg/Next';
import Previous from '@/svg/Previous';

const FeaturedSection = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Featured publications data
  const publications = [
    { name: 'The Telegraph', logo: './homeImages/telegraph.png' },
    { name: 'The Guardian', logo: './homeImages/guardian.png' },
    { name: 'Forbes', logo: './homeImages/forbes.png' },
    { name: 'BBC', logo: './homeImages/bbc.png' },
    { name: 'The Times', logo: './homeImages/times.png' },
    { name: 'Vogue', logo: './homeImages/vogue.png' }
  ];

  // Custom Next Arrow with animation
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute top-1/2 -right-4 md:-right-8 lg:-right-12 transform -translate-y-1/2 cursor-pointer z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-20 backdrop-blur-sm transition-all duration-300 hover:bg-opacity-40 hover:scale-110"
        onClick={onClick}
        aria-label="Next slide"
      >
        <span className="text-white">
          <Next />
        </span>
      </div>
    );
  }

  // Custom Previous Arrow with animation
  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute top-1/2 -left-4 md:-left-8 lg:-left-12 transform -translate-y-1/2 cursor-pointer z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-20 backdrop-blur-sm transition-all duration-300 hover:bg-opacity-40 hover:scale-110"
        onClick={onClick}
        aria-label="Previous slide"
      >
        <span className="text-white">
          <Previous />
        </span>
      </div>
    );
  }

  // Responsive slider settings
  const settings = {
    className: 'mx-auto',
    infinite: true,
    slidesToShow: getSlidesToShow(),
    speed: 700,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'ease-in-out',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dots: true,
    dotsClass: 'slick-dots custom-dots',
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  // Calculate slides to show based on screen width
  function getSlidesToShow() {
    if (windowWidth < 600) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  }

  // Handle window resize with debounce
  const handleResize = () => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let timeoutId = null;
      const debounceResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleResize, 200);
      };
      
      window.addEventListener('resize', debounceResize);
      return () => {
        window.removeEventListener('resize', debounceResize);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  return (
    <section className="bg-gradient-to-r bg-[#BD9153]/75 py-12 md:py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r bg-[#BD9153] opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l bg-[#BD9153] opacity-40"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Title with decorative elements */}
        <div className="flex items-center justify-center mb-10 relative">
          <div className="h-px w-16 bg-[#e2c18b] opacity-70 hidden md:block"></div>
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold text-center mx-4 trajan tracking-wider">
            Featured In
          </h2>
          <div className="h-px w-16 bg-[#e2c18b] opacity-70 hidden md:block"></div>
        </div>
        
        <div className="slider-container relative w-full md:w-11/12 lg:w-5/6 mx-auto">
          <Slider {...settings}>
            {publications.map((pub, index) => (
              <div key={index} className="px-3 md:px-4 lg:px-6 py-2">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex items-center justify-center h-28 md:h-32 transition-all duration-300 hover:bg-opacity-20 hover:shadow-lg hover:shadow-[#8d6c3a]/30 transform hover:-translate-y-1">
                  <img
                    src={pub.logo}
                    alt={pub.name}
                    className="w-auto max-w-full h-auto max-h-16 md:max-h-20 object-contain filter brightness-110"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        
        {/* Subtle decorative text */}
        <p className="text-center mt-10 text-white/75 text-xs font-semibold uppercase tracking-widest">
          Trusted by leading publications nationwide
        </p>
      </div>
    </section>
  );
};

export default FeaturedSection;