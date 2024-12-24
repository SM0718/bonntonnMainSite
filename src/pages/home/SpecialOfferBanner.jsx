import React from "react";

const SpecialOfferBanner = () => {

    const code = "TODAY5"
  return (
    <div className="relative group bg-cover bg-center rounded-xl h-[400px] md:h-[400px] lg:h-[400px] hidden md:flex items-center justify-center" style={{ backgroundImage: "url('./homeImages/banner.webp')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-25 rounded-xl"></div>
      <div className="absolute inset-0 border border-white transition duration-500 ease-in-out group-hover:scale-90 rounded-xl"></div>
      {/* Content */}
      <div className="relative flex items-center justify-evenly w-full px-6 md:px-12 lg:px-20">
        {/* Left Content */}
        <div className="w-1/2 text-center text-white">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-light uppercase tracking-wide trajan">Enjoy</h1>
          <p className="text-5xl md:text-6xl lg:text-7xl font-bold my-4 times">5% off</p>
          <p className="text-lg md:text-xl font-light uppercase times">On All Products</p>
        </div>
        {/* Middle Divider */}
        <div className="w-[1px] h-48 md:h-56 lg:h-64 bg-white mx-4"></div>
        {/* Right Content */}
        <div className="w-1/2 text-center text-white">
          <h2 className="text-lg md:text-xl lg:text-3xl font-medium trajan">Your Special Offer Awaits</h2>
          <p className="text-sm md:text-base lg:text-lg mt-2 times">
            Use Code <span className="font-bold">{code}</span> At Checkout For A 5% Discount Sitewide.
            <br /> Treat Yourself To Luxury Items At The Best Price.
          </p>
          {/* <button className="mt-6 px-6 py-2 text-sm md:text-base lg:text-lg bg-white text-black rounded-md shadow-md hover:bg-gray-200">
            Shop Today
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SpecialOfferBanner;
