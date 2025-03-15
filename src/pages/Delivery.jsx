import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Input } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Delivery = () => {
  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [minOrderValue, setMinOrderValue] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, addressResponse] = await Promise.all([
          fetch("https://bonnbackend.up.railway.app/api/v1/cart/get-user-cart", {
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          }),
          fetch('https://bonnbackend.up.railway.app/api/v1/address/get-address', {
            headers: { Authorization: `Bearer ${token}` },
            credentials: "include",
          }),
        ]);

        if (!productsResponse.ok || !addressResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const productsData = await productsResponse.json();
        const addressInfo = await addressResponse.json();

        setProducts(productsData.data || []);
        setAddress(addressInfo.data || []);
        setMinOrderValue(500); // Assuming a default value since configData is commented out
        setLoading(false);
      } catch (err) {
        setError('Failed to load order details');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateSubtotal = () => {
    if (discount > 0) {
      return products.reduce((sum, product) => {
        const discountAmount = product.productPrice * (discount / 100);
        const discountedPrice = product.productPrice - discountAmount;
        return sum + (discountedPrice * product.productQuantity);
      }, 0);
    }
    return products.reduce((sum, product) => sum + (product.productPrice * product.productQuantity), 0);
  };

  const calculateShipping = () => {
    return useSavedAddress && selectedAddress ? 50 : 0;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    return subtotal - (subtotal * (discount / 100)) + shipping;
  };

  const handleCouponSubmit = async () => {
    if (!couponCode.trim()) {
      toast.info('Please enter a coupon code', { position: "top-right" });
      return;
    }
    try {
      const response = await fetch(`https://bonnbackend.up.railway.app/api/v1/codes/check-code?code=${couponCode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        toast.info('Invalid coupon code', { position: "top-right" });
        return;
      }

      const data = await response.json();
      setDiscount(data.data.code.discountPercentage);
      toast.success('Coupon applied successfully', { position: "top-right" });
    } catch (err) {
      setError('Failed to validate coupon');
    }
  };

  const onAddressSubmit = async (data) => {
    if (useSavedAddress && !selectedAddress) {
      setError('Please select a saved address');
      return;
    }

    try {
      const response = await fetch('https://bonnbackend.up.railway.app/api/v1/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          address: useSavedAddress ? selectedAddress : data,
          products,
          couponCode: discount > 0 ? couponCode : null,
          total: calculateTotal(),
          shipping: calculateShipping()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await response.json();
      window.location.href = orderData.paymentUrl;
    } catch (err) {
      setError('Failed to create order');
      toast.error('Order creation failed', { position: "top-right" });
    }
  };

  const handleAddressChange = (id) => {
    const selectedLoc = address.find(item => id === item._id);
    setSelectedAddress(selectedLoc);
    setError('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-[#faf9f6]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BD9153]"
        />
      </div>
    );
  }

  const subtotal = calculateSubtotal();
  const total = calculateTotal();
  const isMinOrderMet = subtotal >= minOrderValue;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#faf9f6] px-4 py-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl trajan font-bold text-gray-800 tracking-wide">Checkout</h2>
          <div className="w-20 sm:w-24 h-1 bg-[#BD9153] rounded-full mt-3 sm:mt-4"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12">
          {/* Delivery & Payment Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/3 space-y-8 sm:space-y-12"
          >
            {/* Delivery Section */}
            <div className="bg-white/90 rounded-2xl sm:rounded-3xl shadow-xl border border-[#BD9153]/10 backdrop-blur-sm p-5 sm:p-8">
              <h3 className="text-xl sm:text-2xl trajan font-semibold text-gray-800 tracking-wide mb-4 sm:mb-6">Delivery Details</h3>
              <div className="flex flex-col xs:flex-row gap-3 xs:gap-6 mb-6">
                <label className="flex items-center gap-2 times text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    checked={useSavedAddress}
                    onChange={() => setUseSavedAddress(true)}
                    className="accent-[#BD9153]"
                  />
                  Use Saved Address
                </label>
                <label className="flex items-center gap-2 times text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    checked={!useSavedAddress}
                    onChange={() => { setUseSavedAddress(false); setSelectedAddress(null); }}
                    className="accent-[#BD9153]"
                  />
                  Enter New Address
                </label>
              </div>

              {useSavedAddress ? (
                <div className="space-y-4">
                  <h4 className="text-lg times font-medium text-gray-700">Select an Address</h4>
                  <div className="space-y-3 max-h-[200px] sm:max-h-[300px] overflow-y-auto custom-scrollbar">
                    {address.map((info) => (
                      <motion.label
                        key={info._id}
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center gap-3 p-3 sm:p-4 border border-[#BD9153]/20 rounded-lg sm:rounded-xl cursor-pointer bg-white/50 transition-all duration-300 ${selectedAddress?._id === info._id ? 'border-[#BD9153] bg-[#f8f5f0]' : ''}`}
                      >
                        <input
                          type="radio"
                          name="savedAddress"
                          value={info._id}
                          checked={selectedAddress?._id === info._id}
                          onChange={() => handleAddressChange(info._id)}
                          className="accent-[#BD9153]"
                        />
                        <div className="times text-gray-700 text-sm sm:text-base">
                          <p className="font-semibold">{info.houseName}</p>
                          <p>{`${info.houseNumber}, ${info.streetName}, ${info.city} - ${info.pincode}`}</p>
                          <p>Phone: {info.phone}</p>
                        </div>
                      </motion.label>
                    ))}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onAddressSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <Input
                    {...register("firstName", { required: "First name is required" })}
                    placeholder="First Name"
                    className="rounded-lg sm:rounded-xl border-[#BD9153]/20 focus:ring-[#BD9153] times bg-white/50"
                    errorMessage={errors.firstName?.message}
                    size="sm"
                  />
                  <Input
                    {...register("lastName", { required: "Last name is required" })}
                    placeholder="Last Name"
                    className="rounded-lg sm:rounded-xl border-[#BD9153]/20 focus:ring-[#BD9153] times bg-white/50"
                    errorMessage={errors.lastName?.message}
                    size="sm"
                  />
                  <Input
                    {...register("apartment")}
                    placeholder="Apartment, Suite, Etc (Optional)"
                    className="col-span-1 sm:col-span-2 rounded-lg sm:rounded-xl border-[#BD9153]/20 focus:ring-[#BD9153] times bg-white/50"
                    size="sm"
                  />
                  <Input
                    {...register("city", { required: "City is required" })}
                    placeholder="City"
                    className="rounded-lg sm:rounded-xl border-[#BD9153]/20 focus:ring-[#BD9153] times bg-white/50"
                    errorMessage={errors.city?.message}
                    size="sm"
                  />
                  <Input
                    {...register("state", { required: "State is required" })}
                    placeholder="State"
                    className="rounded-lg sm:rounded-xl border-[#BD9153]/20 focus:ring-[#BD9153] times bg-white/50"
                    errorMessage={errors.state?.message}
                    size="sm"
                  />
                  <Input
                    {...register("pinCode", { 
                      required: "PIN Code is required",
                      pattern: { value: /^\d{6}$/, message: "Invalid PIN Code" }
                    })}
                    placeholder="PIN Code"
                    className="rounded-lg sm:rounded-xl border-[#BD9153]/20 focus:ring-[#BD9153] times bg-white/50"
                    errorMessage={errors.pinCode?.message}
                    size="sm"
                  />
                  <Input
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: { value: /^\d{10}$/, message: "Invalid phone number" }
                    })}
                    placeholder="Phone"
                    className="col-span-1 sm:col-span-2 rounded-lg sm:rounded-xl border-[#BD9153]/20 focus:ring-[#BD9153] times bg-white/50"
                    errorMessage={errors.phone?.message}
                    size="sm"
                  />
                </form>
              )}
            </div>

            {/* Payment Section */}
            <div className="bg-white/90 rounded-2xl sm:rounded-3xl shadow-xl border border-[#BD9153]/10 backdrop-blur-sm p-5 sm:p-8">
              <h3 className="text-xl sm:text-2xl trajan font-semibold text-gray-800 tracking-wide mb-4 sm:mb-6">Payment</h3>
              <p className="text-gray-600 times italic mb-4 text-sm sm:text-base">All transactions are secure and encrypted</p>
              <div className="border border-[#BD9153]/20 rounded-lg sm:rounded-xl p-4 sm:p-6 bg-[#f8f5f0]">
                <p className="text-gray-800 font-medium times mb-4 text-sm sm:text-base">Razorpay (UPI, Cards, Wallets, Netbanking)</p>
                <div className="flex items-center justify-center h-24 sm:h-32 border border-[#BD9153]/20 rounded-lg sm:rounded-xl bg-white/50">
                  <div className="text-center">
                    <span className="block text-gray-500 times text-xs sm:text-sm mb-2">Secure Payment Gateway</span>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 border border-[#BD9153] rounded-full inline-block bg-[#BD9153]/10"></div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 times italic mt-4">
                  Redirected to Razorpay Secure for a seamless checkout experience.
                </p>
              </div>
              <Button
                onClick={handleSubmit(onAddressSubmit)}
                disabled={!isMinOrderMet}
                className={`w-full mt-5 sm:mt-6 py-2 sm:py-3 rounded-lg sm:rounded-xl times uppercase tracking-wider transition-all duration-300 shadow-md text-sm sm:text-base ${
                  isMinOrderMet 
                    ? 'bg-[#BD9153] text-white hover:bg-[#d5b27c]' 
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                {isMinOrderMet ? 'Pay Now' : `Min. Order: ₹${minOrderValue}`}
              </Button>
            </div>
          </motion.div>

          {/* Order Summary Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-1/3 bg-white/90 rounded-2xl sm:rounded-3xl shadow-xl border border-[#BD9153]/10 backdrop-blur-sm p-5 sm:p-8 mt-8 lg:mt-0"
          >
            <h3 className="text-xl sm:text-2xl trajan font-semibold text-gray-800 tracking-wide mb-4 sm:mb-6">Order Summary</h3>
            <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6 max-h-[300px] overflow-y-auto custom-scrollbar">
              {products.map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-[#f8f5f0] rounded-lg sm:rounded-xl"
                >
                  <Image
                    alt={item.productName}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border border-[#BD9153]/20"
                    src={item.productPic}
                  />
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm times font-semibold text-gray-800">{item.productName}</p>
                    <div className="flex justify-between text-xs sm:text-sm times text-gray-600">
                      <span>₹{item.productPrice} x {item.productQuantity}</span>
                      <span className="text-[#BD9153] font-medium">₹{item.productPrice * item.productQuantity}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-4 mb-5 sm:mb-6">
              <Input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Discount Code"
                className="flex-grow rounded-lg sm:rounded-xl border-[#BD9153]/20 focus:ring-[#BD9153] times bg-white/50"
                size="sm"
              />
              <Button
                onClick={handleCouponSubmit}
                className="bg-[#BD9153] text-white rounded-lg sm:rounded-xl px-3 sm:px-6 py-1 sm:py-2 times uppercase tracking-wider hover:bg-[#d5b27c] transition-all duration-300 text-xs sm:text-sm whitespace-nowrap"
              >
                Apply
              </Button>
            </div>

            {error && (
              <div className="text-red-500 text-xs sm:text-sm times italic mb-3 sm:mb-4">{error}</div>
            )}

            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between text-xs sm:text-sm times">
                <span>Subtotal ({products.length} Items)</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-xs sm:text-sm text-green-600 times">
                  <span>Discount ({discount}%)</span>
                  <span>-₹{(subtotal * (discount / 100)).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs sm:text-sm times">
                <span>Shipping</span>
                <span>{useSavedAddress && selectedAddress ? '₹50.00' : 'Pending'}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-lg font-semibold times border-t border-[#BD9153]/20 pt-2 sm:pt-3 mt-2 sm:mt-3">
                <span>Total</span>
                <span className="text-[#BD9153]">₹{Number(total.toFixed(2)) + Number((total * 0.05).toFixed(2))}</span>
              </div>
              <p className="text-xs text-gray-600 times italic">Includes ₹{(total * 0.05).toFixed(2)} in taxes</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;