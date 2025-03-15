import React, { useState, useEffect } from 'react';
import { megaMenu } from '../utils/megaMenu';
import MagnifyingGlass from '../svg/MagnifyingGlass.jsx';
import Wishlist from '../svg/Wishlist.jsx';
import Profile from '../svg/Profile.jsx';
import Cart from '../svg/Cart.jsx';
import SecurePayments from '../svg/SecurePayments.jsx';
import Delivery from '../svg/Delivery.jsx';
import Logo from './Logo.jsx';
import { NavLink, useNavigate } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import SlidingCart from './SlidingCart';
import SameDay from '@/svg/SameDay';
import Customized from '@/svg/Customized';
import useStore from '@/store/store';
import Slider from "react-slick";
import Payments from '@/svg/Payments';

function Header() {
  const [show, setShow] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const isCartUpdated = useStore(state => state.isCartUpdated);
  const setCartSize = useStore(state => state.setCartSize);
  const cartSize = useStore(state => state.cartSize);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      // Set scrolled state for styling
      setScrolled(currentScrollY > 20);
      
      // Update last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleShow = (index) => {
    setShow(index);
  };

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const request = await fetch('https://bonnbackend.up.railway.app/api/v1/cart/get-user-cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });
        
        const responseData = await request.json();
        if(responseData.statusCode === 200) {
          setCartData(responseData.data);
          setCartSize(responseData.data.length);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartData();
  }, [isCartUpdated, setCartSize]);

  const renderCarousel = (carouselItems) => {
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      autoplay: true,
      speed: 1500,
      autoplaySpeed: 4000,
      slidesToShow: 1,
      slidesToScroll: 1,
      waitForAnimate: false,
      dotsClass: "slick-dots custom-dots",
      customPaging: function(i) {
        return (
          <div className="w-2 h-2 rounded-full bg-gray-300 hover:bg-[#BD9153] transition-all duration-300"></div>
        );
      }
    };
  
    return (
      <div className="w-full max-w-sm overflow-hidden rounded-xl shadow-lg">
        <Slider {...settings}>
          {carouselItems.map((item, index) => (
            <div key={index} className="relative group">
              <div className="overflow-hidden rounded-xl">
                <img 
                  src={item.pic || "/placeholder-image.jpg"} 
                  alt={item.picDesc || "Best Seller Item"}
                  className="w-full object-cover h-56 rounded-xl transform transition-transform duration-700 group-hover:scale-110"
                  onClick={() => navigate(item.picSlug)}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 rounded-xl"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif font-medium text-lg">{item.picDesc}</h3>
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button 
                    className="px-4 py-1 bg-[#BD9153] text-white text-sm font-serif rounded hover:bg-[#A67A3E] transition-colors"
                    onClick={() => navigate(item.picSlug)}
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  const renderBulkGiftingMenu = (items) => {
    return (
      <div className="absolute top-full left-0 w-full shadow-xl animate-fadeDown">
        <ul className="grid grid-cols-3 gap-8 p-8 w-full bg-gradient-to-b from-white to-slate-50 z-40 font-serif">
          {items.subItems?.map((menuItem, index) => (
            <li key={index} className="flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
              {menuItem.pic && (
                <NavLink to={menuItem.slug} className="w-full">
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <img className="w-full h-[210px] object-cover" src={menuItem.pic} alt={menuItem.name} />
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg transition-all duration-300 hover:bg-opacity-10" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <span className="font-medium text-white text-center block">{menuItem.name}</span>
                    </div>
                  </div>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderDefaultMenu = (items) => {
    return (
      <div className="absolute top-full left-0 w-full shadow-xl animate-fadeDown">
        <ul className="flex flex-wrap px-12 py-6 gap-20 bg-gradient-to-b from-white to-slate-50 z-40 font-serif">
          {items.subItems?.map((menuItem, index) => {
            if (menuItem.name === 'Best Sellers' && menuItem.carauselInfo) {
              return (
                <li key={index} className="flex flex-col items-start justify-start">
                  <div className="w-full h-full flex flex-col flex-wrap gap-6">
                    <span className="font-serif font-medium text-lg text-[#333] border-b-2 border-[#BD9153] pb-1">{menuItem.name}</span>
                    {renderCarousel(menuItem.carauselInfo)}
                  </div>
                </li>
              );
            }
            
            return menuItem.name && (
              <li key={index} className="flex flex-col items-start justify-start">
                <div className="w-full h-full flex flex-col flex-wrap gap-6">
                  <NavLink to={`/catagory/${menuItem.name}`} className="font-serif text-lg text-[#333] font-medium border-b-2 border-transparent hover:border-[#BD9153] transition-all duration-300">{menuItem.name}</NavLink>
                  {menuItem.pic && (
                    <span className="w-42 h-28 pl-2 cursor-pointer overflow-hidden rounded-xl relative group">
                      <NavLink onClick={() => console.log(menuItem)} to={menuItem.picSlug}>
                        <img className="w-40 h-full object-cover transform transition-transform duration-700 group-hover:scale-110" src={menuItem.pic} alt="Menu item" />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
                      </NavLink>
                    </span>
                  )}
                </div>
                <ul className="w-full flex flex-col gap-4 px-2 my-6">
                  {menuItem.subItems?.map((subItem, subIndex) => (
                    <p 
                      onClick={() => navigate(`/all-product/${subItem.slug}`)} 
                      className="cursor-pointer transition-all duration-300 hover:translate-x-2 text-[#555] hover:text-[#BD9153] font-serif relative pl-4 before:content-[''] before:absolute before:w-2 before:h-2 before:rounded-full before:bg-[#BD9153] before:left-0 before:top-1/2 before:-translate-y-1/2 before:opacity-0 hover:before:opacity-100 before:transition-all" 
                      key={subIndex}
                    >
                      {subItem.name}
                    </p>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  // Set header styles based on scroll direction and position
  const getHeaderClasses = () => {
    if (!scrolled) {
      return 'translate-y-0';
    }
    
    // If scrolling down, hide or reduce header
    if (scrollDirection === 'down') {
      return '-translate-y-full'; // Hide completely
    }
    
    // If scrolling up, show header
    return 'translate-y-0 shadow-lg bg-white';
  };

  // Get main header height based on scroll state
  const getMainHeaderClasses = () => {
    if (scrollDirection === 'up' && scrolled) {
      return 'h-[50px]'; // Smaller height when scrolling up and not at top
    }
    return 'h-[70px]'; // Normal height
  };

  return (
    <>
      <div className={`w-full hidden lg:flex flex-col z-50 fixed top-0 left-0 right-0 transition-all duration-300 ${getHeaderClasses()}`}>
        <div className={`hidden bg-white w-full md:flex items-center relative border-b-[1px] border-[#eaeaea] px-8 transition-all duration-300 ${getMainHeaderClasses()}`}>
          <div className="w-36 h-full flex items-center">
            <NavLink to="/" className="transition-transform duration-300 hover:scale-105">
              <Logo />
            </NavLink>
          </div>

          <div className="w-full h-full flex justify-center items-center gap-8">
            {megaMenu.map((item, firstIndex) => (
              <span
                onMouseEnter={() => toggleShow(firstIndex)}
                onMouseLeave={() => setShow(null)}
                key={item.name}
                className="group h-full z-50 cursor-pointer flex items-center"
              >
                <NavLink
                  to={item.slug}
                  className="font-serif relative before:content-[''] before:absolute before:w-0 before:h-[2px] before:bg-[#BD9153] before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:transition-all before:duration-300 before:rounded-b-3xl group-hover:before:w-full group-hover:text-[#BD9153] font-medium text-sm text-[#333] z-40 tracking-wide transition-colors duration-300 uppercase"
                >
                  {item.name}
                </NavLink>

                {show === firstIndex && item.subItems?.length && (
                  item.name === "Bulk Gifting"
                    ? renderBulkGiftingMenu(item)
                    : renderDefaultMenu(item)
                )}
              </span>
            ))}
          </div>

          <div className="flex gap-6 items-center">
            <span className="cursor-pointer transform transition-transform duration-300 hover:scale-110 text-[#555] hover:text-[#BD9153]">
              <MagnifyingGlass />
            </span>
            <NavLink to="/wishlist" className="cursor-pointer transform transition-transform duration-300 hover:scale-110 text-[#555] hover:text-[#BD9153]">
              <Wishlist />
            </NavLink>
            <NavLink to="/account" className="cursor-pointer transform transition-transform duration-300 hover:scale-110 text-[#555] hover:text-[#BD9153]">
              <Profile />
            </NavLink>
            <NavLink to={"/cart"} className="cursor-pointer transform transition-transform duration-300 hover:scale-110 text-[#555] hover:text-[#BD9153]">
              <div className="relative">
                <Cart />
                <span className="absolute -top-2 -right-2 bg-[#BD9153] text-white rounded-full text-xs w-5 h-5 flex items-center justify-center shadow-md">
                  {cartSize || 0}
                </span>
              </div>
            </NavLink>
          </div>
        </div>

        <div className={`hidden md:flex justify-evenly py-1 bg-gradient-to-r from-[#BD9153] to-[#A67A3E] shadow-md ${scrolled && scrollDirection === 'up' ? 'h-6' : ''}`}>
          <div className="flex items-center gap-2 transform transition-transform duration-300 hover:scale-105">
            <SecurePayments />
            <p className={`text-white font-serif transition-all duration-300 ${scrolled && scrollDirection === 'up' ? 'text-xs' : 'text-[16px]'}`}>
              Secure Payments
            </p>
          </div>

          <div className="h-8 w-px bg-white bg-opacity-30"></div>

          <div className="flex items-center gap-2 transform transition-transform duration-300 hover:scale-105">
            <Delivery />
            <p className={`text-white font-serif transition-all duration-300 ${scrolled && scrollDirection === 'up' ? 'text-xs' : 'text-[16px]'}`}>
              Fast & Melt-free delivery
            </p>
          </div>

          <div className="h-8 w-px bg-white bg-opacity-30"></div>

          <div className="flex items-center gap-2 transform transition-transform duration-300 hover:scale-105">
            <Payments />
            <p className={`text-white font-serif transition-all duration-300 ${scrolled && scrollDirection === 'up' ? 'text-xs' : 'text-[16px]'}`}>
              Subscribe for exclusive offers
            </p>
          </div>
        </div>
      </div>

      {/* Add padding to ensure content doesn't hide behind fixed header */}
      <div className="h-[100px] hidden lg:block"></div>

      <div className="flex lg:hidden">
        <MobileMenu />
      </div>

      {/* Custom CSS to be added to your global styles */}
      <style jsx global>{`
        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeDown {
          animation: fadeDown 0.3s ease forwards;
        }
        
        .custom-dots {
          position: absolute;
          bottom: 10px;
          display: flex !important;
          justify-content: center;
          width: 100%;
          padding: 0;
          margin: 0;
          list-style: none;
          gap: 5px;
        }
        
        .custom-dots li {
          display: inline-block;
        }
        
        .custom-dots li.slick-active div {
          background-color: #BD9153;
          transform: scale(1.2);
        }
      `}</style>
    </>
  );
}

export default Header;