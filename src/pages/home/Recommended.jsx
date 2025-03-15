import Next from '@/svg/Next';
import Previous from '@/svg/Previous';
import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';

function Recommended() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);

  const recommended = [
    {
      image: "./homeImages/c1.webp",
      name: "CHOCOLATE ELEGANCE",
      size: "Tray of 25 pcs",
      price: "1090"
    },
    {
      image: "./homeImages/c2.webp",
      name: "TRUFFLE COLLECTION",
      size: "Box of 12 pcs",
      price: "890"
    },
    {
      image: "./homeImages/c3.webp",
      name: "DARK ASSORTMENT",
      size: "Set of 18 pcs",
      price: "1190"
    },
    {
      image: "./homeImages/c4.webp",
      name: "PRALINE SELECTION",
      size: "Box of 15 pcs",
      price: "950"
    },
    {
      image: "./homeImages/c1.webp",
      name: "CHOCOLATE ELEGANCE",
      size: "Tray of 25 pcs",
      price: "1090"
    },
    {
      image: "./homeImages/c2.webp",
      name: "TRUFFLE COLLECTION",
      size: "Box of 12 pcs",
      price: "890"
    },
    {
      image: "./homeImages/c3.webp",
      name: "DARK ASSORTMENT",
      size: "Set of 18 pcs",
      price: "1190"
    },
    {
      image: "./homeImages/c4.webp",
      name: "PRALINE SELECTION",
      size: "Box of 15 pcs",
      price: "950"
    },
    {
      image: "./homeImages/c1.webp",
      name: "CHOCOLATE ELEGANCE",
      size: "Tray of 25 pcs",
      price: "1090"
    },
    {
      image: "./homeImages/c2.webp",
      name: "TRUFFLE COLLECTION",
      size: "Box of 12 pcs",
      price: "890"
    },
  ];

  const getSlidesToShow = (width) => {
    if (width < 640) return 1;
    if (width < 1024) return 2;
    if (width < 1536) return 3;
    return 3;
  };

  const getCenterPadding = (width) => {
    if (width < 640) return '15px';
    if (width < 1024) return '30px';
    return '40px';
  };

  function SampleNextArrow(props) { 
    const { onClick } = props; 
    return ( 
      <div 
        className="hidden sm:flex absolute top-1/2 right-0 md:right-0 lg:-right-4 transform -translate-y-1/2 translate-x-1/2 cursor-pointer z-20 w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm transition-all duration-300 border border-gray-100" 
        onClick={onClick} 
      > 
        <span className="text-black text-xl md:text-3xl"> 
          <Next /> 
        </span> 
      </div> 
    ); 
  } 
   
  function SamplePrevArrow(props) { 
    const { onClick } = props; 
    return ( 
      <div 
        className="hidden sm:flex absolute top-1/2 left-0 md:left-0 lg:-left-4 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer z-20 w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm transition-all duration-300 border border-gray-100" 
        onClick={onClick} 
      > 
        <span className="text-black text-xl md:text-3xl"> 
          <Previous /> 
        </span> 
      </div> 
    ); 
  }
  
  const settings = {
    className: 'mx-auto',
    infinite: true,
    slidesToShow: getSlidesToShow(windowWidth),
    speed: 1000,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    beforeChange: (current, next) => setActiveSlide(next),
    centerMode: true,
    centerPadding: getCenterPadding(windowWidth),
    dots: false,
    swipeToSlide: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
          centerPadding: '40px',
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          centerPadding: '30px',
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: '30px',
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: '20px',
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerPadding: '15px',
        }
      }
    ]
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Throttle resize event to prevent performance issues
  useEffect(() => {
    let resizeTimer;
    const handleResizeThrottled = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResizeThrottled);
      return () => {
        window.removeEventListener('resize', handleResizeThrottled);
        clearTimeout(resizeTimer);
      };
    }
  }, []);

  return (
    <div className="bg-white text-black py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Decorative elements - adjusted for responsiveness */}
      <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gray-50 rounded-full translate-x-1/3 -translate-y-1/3 z-0 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gray-50 rounded-full -translate-x-1/3 translate-y-1/3 z-0 opacity-70"></div>
      <div className="absolute top-1/2 left-1/3 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-gray-100 rounded-full -translate-y-1/2 z-0 opacity-50"></div>
      
      <div className="relative z-10">
        {/* Header section with refined typography - improved responsive scaling */}
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 justify-between bg-white text-black pb-8 sm:pb-12 md:pb-16">
          <div className="text-center px-4">
            <p className="trajan text-[28px] sm:text-[32px] md:text-[40px] lg:text-[46px] relative inline-block font-light">
              Recommended for you
              <span className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 md:w-24 h-px bg-black"></span>
            </p>
          </div>
          <p className="w-full md:w-3/4 lg:w-[800px] px-4 times text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] text-center text-[#757575] mx-auto italic font-light leading-relaxed">
            Discover our best selling chocolate products crafted with premium ingredients 
            <br className="hidden md:block" /> for moments of pure indulgence.
          </p>
        </div>

        {/* Enhanced slider container - improved padding for different screen sizes */}
        <div className="slider-container relative w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-0 md:w-11/12 lg:w-10/12 xl:w-9/12 mx-auto z-10"
             onMouseEnter={() => sliderRef.current && sliderRef.current.slickPause()}
             onMouseLeave={() => sliderRef.current && sliderRef.current.slickPlay()}>
          <Slider ref={sliderRef} {...settings}>
            {recommended.map((item, index) => (
              <div 
                key={index} 
                className="px-2 sm:px-3 md:px-4 cursor-pointer select-none"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {/* Elegant product card with subtle shadow */}
                <div className={`bg-white rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 shadow-sm hover:shadow-md ${activeSlide % recommended.length === index ? 'scale-100' : 'scale-95 opacity-80'}`}>
                  {/* Elegant product image container - responsive heights */}
                  <div className="relative w-full h-[250px] sm:h-[280px] md:h-[320px] lg:h-[350px] xl:h-[380px] overflow-hidden group">
                    <img
                      className={`h-full w-full object-cover transition-all duration-700 ${hoverIndex === index ? 'scale-105' : 'scale-100'}`}
                      src={item.image}
                      alt={item.name}
                    />
                    
                    {/* Refined overlay effect with gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-opacity duration-500 ${hoverIndex === index ? 'opacity-100' : 'opacity-0'}`}></div>
                    
                    {/* Elegant price tag that appears on hover - adjusted sizes */}
                    <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 bg-white text-black times py-1 sm:py-2 px-3 sm:px-4 md:px-5 rounded-full shadow-md transition-all duration-500 ${hoverIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                      <span className="font-light text-xs sm:text-sm">₹</span> <span className="font-medium">{item.price}</span>
                    </div>
                    
                    {/* Enhanced "Checkout Product" button - responsive padding and font size */}
                    <div className={`absolute bottom-0 left-0 right-0 flex justify-center transition-all duration-500 ${hoverIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                      <button className="bg-white/95 text-black times text-xs sm:text-sm tracking-wider uppercase py-2 sm:py-3 px-4 sm:px-6 md:px-8 mb-4 sm:mb-6 rounded-full shadow-md hover:bg-white transition-colors border border-gray-50">
                        Checkout Product
                      </button>
                    </div>
                  </div>

                  {/* Refined product details section - adaptive padding */}
                  <div className="px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 transition-all duration-300">
                    <div className="flex flex-col space-y-2 sm:space-y-3">
                      <p className="times text-base sm:text-lg tracking-wide font-medium">{item.name}</p>
                      <div className="w-8 sm:w-10 h-px bg-gray-200"></div>
                      <div className='flex justify-between items-center'>
                        <p className="text-gray-500 times text-sm sm:text-lg font-light">{item.size}</p>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">₹</span>
                          <p className="font-medium times">{item.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        
        {/* Elegant pagination indicators - improved for touch devices */}
        <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 space-x-2 sm:space-x-3">
          {[...Array(Math.min(5, recommended.length))].map((_, i) => (
            <button 
              key={i}
              onClick={() => sliderRef.current.slickGoTo(i)}
              className={`transition-all duration-500 rounded-full border border-gray-200
                ${i === activeSlide % recommended.length 
                  ? 'bg-gray-800 w-6 sm:w-8 h-1.5 sm:h-2' 
                  : 'bg-gray-200 w-1.5 sm:w-2 h-1.5 sm:h-2 hover:bg-gray-300'}`}
              aria-label={`Go to slide ${i+1}`}
            />
          ))}
        </div>

        {/* "View all collection" button - responsive sizing */}
        {/* <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
          <a href="#" className="times text-xs sm:text-sm tracking-wider uppercase py-2 sm:py-3 px-6 sm:px-8 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
            View All Collection
          </a>
        </div> */}

        {/* Mobile touch indicators - only visible on small screens */}
        <div className="flex justify-center mt-4 sm:hidden">
          <p className="text-xs text-gray-400 italic">Swipe to see more</p>
        </div>
      </div>
    </div>
  );
}

export default Recommended;