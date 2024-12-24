import Next from '@/svg/Next';
import Previous from '@/svg/Previous';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

function BestSellers() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const bestSellers = [
    "./homeImages/c1.webp",
    "./homeImages/c2.webp",
    "./homeImages/c3.webp",
    "./homeImages/c4.webp",
    "./homeImages/c1.webp",
    "./homeImages/c2.webp",
    "./homeImages/c3.webp",
    "./homeImages/c4.webp",
    "./homeImages/c1.webp",
    "./homeImages/c2.webp",
  ];

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute top-1/2 -right-12 transform -translate-y-1/2 cursor-pointer z-10 w-10 h-10 flex items-center justify-center rounded-full"
        onClick={onClick}
      >
        <span className="text-black text-3xl">
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
        <span className="text-black text-3xl">
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
    cssEase: 'linear',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
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
    <div className="bg-white text-black">
      <div className="flex flex-col gap-4 justify-between bg-white text-black py-12">
        <p className="trajan text-[30px] md:text-[40px] text-center">Shop Our Best Sellers</p>
        <p className="w-full px-1 times text-[16px] text-center text-[#757575] mx-auto">
          Discover our best selling chocolate products crafted with premium ingredients.
        </p>
      </div>

      <div className="slider-container relative w-full md:w-4/5 mx-auto">
        <Slider {...settings}>
          {bestSellers.map((item, index) => (
            <div key={index} className="px-4 cursor-pointer">
              <div className="w-full h-[300px] md:h-[400px] flex justify-center">
                <img
                  className="w-full h-full rounded-md object-cover"
                  src={item}
                  alt="Product"
                />
              </div>

              <div className="text-center mt-4">
                <p className="font-bold times text-lg md:text-xl text-start">CHOCOLATE ELEGANCE</p>
                <div className='flex justify-between'>
                  <p className="text-gray-500 text-sm md:text-base">Tray of 25 pcs</p>
                  <p className="font-semibold text-lg md:text-xl">$1090</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default BestSellers;
