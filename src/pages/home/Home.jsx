import React from 'react'
import MainCarausel from './MainCarausel.jsx'
import BestSellers from './BestSellers.jsx'
import FeaturedItem from './FeaturedItem.jsx'
import Recommended from './Recommended.jsx'
import ProductGrid from './ProductGrid.jsx'
import SpecialOfferBanner from './SpecialOfferBanner.jsx'
import Testimonials from './Testimonials.jsx'
import Clientele from './Clientele.jsx'
import OfflineOutlet from './OfflineOutlet.jsx'
import FeaturedSection from './FeaturedSection.jsx'
import Footer from '@/components/Footer.jsx'

function Home() {
  return (
    <div>

      <MainCarausel />

      <div className='flex flex-col gap-4 justify-between bg-white text-black'>
        {/* <p className='trajan text-[30px] md:text-[40px] text-center'>Embraced with Love | Directly from the Heart!</p>
        <p className='w-full md:w-[800px] times text-[16px] md:text-[26px] text-center text-[#757575] mx-auto px-2'>
          Thoughtfully crafted for every heartfelt celebration, our gifts are made to bring joy and create memories. Unwrap the essence of love, all carefully packed and ready to be shared.
        </p> */}
      </div>

      <BestSellers />
      <ProductGrid />
      <FeaturedSection />
      <Recommended />
      <FeaturedItem />

      <div className='px-2 md:px-24 py-8 bg-white'>
        <SpecialOfferBanner />
      </div>

      <Testimonials />
      <Clientele />
      <OfflineOutlet />
    </div>
  )
}

export default Home