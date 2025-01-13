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

function Header() {
  const [show, setShow] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [cartData, setCartData] = useState([]);
  const isCartUpdated = useStore(state => state.isCartUpdated);
  const setCartSize = useStore(state => state.setCartSize);
  const cartSize = useStore(state => state.cartSize);
  const navigate = useNavigate();

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

  const renderBulkGiftingMenu = (items) => {
    return (
      <ul className="grid grid-cols-3 gap-8 p-8 w-full bg-slate-100 z-40 times">
        {items.subItems?.map((menuItem, index) => (
          <li key={index} className="flex flex-col items-center">
            {menuItem.pic && (
              <NavLink to={menuItem.slug} className="w-full">
                <div className="relative mb-4">
                  <img className="w-full h-[210px] object-cover rounded-lg" src={menuItem.pic} alt={menuItem.name} />
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg" />
                </div>
              </NavLink>
            )}
            <span className="font-semibold text-center">{menuItem.name}</span>
          </li>
        ))}
      </ul>
    );
  };

  const renderDefaultMenu = (items) => {
    return (
      <ul className="flex flex-wrap px-12 py-4 gap-20 bg-slate-100 times">
        {items.subItems?.map((menuItem, index) => {
          return menuItem.name && (
            <li key={index} className="flex flex-col items-start justify-start">
              <div className="w-full h-full flex flex-col flex-wrap gap-6">
                <NavLink to={`/catagory/${menuItem.name}`} className="font-bold">{menuItem.name}</NavLink>
                {menuItem.pic && (
                  <span className="w-42 h-28 pl-2 cursor-pointer">
                    <NavLink to={menuItem.slug}>
                      <img className="w-full h-full object-cover rounded-xl" src={menuItem.pic} alt="Menu item" />
                    </NavLink>
                  </span>
                )}
              </div>
              <ul className="w-full flex flex-col gap-8 px-2 my-6">
                {menuItem.subItems?.map((subItem, subIndex) => (
                  <p onClick={() => navigate(`/all-product/${subItem.slug}`)} className="cursor-pointer transition-all duration-500 hover:translate-x-4" key={subIndex}>
                    {subItem.name}
                  </p>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <div className="w-full hidden lg:flex flex-col z-50">
        <div className="hidden w-full h-[100px] md:flex items-center relative border-b-[1px] px-8">
          <div className="w-36 h-full flex items-center">
            <NavLink to="/">
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
                  className="trajan relative before:content-[''] before:absolute before:w-0 before:h-1 before:bg-[#CE0067] before:-bottom-4 before:left-1/2 before:-translate-x-1/2 before:transition-all before:duration-400 before:rounded-b-3xl group-hover:before:w-full group-hover:font-black font-semibold text-sm text-[#757575] z-40"
                >
                  {item.name}
                </NavLink>

                {show === firstIndex && item.subItems?.length && (
                  <div className="absolute top-full left-0 w-full">
                    {item.name === "Bulk Gifting"
                      ? renderBulkGiftingMenu(item)
                      : renderDefaultMenu(item)}
                  </div>
                )}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <span className="cursor-pointer">
              <MagnifyingGlass />
            </span>
            <NavLink to="/wishlist" className="cursor-pointer">
              <Wishlist />
            </NavLink>
            <NavLink to="/account" className="cursor-pointer">
              <Profile />
            </NavLink>
            <NavLink to={"/cart"} className="cursor-pointer">
              <div className="relative">
                <Cart />
                <span className="absolute -top-2 -right-2 bg-black text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  {cartSize || 0}
                </span>
              </div>
            </NavLink>
          </div>
        </div>

        <div className="hidden md:flex justify-evenly py-2 times bg-[#5C0977]">
          <div className="flex items-center gap-2">
            <SecurePayments />
            <p className="text-[16px] text-white">Secure Payments</p>
          </div>

          <div className="flex items-center gap-2">
            <Delivery />
            <p className="text-[16px] text-white">Fast & Melt-free delivery</p>
          </div>

          <div className="flex items-center gap-2">
            <SecurePayments />
            <p className="text-[16px] text-white">Subscribe for exclusive offers</p>
          </div>
        </div>
      </div>

      <div className="flex lg:hidden">
        <MobileMenu />
      </div>

      {/* <SlidingCart isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </>
  );
}

export default Header;