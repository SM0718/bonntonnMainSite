import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Image, Select, SelectItem, Input, Button } from "@nextui-org/react";
import { Spinner, Card } from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Heart, ChevronDown, ChevronUp, Plus, Minus, ShoppingBag } from "lucide-react";
import Options from "./Options";
import Tick from "@/svg/Tick";
import Cross from "@/svg/Cross";
import useStore from "@/store/store";
import { useForm } from "react-hook-form";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBox, setSelectedBox] = useState("");
  const [selected, setSelected] = useState("");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isBoxDropdownOpen, setIsBoxDropdownOpen] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const updateCartStatus = useStore(state => state.updateCartStatus);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      variant: "",
      boxType: "",
      quantity: 1,
    },
  });

  // Check if product is in wishlist
  const checkWishlistStatus = async () => {
    try {
      const response = await fetch(`https://bonnbackend.up.railway.app/api/v1/wishlists/check-product-in-wishlist?productId=${productId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        if(data.statusCode === 200) {
          setIsInWishlist(data.data._id);
        } else {
          setIsInWishlist(false);
        }
      } else {
        setIsInWishlist(false);
      }
    } catch (error) {
      console.error("Error checking wishlist status:", error);
      setIsInWishlist(false);
    }
  };

  const getProduct = async () => {
    try {
      const response = await fetch(`https://bonnbackend.up.railway.app/api/v1/products/product?productId=${productId}`, {
        method: "GET"
      });
      
      const data = await response.json();
      if (response.status === 201) {
        setProduct(data?.data);
        const defaultVariant = data?.data?.variant?.[0];
        setSelectedVariant(defaultVariant);
        setSelectedImage(defaultVariant?.variantPic_1);
      } else {
        console.error(data?.message || "Failed to fetch product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
    checkWishlistStatus();
  }, [productId]);

  const handleVariantChange = (variant) => {
    setValue("variant", variant)
    setSelectedVariant(variant);
    setSelectedImage(variant?.variantPic_1);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const toggleWishlist = async(id) => {
    try {
      const user = await getCurrentUser()
      if(user.statusCode === 200) {
        const endpoint = isInWishlist 
          ? `https://bonnbackend.up.railway.app/api/v1/wishlists/delete-from-wishlist?productId=${id}`
          : `https://bonnbackend.up.railway.app/api/v1/wishlists/add-to-wishlist?productId=${id}`;
        
        const request = await fetch(endpoint, {
          method: isInWishlist ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if(request.ok) {
          const data = await request.json();
          if(data.statusCode === 201 || data.statusCode === 200) {
            if (isInWishlist) {
              toast.info("Product Removed From Wishlist", {
                position: "top-right",
                autoClose: 1000,
                theme: "dark",
              });
              setIsInWishlist(false);
            } else {
              toast.success("Product Added To Wishlist", {
                position: "top-right",
                autoClose: 1000,
                theme: "dark",
              });
              setIsInWishlist(data.data._id);
            }
          }
        }
      } else {
        toast.info("Login Required", {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
        });
        navigate("/login")
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  const LoadingState = () => {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Card className="p-8 flex flex-col items-center gap-4 bg-white/10 backdrop-blur-md shadow-xl">
          <Spinner 
            size="lg"
            color="warning"
            labelColor="warning"
          />
          <p className="text-base text-default-600 trajan tracking-wide">Loading Exquisite Product...</p>
        </Card>
      </div>
    );
  };

  if (!product) return <div className="h-screen w-full flex flex-col justify-center">
    <LoadingState /> </div>;

  const {
    boxSize,
    storage,
    allergens,
    ingredients,
    size,
    tags,
    allIndiaDelivery,
  } = product;

  const decrement = () => {
    if (quantity > 1) {
      setValue("quantity", Math.max(quantity - 1, 1))
      setQuantity(quantity - 1);
    } 
  };

  const increment = () => {
    setValue("quantity", Math.max(quantity + 1, 1))
    setQuantity(quantity + 1);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  const handleSelect = (box) => {
    setValue("boxType", box.boxId)
    setSelectedBox(box.boxId);
    setIsBoxDropdownOpen(false);
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
          productId: productId,
          variantId: selectedVariant._id,
          productPic: selectedVariant.variantPic_1,
          productName: selectedVariant.variantName,
          productQuantity: data.quantity,
          productPrice: selectedVariant.variantPrice,
          boxType: boxSize.find((box) => box.boxId === data.boxType)?.boxType,
        }),
      });
  
        const responseData = await request.json();

        if(responseData.statusCode === 200) {
          updateCartStatus();
          toast.success("Product Added To Cart", {
              position: "top-right",
              autoClose: 1000,
              theme: "dark",
            });
        }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16 bg-white">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 font-light times">
        <span className="hover:text-[#BD9153] cursor-pointer transition-colors">Home</span> / 
        <span className="hover:text-[#BD9153] cursor-pointer transition-colors"> Collection</span> / 
        <span className="text-[#BD9153]"> {selectedVariant?.variantName || "Product"}</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Images */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col gap-4 lg:sticky lg:top-24 self-start"
        >
          <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow-lg group">
            <motion.img
              src={selectedImage || "/api/placeholder/600/600"}
              alt={selectedVariant?.variantName || "Product"}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              key={isInWishlist ? isInWishlist : product._id}
              className="p-3 absolute top-4 right-4 z-50 bg-white/90 shadow-lg rounded-full transition-colors duration-300 hover:bg-pink-50"
              onClick={() => toggleWishlist(isInWishlist ? isInWishlist : product._id)}
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                size={24}
                className={`transition-colors duration-300 ${
                  isInWishlist
                    ? "fill-[#BD9153] stroke-[#BD9153]"
                    : "stroke-[#BD9153] fill-transparent"
                }`}
              />
            </motion.button>
            
            {/* Elegant badge */}
            {tags && tags.length > 0 && (
              <div className="absolute top-4 left-4 bg-[#BD9153]/90 text-white px-4 py-1 rounded-full text-xs uppercase tracking-wider font-medium">
                {tags[0]}
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[selectedVariant?.variantPic_1, selectedVariant?.variantPic_2, selectedVariant?.variantPic_3, selectedVariant?.variantPic_4].map(
              (src, index) =>
                src && (
                  <motion.div
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    key={index}
                    className={`${
                      selectedImage === src ? "ring-2 ring-[#BD9153] shadow-md" : "ring-1 ring-gray-200"
                    } aspect-square w-full cursor-pointer rounded-lg overflow-hidden`}
                    onClick={() => handleImageClick(src)}
                  >
                    <img
                      src={src}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    />
                  </motion.div>
                )
            )}
          </div>
        </motion.div>

        {/* Product Information */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-4 border-b border-gray-100 pb-6">
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold trajan text-gray-800 tracking-wide">{selectedVariant?.variantName || "Product"}</h1>
              
              <div className="flex items-center gap-3 mt-4">
                <p className="text-xl text-[#BD9153] font-semibold times">
                ₹{selectedVariant?.variantPrice || 0}
                </p>
                
                {/* Faux discount for visual appeal */}
                <p className="line-through text-gray-400 text-sm times">
                ₹{Math.round(selectedVariant?.variantPrice * 1.2 || 0)}
                </p>
                
                <span className="bg-[#BD9153]/10 text-[#BD9153] text-xs font-medium px-2 py-1 rounded-full ml-2">
                  20% OFF
                </span>
              </div>
              
              <p className="text-gray-600 mt-4 italic times">
                {tags?.join(" • ") || "No Tags Available"}
              </p>
            </div>
            
            {/* Brief description */}
            <p className="text-gray-600 times leading-relaxed">
              {selectedVariant?.variantDesc?.split('.')[0]}. {/* Display just the first sentence */}
            </p>
          </div>

          <form onSubmit={handleSubmit(addToCart)} className="flex flex-col gap-8">
            {/* Variant Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold mb-2 times tracking-wide text-gray-700 uppercase">Variant Selection</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.variant?.map((variant, index) => (
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    key={index}
                    className={`px-4 py-3 rounded-lg times text-sm transition-all duration-300 ${
                      selectedVariant === variant 
                        ? "bg-[#BD9153] text-white shadow-md" 
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                    onClick={() => handleVariantChange(variant)}
                  >
                    {variant.variantName}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Box Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold mb-2 times tracking-wide text-gray-700 uppercase">Packaging Options</label>
              <div className="relative">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setIsBoxDropdownOpen(!isBoxDropdownOpen)}
                  className="w-full px-4 py-3 bg-gray-100 text-left rounded-lg flex justify-between items-center hover:bg-gray-200 transition-all duration-300"
                >
                  <span className="times text-gray-800">
                    {selectedBox
                      ? boxSize.find((box) => box.boxId === selectedBox)?.boxType
                      : "Select Packaging"}
                  </span>
                  {isBoxDropdownOpen ? (
                    <ChevronUp size={18} className="text-gray-600" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-600" />
                  )}
                </motion.button>
                
                {isBoxDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 top-full left-0 mt-1 w-full bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
                  >
                    {boxSize.map((box) => (
                      <div 
                        key={box.boxId}
                        onClick={() => handleSelect(box)}
                        className={`px-4 py-3 flex justify-between times cursor-pointer transition-colors duration-200 hover:bg-gray-50 ${
                          selectedBox === box.boxId ? "bg-[#BD9153]/10" : ""
                        }`}
                      >
                        <span className={selectedBox === box.boxId ? "text-[#BD9153] font-medium" : "text-gray-800"}>
                          {box.boxType}
                        </span>
                        <span className="text-gray-600 font-medium">
                          {box.boxPrice} INR
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold mb-2 times tracking-wide text-gray-700 uppercase">Quantity</label>
              <div className="flex items-center gap-2 w-full max-w-xs bg-gray-100 rounded-lg p-1">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  className="p-2 rounded-md hover:bg-gray-200 transition-colors"
                  onClick={decrement}
                >
                  <Minus size={18} className="text-gray-600" />
                </motion.button>
                
                <input
                  type="number"
                  value={quantity}
                  onChange={handleInputChange}
                  className="w-full bg-transparent text-center times text-lg font-medium focus:outline-none"
                  min={1}
                />
                
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  className="p-2 rounded-md hover:bg-gray-200 transition-colors"
                  onClick={increment}
                >
                  <Plus size={18} className="text-gray-600" />
                </motion.button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold mb-2 times tracking-wide text-gray-700 uppercase">Delivery Information</label>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 lg:items-center">
                <span className="flex items-center gap-2 text-sm times bg-gray-50 px-3 py-2 rounded-md">
                  <Tick />
                  <span className="font-medium">Local Delivery</span>
                </span>
                <span className={`flex items-center gap-2 text-sm times px-3 py-2 rounded-md ${
                  allIndiaDelivery ? "bg-gray-50" : "bg-red-50"
                }`}>
                  {allIndiaDelivery ? <Tick /> : <Cross className="text-red-500" />}
                  <span className={`font-medium ${!allIndiaDelivery && "text-red-600"}`}>
                    Pan India Delivery
                  </span>
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!selectedBox}
              className={`group w-full px-6 py-4 rounded-lg transition-all duration-500 times text-lg relative overflow-hidden hover:text-white ${
                selectedBox 
                ? "bg-[#BD9153] text-white shadow-lg cursor-pointer" 
                : "bg-[#BD9153]/25 cursor-not-allowed"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <ShoppingBag size={20} />
                <span>Add To Cart</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#BD9153] to-[#d5b27c] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></span>
            </motion.button>
          </form>
          
          {/* Product Tags */}
          {/* <div className="pt-6 border-t border-gray-100">
            <div className="flex flex-wrap gap-2 mt-3">
              {tags?.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full times hover:bg-gray-200 cursor-pointer transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div> */}
        </motion.div>
      </div>

     {/* Product Details Section - Enhanced */}
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="mt-20 overflow-hidden"
>
  <div className="relative">
    {/* Background decorative elements */}
    <div className="absolute -right-20 -top-10 w-40 h-40 rounded-full bg-[#BD9153]/10 blur-3xl"></div>
    <div className="absolute -left-20 top-40 w-60 h-60 rounded-full bg-[#BD9153]/5 blur-3xl"></div>
    
    {/* Content container */}
    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
      <div className="flex items-center mb-8">
        <div className="w-8 h-1 bg-[#BD9153] rounded-full mr-4"></div>
        <h2 className="text-2xl md:text-3xl font-bold trajan text-gray-800">Product Details</h2>
      </div>
      
      <div className="flex flex-col gap-10">
        {/* Left sidebar with options */}
        <div className="lg:col-span-3 bg-gray-50/70 rounded-xl md:p-5 backdrop-blur-sm shadow-inner border border-gray-100">
          <Options />
        </div>

        {/* Right content with accordion */}
        <div className="lg:col-span-9">
          <Accordion 
            variant="splitted" 
            className="times divide-y divide-gray-100"
            selectionMode="multiple"
          >
            {selectedVariant && (
              <AccordionItem 
                key="1" 
                aria-label="Description" 
                title={
                  <div className="flex items-center py-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#BD9153] mr-3"></div>
                    <span className="text-lg font-medium text-gray-800 times">Description</span>
                  </div>
                }
                className="times mb-3 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-[#BD9153]/30 transition-all duration-300"
              >
                <div className="px-4 py-5 text-gray-700 leading-relaxed times bg-white/80 rounded-b-xl">
                  {selectedVariant.variantDesc}
                </div>
              </AccordionItem>
            )}

            {storage && (
              <AccordionItem 
                key="2" 
                aria-label="Storage Info" 
                title={
                  <div className="flex items-center py-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#BD9153] mr-3"></div>
                    <span className="text-lg font-medium text-gray-800 times">Storage Information</span>
                  </div>
                }
                className="times mb-3 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-[#BD9153]/30 transition-all duration-300"
              >
                <div className="px-4 py-5 text-gray-700 leading-relaxed times bg-white/80 rounded-b-xl">
                  {storage}
                </div>
              </AccordionItem>
            )}
            
            {allergens && (
              <AccordionItem 
                key="3" 
                aria-label="Allergens" 
                title={
                  <div className="flex items-center py-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#BD9153] mr-3"></div>
                    <span className="text-lg font-medium text-gray-800 times">Allergens</span>
                  </div>
                }
                className="times mb-3 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-[#BD9153]/30 transition-all duration-300"
              >
                <div className="px-4 py-5 text-gray-700 leading-relaxed times bg-white/80 rounded-b-xl">
                  {allergens}
                </div>
              </AccordionItem>
            )}
            
            {ingredients && (
              <AccordionItem 
                key="4" 
                aria-label="Ingredients" 
                title={
                  <div className="flex items-center py-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#BD9153] mr-3"></div>
                    <span className="text-lg font-medium text-gray-800 times">Ingredients</span>
                  </div>
                }
                className="times mb-3 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-[#BD9153]/30 transition-all duration-300"
              >
                <div className="px-4 py-5 text-gray-700 leading-relaxed times bg-white/80 rounded-b-xl">
                  {ingredients}
                </div>
              </AccordionItem>
            )}

            {size && (
              <AccordionItem 
                key="5" 
                aria-label="Size Info" 
                title={
                  <div className="flex items-center py-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#BD9153] mr-3"></div>
                    <span className="text-lg font-medium text-gray-800 times">Size Information</span>
                  </div>
                }
                className="times mb-3 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-[#BD9153]/30 transition-all duration-300"
              >
                <div className="px-4 py-5 text-gray-700 leading-relaxed times bg-white/80 rounded-b-xl">
                  {size}
                </div>
              </AccordionItem>
            )}
          </Accordion>
        </div>

      </div>
    </div>
  </div>
</motion.div>

{/* Enhanced Customer Service Banner */}
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.6 }}
  className="mt-10 mb-12"
>
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#f8f5f0] to-[#f0e6d8] shadow-lg border border-[#BD9153]/10">
    {/* Decorative elements */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#BD9153]/5 rounded-full transform translate-x-16 -translate-y-16"></div>
    <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#BD9153]/10 rounded-full transform -translate-x-20 translate-y-20"></div>
    
    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      {/* Shipping Feature */}
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(189, 145, 83, 0.1)" }}
        className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#BD9153]/20 flex items-center transition-all duration-300"
      >
        <div className="mr-5 p-3 bg-gradient-to-br from-[#BD9153]/10 to-[#BD9153]/20 rounded-lg text-[#BD9153]">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck">
            <path d="M5 18h14M5 18a2 2 0 1 0 4 0M5 18a2 2 0 1 1 4 0M14 18a2 2 0 1 0 4 0M14 18a2 2 0 1 1 4 0"/>
            <path d="M4 10h5M9 10h10c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1H4a1 1 0 0 0-1 1v13"/>
            <path d="M11 15h5"/>
          </svg>
        </div>
        <div>
          <h3 className="text-base font-bold trajan text-gray-800 mb-1">Free Shipping</h3>
          <p className="text-sm text-gray-600 times">On orders over ₹1500</p>
          <div className="w-12 h-0.5 bg-[#BD9153]/30 rounded-full mt-2"></div>
        </div>
      </motion.div>
      
      {/* Quality Guarantee Feature */}
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(189, 145, 83, 0.1)" }}
        className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#BD9153]/20 flex items-center transition-all duration-300"
      >
        <div className="mr-5 p-3 bg-gradient-to-br from-[#BD9153]/10 to-[#BD9153]/20 rounded-lg text-[#BD9153]">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
        </div>
        <div>
          <h3 className="text-base font-bold trajan text-gray-800 mb-1">Quality Guarantee</h3>
          <p className="text-sm text-gray-600 times">100% satisfaction guaranteed</p>
          <div className="w-12 h-0.5 bg-[#BD9153]/30 rounded-full mt-2"></div>
        </div>
      </motion.div>
      
      {/* Customer Support Feature */}
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(189, 145, 83, 0.1)" }}
        className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#BD9153]/20 flex items-center transition-all duration-300"
      >
        <div className="mr-5 p-3 bg-gradient-to-br from-[#BD9153]/10 to-[#BD9153]/20 rounded-lg text-[#BD9153]">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-headphones">
            <path d="M3 14h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z"/>
            <path d="M19 14h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z"/>
            <path d="M3 15v-3a9 9 0 0 1 18 0v3"/>
          </svg>
        </div>
        <div>
          <h3 className="text-base font-bold trajan text-gray-800 mb-1">Customer Support</h3>
          <p className="text-sm text-gray-600 times">24/7 dedicated service</p>
          <div className="w-12 h-0.5 bg-[#BD9153]/30 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </div>
  </div>
</motion.div>
    </div>
  );
};

export default ProductPage;