import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";

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
    pauseOnHover: false,
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

  // Parallax effect for background decoration
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative bg-[#BD9153]/75 py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12 mt-8 overflow-hidden">
      {/* Decorative elements */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        }}
      ></div>
      
      {/* <div 
        className="absolute left-0 top-0 w-32 h-32 rounded-full bg-white opacity-20"
        style={{ 
          transform: `translate(${scrollY * 0.03}px, ${scrollY * 0.02}px)`,
          transition: "transform 0.1s ease-out"
        }}
      ></div> */}
      
      {/* <div 
        className="absolute right-0 bottom-0 w-48 h-48 rounded-full bg-white opacity-20"
        style={{ 
          transform: `translate(${scrollY * -0.02}px, ${scrollY * -0.03}px)`,
          transition: "transform 0.1s ease-out"  
        }}
      ></div> */}

      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-black text-3xl md:text-4xl lg:text-5xl trajan font-bold relative inline-block">
            Our Noble Clientele
            <span className="block mx-auto mt-3 h-1 bg-white w-24 md:w-32 lg:w-40"></span>
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto times italic text-base md:text-lg">
            Prestigious brands that have trusted our exceptional gift solutions
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Gradient edges for fade effect */}
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#E4D3BA] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#E4D3BA] to-transparent z-10"></div>
          
          <div className="slider-container py-8 md:py-12">
            <Slider {...settings}>
              {clients.map(item => (
                <div key={item.id} className="px-4 md:px-6">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="flex justify-center items-center h-24 md:h-32"
                  >
                    <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-lg border border-white/20 flex items-center justify-center w-full h-full transition-all duration-300 hover:bg-white/20 group">
                      <img
                        className="w-full max-w-[160px] h-auto max-h-[100px] object-contain filter transition-all duration-500 group-hover:brightness-110"
                        src={item.logo}
                        alt={item.alt}
                      />
                    </div>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8 md:mt-12"
        >
          <div className="inline-block border-t border-white/30 pt-4 px-8">
            <p className="text-white/70 text-sm md:text-base times">Trusted by leading brands worldwide</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Clientele;