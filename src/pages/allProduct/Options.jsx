import Customized from '@/svg/Customized';
import Personalised from '@/svg/Personalised';
import SameDay from '@/svg/SameDay';
import Truck from '@/svg/Truck';
import React from 'react';
import { motion } from 'framer-motion';

const Options = () => {
  return (
    <div className="space-y-8 md:space-y-12 py-2 md:py-12 md:px-6 bg-gradient-to-b from-white to-[#faf9f6]">
      {/* Gifting Options */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/90 rounded-xl md:rounded-3xl shadow-lg md:shadow-xl border border-[#BD9153]/10 backdrop-blur-sm p-2 md:p-8"
      >
        <h2 className="text-xl md:text-2xl trajan font-semibold text-gray-800 tracking-wide mb-4 md:mb-6">Gifting Options</h2>
        <ul className="space-y-4 md:space-y-6">
          <motion.li 
            whileHover={{ scale: 1.02 }}
            className="flex items-start space-x-3 md:space-x-4"
          >
            <Personalised className="w-6 h-6 md:w-8 md:h-8 text-[#BD9153] flex-shrink-0" />
            <div>
              <h3 className="font-bold times text-base md:text-lg text-gray-800">Personalized Message</h3>
              <p className="text-sm md:text-base text-gray-600 times italic">
                Add a free personalized message to your order at checkout.
              </p>
            </div>
          </motion.li>
          <motion.li 
            whileHover={{ scale: 1.02 }}
            className="flex items-start space-x-3 md:space-x-4"
          >
            <Customized className="w-6 h-6 md:w-8 md:h-8 text-[#BD9153] flex-shrink-0" />
            <div>
              <h3 className="font-bold times text-base md:text-lg text-gray-800">Customized Gift Boxes & Packaging</h3>
              <p className="text-sm md:text-base text-gray-600 times italic">
                Customized gift boxes and packaging available.{' '}
                <a href="#" className="text-[#BD9153] underline hover:text-[#d5b27c] transition-colors duration-300">
                  See Brochure
                </a>
              </p>
              <p className="text-sm md:text-base text-gray-600 times italic">
                For corporate gifting, please fill in the form{' '}
                <a href="#" className="text-[#BD9153] underline hover:text-[#d5b27c] transition-colors duration-300">
                  Here
                </a>.
              </p>
            </div>
          </motion.li>
        </ul>
      </motion.div>

      {/* Delivery Options */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-white/90 rounded-xl md:rounded-3xl shadow-lg md:shadow-xl border border-[#BD9153]/10 backdrop-blur-sm p-4 md:p-8"
      >
        <h2 className="text-xl md:text-2xl trajan font-semibold text-gray-800 tracking-wide mb-4 md:mb-6">Delivery Options</h2>
        <ul className="space-y-4 md:space-y-6">
          <motion.li 
            whileHover={{ scale: 1.02 }}
            className="flex items-start space-x-3 md:space-x-4"
          >
            <SameDay className="w-6 h-6 md:w-8 md:h-8 text-[#BD9153] flex-shrink-0" />
            <div>
              <h3 className="font-bold times text-base md:text-lg text-gray-800">Next Day Delivery</h3>
              <p className="text-sm md:text-base text-gray-600 times italic">
                Next-day deliveries are available for Kolkata orders.
              </p>
            </div>
          </motion.li>
          <motion.li 
            whileHover={{ scale: 1.02 }}
            className="flex items-start space-x-3 md:space-x-4"
          >
            <Truck className="w-6 h-6 md:w-8 md:h-8 text-[#BD9153] flex-shrink-0" />
            <div>
              <h3 className="font-bold times text-base md:text-lg text-gray-800">All-India Delivery</h3>
              <p className="text-sm md:text-base text-gray-600 times italic">
                Receive your product within 3-4 days after placing the order. For shipping charges and complete policy, read{' '}
                <a href="#" className="text-[#BD9153] underline hover:text-[#d5b27c] transition-colors duration-300">
                  Here
                </a>.
              </p>
            </div>
          </motion.li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Options;