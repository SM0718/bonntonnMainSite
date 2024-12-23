import React from 'react';
import { Button } from '@nextui-org/react';

function ProductGrid() {
  const leftImages = [
    './homeImages/img1.webp',
    './homeImages/img2.webp',
    './homeImages/img3.webp',
    './homeImages/img4.webp',
  ];

  const rightImages = [
    './homeImages/img5.webp',
    './homeImages/img6.webp',
  ];

  return (
    <div className="bg-white py-24 px-4 md:px-8">
      <div className="flex gap-4">
        {/* Left Section */}
        <div className="flex flex-col gap-4 w-1/2">
          {leftImages.map((image, idx) => (
            <div
              key={idx}
              className="w-full h-[300px] flex-none overflow-hidden rounded-lg shadow-lg relative group"
            >
              <img
                src={image}
                alt={`Product ${idx + 1}`}
                className="w-full h-full object-fit transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="p-4">
                  <div className="flex flex-col gap-2">
                    <p className="trajan text-white text-[40px]">Gift Hampers</p>
                    <p className="times text-white text-md">Lorem ipsum dolor sit amet consectetur.</p>
                    <Button className="bg-[#CE0067] w-[200px] text-white px-4 py-2 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]">
                      Order Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-4 w-1/2">
          {rightImages.map((image, idx) => (
            <div
              key={idx}
              className="w-full h-[615px] flex-none overflow-hidden rounded-lg shadow-lg relative group"
            >
              <img
                src={image}
                alt={`Product ${idx + 5}`}
                className="w-full h-full object-fit transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="p-4">
                  <div className="flex flex-col gap-2">
                    <p className="trajan text-white text-[40px]">Cookies</p>
                    <p className="times text-white text-md">Lorem ipsum dolor sit amet consectetur.</p>
                    <Button className="bg-[#CE0067] w-[200px] text-white px-4 py-2 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]">
                      Order Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;
