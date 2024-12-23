import React from 'react';

const categories = [
  {
    title: 'Bespoke Cakes',
    description: 'Lorem Ipsum Dolor Sit Amet Consectetur',
    image: 'https://via.placeholder.com/600x400', // Replace with actual images
    link: '#',
  },
  {
    title: 'Mini Cakes',
    description: 'Lorem Ipsum Dolor Sit Amet Consectetur',
    image: 'https://via.placeholder.com/600x400',
    link: '#',
  },
  {
    title: 'Loaf Cakes',
    description: 'Lorem Ipsum Dolor Sit Amet Consectetur',
    image: 'https://via.placeholder.com/600x400',
    link: '#',
  },
  {
    title: 'Cupcakes And Tarts',
    description: 'Lorem Ipsum Dolor Sit Amet Consectetur',
    image: 'https://via.placeholder.com/600x400',
    link: '#',
  },
  {
    title: 'Dessert Jars & Tubs',
    description: 'Lorem Ipsum Dolor Sit Amet Consectetur',
    image: 'https://via.placeholder.com/600x400',
    link: '#',
  },
];

export default function Subcatagory() {
  return (
    <div className="container mx-auto my-12 px-4">
      <h1 className="text-center text-4xl text-black trajan font-bold mb-8 tracking-wide">PATISSERIE</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((item, index) => (
          <div
            key={index}
            className="relative group h-[515px] overflow-hidden rounded-lg shadow-md hover:shadow-lg w-full"
            // style={{ 
            //   height: '415px', 
            //   maxWidth: '920px',
            //   margin: '0 auto' // Center the boxes
            // }}
          >
            <div className="relative w-full h-full">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white">
                <h2 className="text-3xl font-semibold mb-4 times">{item.title}</h2>
                <button
                  type="submit"
                  className="bg-[#CE0067] w-[150px] mx-auto text-white py-2 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]"
                >
                  VIEW PRODUCTS
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}