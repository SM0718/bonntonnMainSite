import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const Clientele = () => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const clients = [
    { id: 1, logo: "./homeImages/b1.png", alt: "hunkemöller" },
    { id: 2, logo: "./homeImages/b2.png", alt: "MOTOVOLT" },
    { id: 3, logo: "./homeImages/b3.png", alt: "DIESEL" },
    { id: 4, logo: "./homeImages/b4.png", alt: "elahé" },
    { id: 5, logo: "./homeImages/b5.png", alt: "TIBREWAL GROUP" },
    { id: 6, logo: "./homeImages/b6.png", alt: "Begani" },
    // { id: 7, logo: "./homeImages/b1.png", alt: "KEDRO INSIGHT" },
  ];

  function SampleNextArrow() {
    return (
      <div
        className={'hidden'}
      />
    );
  }
  
  function SamplePrevArrow() {
    return (
      <div
        className={'hidden'}
      />
    );
  }


const settings = {
    className: "",
    infinite: true,
    slidesToShow: windowWidth > 600 && windowWidth < 1500? 3 : windowWidth < 600? 3 : 6,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
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
    <div className="bg-[#efadce] py-10 px-5">
      <h2 className="text-center text-white text-4xl trajan font-bold mb-6">
        Our Noble Clientele
      </h2>
      <div className="w-full flex justify-center items-center ">
        <div className="slider-container w-full h-[100px] pt-3">
          <Slider
            {...settings}>
                {
                    clients.map(item => <div className="w-[151px] h-[90px] my-auto">
                        <img className="w-[151px] h-[90px] hover:grayscale" src={item.logo} alt={item.alt}/>
                    </div>)
                }
        </Slider>
    </div>
    </div>
    </div>
  );


  
};

export default Clientele;
