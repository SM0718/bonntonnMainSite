import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Next from '@/svg/Next';
import Previous from '@/svg/Previous';

const FeaturedSection = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    function SampleNextArrow(props) {
        const { onClick } = props;
        return (
          <div
            className="absolute top-1/2 -right-12 transform -translate-y-1/2 cursor-pointer z-10 w-10 h-10 flex items-center justify-center rounded-full"
            onClick={onClick}
          >
            <span className="text-white text-3xl">
              <Next />
            </span>
          </div>
        );
      }
      
      function SamplePrevArrow(props) {
        const { onClick } = props;
        return (
          <div
            className="absolute top-1/2 -left-12 transform -translate-y-1/2 cursor-pointer z-10 w-10 h-10 flex items-center justify-center rounded-full"
            onClick={onClick}
          >
            <span className="text-white text-3xl">
              <Previous />
            </span>
          </div>
        );
      }

    const settings = {
        className: 'mx-auto',
        infinite: true,
        slidesToShow: windowWidth > 600 && windowWidth < 1500 ? 2 : windowWidth < 600 ? 1 : 3,
        speed: 1000,
        autoplay: true,
        cssEase: 'linear',
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
      };
    
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
    
      useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [windowWidth]);

    return (
      <div className="bg-[#5C0977] py-8">
        <h2 className="text-white text-2xl md:text-3xl font-semibold text-center mb-6 trajan">
          Featured In
        </h2>
        <div className="slider-container relative w-full md:w-4/5 mx-auto">
        <Slider {...settings}>
          {Array(4).fill("").map((_, index) => (
            <div key={index} className=" text-white font-serif text-xl md:text-2xl times px-8">
              <img className='' src="./homeImages/telegraph.png" alt="Telegraph.png"/>
            </div>
          ))}
          </Slider>
        </div>
      </div>
    );
  };
  
  export default FeaturedSection;
  