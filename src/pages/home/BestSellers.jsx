import Next from '@/svg/Next';
import Previous from '@/svg/Previous';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
function BestSellers() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate()

  const bestSellers =
  [
    {
      name: 'Kunafa Chocolate Bar - 1pc',
      price: '390',
      size: '1pc',
      pic: '/./Kunafa.webp',
      picSlug: '/product-page/678df32e48fe43db88cfe0e5',
      picDesc: "Kunafa meets chocolate: phyllo pastry, sweet cheese, and rich cocoa."
    },
    {
      name: 'Chocolate Hazelnut Mousse [1 Piece]',
      price: '250',
      size: '160 Grams',
      pic: '/./Mousse.webp',
      picSlug: '/product-page/678f40f248fe43db88cfe84f',
      picDesc: "2"
    },
    {
      name: 'Hand Rolled Truffles',
      price: '1890',
      size: '15pcs',
      pic: '/./truffles.webp',
      picSlug: '/product-page/678df11b48fe43db88cfe079',
      picDesc: "3"
    },
    {
      name: 'Molten Choco Lava',
      price: '390',
      size: '150 Grams',
      pic: '/./chocolava.webp',
      picSlug: '/product-page/678a4f29b21d5ebb8e128221',
      picDesc: "4"
    },
  ]

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute top-1/2 -right-12 transform -translate-y-1/2 cursor-pointer z-10 w-10 h-10 items-center justify-center rounded-full hidden md:flex" // Added hidden md:flex
        onClick={onClick}
      >
        <span className="text-black text-3xl">
          <Next />
        </span>
      </div>
    );
  }
  
  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute top-1/2 -left-12 transform -translate-y-1/2 cursor-pointer z-10 w-10 h-10 flex items-center justify-center rounded-full md:flex" // Added hidden md:flex
        onClick={onClick}
      >
        <span className="text-black text-3xl">
          <Previous />
        </span>
      </div>
    );
  }

  const settings = {
    className: 'mx-auto',
    infinite: true,
    slidesToShow: windowWidth > 600 && windowWidth < 1500 ? 2 : windowWidth < 600 ? 1 : 3,
    speed: 1000,
    cssEase: 'linear',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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
  }, [windowWidth]);

  // return (
  //   <div className="bg-white text-black">
  //     <div className="flex flex-col gap-4 justify-between bg-white text-black py-12">
  //       <p className="trajan text-[30px] md:text-[40px] text-center">Shop Our Best Sellers</p>
  //       <p className="w-full px-1 times text-[16px] text-center text-[#757575] mx-auto">
  //         Discover our best selling chocolate products crafted with premium ingredients.
  //       </p>
  //     </div>

  //     <div className="slider-container relative w-full md:w-4/5 mx-auto">
  //       <Slider {...settings}>
  //         {bestSellers.map((item, index) => (
  //           <div key={index} className="px-4 cursor-pointer">
  //             <div className="w-full h-[300px] md:h-[400px] flex justify-center">
  //               <img
  //                 className="w-full h-full rounded-md object-cover"
  //                 src={item.pic}
  //                 alt="Product"
  //               />
  //             </div>

  //             <div className="text-center mt-4">
  //               <p className="font-bold times text-lg md:text-xl text-start">{item.name}</p>
  //               <div className='flex justify-between'>
  //                 <p className="text-gray-500 text-sm md:text-base times">{item.size}</p>
  //                 <p className="font-semibold text-lg md:text-xl times">Rs {item.price}</p>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </Slider>
  //     </div>
  //   </div>
  // );

  return (
    <div className="bg-white text-black">
      {/* Keep the header section the same */}
      
      <div className="slider-container relative w-full md:w-4/5 mx-auto">
        <Slider {...settings}>
          {bestSellers.map((item, index) => (
             <div className="group relative p-2 md:p-4 overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg">
             {/* Sale badge - uncomment and customize if needed */}
             {/* {item.onSale && (
               <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                 SALE
               </div>
             )} */}
             
             {/* Image container with gradient overlay */}
             <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl">
               <img
                 onClick={() => navigate(item.picSlug)}
                 className="w-full h-full object-cover transition-all duration-700 ease-out"
                 src={item.pic}
                 alt={item.name}
               />
               
               {/* Gradient overlay that appears on hover */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer" />
               
               {/* Quick view button - appears on hover */}
               {/* <div 
                 onClick={() => navigate(item.picSlug)}
                 className="absolute bottom-4 left-0 right-0 mx-auto w-3/4 text-center py-3 bg-white/90 text-gray-900 font-medium rounded-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-md"
               >
                 Quick View
               </div> */}
             </div>
             
             {/* Product details with subtle animations */}
             <div className="mt-4 pb-2 transition-all duration-300 group-hover:translate-y-1">
               <h3 className="font-serif text-lg md:text-xl text-gray-900 mb-2 group-hover:text-gray-700">{item.name}</h3>
               <div className="flex justify-between items-center">
                 <p className="font-serif text-gray-500 text-md md:text-lg">{item.size}</p>
                 <p className="font-serif font-medium text-md md:text-lg bg-gray-50 px-3 py-1 rounded-md">Rs {item.price}</p>
               </div>
             </div>
           </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default BestSellers;
