import React, { useState } from 'react'
import { megaMenu } from '../utils/megaMenu'
import MagnifyingGlass from '../svg/MagnifyingGlass.jsx'
import Wishlist from '../svg/Wishlist.jsx'
import Profile from '../svg/Profile.jsx'
import Cart from '../svg/Cart.jsx'
import SecurePayments from '../svg/SecurePayments.jsx'
import Delivery from '../svg/Delivery.jsx'
import Logo from './Logo.jsx'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Image } from '@nextui-org/react'

function Header() {
  const [show, setShow] = useState("")
  const navigate = useNavigate()
  const toggleShow = (index) => {
    setShow(index)
  }

  const renderBulkGiftingMenu = (items) => {
    return (
      <ul className="grid grid-cols-3 gap-8 p-8 w-full bg-slate-100">
        {items.subItems?.map((menuItem, index) => (
          <li key={index} className="flex flex-col items-center">
            {menuItem.pic && (
              <NavLink to={menuItem.slug} className="w-full">
                <div className="relative mb-4">
                  <img 
                    className="w-full h-[210px] object-cover rounded-lg" 
                    src={menuItem.pic} 
                    alt={menuItem.name} 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg" />
                </div>
              </NavLink>
            )}
            <span className="font-semibold text-center times">{menuItem.name}</span>
          </li>
        ))}
      </ul>
    )
  }

  const renderDefaultMenu = (items) => {
    return (
      <ul className="flex flex-wrap px-12 py-4 gap-20 bg-slate-100">
        {items.subItems?.map((menuItem, index) => {
          return menuItem.name && (
            <li key={index} className="flex flex-col items-start justify-start">
              <div className="w-full h-full flex flex-col flex-wrap gap-6">
                <NavLink to={`/catagory/${menuItem.name}`} className="font-bold trajan">{menuItem.name}</NavLink>
                {menuItem.pic && (
                  <span className="w-42 h-28 pl-2 cursor-pointer">
                    <NavLink to={menuItem.slug}>
                      <img className="size-full rounded-xl" src={menuItem.pic} alt="Menu item" />
                    </NavLink>
                  </span>
                )}
              </div>
              
              <ul className="w-full flex flex-col gap-8 px-2 my-6">
                {menuItem.subItems?.map((subItem, subIndex) => (
                  <p onClick={() => navigate(`/all-product/${subItem.slug}`)} className="times text-black cursor-pointer transition-all duration-500 hover:translate-x-4" key={subIndex}>
                    {subItem.name}
                  </p>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className='w-full'>
      <div className="hidden w-full h-[100px] md:flex items-center relative border-b-[1px] px-8">
      <div className="w-36 h-full flex items-center">
        <NavLink to={'/'}>
          <Logo />
        </NavLink>
      </div>

      <div className="w-full h-full flex justify-center items-center gap-8">
        {megaMenu.map((item, firstIndex) => (
          <span 
            onMouseEnter={() => toggleShow(firstIndex)} 
            onMouseLeave={() => setShow(null)} 
            key={item.name} 
            className="h-full z-50 cursor-pointer flex items-center"
          >
            <NavLink to={item.slug} className="relative before:content-[''] before:absolute before:w-0 before:h-1 before:bg-[#CE0067] before:-bottom-4 before:left-1/2 before:-translate-x-1/2 before:transition-all before:duration-400 before:rounded-b-3xl hover:before:w-full trajan text-sm text-[#757575] font-semibold">
              {item.name}
            </NavLink>
            
            {show === firstIndex && item.subItems?.length && (
              <div className="absolute top-full left-0 w-full">
                {item.name === "Bulk Gifting" 
                  ? renderBulkGiftingMenu(item)
                  : renderDefaultMenu(item)
                }
              </div>
            )}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        <span className="cursor-pointer">
          <MagnifyingGlass />
        </span>
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
      </div>
    </div>

      <div className='hidden md:flex justify-evenly py-2 bg-[#5C0977]'>
        <div className='flex items-center gap-2'>
          <SecurePayments />
          <p className='text-[16px] text-white'>Secure Payments</p>
        </div>

        <div className='flex items-center gap-2'>
          <Delivery />
          <p className='text-[16px] text-white'>Fast & Melt-free delivery</p>
        </div>

        <div className='flex items-center gap-2'>
          <SecurePayments />
          <p className='text-[16px] text-white'>Subscribe for exclusive offers</p>
        </div>
      </div>
    </div>
    
  )
}

export default Header