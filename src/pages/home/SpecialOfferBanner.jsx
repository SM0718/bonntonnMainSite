import React, { useState, useEffect } from "react";

const SpecialOfferBanner = () => {
  const code = "TODAY5";
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Elegant fade-in animation on load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div 
      className={`relative group bg-cover bg-center rounded-xl overflow-hidden h-64 md:h-80 lg:h-96 hidden md:flex ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`} 
      style={{ backgroundImage: "url('./homeImages/banner.webp')" }}
    >
      {/* Gradient overlay with subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40 rounded-xl"></div>
      
      {/* Animated border with glow effect */}
      <div className="absolute inset-0 rounded-xl">
        <div className="absolute inset-0 border border-white/80 rounded-xl transition-all duration-700 ease-in-out group-hover:scale-[0.90] group-hover:border-opacity-100"></div>
        <div className="absolute inset-0 border border-white/20 rounded-xl transition-all duration-700 ease-in-out group-hover:scale-[0.86] group-hover:border-opacity-50 delay-75"></div>
      </div>
      
      {/* Content container */}
      <div className="relative flex items-center justify-evenly w-full px-6 md:px-12 lg:px-20 z-10">
        {/* Left content */}
        <div className="w-1/2 text-center text-white transform transition-transform duration-700 group-hover:translate-y-[-8px]">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-light uppercase tracking-wider font-serif italic">Indulge</h1>
          <p className="text-5xl md:text-6xl lg:text-7xl font-bold my-4 font-serif relative">
            <span className="relative inline-block">
              5% <span className="absolute -top-3 -right-3 text-sm font-light">off</span>
            </span>
          </p>
          <p className="text-lg md:text-xl font-light uppercase tracking-widest">Exclusively Yours</p>
        </div>
        
        {/* Elegant divider */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-px h-12 bg-white/30"></div>
          <div className="my-4 w-8 h-8 rounded-full border border-white/80 flex items-center justify-center">
            <div className="w-2 h-2 bg-white/80 rounded-full"></div>
          </div>
          <div className="w-px h-12 bg-white/30"></div>
        </div>
        
        {/* Right content */}
        <div className="w-1/2 text-center text-white transform transition-transform duration-700 group-hover:translate-y-[8px]">
          <h2 className="text-lg md:text-xl lg:text-2xl font-medium font-serif">Curated Elegance</h2>
          <p className="text-sm md:text-base lg:text-lg mt-3 tracking-wide leading-relaxed">
            Enter <span className="font-bold tracking-widest bg-white/20 px-2 py-1 rounded">{code}</span> at checkout
            <br /> for a curated luxury experience.
          </p>
          <div className="mt-5">
            <span className="inline-block relative overflow-hidden group-hover:after:translate-x-0 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-white after:translate-x-[-100%] after:transition-transform after:duration-500 cursor-pointer">
              DISCOVER THE COLLECTION
            </span>
          </div>
        </div>
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-white/40 rounded-tl-lg"></div>
      <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-white/40 rounded-tr-lg"></div>
      <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-white/40 rounded-bl-lg"></div>
      <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-white/40 rounded-br-lg"></div>
    </div>
  );
};

export default SpecialOfferBanner;