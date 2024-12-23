import React from 'react'
import Facebook from '@/svg/Facebook'
import Instagram from '@/svg/Instagram'
import Linkdin from '@/svg/Linkdin'
import { NavLink } from 'react-router-dom'

function Footer() {

  const currentYear = new Date().getFullYear();

  return (

    <div className='bg-[#5C0977] p-8'>

      {/* Div for main info */}
      <div className='flex flex-col md:flex-row justify-center items-center gap-8'>

      {/* Div for left part */}
        <div className='w-full md:w-1/2 flex flex-col items-center md:items-start gap-8 py-2'>

          <div className='w-48'>
            <img src='/./whiteLogo.png'/>
          </div>

          <div className='flex flex-col md:flex-row gap-2'>

            <div className='flex gap-2'>
              
            <NavLink to={'https://www.swiggy.com/city/kolkata/bonn-tonn-gourmet-opposite-papillon-flower-shop-alipore-rest705986'}>
                <div className='bg-white rounded-xl flex justify-center w-full p-2'>
                  <img className='w-full md:w-[80px] h-[30px] md:h-[25px]' src='/./swiggy-logo.png'/>
                </div>
              </NavLink>

            <NavLink to={'https://www.zomato.com/kolkata/bonntonn-gourmet-gift-studio-alipore'}>
              <div className='bg-white rounded-xl flex justify-center w-full p-2'>
                <img className='w-full md:w-[80px] h-[30px] md:h-[25px]' src='/./zomato-logo.png'/>
              </div>
              </NavLink>

            </div>

              <NavLink to={'https://bonntonn.petpooja.com'}>
                <div className='bg-white rounded-xl flex flex-col justify-center w-[240px] md:w-[160px] p-[6px]'>
                  <img className='w-full' src='/./orderkolk.webp'/>
                </div>
              </NavLink>
          </div>
        </div>


      {/* Div for the middle section */}

      <div className='flex flex-col md:flex-row gap-12 md:gap-48 mt-4 md:mt-0'>
          <div className='text-white flex flex-col gap-4'>
            <h1 className='text-xl font-bold b text-center'>THE BRAND</h1>

            <div className='flex flex-col gap-2'>
              <p className='b text-base text-center md:text-start'>About Us</p>
              <p className='b text-base text-center md:text-start'>Return Policy</p>
              <p className='b text-base text-center md:text-start'>Shipping Info</p>
              <p className='b text-base text-center md:text-start'>Privacy Policy</p>
            </div>
          </div>


          {/* Div for the last div */}
          <div className='flex flex-col gap-4 text-center text-white'>
                      <h1 className='font-bold text-center md:text-start text-xl headings b'>Contact Us</h1>

                      <div className='flex flex-col gap-2'>
                        <p className='times text-sm text-center md:text-start '>9874451300</p>
                        <p className='b text-base'>bonntonn.kolkata@gmail.com</p>
                      </div>

                      <div className='w-full flex justify-center gap-[40px]'>
                        <NavLink to={'https://www.facebook.com/BonnTonnGourmet/'} className={'transition duration-300'}>
                          {/* <Facebook /> */}
                          <img className='size-[45px]' src='/./facebook.jpg'/>
                        </NavLink>

                        <NavLink to={'https://www.instagram.com/bonn.tonn/'} className={'transition duration-300'}>
                          {/* <Instagram /> */}
                          <img className='size-[45px]' src='/./instagram.jpg'/>
                        </NavLink>

                        <NavLink to={'https://www.linkedin.com/company/bonntonn/?originalSubdomain=in'} className={'transition duration-300'}>
                          {/* <Linkdin /> */}
                          <img className='size-[45px]' src='/./linkdin.jpg'/>
                        </NavLink>
                      </div>
            </div>

      </div>

      </div>

      <div>
      <div className='mt-20 py-8 border-t'>
         <p className='w-full px-4 font-medium mx-auto text-center text-white b'>&copy; {currentYear} Bonntonn Gourmet Gift Studio. All Rights Reserved.</p>
       </div>
      </div>
    </div>
  )
}

export default Footer