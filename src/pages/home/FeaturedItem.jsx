import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function FeaturedItem() {
  const [product, setProduct] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch product details on component mount
    const getProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://bonnbackend.up.railway.app/api/v1/products/product?productId=678b4f58b21d5ebb8e128417`, {
          method: 'GET',
        });

        const data = await response.json();
        if (response.status === 201) {
          const productData = data?.data;
          setProduct(productData?.variant[0]);
          const productVariants = productData?.variant[0] || [];
          setThumbnails([productVariants.variantPic_1, productVariants.variantPic_2, productVariants.variantPic_3, productVariants.variantPic_4]);
          setMainImage(productVariants.variantPic_1);
        } else {
          console.error(data?.message || 'Failed to fetch product');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-[#BD9153] border-b-[#BD9153] border-r-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        Product not found
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white text-black py-4 overflow-hidden"
    >
      {/* Header Section */}
      <motion.div 
        variants={itemVariants}
        className="mb-8"
      >
        <h2 className="trajan text-[28px] md:text-[40px] text-center relative">
          <span className="relative z-10">Featured Product</span>
          <motion.span 
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-[#BD9153]"
          />
        </h2>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-center md:justify-evenly items-start p-4 gap-8 bg-white text-black max-w-6xl mx-auto">
        {/* Left Section: Product Images */}
        <motion.div 
          variants={itemVariants}
          className="w-full md:w-[50%] lg:w-[500px] flex flex-col gap-4 px-4"
        >
          {/* Main Image */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full h-[250px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-lg shadow-lg"
          >
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              src={mainImage}
              alt="Main Product"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Thumbnails */}
          <div className="flex gap-2 md:gap-4 justify-center mt-4">
            {thumbnails.map((src, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`w-[75px] h-[75px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] cursor-pointer overflow-hidden rounded-lg ${
                  mainImage === src ? 'ring-2 ring-[#BD9153] ring-offset-2' : 'shadow-md'
                }`}
                onClick={() => setMainImage(src)}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover transition duration-300 hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Section: Product Details */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col justify-start gap-4 w-full md:w-[50%] px-4 md:px-8"
        >
          {/* Product Title and Price */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
            <motion.h2 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-2xl font-bold trajan"
            >
              {product?.variantName || 'Molten Choco Lava'}
            </motion.h2>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#BD9153]/10 px-4 py-2 rounded-full mt-2 md:mt-0"
            >
              <p className="text-md md:text-lg font-semibold text-[#BD9153] trajan">
                INR {product.variantPrice}
              </p>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div 
            initial={{ opacity: 0, width: "0%" }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="h-px bg-gradient-to-r from-transparent via-[#BD9153]/50 to-transparent my-2"
          />

          {/* Product Description */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="py-4 rounded-lg bg-[#f8f5f0] p-6 shadow-inner"
          >
            <p className="times text-sm md:text-base leading-relaxed">
              {product?.variantDesc ||
                'Lorem ipsum dolor sit amet consectetur. Semper sed volutpat egestas consectetur dui lorem. Consectetur aliquet cursus dignissim eget mi elementum feugiat sagittis. Iaculis nam aliquam vulputate egestas nisl et vel ornare. Tristique phasellus faucibus sit commodo cursus quam.'}
            </p>
          </motion.div>

          {/* Product Features */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-3 my-4"
          >
            {['Premium Quality', 'Handcrafted', 'Sustainable', 'Exclusive'].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <div className="w-3 h-3 rounded-full bg-[#BD9153]"></div>
                <p className="times text-sm">{feature}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Proceed to Checkout Button */}
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/product-page/678b4f58b21d5ebb8e128417')} 
            className="bg-[#BD9153] w-full text-white px-6 py-3 rounded-md times text-lg font-medium mt-4 transition-all duration-300 hover:bg-[#a67b45] hover:shadow-lg relative overflow-hidden group"
          >
            <span className="relative z-10">SEE MORE</span>
            <motion.span 
              initial={{ left: '-100%' }}
              whileHover={{ left: '100%' }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 w-full h-full bg-white/20 skew-x-30 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
            />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default FeaturedItem;