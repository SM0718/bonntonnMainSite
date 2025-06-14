import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { NavLink, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Input, Slider, Card, Spinner } from "@nextui-org/react"; 
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from "framer-motion";

const AllProduct = () => {
  const [categoryInfo, setCategoryInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sliderValue, setSliderValue] = useState([100, 9999]);
  const [foodType, setFoodType] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const productsPerPage = 12;
  const { slug } = useParams();

  const LoadingState = () => (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-12">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="relative rounded-2xl shadow-md p-4 bg-white/90 backdrop-blur-sm h-[400px]">
          <div className="h-64 w-full rounded-xl overflow-hidden">
            <Skeleton height="100%" />
          </div>
          <div className="px-4 py-3">
            <Skeleton width="80%" height={20} />
            <Skeleton width="40%" height={16} className="mt-2" />
          </div>
        </div>
      ))}
    </div>
  );

  const NoProduct = () => (
    <div className="flex items-center justify-center py-16">
      <div className="text-center bg-white/80 p-8 rounded-2xl shadow-lg border border-[#BD9153]/10">
        <h3 className="text-xl font-semibold trajan text-gray-800">No Products Found</h3>
        <p className="text-gray-500 times mt-2">Try adjusting your filters</p>
      </div>
    </div>
  );

  const getAllProducts = async () => {
    try {
      const response = await fetch(`https://bonnbackend.up.railway.app/api/v1/products/all-products?catagoryId=${slug}`, {
        method: "GET"
      });
      const data = await response.json();
      if (response.ok && data.statusCode === 200) {
        setProducts(data.data.products);
        setFilteredProducts(data.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = (filters = {}) => {
    const { priceRange, foodType, productName } = filters;
    let filtered = [...products];
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange;
      filtered = filtered.filter(
        (product) => product.variant[0].variantPrice >= minPrice && product.variant[0].variantPrice <= maxPrice
      );
    }
    if (foodType) {
      filtered = filtered.filter((product) => product.variant[0].foodType === foodType);
    }
    if (productName) {
      filtered = filtered.filter((product) =>
        product.variant[0].variantName.toLowerCase().includes(productName.toLowerCase())
      );
    }
    if (sortOrder === "priceHighToLow") {
      filtered.sort((a, b) => b.variant[0].variantPrice - a.variant[0].variantPrice);
    } else if (sortOrder === "priceLowToHigh") {
      filtered.sort((a, b) => a.variant[0].variantPrice - b.variant[0].variantPrice);
    } else if (sortOrder === "alphabetical") {
      filtered.sort((a, b) => a.variant[0].variantName.localeCompare(b.variant[0].variantName));
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleFilter = (data) => {
    applyFilters({
      priceRange: sliderValue,
      foodType,
      productName: data.productName
    });
  };

  const handlePriceMove = (value) => {
    setSliderValue(value);
  };

  const handleReset = () => {
    reset();
    setSliderValue([100, 9999]);
    setFoodType("");
    setFilteredProducts(products);
    setSortOrder("none");
    setCurrentPage(1);
  };

  const getCategoryData = async () => {
    try {
      const response = await fetch(`https://bonnbackend.up.railway.app/api/v1/catagory/current-catagory?catagoryId=${slug}`, {
        method: "GET"
      });
      const data = await response.json();
      if (response.ok && data.statusCode === 201) {
        setCategoryInfo(data.data);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
      toast.error("Failed to fetch category information");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getCategoryData();
    getAllProducts();
  }, [slug]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <div className="relative container mx-auto px-4 py-8 bg-gradient-to-b from-white to-[#faf9f6]">
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-r from-[#f8f5f0] to-[#f0e6d8] border border-[#BD9153]/10"
      >
        <div className="absolute inset-0">
          {categoryInfo.catagoryPic ? (
            <img
              alt={`${categoryInfo.catagory}`}
              src={categoryInfo.catagoryPic}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 animate-pulse"></div>
          )}
        </div>
        <div className="relative z-10 px-8 py-12 flex items-center">
          <div className="max-w-2xl">
            {categoryInfo.catagory ? (
              <>
                <h1 className="text-4xl md:text-5xl trajan font-bold text-gray-800 tracking-wide drop-shadow-md">
                  {categoryInfo.catagory}
                </h1>
                <div className="w-24 h-1 bg-[#BD9153] rounded-full my-6"></div>
                <p className="text-lg times text-gray-700 leading-relaxed bg-white/90 p-4 rounded-xl shadow-md border border-[#BD9153]/10">
                  {categoryInfo.catagoryDesc}
                </p>
              </>
            ) : (
              <div className="space-y-4">
                <Skeleton width="60%" height={40} />
                <Skeleton width={100} height={4} />
                <Skeleton count={2} height={20} />
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-12 bg-white/90 rounded-3xl shadow-lg p-6 border border-[#BD9153]/10 backdrop-blur-sm"
      >
        <form onSubmit={handleSubmit(handleFilter)} className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          {/* Price Range Slider */}
          <div className="space-y-3">
            <label className="text-sm trajan font-semibold text-gray-700 tracking-wide">Filter by Price</label>
            <Slider
              size="sm"
              step={50}
              minValue={100}
              maxValue={9999}
              value={sliderValue}
              onChange={handlePriceMove}
              formatOptions={{ style: "currency", currency: "INR" }}
              classNames={{
                base: "gap-2",
                track: "bg-gray-200 border border-[#BD9153]/20",
                filler: "bg-gradient-to-r from-[#BD9153] to-[#d5b27c]",
                thumb: "bg-white border-2 border-[#BD9153] shadow-md",
                label: "text-[#BD9153] font-medium",
                value: "text-[#BD9153] times",
              }}
            />
            <p className="text-sm text-[#BD9153] times">
              ₹{sliderValue[0]} - ₹{sliderValue[1]}
            </p>
          </div>

          {/* Dietary Selection */}
          <div className="space-y-3">
            <label className="text-sm trajan font-semibold text-gray-700 tracking-wide">Dietary Type</label>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="w-full bg-transparent border-2 border-[#BD9153] text-[#BD9153] rounded-xl hover:bg-[#BD9153]/10 transition-all duration-300"
                  size="lg"
                >
                  {foodType || "All Types"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key) => setFoodType(key)}
                className="rounded-xl bg-white shadow-lg border border-[#BD9153]/10"
              >
                <DropdownItem key="VEG" className="py-2 px-4 text-[#BD9153] hover:bg-[#BD9153]/10 times">Veg</DropdownItem>
                <DropdownItem key="NON-VEG" className="py-2 px-4 text-[#BD9153] hover:bg-[#BD9153]/10 times">Non-Veg</DropdownItem>
                <DropdownItem key="EGG" className="py-2 px-4 text-[#BD9153] hover:bg-[#BD9153]/10 times">Egg</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Product Name Search */}
          <div className="space-y-3">
            <label className="text-sm trajan font-semibold text-gray-700 tracking-wide">Search Products</label>
            <Input
              size="sm"
              type="text"
              {...register("productName")}
              placeholder="Enter product name"
              className="w-full rounded-xl border-[#BD9153]/20 focus:ring-[#BD9153] times"
            />
          </div>

          {/* Sorting */}
          <div className="space-y-3">
            <label className="text-sm trajan font-semibold text-gray-700 tracking-wide">Sort Order</label>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="w-full bg-transparent border-2 border-[#BD9153] text-[#BD9153] rounded-xl hover:bg-[#BD9153]/10 transition-all duration-300"
                  size="lg"
                >
                  {sortOrder === "none" ? "Default" : sortOrder === "priceLowToHigh" ? "Price: Low" : sortOrder === "priceHighToLow" ? "Price: High" : "A-Z"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key) => setSortOrder(key)}
                className="rounded-xl bg-white shadow-lg border border-[#BD9153]/10"
              >
                <DropdownItem key="none" className="py-2 px-4 text-[#BD9153] hover:bg-[#BD9153]/10 times">Default</DropdownItem>
                <DropdownItem key="priceLowToHigh" className="py-2 px-4 text-[#BD9153] hover:bg-[#BD9153]/10 times">Price: Low to High</DropdownItem>
                <DropdownItem key="priceHighToLow" className="py-2 px-4 text-[#BD9153] hover:bg-[#BD9153]/10 times">Price: High to Low</DropdownItem>
                <DropdownItem key="alphabetical" className="py-2 px-4 text-[#BD9153] hover:bg-[#BD9153]/10 times">Alphabetical</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-9">
            <Button
              className="bg-[#BD9153] text-white rounded-xl hover:bg-[#d5b27c] transition-all duration-300 shadow-md"
              size="lg"
              type="submit"
            >
              Apply Filters
            </Button>
            <Button
              className="bg-transparent border-2 border-[#BD9153] text-[#BD9153] rounded-xl hover:bg-[#BD9153]/10 transition-all duration-300"
              size="lg"
              onClick={handleReset}
            >
              Clear
            </Button>
          </div>
        </form>
      </motion.div>

      {/* Product Grid */}
      {isLoading ? (
        <LoadingState />
      ) : filteredProducts.length === 0 ? (
        <NoProduct />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-12"
        >
          {currentProducts.map((product) => {
            const variant = product.variant[0];
            const isHovered = hoveredProduct === product._id;

            return (
              <NavLink
                key={product._id}
                to={`/product-page/${product._id}`}
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="relative rounded-2xl shadow-lg bg-white/95 border border-[#BD9153]/10 overflow-hidden transition-all duration-300 hover:shadow-xl h-[400px] flex flex-col"
                >
                  <div className="relative h-64 w-full bg-gradient-to-b from-[#f8f5f0] to-white">
                    <img
                      alt={variant.variantName}
                      src={isHovered ? variant.variantPic_2 : variant.variantPic_1}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-lg trajan font-medium text-gray-800 tracking-wide">{variant.variantName}</h3>
                      <p className="text-sm text-gray-600 times italic mt-1">{variant.foodType}</p>
                    </div>
                    <p className="text-lg text-[#BD9153] font-medium times mt-2">{variant.variantPrice} INR</p>
                  </div>
                  <button
                    className="absolute bottom-0 left-0 w-full bg-[#BD9153] text-white py-3 font-medium times uppercase tracking-wider transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-[#d5b27c]"
                  >
                    Add To Cart
                  </button>
                </motion.div>
              </NavLink>
            );
          })}
        </motion.div>
      )}

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center items-center mt-12 space-x-3"
        >
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`px-4 py-2 rounded-xl border border-[#BD9153]/20 text-[#BD9153] hover:bg-[#BD9153]/10 transition-all duration-300 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-xl border border-[#BD9153]/20 ${currentPage === i + 1 ? "bg-[#BD9153] text-white" : "text-[#BD9153] hover:bg-[#BD9153]/10"} transition-all duration-300`}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`px-4 py-2 rounded-xl border border-[#BD9153]/20 text-[#BD9153] hover:bg-[#BD9153]/10 transition-all duration-300 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default AllProduct;