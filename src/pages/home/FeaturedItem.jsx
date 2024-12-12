import React, { useState } from 'react';

function FeaturedItem() {
  const thumbnails = [
    './homeImages/1.jpg',
    './homeImages/2.jpg',
    './homeImages/3.jpg',
    './homeImages/4.jpg',
  ];
  const [mainImage, setMainImage] = useState(thumbnails[0]);

  return (
    <div className="bg-white text-black py-8">
      <div className="flex flex-col gap-4 justify-between bg-white text-black py-12">
        <p className="trajan text-[40px] text-center">Featured Product</p>
      </div>

      <div className="flex flex-col md:flex-row justify-evenly items-start p-4 gap-8 bg-white text-black">
        {/* Left Section: Product Images */}
        <div className="w-[500px] flex flex-col gap-4 px-4">
          {/* Main Image */}
          <div className="w-full h-[300px] md:h-[400px]">
            <img
              src={mainImage}
              alt="Main Product"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 md:gap-4 justify-center">
            {thumbnails.map((src, idx) => (
              <div
                key={idx}
                className={`w-[125px] h-[120px] cursor-pointer ${
                  mainImage === src ? 'border-4 border-pink-600 rounded-lg' : ''
                }`}
                onClick={() => setMainImage(src)}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="flex flex-col justify-start gap-4 md:w-[50%]">
          {/* Product Title and Price */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Lorem ipsum</h2>
            <p className="text-lg font-semibold text-gray-700">From INR 1200 - INR 1600</p>
          </div>

          {/* Product Description */}
          <div className="py-4 rounded-lg text-gray-700">
            <p>
              Lorem ipsum dolor sit amet consectetur. Semper sed volutpat egestas consectetur dui lorem.
              Consectetur aliquet cursus dignissim eget mi elementum feugiat sagittis. Iaculis nam aliquam
              vulputate egestas nisl et vel ornare. Tristique phasellus faucibus sit commodo cursus quam.
              Maecenas non amet turpis enim enim in odio tellus mattis. Pulvinar ut pellentesque diam nunc est.
            </p>
          </div>

          {/* Proceed to Checkout Button */}
          <button className="bg-[#CE0067] w-full mr-auto text-white px-4 py-2 rounded-md transition duration-500 hover:bg-white hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]">
            SEE MORE
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedItem;