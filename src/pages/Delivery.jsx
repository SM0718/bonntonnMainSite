import React from 'react';

const Delivery = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-evenly p-8 bg-gray-50">

    <div className='flex flex-col gap-4'>
    <div className="w-full bg-white p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 trajan">Delivery</h2>
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="First Name"
              className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <input
            type="text"
            placeholder="Company (Optional)"
            className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
          <input
            type="text"
            placeholder="Apartment, Suite, Etc (Optional)"
            className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="City"
              className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
            <input
              type="text"
              placeholder="State"
              className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
            <input
              type="text"
              placeholder="PIN Code"
              className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </form>
      </div>

      {/* Payment Section */}
      <div className="w-full bg-white p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 trajan">Payment</h2>
        <p className="text-gray-600 mb-4">All transactions are secure and encrypted</p>
        <div className="border border-gray-300 rounded-md p-4 mb-6">
          <p className="text-gray-800 font-medium mb-4">Razorpay (UPI, Cards, Wallets, Netbanking)</p>
          <div className="flex items-center justify-center h-32 border border-gray-300 rounded-md">
            <div className="text-center">
              <div className="mb-2">
                <span className="block text-gray-500 text-sm">...</span>
              </div>
              <div className="w-8 h-8 border border-gray-500 rounded-full inline-block"></div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            After clicking "Pay Now", you will be redirected to Razorpay Secure to complete your purchase securely.
          </p>
        </div>
        <button
          type="submit"
          className="bg-[#CE0067] w-full mr-auto text-white py-2 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]"
        >
          PAY NOW
        </button>
      </div>

        </div>
      {/* Delivery Section */}
      

      {/* Order Summary Section */}
      <div className="w-full lg:w-1/3 bg-white p-6 shadow-md rounded-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 trajan">Order Summary</h2>
        <div className="mb-6">
          <div className="flex justify-between mb-4">
            <span>Box of 16 Classic Pralines</span>
            <span className="font-medium">₹3,000.00</span>
          </div>
          <div className="flex justify-between">
            <span>Extra Dark Chocolate Macaroons (8 Pcs)</span>
            <span className="font-medium">₹395.00</span>
          </div>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Discount Code"
            className="flex-grow bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
          <button
          type="submit"
          className="bg-[#CE0067] w-1/3 mr-auto text-white py-2 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]"
        >
          Apply
        </button>
        </div>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>Subtotal (4 Items)</span>
            <span className="font-medium">₹3,395.00</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Enter shipping address</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>INR ₹3,395.00</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Including ₹700.00 in taxes</p>
        </div>
      </div>
    </div>
  );
};

export default Delivery;