import React from 'react';

const SlidingCart = ({ isOpen, setIsOpen }) => {
  return (
    <div className="flex z-50">
      {/* Sliding Cart */}
      <div
        className={`absolute top-0 right-0 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '500px', height: '100vh' }} // Full viewport height
      >
        <div className="h-full p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
          >
            X
          </button>
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

          {/* Cart items */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b pb-4">
              <p>Product 1</p>
              <span>$10</span>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <p>Product 2</p>
              <span>$15</span>
            </div>
            {/* Add more cart items as needed */}
          </div>

          <div className="mt-6">
            <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Background overlay only outside the cart */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-40 pointer-events-none"
        />
      )}
    </div>
  );
};

export default SlidingCart;
