import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { X, Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { Spinner, Button, Card } from '@nextui-org/react';
import { motion, AnimatePresence } from 'framer-motion';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    try {
      setError(null);
      const request = await fetch('https://bonnbackend.up.railway.app/api/v1/wishlists/get-wishlist', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (request.ok) {
        const response = await request.json();
        setWishlist(response.data);
      } else {
        const errorData = await request.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch wishlist');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message || 'An error occurred while fetching your wishlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleMouseEnter = (itemId) => {
    setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const deleteFromWishlist = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDeleting) return;

    const updatedWishlist = wishlist.filter((item) => item._id !== id);
    setWishlist(updatedWishlist);

    try {
      setIsDeleting(true);
      const endpoint = `https://bonnbackend.up.railway.app/api/v1/wishlists/delete-from-wishlist?productId=${id}`;

      const request = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (request.ok) {
        toast.success('Product Removed From Wishlist', {
          position: 'top-right',
          autoClose: 1000,
          theme: 'dark',
        });
      } else {
        throw new Error('Failed to delete item from wishlist');
      }
    } catch (error) {
      console.error('Error deleting from wishlist:', error);
      toast.error('Failed to remove product from wishlist', {
        position: 'top-right',
        autoClose: 1000,
        theme: 'dark',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const addToCart = async (data) => {
    if (!data.boxType) {
      toast.info("Please select a box type before adding to cart!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const request = await fetch("https://bonnbackend.up.railway.app/api/v1/cart/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          productId: data.productId,
          variantId: data.selectedVariant._id,
          productPic: data.selectedVariant.variantPic_1,
          productName: data.selectedVariant.variantName,
          productQuantity: data.quantity,
          productPrice: data.selectedVariant.variantPrice,
          boxType: data.boxSize.find((box) => box.boxId === data.boxType)?.boxType,
        }),
      });

      const responseData = await request.json();

      if (responseData.statusCode === 200) {
        toast.success("Product Added To Cart", {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: item.productDetails._id,
      selectedVariant: item.productDetails.variant[0],
      quantity: 1,
      boxSize: item.productDetails.boxSize,
      boxType: item.productDetails.boxSize[0]?.boxId,
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-[#faf9f6] to-[#f5f2eb] p-6">
        <div className="relative">
          <Spinner size="lg" className="text-[#BD9153]" />
          <div className="absolute inset-0 animate-pulse bg-[#BD9153]/10 rounded-full blur-xl"></div>
        </div>
        <p className="text-gray-600 text-lg times italic mt-8 tracking-wide">Curating your treasures...</p>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-[#faf9f6] to-[#f5f2eb] p-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-[#BD9153]/5 -skew-y-6 transform-gpu"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center bg-white/90 rounded-3xl shadow-xl p-10 border border-[#BD9153]/20 backdrop-blur-md max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto mb-6 p-4 rounded-full bg-[#BD9153]/10 w-24 h-24 flex items-center justify-center"
          >
            <Heart size={48} className="text-[#BD9153]" />
          </motion.div>
          
          <h3 className="text-2xl md:text-3xl trajan font-bold text-gray-800 tracking-wide mb-4">Your Wishlist Awaits</h3>
          <p className="text-gray-600 times italic mb-8 leading-relaxed">Begin your collection journey by adding items that captivate your interest</p>
          
          <Button 
            onClick={() => navigate('/')} 
            className="bg-[#BD9153] text-white rounded-xl px-8 py-5 times uppercase tracking-wider hover:bg-[#d5b27c] transition-all duration-300 shadow-lg group overflow-hidden relative"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
            <span className="relative flex items-center gap-2">
              <ShoppingBag size={18} />
              <span>Explore Collection</span>
            </span>
          </Button>
        </motion.div>
        
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#BD9153]/5 rounded-full -translate-x-1/2 translate-y-1/2"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#faf9f6] to-[#f5f2eb] p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-[#BD9153]/5 -skew-y-6 transform-gpu"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#BD9153]/5 rounded-full -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Button 
            onClick={() => navigate('/')} 
            className="mb-6 px-4 py-2 text-[#BD9153] bg-transparent flex items-center gap-2 hover:bg-[#BD9153]/10 transition-all duration-300 rounded-lg"
            size="sm"
          >
            <ArrowLeft size={16} />
            <span className="times italic">Back to shopping</span>
          </Button>
          
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-3 rounded-full bg-[#BD9153]/10 flex items-center justify-center"
            >
              <Heart size={24} className="text-[#BD9153]" />
            </motion.div>
            <h2 className="text-4xl trajan font-bold text-gray-800 tracking-wide">Your Curated Wishlist</h2>
          </div>
          <div className="w-32 h-1 bg-[#BD9153] rounded-full mt-4 ml-14"></div>
          <p className="text-gray-600 times italic mt-4 ml-14">Treasures awaiting their moment</p>
        </motion.div>

        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {wishlist.map((item, index) => {
              const variant = item.productDetails.variant[0];
              const isHovered = hoveredItem === item._id;

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <NavLink 
                    to={`/product-page/${item.productDetails._id}`}
                    className="block"
                  >
                    <motion.div 
                      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(189, 145, 83, 0.1), 0 10px 10px -5px rgba(189, 145, 83, 0.04)" }}
                      className="relative rounded-3xl bg-white/95 border border-[#BD9153]/10 overflow-hidden transition-all duration-500 hover:border-[#BD9153]/30 h-[450px] flex flex-col group"
                      onMouseEnter={() => handleMouseEnter(item._id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Image Section with overlay */}
                      <div className="relative h-64 w-full bg-gradient-to-b from-[#f8f5f0] to-white overflow-hidden">
                        <motion.img
                          src={isHovered ? variant.variantPic_2 : variant.variantPic_1}
                          alt={variant.variantName}
                          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                          animate={{ scale: isHovered ? 1.08 : 1 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Remove button with animation */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-3 right-3"
                        >
                          <Button
                            onClick={(e) => deleteFromWishlist(e, item._id)}
                            isIconOnly
                            className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-[#BD9153]/20 transition-all duration-300 shadow-lg"
                            size="sm"
                            disabled={isDeleting}
                          >
                            <X size={16} className="text-[#BD9153]" />
                          </Button>
                        </motion.div>
                        
                        {/* Price tag */}
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm py-1 px-3 rounded-full shadow-md">
                          <p className="text-[#BD9153] font-semibold times">₹{variant.variantPrice}</p>
                        </div>
                      </div>

                      {/* Info Section */}
                      <div className="p-6 flex flex-col flex-1 justify-between">
                        <div>
                          <h3 className="text-lg trajan font-medium text-gray-800 tracking-wide">{variant.variantName}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="w-3 h-3 rounded-full bg-[#BD9153]/30"></div>
                            <p className="text-sm text-gray-600 times italic">{variant.foodType}</p>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={(e) => handleClick(e, item)} 
                          className="mt-6 w-full bg-transparent border border-[#BD9153] text-[#BD9153] hover:bg-[#BD9153] hover:text-white rounded-xl py-3 times uppercase tracking-wider transition-all duration-500 group relative overflow-hidden"
                        >
                          <span className="absolute inset-0 w-full h-full bg-[#BD9153]/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                          <span className="relative flex items-center justify-center gap-2">
                            <ShoppingBag size={16} className="group-hover:scale-110 transition-transform duration-300" />
                            <span>Add To Cart</span>
                          </span>
                        </Button>
                      </div>
                    </motion.div>
                  </NavLink>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wishlist;