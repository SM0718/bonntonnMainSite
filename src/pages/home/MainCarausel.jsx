import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Slider from "react-slick";

function MainCarousel() {
  const [slideActive, setSlideActive] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  let sliderRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const carouselItems = [
    {
      name: 'Gourmet Gifts',
      img: '././ggdesktop.jpg',
      desc: 'Curated with care, our artisanal treats are perfect for every occasion—from festive hampers to everyday indulgences.',
      buttonSlug: '#',
    },
    {
      name: 'Delicious Hampers',
      img: '/./dhd.jpg ',
      desc: 'Discover the perfect gifts filled with gourmet treats, thoughtfully curated for your special moments.',
      buttonSlug: '#',
    },
    {
      name: 'Festive Indulgences',
      img: '/./fid.jpg',
      desc: 'Celebrate every occasion with our luxurious range of handcrafted gourmet delights, carefully selected to delight and impress.',
      buttonSlug: '#',
    },
  ];

  const updateFunc = (e) => {
    setSlideActive(e);
  };

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <button
        className="absolute right-2 sm:right-4 md:right-6 bottom-16 sm:bottom-24 md:bottom-32 z-50 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md hidden md:flex items-center justify-center group hover:bg-white/20 transition-all duration-300 border border-white/20"
        onClick={onClick}
      >
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="group-hover:translate-x-1 transition-transform duration-300 sm:w-5 sm:h-5 md:w-6 md:h-6"
        >
          <path d="M9 5L16 12L9 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <button
        className="absolute left-2 sm:left-4 md:left-6 bottom-16 sm:bottom-24 md:bottom-32 z-50 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md hidden md:flex items-center justify-center group hover:bg-white/20 transition-all duration-300 border border-white/20"
        onClick={onClick}
      >
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="group-hover:-translate-x-1 transition-transform duration-300 sm:w-5 sm:h-5 md:w-6 md:h-6"
        >
          <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    );
  }

  const settings = {
    className: "center",
    infinite: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 1000,
    centerPadding: "0",
    slidesToShow: 1,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: function (e) {
      updateFunc(e);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          slidesToShow: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          arrows: true,
          slidesToShow: 1
        }
      }
    ]
  };

  const SliderInfo = React.forwardRef(function SliderCarInfo({ className, name, desc, backgroundImg, key, currentSlide, index }, ref) {
    return (
      <div 
        key={key} 
        className={`${className} w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex justify-center bg-center bg-no-repeat relative overflow-hidden`} 
      >
        {/* Parallax background with subtle movement */}
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-10000 ease-out"
          style={{ 
            backgroundImage: `url(${backgroundImg})`,
            transform: currentSlide ? 'scale(1.05)' : 'scale(1.15)',
            transition: 'transform 6s ease-out'
          }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

        {/* Content container */}
        <div className="container mx-auto h-full relative z-10 px-4 sm:px-6 md:px-8 lg:ml-8">
          <AnimatePresence mode="wait">
            {currentSlide && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col justify-start gap-6 sm:gap-8 md:gap-12 absolute left-0 top-1/4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl"
              >
                <div className='flex flex-col justify-between md:justify-start gap-4 sm:gap-6 md:gap-8 text-white'>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="overflow-hidden relative"
                  >
                    <div className="h-px w-16 md:w-24 bg-[#BD9153] mb-2 md:mb-4"></div>
                    <h2 className='font-semibold trajan text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide'>
                      {name.split('').map((char, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 + (i * 0.03) }}
                          className="inline-block"
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                      ))}
                    </h2>
                  </motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className='times text-sm sm:text-base md:text-xl lg:text-2xl leading-relaxed text-white/90 border-l-2 border-[#BD9153] pl-3 sm:pl-4 md:pl-6'
                  >
                    {desc}
                  </motion.p>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className='mt-2 sm:mt-4'
                >
                  <Button className="text-sm sm:text-base md:text-xl bg-[#BD9153] px-4 sm:px-6 md:px-8 py-2 sm:py-4 md:py-6 rounded-full transition-all duration-500 times text-white relative group overflow-hidden">
                    <span className="relative z-10">Order Now</span>
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#BD9153] via-white to-[#BD9153]"></span>
                    <span className="absolute right-4 sm:right-6 opacity-0 group-hover:opacity-100 group-hover:right-2 sm:group-hover:right-4 transition-all duration-500 hidden sm:block">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#BD9153" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
      className="slider-container relative"
    >
      <Slider ref={slider => { sliderRef = slider; }} {...settings}>
        {
          carouselItems.map((item, index) => 
            <SliderInfo 
              key={item.name} 
              index={index} 
              currentSlide={index === slideActive} 
              name={item.name} 
              desc={item.desc} 
              backgroundImg={item.img} 
            />
          )
        }
      </Slider>
      
      {/* Custom pagination with elegant animations */}
      <div className="absolute w-full bottom-4 sm:bottom-8 md:bottom-12 z-40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex gap-2 sm:gap-4 md:gap-6 items-center">
            {/* Progress bar - hidden on smaller screens */}
            <div className="hidden sm:block w-16 md:w-32 h-px bg-white/30 relative overflow-hidden">
              <motion.div 
                className="h-full bg-[#BD9153]"
                initial={{ width: 0 }}
                animate={{ width: `${(slideActive / (carouselItems.length - 1)) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </div>
            
            {/* Slide indicators */}
            <div className="flex gap-2 sm:gap-3 md:gap-4">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => sliderRef.slickGoTo(index)}
                  className="group relative flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {/* Main dot */}
                  <span 
                    className={`
                      absolute inset-2 sm:inset-1.5 rounded-full transform transition-all duration-500 ease-out
                      ${index === slideActive 
                        ? "bg-[#BD9153] scale-100" 
                        : "bg-white/40 scale-60 group-hover:bg-white/70 group-hover:scale-80"}
                    `}
                  />
                  
                  {/* Animated ring */}
                  {index === slideActive && (
                    <span className="absolute inset-0 rounded-full animate-ping-slow opacity-30 border-2 border-[#BD9153]" />
                  )}
                  
                  {/* Outer glow */}
                  <span 
                    className={`
                      absolute inset-1 rounded-full transition-all duration-500 ease-in-out
                      ${index === slideActive 
                        ? "bg-[#BD9153]/20 scale-150" 
                        : "bg-transparent scale-100 group-hover:bg-white/10 group-hover:scale-125"}
                    `}
                  />
                  
                  {/* Number indicator - only on larger screens */}
                  <span 
                    className={`
                      relative z-10 text-xs font-medium transition-all duration-300 hidden sm:block
                      ${index === slideActive ? "text-white" : "text-white/70"}
                    `}
                  >
                    {index + 1}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Current slide info */}
            <div className="ml-auto flex items-center gap-1 sm:gap-2 md:gap-3 text-white/80">
              <span className="text-lg sm:text-xl md:text-2xl font-medium text-[#BD9153]">{slideActive + 1}</span>
              <span className="text-xs sm:text-sm">/</span>
              <span className="text-xs sm:text-sm">{carouselItems.length}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom animations */}
      <style jsx global>{`
        @keyframes ping-slow {
          0% {
            transform: scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.1;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.3;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 3s infinite;
        }
        
        .trajan {
          font-family: "Trajan Pro", "Times New Roman", serif;
        }
        
        .times {
          font-family: "Times New Roman", Times, serif;
        }
        
        /* Enhance slider transitions */
        .slick-slide {
          opacity: 0;
          transition: opacity 1000ms ease;
        }
        .slick-active {
          opacity: 1;
        }

        /* Responsive arrow styles */
        @media (max-width: 640px) {
          .slick-arrow {
            transform: scale(0.8);
          }
        }
      `}</style>
    </motion.div>
  );
}

export default MainCarousel;