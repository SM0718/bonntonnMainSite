import React from 'react';

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
          className="w-full h-full object-fit transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-st justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className='mx-auto flex flex-col gap-4'>
            <p className='trajan text-white text-[30px]'>Lorem ipsum</p>
            <p className='times text-white'>Lorem ipsum dolor sit amet consectetur.</p>
            <button className="bg-[#CE0067] w-[279px] mr-auto text-white px-4 py-2 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]">
              Order Now
            </button>
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
          className="w-full h-full object-fit transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className='mx-auto flex flex-col gap-4'>
            <p className='trajan text-white text-[30px]'>Lorem ipsum</p>
            <p className='times text-white'>Lorem ipsum dolor sit amet consectetur.</p>
            <button className="bg-[#CE0067] w-[279px] mr-auto text-white px-4 py-2 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]">
              Order Now
            </button>
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
