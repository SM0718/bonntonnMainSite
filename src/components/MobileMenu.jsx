import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { megaMenu } from "../utils/megaMenu";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Hamburger from "@/svg/Hamburger";
import Wishlist from '../svg/Wishlist.jsx';
import Profile from '../svg/Profile.jsx';
import Cart from '../svg/Cart.jsx';
import Logo from './Logo.jsx';
import useStore from '@/store/store';

function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cartSize = useStore(state => state.cartSize);
  const isCartUpdated = useStore(state => state.isCartUpdated);
  const setCartSize = useStore(state => state.setCartSize);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderBulkGiftingItems = (items) => {
    return (
      <div className="space-y-2 pl-4">
        {items.subItems?.map((menuItem, index) => (
          <NavLink
            key={index}
            to={menuItem.slug}
            className="block py-1.5 text-sm text-gray-600 hover:text-purple-600 transition-colors times"
            onClick={toggleMenu}
          >
            <div className="flex items-center gap-2">
              {menuItem.pic && (
                <img 
                  src={menuItem.pic} 
                  alt={menuItem.name} 
                  className="w-12 h-12 object-cover rounded-lg"
                />
              )}
              <span>{menuItem.name}</span>
            </div>
          </NavLink>
        ))}
      </div>
    );
  };

  const renderDefaultMenuItems = (items) => {
    return items.subItems?.map((menuItem, index) => (
      <div key={index}>
        <Accordion
          className="px-2"
          itemClasses={{
            base: "py-0 w-full",
            title: "font-medium text-gray-700 times",
            trigger: "px-2 py-1.5 data-[hover=true]:bg-gray-50",
            content: "pt-0 pb-1",
          }}
        >
          <AccordionItem
            key={index}
            aria-label={menuItem.name}
            title={menuItem.name}
          >
            <div className="space-y-2">
              {menuItem.pic && (
                <NavLink to={menuItem.slug} onClick={toggleMenu}>
                  <img 
                    src={menuItem.pic} 
                    alt={menuItem.name}
                    className="w-full h-32 object-cover rounded-lg mb-2" 
                  />
                </NavLink>
              )}
              <ul className="space-y-1.5 pl-2">
                {menuItem.subItems?.map((subItem, subIndex) => (
                  <li 
                    key={subIndex}
                    onClick={() => {
                      navigate(`/all-product/${subItem.slug}`);
                      toggleMenu();
                    }}
                    className="text-sm text-gray-600 hover:text-purple-600 transition-colors times cursor-pointer py-1"
                  >
                    {subItem.name}
                  </li>
                ))}
              </ul>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    ));
  };

  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center w-full px-4 py-2 border-b">
        <div className="cursor-pointer" onClick={toggleMenu}>
          <Hamburger />
        </div>
        
        <NavLink to="/" className="w-24">
          <Logo />
        </NavLink>

        <NavLink to="/cart" className="cursor-pointer">
          <div className="relative">
            <Cart />
            <span className="absolute -top-2 -right-2 bg-black text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
              {cartSize || 0}
            </span>
          </div>
        </NavLink>
      </div>

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-sm bg-white shadow-lg z-50 transform transition-transform duration-300 overflow-y-auto ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold times text-gray-800">Menu</h2>
          <button
            className="text-2xl font-bold cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
            onClick={toggleMenu}
          >
            ×
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {megaMenu.map((item, index) => (
            <div key={index}>
              {item.subItems?.length > 0 ? (
                <Accordion
                  className="px-2"
                  itemClasses={{
                    base: "py-0 w-full",
                    title: "font-medium text-gray-800 times",
                    trigger: "px-2 py-2 data-[hover=true]:bg-gray-50",
                    content: "pt-0 pb-2",
                  }}
                >
                  <AccordionItem
                    key={index}
                    aria-label={item.name}
                    title={item.name}
                  >
                    {item.name === "Bulk Gifting"
                      ? renderBulkGiftingItems(item)
                      : renderDefaultMenuItems(item)}
                  </AccordionItem>
                </Accordion>
              ) : (
                <NavLink
                  to={item.slug}
                  className="block px-4 py-2 text-md font-medium times text-gray-800 hover:text-purple-600 hover:bg-gray-50 transition-colors"
                  onClick={toggleMenu}
                >
                  {item.name}
                </NavLink>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-evenly items-center mb-4">
            <NavLink to="/wishlist" className="cursor-pointer" onClick={toggleMenu}>
              <Wishlist />
            </NavLink>
            <NavLink to="/account" className="cursor-pointer" onClick={toggleMenu}>
              <Profile />
            </NavLink>
            <NavLink to="/cart" className="cursor-pointer" onClick={toggleMenu}>
              <div className="relative">
                <Cart />
                <span className="absolute -top-2 -right-2 bg-black text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  {cartSize || 0}
                </span>
              </div>
            </NavLink>
          </div>
          
          <NavLink
            to="/logout"
            className="block px-4 py-2 text-md font-medium text-gray-800 hover:text-purple-600 hover:bg-gray-50 transition-colors times text-center"
            onClick={toggleMenu}
          >
            Logout
          </NavLink>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
}

export default MobileMenu;