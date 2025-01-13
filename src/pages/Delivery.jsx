import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import { toast } from 'react-toastify';

const Delivery = () => {
  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountedValue, setDiscountedValue] = useState(0)
  const [minOrderValue, setMinOrderValue] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const token = localStorage.getItem("accessToken");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, addressResponse] = await Promise.all([
          fetch(
            "https://bonnbackend.up.railway.app/api/v1/cart/get-user-cart",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            }
          ),
          fetch('https://bonnbackend.up.railway.app/api/v1/address/get-address', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }),
        ]);

        if (!productsResponse.ok || !addressResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const productsData = await productsResponse.json();
        const addressInfo = await addressResponse.json();
        // const configData = await configResponse.json();

        console.log(productsData, addressInfo)
        setProducts(productsData.data || []);
        setAddress(addressInfo.data || []);
        setMinOrderValue(configData.minOrderValue || 0);
        setLoading(false);
      } catch (err) {
        setError('Failed to load order details');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateSubtotal = () => {
    if(discount > 0) {
      return products.reduce((sum, product) => {
        const discount = product.productPrice * (product.productDiscount || 0) / 100;
        const discountedPrice = product.productPrice - discount;
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
    return subtotal - discount + shipping;
  };

  const handleCouponSubmit = async () => {
    if (!couponCode.trim()) {
      toast.info('Please enter a coupon code');
      return;
    }
    console.log(couponCode)
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
        toast.info('Failed to validate coupon');
      }

      const data = await response.json();
      setDiscount(data.data.code.discountPercentage)
      calculateSubtotal()
    } catch (err) {
      setError('Failed to validate coupon');
    }
  };


//2431

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
    }
  };

  const handleAddressChange = (id) => {
    const selectedLoc = address.find(item => id === item._id);
    setSelectedAddress(selectedLoc);
    setError('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  const subtotal = calculateSubtotal();
  const total = calculateTotal();
  const isMinOrderMet = subtotal >= minOrderValue;

  return (
    <div className="flex flex-col lg:flex-row justify-evenly p-8 bg-gray-50">
      <div className="flex flex-col gap-4">
        {/* Delivery Section */}
        <div className="w-full bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 trajan">Delivery</h2>
          
          <div className="mb-6">
            <div className="flex gap-4 items-center times">
              <label className="flex items-center gap-2">
                <input
                  className="times"
                  type="radio"
                  checked={useSavedAddress}
                  onChange={() => setUseSavedAddress(true)}
                />
                Use Saved Address
              </label>
              <label className="flex items-center gap-2">
                <input
                  className="times"
                  type="radio"
                  checked={!useSavedAddress}
                  onChange={() => {
                    setUseSavedAddress(false);
                    setSelectedAddress(null);
                  }}
                />
                Enter New Address
              </label>
            </div>
          </div>

          {useSavedAddress ? (
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2 times">Select an Address:</h3>
              <div className="flex flex-col gap-2 times">
                {address.map((info) => (
                  <label
                    key={info._id}
                    className="flex items-center gap-2 p-2 border border-gray-300 rounded-md cursor-pointer"
                  >
                    <input
                      
                      type="radio"
                      name="savedAddress"
                      value={info._id}
                      checked={selectedAddress && selectedAddress._id === info._id}
                      onChange={() => handleAddressChange(info._id)}
                    />
                    {info.houseName}, {info.houseNumber} PIN:- {info.pincode}, {info.phone}
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onAddressSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    {...register("firstName", { required: "First name is required" })}
                    type="text"
                    placeholder="First Name"
                    className="w-full bg-white border times border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-sm">{errors.firstName.message}</span>
                  )}
                </div>
                <div>
                  <input
                    {...register("lastName", { required: "Last name is required" })}
                    type="text"
                    placeholder="Last Name"
                    className="w-full bg-white border times border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-sm">{errors.lastName.message}</span>
                  )}
                </div>
              </div>
              <input
                {...register("apartment")}
                type="text"
                placeholder="Apartment, Suite, Etc (Optional)"
                className="w-full bg-white border times border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <input
                    {...register("city", { required: "City is required" })}
                    type="text"
                    placeholder="City"
                    className="w-full bg-white border times border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                  {errors.city && (
                    <span className="text-red-500 text-sm">{errors.city.message}</span>
                  )}
                </div>
                <div>
                  <input
                    {...register("state", { required: "State is required" })}
                    type="text"
                    placeholder="State"
                    className="w-full bg-white border times border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                  {errors.state && (
                    <span className="text-red-500 text-sm">{errors.state.message}</span>
                  )}
                </div>
                <div>
                  <input
                    {...register("pinCode", { 
                      required: "PIN Code is required",
                      pattern: {
                        value: /^\d{6}$/,
                        message: "Invalid PIN Code"
                      }
                    })}
                    type="text"
                    placeholder="PIN Code"
                    className="w-full bg-white border times border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                  {errors.pinCode && (
                    <span className="text-red-500 text-sm">{errors.pinCode.message}</span>
                  )}
                </div>
              </div>
              <div>
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Invalid phone number"
                    }
                  })}
                  type="text"
                  placeholder="Phone"
                  className="w-full bg-white border times border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">{errors.phone.message}</span>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Payment Section */}
        <div className="w-full bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 trajan">Payment</h2>
          <p className="text-gray-600 mb-4 times">All transactions are secure and encrypted</p>
          <div className="border border-gray-300 rounded-md p-4 mb-6">
            <p className="text-gray-800 font-medium mb-4 times">Razorpay (UPI, Cards, Wallets, Netbanking)</p>
            <div className="flex items-center justify-center h-32 border border-gray-300 rounded-md">
              <div className="text-center">
                <div className="mb-2">
                  <span className="block text-gray-500 text-sm">...</span>
                </div>
                <div className="w-8 h-8 border border-gray-500 rounded-full inline-block"></div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4 times">
              After clicking "Pay Now", you will be redirected to Razorpay Secure to complete your purchase securely.
            </p>
          </div>
          <button
            onClick={handleSubmit(onAddressSubmit)}
            disabled={!isMinOrderMet}
            className={`w-full py-2 rounded-md transition duration-500 times ${
              isMinOrderMet 
                ? 'bg-[#CE0067] text-white hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
          >
            {isMinOrderMet ? 'PAY NOW' : `Minimum order value: ₹${minOrderValue}`}
          </button>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="w-full lg:w-1/3 bg-white p-6 shadow-md rounded-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 trajan">Order Summary</h2>

        <div className="flex flex-col gap-4 mb-4">
      {products.map((item, index) => (
        /* eslint-disable no-console */
        <Card 
          key={item._id} 
          isPressable 
          shadow="sm"
          className="flex flex-row items-center p-2 gap-4"
        >
          <Image
            alt={item.productName}
            className="object-cover w-[50px] h-[50px] rounded-lg"
            radius="lg"
            shadow="sm"
            src={item.productPic}
          />
          <div className="flex flex-col justify-between flex-1">
            <CardBody className="p-0">
              <b className="text-sm times">{item.productName}</b>
            </CardBody>
            <CardFooter className="p-0 flex justify-between">
              <span className='flex times gap-4'>
                <p className="text-default-500 font-medium">₹{item.productPrice}</p>
                <p className="text-default-500 font-medium">{item.productQuantity} Pieces</p>
              </span>
              <span className="font-medium times">₹{item.productPrice * item.productQuantity}</span>
            </CardFooter>
          </div>
        </Card>

      ))}
    </div>
        
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Discount Code"
            className="flex-grow bg-white border times border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
          <button
            onClick={handleCouponSubmit}
            className="bg-[#CE0067] w-1/3 mr-auto times text-white py-2 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]"
          >
            Apply
          </button>
        </div>
        {error && (
          <div className="text-red-500 text-sm mb-4 times">{error}</div>
        )}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className='times'>Subtotal ({products.length} Items)</span>
            <span className="font-medium times">₹{subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between mb-2 text-green-600">
              <span className='times'>Discount</span>
              <span className='times'>-₹{discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between mb-2">
            <span className='times'>Shipping</span>
            <span className='times'>{useSavedAddress && selectedAddress ? '₹50.00' : 'Enter shipping address'}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span className='times'>Total</span>
            <span className='times'>INR ₹{Number(total.toFixed(2)) + Number((total * 0.05).toFixed(2))}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2 times">Includes ₹{(total * 0.05).toFixed(2)} in taxes</p>
        </div>
      </div>
    </div>
  );
};

export default Delivery;