import Customized from '@/svg/Customized';
import Personalised from '@/svg/Personalised';
import SameDay from '@/svg/SameDay';
import Truck from '@/svg/Truck';
import React from 'react'

const Options = () => {
    return (
      <div className="space-y-8">
        {/* Gifting Options */}
        <div className="p-6 bg-gray-100 border border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 trajan">Gifting Options</h2>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <span className="text-purple-600 text-xl">
                <i className="fas fa-pen"></i>
              </span>
              <div>
                <span className='flex items-center gap-2'>
                    <Personalised />
                    <h3 className="font-bold times">Personalized Message</h3>
                </span>
                <p className="text-gray-600 times">
                  Add A Free Personalised Message To Your Order At Checkout.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-purple-600 text-xl">
                <i className="fas fa-gift"></i>
              </span>
              <div>
              <span className='flex items-center gap-2'>
                    <Customized />
                    <h3 className="font-bold times">Customised Gift Boxes & Packaging</h3>
                </span>
                
                <p className="text-gray-600 times">
                  Customised Gift Boxes And Packaging Is Available.{" "}
                  <a href="#" className="text-purple-600 underline times">
                    See Brochure
                  </a>
                </p>
                <p className="text-gray-600 times">
                  For Corporate Gifting, Please Fill In The Form{" "}
                  <a href="#" className="text-purple-600 underline">
                    Here
                  </a>.
                </p>
              </div>
            </li>
          </ul>
        </div>
  
        {/* Delivery Options */}
        <div className="p-6 bg-gray-100 border border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 trajan">Delivery Options</h2>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <span className="text-purple-600 text-xl">
                <i className="fas fa-truck"></i>
              </span>
              <div>
              <span className='flex items-center gap-2'>
                    <SameDay />
                    <h3 className="font-bold times">Same Day Delivery</h3>
                </span>
                
                <p className="text-gray-600 times">
                  Same Day Deliveries Are Available For Kolkata Orders.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-purple-600 text-xl">
                <i className="fas fa-shipping-fast"></i>
              </span>
              <div>
                <span className='flex items-center gap-2'>
                    <Truck />
                    <h3 className="font-bold times">All - India Delivery</h3>
                </span>
                
                <p className="text-gray-600 times">
                  Customer Will Receive The Product Within 3-4 Days After Placing
                  The Order. For Shipping Charges And Complete Shipping Policy,
                  Read{" "}
                  <a href="#" className="text-purple-600 underline times">
                    Here
                  </a>.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

export default Options