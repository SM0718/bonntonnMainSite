import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { megaMenu } from "../utils/megaMenu";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Hamburger from "@/svg/Hamburger";
import Wishlist from '../svg/Wishlist.jsx';
import Profile from '../svg/Profile.jsx';
import Cart from '../svg/Cart.jsx';
import Logo from './Logo.jsx';
import useStore from '@/store/store';
import SecurePayments from '../svg/SecurePayments.jsx';
import Delivery from '../svg/Delivery.jsx';
import MagnifyingGlass from '../svg/MagnifyingGlass.jsx';
import Payments from '@/svg/Payments';

function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const cartSize = useStore(state => state.cartSize);
  const isCartUpdated = useStore(state => state.isCartUpdated);
  const setCartSize = useStore(state => state.setCartSize);
  const menuRef = useRef(null);
  const searchInputRef = useRef(null);

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
          setCartSize(responseData.data.length);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartData();
  }, [isCartUpdated, setCartSize]);

  useEffect(() => {
    // Focus search input when search becomes visible
    if (searchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchVisible]);

  // Handle clicks outside menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Reset active category when closing menu
    if (isMenuOpen) {
      setActiveCategory(null);
    }
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchVisible(false);
      setSearchTerm("");
    }
  };

  const renderFeaturedItem = (item) => {
    if (!item) return null;
    
    return (
      <div 
        className="relative overflow-hidden rounded-lg mb-4 cursor-pointer group"
        onClick={() => {
          navigate(item.picSlug || "/");
          toggleMenu();
        }}
      >
        <img 
          src={item.pic} 
          alt={item.picDesc || item.name}
          className="w-full h-44 object-cover transform transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-serif font-medium text-lg">{item.picDesc || item.name}</h3>
          <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <button className="px-4 py-1 bg-[#BD9153] text-white text-sm font-serif rounded hover:bg-[#A67A3E] transition-colors">
              Explore
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSubcategories = (subItems) => {
    if (!subItems || !subItems.length) return null;

    return (
      <div className="grid grid-cols-2 gap-3 px-1 mt-2">
        {subItems.map((item, idx) => (
          <div 
            key={idx}
            className="cursor-pointer" 
            onClick={() => {
              navigate(`/all-product/${item.slug}`);
              toggleMenu();
            }}
          >
            <div className="font-serif text-[#555] py-2 px-3 rounded-md transition-all duration-300 hover:bg-[#f8f2e9] hover:text-[#BD9153] text-sm border border-[#eee] flex items-center justify-center h-full">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMainMenu = () => (
    <div className="py-6 px-4">
      <div className="flex flex-col gap-5">
        {megaMenu.map((category, idx) => (
          <div key={idx} className="w-full">
            {category.subItems?.length > 0 ? (
              <div>
                <div 
                  className={`flex justify-between items-center py-2 cursor-pointer ${
                    activeCategory === idx ? 'text-[#BD9153] border-b-2 border-[#BD9153]' : 'border-b border-gray-100'
                  }`}
                  onClick={() => setActiveCategory(activeCategory === idx ? null : idx)}
                >
                  <span className="font-serif font-medium text-lg">{category.name}</span>
                  <span className="transform transition-transform duration-300">
                    {activeCategory === idx ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                      </svg>
                    )}
                  </span>
                </div>

                {activeCategory === idx && (
                  <div className="mt-4 animate-fadeIn">
                    {category.name === "Bulk Gifting" ? (
                      <div className="grid grid-cols-2 gap-3">
                        {category.subItems?.map((item, itemIdx) => (
                          <div 
                            key={itemIdx} 
                            className="overflow-hidden rounded-lg relative cursor-pointer"
                            onClick={() => {
                              navigate(item.slug);
                              toggleMenu();
                            }}
                          >
                            <img 
                              src={item.pic} 
                              alt={item.name}
                              className="w-full h-28 object-cover" 
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                              <span className="text-white font-serif text-sm font-medium">{item.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        {category.subItems?.map((menuItem, menuIdx) => {
                          // Find a featured item with an image to display
                          const hasFeaturedImage = menuItem.pic || 
                            (menuItem.carauselInfo && menuItem.carauselInfo.length > 0 && menuItem.carauselInfo[0].pic);
                          
                          const featuredItem = hasFeaturedImage ? 
                            (menuItem.carauselInfo && menuItem.carauselInfo.length > 0) ? 
                              menuItem.carauselInfo[0] : menuItem : null;

                          return (
                            <div key={menuIdx} className="mb-5">
                              <NavLink 
                                to={`/catagory/${menuItem.name}`}
                                className="font-serif text-base font-medium text-[#333] border-b border-[#BD9153] inline-block pb-1 mb-3"
                                onClick={toggleMenu}
                              >
                                {menuItem.name}
                              </NavLink>
                              
                              {featuredItem && renderFeaturedItem(featuredItem)}
                              {renderSubcategories(menuItem.subItems)}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to={category.slug}
                className="block font-serif font-medium text-lg py-2 border-b border-gray-100 transition-colors hover:text-[#BD9153]"
                onClick={toggleMenu}
              >
                {category.name}
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative w-full z-50">
      {/* Search Overlay */}
      <div className={`fixed inset-0 bg-black bg-opacity-95 z-50 transform transition-all duration-300 flex flex-col justify-start items-center pt-16 px-4 ${
        searchVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <button 
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={toggleSearch}
        >
          ×
        </button>
        
        <form onSubmit={handleSearch} className="w-full max-w-md">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-b-2 border-[#BD9153] text-white py-2 px-4 text-lg font-serif focus:outline-none"
            />
            <button 
              type="submit" 
              className="absolute right-0 top-0 h-full flex items-center text-white"
            >
              <MagnifyingGlass />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="flex justify-between items-center w-full px-4 py-3">
          <button className="p-1" onClick={toggleMenu}>
            <Hamburger />
          </button>
          
          <NavLink to="/" className="w-24 transform transition-transform duration-300 hover:scale-105">
            <Logo />
          </NavLink>

          <div className="flex items-center gap-3">
            <button onClick={toggleSearch} className="p-1">
              <MagnifyingGlass />
            </button>
            
            <NavLink to="/cart" className="p-1 relative">
              <Cart />
              {cartSize > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#BD9153] text-white rounded-full text-xs w-5 h-5 flex items-center justify-center shadow-md">
                  {cartSize}
                </span>
              )}
            </NavLink>
          </div>
        </div>

        {/* Feature Banner */}
        <div className="bg-gradient-to-r from-[#BD9153] to-[#A67A3E] py-1.5 px-2 overflow-hidden">
          <div className="flex gap-6 items-center animate-marquee whitespace-nowrap">
            <div className="flex items-center gap-1">
              <SecurePayments />
              <p className="text-xs text-white font-serif">Secure Payments</p>
            </div>
            
            <div className="h-4 w-px bg-white bg-opacity-30"></div>
            
            <div className="flex items-center gap-1">
              <Delivery />
              <p className="text-xs text-white font-serif">Fast Delivery</p>
            </div>
            
            <div className="h-4 w-px bg-white bg-opacity-30"></div>
            
            <div className="flex items-center gap-1">
              <Payments />
              <p className="text-xs text-white font-serif">Exclusive Offers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Side Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-full sm:w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 overflow-y-auto ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="relative bg-gradient-to-r from-[#BD9153] to-[#A67A3E] py-5 px-4 flex justify-between items-center">
          <h2 className="text-lg font-serif font-medium text-white">Menu</h2>
          <button
            className="text-white text-2xl cursor-pointer"
            onClick={toggleMenu}
          >
            ×
          </button>
        </div>

        {/* User Actions */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-around">
          <NavLink to="/wishlist" className="flex flex-col items-center" onClick={toggleMenu}>
            <div className="p-2 rounded-full bg-[#f8f2e9] text-[#BD9153] mb-1">
              <Wishlist />
            </div>
            <span className="text-xs font-serif text-gray-600">Wishlist</span>
          </NavLink>
          
          <NavLink to="/account" className="flex flex-col items-center" onClick={toggleMenu}>
            <div className="p-2 rounded-full bg-[#f8f2e9] text-[#BD9153] mb-1">
              <Profile />
            </div>
            <span className="text-xs font-serif text-gray-600">Account</span>
          </NavLink>
          
          <NavLink to="/cart" className="flex flex-col items-center" onClick={toggleMenu}>
            <div className="p-2 rounded-full bg-[#f8f2e9] text-[#BD9153] mb-1 relative">
              <Cart />
              {cartSize > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#BD9153] text-white rounded-full text-xs w-4 h-4 flex items-center justify-center shadow-sm">
                  {cartSize}
                </span>
              )}
            </div>
            <span className="text-xs font-serif text-gray-600">Cart</span>
          </NavLink>
        </div>

        {/* Main Menu Items */}
        {renderMainMenu()}

        {/* Menu Footer */}
        <div className="mt-auto p-4 border-t border-gray-100 bg-[#f8f8f8]">
          <NavLink
            to="/logout"
            className="block w-full py-2 text-center font-serif font-medium bg-white rounded-md border border-[#BD9153] text-[#BD9153] hover:bg-[#BD9153] hover:text-white transition-colors"
            onClick={toggleMenu}
          >
            Logout
          </NavLink>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity z-40 ${
          isMenuOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Custom CSS */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-180px); }
        }
        
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default MobileMenu;