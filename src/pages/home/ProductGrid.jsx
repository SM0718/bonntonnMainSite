import React from 'react';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

function ProductGrid() {
  const navigate = useNavigate()
  const leftImages = [
    {
      name: 'Truffels',
      desc: 'Truffles are rich, bite-sized confections made from chocolate and cream, often coated in cocoa powder, nuts, or sprinkles.',
      slug: '/all-product/678686f29227029080f262ba',
      img: './homeImages/truffle.webp',
    },
    {
      name: 'Hot Chocolates',
      desc: 'Hot chocolate is a warm drink made from chocolate or cocoa, often topped with whipped cream or marshmallows',
      slug: '/all-product/6786873c9227029080f262bf',
      img: './homeImages/hot.webp',
    },
    {
      name: 'Sourdough',
      desc: 'Artisan sourdough with a crisp crust and tangy flavor.',
      slug: '/all-product/6789e87c3229ac65fd8bc080',
      img: './homeImages/sourdough.webp',
    },
    {
      name: 'Cupcakes and Tarts',
      desc: 'Cupcakes and Tarts are delightful, individually crafted desserts, perfect for sweet cravings and elegant occasions.',
      slug: '/all-product/676583229cffc0c07bf1054c',
      img: './homeImages/cupcake.webp',
    },
  ];

  const rightImages = [
    {
      name: 'Mini Cakes',
      desc: 'Mini Cakes are delightful, bite-sized treats perfect for individual indulgence or charming celebrations.',
      slug: '/all-product/676581fe9cffc0c07bf10544',
      img: './homeImages/coconut.webp',
    },
    {
      name: 'Signature Cakes',
      desc: 'Signature Cakes are luxurious, handcrafted creations designed to make every celebration unforgettable.',
      slug: '/all-product/676581209cffc0c07bf10540',
      img: './homeImages/patisserie.webp',
    },
  ];

  return (
    <div className="bg-white py-16 px-4 md:px-6">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Left Section */}
        <div className="flex flex-col gap-3 w-full md:w-1/2">
          {leftImages.map((item, idx) => (
            <div
              key={idx}
              className="w-full h-[200px] md:h-[250px] flex-none overflow-hidden rounded-lg shadow-lg relative"
            >
              <img
                src={item.img}
                alt={`Product ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-[10000ms] scale-100 hover:scale-150"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end transition-opacity duration-300">
                <div className="p-3">
                  <div className="flex flex-col gap-1">
                    <p className="trajan text-white text-[20px] md:text-[26px]">{item.name}</p>
                    <p className="times text-white text-xs md:text-sm">
                      {item.desc}
                    </p>
                    <Button onClick={() => navigate(item.slug)} className="bg-[#BD9153] w-[130px] md:w-[180px] times text-white px-3 py-1 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#BD9153] hover:text-[#BD9153]">
                      Order Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-3 w-full md:w-1/2">
          {rightImages.map((item, idx) => (
            <div
              key={idx}
              className="w-full h-[350px] md:h-[515px] flex-none overflow-hidden rounded-lg shadow-lg relative group"
            >
              <img
                src={item.img}
                alt={`Product ${idx + 5}`}
                className="w-full h-full object-fit transition-transform duration-[10000ms] group-hover:scale-150"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end transition-opacity duration-300">
                <div className="p-3">
                  <div className="flex flex-col gap-1">
                    <p className="trajan text-white text-[20px] md:text-[26px]">{item.name}</p>
                    <p className="times text-white text-xs md:text-sm">
                      {item.desc}
                    </p>
                    <Button onClick={() => navigate(item.slug)} className="bg-[#BD9153] w-[130px] md:w-[180px] times text-white px-3 py-1 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#BD9153] hover:text-[#BD9153]">
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