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

      <div className='flex flex-col gap-4 justify-between bg-white text-black py-12'>
        <p className='trajan text-[40px] text-center'>Wrapped in Love  | Straight from the Heart!</p>
        <p className='w-[800px] times text-[26px] text-center text-[#757575] mx-auto'>
          Thoughtfully crafted for every heartfelt celebration, our gifts are made to bring joy and create memories. Unwrap the essence of love, all carefully packed and ready to be shared.
        </p>
      </div>

      <BestSellers />
      <ProductGrid />
      <FeaturedSection />
      <Recommended />
      <FeaturedItem />

      <div className='px-24 py-8 bg-white'>
        <SpecialOfferBanner />
      </div>

      <Testimonials />
      <Clientele />
      <OfflineOutlet />
    </div>
  )
}

export default Home