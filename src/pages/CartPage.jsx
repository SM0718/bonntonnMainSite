import React, { useState, useEffect } from "react";
import { Checkbox, Button, Textarea, Input } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { NavLink, useNavigate } from "react-router-dom";
import useStore from "@/store/store";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";

const CartPage = () => {
  const [cartData, setCartData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [updatingProductId, setUpdatingProductId] = useState(null);
  const [hasNote, setHasNote] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const updateCartStatus = useStore(state => state.updateCartStatus);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://bonnbackend.up.railway.app/api/v1/cart/get-user-cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.statusCode === 200) {
        setCartData(data.data);
        const total = data.data.reduce(
          (acc, item) => acc + item.productPrice * item.productQuantity,
          0
        );
        setSubtotal(total);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setIsLoading(false);
      setUpdatingProductId(null);
    }
  };

  const updateQuantity = async (cartId, productId, newQuantity) => {
    setUpdatingProductId(productId);
    try {
      const response = await fetch(
        "https://bonnbackend.up.railway.app/api/v1/cart/update-cart",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ cartId, productQuantity: newQuantity }),
        }
      );

      const data = await response.json();
      if (data.statusCode === 200) {
        await fetchCartData();
      } else {
        console.error("Error updating quantity:", data.message);
        setUpdatingProductId(null);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      setUpdatingProductId(null);
    }
  };

  const handleIncrement = (cartId, productId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    updateQuantity(cartId, productId, newQuantity);
  };

  const handleDecrement = (cartId, productId, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      updateQuantity(cartId, productId, newQuantity);
    }
  };

  const handleNoteChange = (e) => {
    const value = e.target.value;
    setNote(value);
    if (value && !hasNote) {
      setSubtotal((prev) => prev + 30);
      setHasNote(true);
    } else if (!value && hasNote) {
      setSubtotal((prev) => prev - 30);
      setHasNote(false);
    }
  };

  const handleDeleteProduct = async (cartId) => {
    try {
      const response = await fetch(
        `https://bonnbackend.up.railway.app/api/v1/cart/remove-from-cart?cartId=${cartId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.statusCode === 200) {
        updateCartStatus();
        setCartData((prevData) => prevData.filter((item) => item._id !== cartId));
        const updatedSubtotal = cartData.reduce(
          (acc, item) => item._id !== cartId ? acc + item.productPrice * item.productQuantity : acc,
          0
        );
        setSubtotal(updatedSubtotal);
        toast.success("Item removed from cart", { position: "top-right" });
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong while deleting the product.");
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#faf9f6]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BD9153]"
        />
      </div>
    );
  }

  if (!cartData.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#faf9f6] p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center bg-white/90 rounded-3xl shadow-xl p-6 sm:p-10 border border-[#BD9153]/10 backdrop-blur-sm w-full max-w-md"
        >
          <h3 className="text-2xl sm:text-3xl trajan font-bold text-gray-800 tracking-wide mb-4">Your Cart is Empty</h3>
          <p className="text-gray-600 times italic mb-6">Add some delicious items to get started!</p>
          <Button 
            onClick={() => navigate("/")}
            className="bg-[#BD9153] text-white rounded-xl px-4 sm:px-6 py-2 sm:py-3 times uppercase tracking-wider hover:bg-[#d5b27c] transition-all duration-300 shadow-md"
          >
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  // Mobile cart items display when screen is too small for table
  const MobileCartItems = () => (
    <div className="space-y-6 lg:hidden">
      {cartData.map((item) => (
        <motion.div 
          key={item._id}
          className="bg-white/95 rounded-2xl shadow-md p-4 border border-[#BD9153]/10"
        >
          <div className="flex items-center gap-3">
            <motion.img
              src={item.productPic}
              alt={item.productName}
              className="w-16 h-16 object-cover rounded-xl border border-[#BD9153]/20"
              whileHover={{ scale: 1.05 }}
            />
            <div className="flex-1">
              <NavLink to={`/product-page/${item.productId}`}>
                <span className="text-sm sm:text-base times text-gray-800 font-medium hover:text-[#BD9153] transition-colors duration-300">
                  {item.productName}
                </span>
              </NavLink>
              <p className="text-sm times text-[#BD9153] font-semibold mt-1">
                ₹{item.productPrice} per item
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="min-w-8 h-8 bg-[#BD9153] text-white rounded-full hover:bg-[#d5b27c] transition-all duration-300"
                onClick={() => handleDecrement(item._id, item.productId, item.productQuantity)}
                isDisabled={updatingProductId === item.productId}
                isIconOnly
              >
                -
              </Button>
              <Input
                type="number"
                value={item.productQuantity}
                readOnly
                className="w-12 text-center border border-[#BD9153]/20 rounded-xl bg-white/50"
                size="sm"
                classNames={{
                  input: ["text-center text-base", "[appearance:textfield]", "[&::-webkit-outer-spin-button]:appearance-none", "[&::-webkit-inner-spin-button]:appearance-none"],
                  inputWrapper: "h-8 min-w-[3rem]",
                }}
                min={1}
              />
              <Button
                size="sm"
                className="min-w-8 h-8 bg-[#BD9153] text-white rounded-full hover:bg-[#d5b27c] transition-all duration-300"
                onClick={() => handleIncrement(item._id, item.productId, item.productQuantity)}
                isDisabled={updatingProductId === item.productId}
                isIconOnly
              >
                +
              </Button>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-base times font-semibold text-[#BD9153]">
                ₹{item.productQuantity * item.productPrice}
              </span>
              <button
                className="text-xs text-gray-600 times italic cursor-pointer hover:text-[#BD9153] transition-colors duration-300 mt-1"
                onClick={() => handleDeleteProduct(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#faf9f6] p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl trajan font-bold text-gray-800 tracking-wide">Your Cart</h2>
          <div className="w-16 sm:w-24 h-1 bg-[#BD9153] rounded-full mt-3 sm:mt-4"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
          {/* Cart Table for large screens and mobile display for smaller screens */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-3/4"
          >
            {/* Mobile view */}
            <MobileCartItems />
            
            {/* Desktop table view */}
            <div className="hidden lg:block bg-white/90 rounded-3xl shadow-xl border border-[#BD9153]/10 backdrop-blur-sm overflow-hidden">
              <Table
                aria-label="Cart Table"
                className="text-sm md:text-base times"
                css={{ height: "auto", minWidth: "100%" }}
              >
                <TableHeader>
                  <TableColumn className="text-[#BD9153] font-semibold trajan bg-[#f8f5f0] py-4">Product</TableColumn>
                  <TableColumn className="text-[#BD9153] font-semibold trajan bg-[#f8f5f0] py-4">Quantity</TableColumn>
                  <TableColumn className="text-[#BD9153] font-semibold trajan bg-[#f8f5f0] py-4">Price</TableColumn>
                </TableHeader>
                <TableBody>
                  {cartData.map((item) => (
                    <TableRow key={item._id} className="hover:bg-[#f8f5f0] transition-all duration-300">
                      <TableCell>
                        <div className="flex items-center gap-4 py-4">
                          <motion.img
                            src={item.productPic}
                            alt={`${item.productName}`}
                            className="w-20 h-20 object-cover rounded-xl border border-[#BD9153]/20"
                            whileHover={{ scale: 1.05 }}
                          />
                          <NavLink to={`/product-page/${item.productId}`}>
                            <span className="text-base times text-gray-800 font-medium hover:text-[#BD9153] transition-colors duration-300">
                              {item.productName}
                            </span>
                          </NavLink>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col items-start gap-2 py-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              className="min-w-8 h-8 bg-[#BD9153] text-white rounded-full hover:bg-[#d5b27c] transition-all duration-300"
                              onClick={() => handleDecrement(item._id, item.productId, item.productQuantity)}
                              isDisabled={updatingProductId === item.productId}
                              isIconOnly
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              value={item.productQuantity}
                              readOnly
                              className="w-16 text-center border border-[#BD9153]/20 rounded-xl bg-white/50"
                              size="sm"
                              classNames={{
                                input: ["text-center text-base", "[appearance:textfield]", "[&::-webkit-outer-spin-button]:appearance-none", "[&::-webkit-inner-spin-button]:appearance-none"],
                                inputWrapper: "h-8 min-w-[3rem]",
                              }}
                              min={1}
                            />
                            <Button
                              size="sm"
                              className="min-w-8 h-8 bg-[#BD9153] text-white rounded-full hover:bg-[#d5b27c] transition-all duration-300"
                              onClick={() => handleIncrement(item._id, item.productId, item.productQuantity)}
                              isDisabled={updatingProductId === item.productId}
                              isIconOnly
                            >
                              +
                            </Button>
                          </div>
                          <p
                            className="text-xs text-gray-600 times italic cursor-pointer hover:text-[#BD9153] transition-colors duration-300"
                            onClick={() => handleDeleteProduct(item._id)}
                          >
                            Remove
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-base times text-[#BD9153] font-semibold py-4">
                        ₹{item.productQuantity * item.productPrice}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>

          {/* Summary Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-1/4 bg-white/90 rounded-3xl shadow-xl border border-[#BD9153]/10 backdrop-blur-sm p-5 sm:p-6 flex flex-col gap-4 sm:gap-6 mt-6 lg:mt-0"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg trajan font-semibold text-gray-800">Subtotal</span>
              <span className="text-lg times font-bold text-[#BD9153]">₹{subtotal}</span>
            </div>
            <Textarea
              fullWidth
              placeholder="Add Order Notes (e.g., special instructions)"
              rows="3"
              value={note}
              onChange={(e) => handleNoteChange(e)}
              className="text-sm times border-[#BD9153]/20 rounded-xl bg-white/50 focus:ring-[#BD9153] shadow-inner"
            />
            <p className="text-xs times text-gray-600 italic">* Adding a note increases the total by ₹30</p>
            <div className="flex items-start gap-2 text-xs sm:text-sm times text-gray-700">
              <Checkbox 
                size="sm" 
                color="warning" 
                onChange={handleCheckboxChange}
                checked={isChecked}
                className="text-[#BD9153]"
              />
              <span>I agree to the Terms and Conditions, Shipping, and Return Policy</span>
            </div>
            <Button
              className="bg-[#BD9153] text-white rounded-xl py-2 sm:py-3 times uppercase tracking-wider hover:bg-[#d5b27c] transition-all duration-300 shadow-md text-sm sm:text-base"
              onClick={() => {
                isChecked ? navigate("/checkout") : toast.info("Please agree to Terms and Conditions to proceed", { position: "top-right" });
              }}
            >
              Proceed to Checkout
            </Button>
            <Button
              onClick={() => navigate("/")}
              className="bg-transparent border-2 border-[#BD9153] text-[#BD9153] rounded-xl py-2 sm:py-3 times uppercase tracking-wider hover:bg-[#BD9153]/10 transition-all duration-300 text-sm sm:text-base"
            >
              Continue Shopping
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;