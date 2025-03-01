import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const Clientele = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const clients = [
    { id: 1, logo: "./homeImages/b1.png", alt: "hunkemöller" },
    { id: 2, logo: "./homeImages/b2.png", alt: "MOTOVOLT" },
    { id: 3, logo: "./homeImages/b3.png", alt: "DIESEL" },
    { id: 4, logo: "./homeImages/b4.png", alt: "elahé" },
    { id: 5, logo: "./homeImages/b5.png", alt: "TIBREWAL GROUP" },
    { id: 6, logo: "./homeImages/b6.png", alt: "Begani" },
  ];

  const getSlideCount = (width) => {
    if (width < 480) return 1;
    if (width < 768) return 2;
    if (width < 1024) return 3;
    if (width < 1500) return 4;
    return 6;
  };

  const settings = {
    className: "",
    infinite: true,
    slidesToShow: getSlideCount(windowWidth),
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
  }, []);

  return (
    <div className="bg-[#E4D3BA] py-6 md:py-8 lg:py-10 px-3 md:px-4 lg:px-5">
      <h2 className="text-center text-white text-2xl md:text-3xl lg:text-4xl trajan font-bold mb-4 md:mb-6">
        Our Noble Clientele
      </h2>
      <div className="w-full flex justify-center items-center">
        <div className="slider-container w-full h-auto md:h-[100px] pt-3">
          <Slider {...settings}>
            {clients.map(item => (
              <div key={item.id} className="px-2">
                <div className="flex justify-center items-center">
                  <img 
                    className="w-full max-w-[131px] h-auto max-h-[91px] object-contain hover:grayscale transition-all duration-300" 
                    src={item.logo} 
                    alt={item.alt}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Clientele;