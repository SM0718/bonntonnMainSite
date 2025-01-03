import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { megaMenu } from "../utils/megaMenu";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Hamburger from "@/svg/Hamburger";
import Wishlist from '../svg/Wishlist.jsx'
import Profile from '../svg/Profile.jsx'
import Cart from '../svg/Cart.jsx'

function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderSubItems = (subItems) => {
    return subItems?.map((subItem, subIndex) => (
      <div key={subIndex}>
        {subItem.subItems ? (
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
              key={subIndex}
              aria-label={subItem.name}
              title={subItem.name}
            >
              <ul className="space-y-1 pl-2">
                {subItem.subItems.map((item, idx) => (
                  <li key={idx}>
                    <NavLink
                      to={item.slug}
                      className="block px-2 py-1 text-sm text-gray-600 hover:text-purple-600 transition-colors times"
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </AccordionItem>
          </Accordion>
        ) : (
          <NavLink
            to={subItem.slug}
            className="block px-4 py-1.5 text-sm text-gray-600 hover:text-purple-600 transition-colors times"
            onClick={toggleMenu}
          >
            {subItem.name}
          </NavLink>
        )}
      </div>
    ));
  };

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <div className="p-3 cursor-pointer flex items-center" onClick={toggleMenu}>
        <Hamburger />
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
                    <div className="space-y-1">
                      {renderSubItems(item.subItems)}
                    </div>
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

        {/* Wishlist, Login/Logout, Cart, and Account options */}
        <div className="flex justify-evenly border-t border-gray-200 pt-4">
          <span className="cursor-pointer">
            <Wishlist />
          </span>
          <NavLink to={'/account-page'} className="cursor-pointer">
            <Profile />
          </NavLink>
          <span className="cursor-pointer">
            <div className="indicator">
              <Cart />
              <span className="badge badge-sm indicator-item">0</span>
            </div>
          </span>

          {/* Conditionally render Login/Logout based on authentication status */}
          
        </div>
        <NavLink
            to="/logout" // Change URL based on your auth state
            className="block px-4 py-2 text-md font-medium text-gray-800 hover:text-purple-600 hover:bg-gray-50 transition-colors"
            onClick={toggleMenu}
          >
            Logout
          </NavLink>
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
