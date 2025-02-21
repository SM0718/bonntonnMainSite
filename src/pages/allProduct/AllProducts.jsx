import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { NavLink, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Input, Slider, Card, Spinner } from "@nextui-org/react"; 
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const AllProduct = () => {
  const [categoryInfo, setCategoryInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  
  // Filter states
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sliderValue, setSliderValue] = useState([100, 9999]);
  const [foodType, setFoodType] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const productsPerPage = 12;
  const { slug } = useParams();

  const LoadingState = () => (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:px-4 py-10">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="relative cursor-pointer overflow-hidden border rounded-lg shadow-lg p-4 bg-white">
          <div className="h-60 w-full bg-gray-100 rounded-md overflow-hidden">
            <Skeleton height="100%" />
          </div>
          <div className="px-4 py-2">
            <Skeleton width="80%" />
            <Skeleton width="40%" />
          </div>
          <div className="px-4">
            <Skeleton width="50%" />
          </div>
        </div>
      ))}
    </div>
  );

  const NoProduct = () => (
    <div className="flex items-center justify-center py-10">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">No Products Found</h3>
        <p className="text-gray-500">Try adjusting your filters</p>
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
        console.log(data.data.products)
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

    // Apply price filter
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange;
      filtered = filtered.filter(
        (product) =>
          product.variant[0].variantPrice >= minPrice &&
          product.variant[0].variantPrice <= maxPrice
      );
    }

    // Apply food type filter
    if (foodType) {
      filtered = filtered.filter(
        (product) => product.variant[0].foodType === foodType
      );
    }

    // Apply search filter
    if (productName) {
      filtered = filtered.filter((product) =>
        product.variant[0].variantName.toLowerCase().includes(productName.toLowerCase())
      );
    }

    // Apply sort order
    if (sortOrder === "priceHighToLow") {
      filtered.sort(
        (a, b) => b.variant[0].variantPrice - a.variant[0].variantPrice
      );
    } else if (sortOrder === "priceLowToHigh") {
      filtered.sort(
        (a, b) => a.variant[0].variantPrice - b.variant[0].variantPrice
      );
    } else if (sortOrder === "alphabetical") {
      filtered.sort((a, b) =>
        a.variant[0].variantName.localeCompare(b.variant[0].variantName)
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
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
    setSortOrder("none")
    setCurrentPage(1);
  };

  const getCategoryData = async () => {
    try {
      const response = await fetch(`https://bonnbackend.up.railway.app/api/v1/catagory/current-catagory?catagoryId=${slug}`, {
        method: "GET"
      });
      const data = await response.json();
      console.log(data)
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
<div className="relative container mx-auto px-4 py-4">
  {/* Header */}
  <div className="relative container mx-auto lg:px-4 py-8">
  {/* Header */}
  <div className="relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
    {/* Background Image */}
    {categoryInfo ? (
      <div className="absolute inset-0">
        <img
          alt={`${categoryInfo.catagory}.webp`}
          src={categoryInfo.catagoryPic}
          className="w-full h-full object-fit"
        />
      </div>
    ) : (
      <div className="absolute inset-0 bg-gray-300 animate-pulse"></div> // Skeleton for Background Image
    )}

    {/* Content */}
    <div className="relative w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      <div className="max-w-3xl">
        {categoryInfo ? (
          <>
            <h1 className="text-xl sm:text-2xl lg:text-4xl times font-medium tracking-tight trajan text-black drop-shadow-lg shadow-black animate-fade-in">
              {categoryInfo.catagory}
            </h1>
            <div className="w-16 sm:w-20 h-1 bg-white/25 rounded-full my-4 sm:my-6 shadow-md"></div>
            <div className="max-w-sm">
              <p className="text-base sm:text-lg times lg:text-xl text-black font-medium leading-relaxed times drop-shadow-md shadow-black p-3 rounded-lg">
                {categoryInfo.catagoryDesc}
              </p>
            </div>
          </>
        ) : (
          <div>
            {/* Skeleton for Category Title */}
            <div className="h-8 sm:h-10 lg:h-12 w-3/4 bg-gray-300 animate-pulse rounded-md mb-4"></div>
            {/* Skeleton for Divider */}
            <div className="w-16 sm:w-20 h-1 bg-gray-300 animate-pulse rounded-full my-4 sm:my-6"></div>
            {/* Skeleton for Category Description */}
            <div className="space-y-2">
              <div className="h-4 sm:h-5 lg:h-6 w-full bg-gray-300 animate-pulse rounded-md"></div>
              <div className="h-4 sm:h-5 lg:h-6 w-5/6 bg-gray-300 animate-pulse rounded-md"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>



  {/* Filters */}
  <div className="flex flex-col gap-4 py-4 lg:px-4">
  <form onSubmit={handleSubmit(handleFilter)} className="flex flex-col sm:flex-row gap-4 items-center">
  {/* Price Range Slider */}
  <div className="flex flex-col items-start gap-2 w-full sm:w-auto">
    <Slider
      size="sm"
      label="Price Range"
      step={50}
      minValue={100}
      maxValue={9999}
      defaultValue={[100, 9999]}
      value={sliderValue}
      className="w-full sm:w-[250px]"
      onChange={handlePriceMove}
      formatOptions={{ style: "currency", currency: "INR" }}
      classNames={{
        base: "gap-3",
        track: "bg-gray-200",
        filledTrack: "bg-[#BD9153]",
        thumb: "bg-white border-[#BD9153] border-2 hover:bg-[#BD9153] hover:border-[#BD9153] transition-colors",
        label: "text-[#BD9153] font-medium",
        value: "text-[#BD9153]",
      }}
    />
  </div>

  {/* Dietary Selection Dropdown */}
  <div className="w-full sm:w-auto">
    <Dropdown>
      <DropdownTrigger>
        <Button
          size="lg"
          style={{
            border: `2px solid #BD9153`,
            backgroundColor: "transparent",
            color: "#BD9153",
          }}
          className="w-full sm:w-auto px-4 py-3 rounded-md hover:bg-[#F3E5F5] transition"
        >
          {foodType ? `Dietary: ${foodType}` : "Select Dietary Preference"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(key) => setFoodType(key)}
        aria-label="Dietary Preference"
        style={{
          backgroundColor: "#FFFFFF",
        }}
        className="rounded-md shadow-lg"
      >
        <DropdownItem
          key="VEG"
          className="px-4 py-2 hover:bg-[#F3E5F5] text-[#BD9153] transition"
        >
          Veg
        </DropdownItem>
        <DropdownItem
          key="NON-VEG"
          className="px-4 py-2 hover:bg-[#F3E5F5] text-[#BD9153] transition"
        >
          Non-Veg
        </DropdownItem>
        <DropdownItem
          key="EGG"
          className="px-4 py-2 hover:bg-[#F3E5F5] text-[#BD9153] transition"
        >
          Egg
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>

  {/* Product Name Search */}
  <div className="w-full sm:w-auto">
    <Input
      size="sm"
      type="text"
      {...register("productName")}
      label="Search"
      className="w-full sm:w-[200px] px-4 py-3 rounded-md"
    />
  </div>

  {/* Sorting Dropdown */}
  <div className="w-full sm:w-auto">
    <Dropdown>
      <DropdownTrigger>
        <Button
        size="lg"
          style={{
            border: `2px solid #BD9153`,
            backgroundColor: "transparent",
            color: "#BD9153",
          }}
          className="w-full sm:w-auto px-4 py-3 rounded-md hover:bg-[#F3E5F5] transition"
        >
          {sortOrder === "none"
            ? "Sort By"
            : sortOrder === "priceLowToHigh"
            ? "Price: Low to High"
            : sortOrder === "priceHighToLow"
            ? "Price: High to Low"
            : "Alphabetical"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(key) => setSortOrder(key)}
        aria-label="Sort Options"
        style={{
          backgroundColor: "#FFFFFF",
        }}
        className="rounded-md shadow-lg"
      >
        <DropdownItem key="none" className="px-4 py-2 hover:bg-[#F3E5F5] text-[#BD9153] transition">
          None
        </DropdownItem>
        <DropdownItem key="priceLowToHigh" className="px-4 py-2 hover:bg-[#F3E5F5] text-[#BD9153] transition">
          Price: Low to High
        </DropdownItem>
        <DropdownItem key="priceHighToLow" className="px-4 py-2 hover:bg-[#F3E5F5] text-[#BD9153] transition">
          Price: High to Low
        </DropdownItem>
        <DropdownItem key="alphabetical" className="px-4 py-2 hover:bg-[#F3E5F5] text-[#BD9153] transition">
          Alphabetical
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>

  {/* Action Buttons */}
  <div className="flex gap-2 w-full sm:w-auto">
    <Button
      style={{
        backgroundColor: "#BD9153",
        color: "#FFFFFF",
        border: "none",
      }}
      size="lg"
      className="w-full sm:w-auto px-4 py-3 rounded-md hover:bg-[#BD9153] transition"
      type="submit"
    >
      Apply
    </Button>
    <Button
      style={{
        backgroundColor: "transparent",
        color: "#BD9153",
        border: "1px solid #BD9153",
      }}
      size="lg"
      className="w-full sm:w-auto px-4 py-3 rounded-md hover:bg-[#FCE4EC] transition"
      type="button"
      onClick={handleReset}
    >
      Reset
    </Button>
  </div>
</form>


  </div>

  {/* Product Grid */}
  {isLoading ? (
    <div className="flex justify-center py-10">
      <LoadingState />
    </div>
  ) : filteredProducts.length === 0 ? (
    <NoProduct />
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:px-4">
  {currentProducts.map((product) => {
    const variant = product.variant[0];
    const isHovered = hoveredProduct === product._id;

    return (
      <NavLink
      key={product._id}
      className="block"
      to={`/product-page/${product._id}`}
      onMouseEnter={() => setHoveredProduct(product._id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      <div className="group relative cursor-pointer overflow-hidden border rounded-lg shadow-md bg-white h-[420px] flex flex-col transition-all duration-300 hover:shadow-xl">
        {/* Product Image Container */}
        <div className="relative h-64 w-full bg-gray-50 overflow-hidden">
          <img
            alt={`${variant.variantName}`}
            src={isHovered ? variant.variantPic_2 : variant.variantPic_1}
            className="w-full h-full object-contain transition-opacity duration-500 ease-in-out"
          />
          {/* Overlay for hover effect */}
          <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-5"></div>
        </div>
    
        {/* Product Details - Consistent Padding */}
        <div className="flex flex-col flex-1 p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-gray-800 times">{variant.variantName}</h3>
            <p className="text-lg text-[#BD9153] font-bold times">₹{variant.variantPrice}</p>
          </div>
          <p className="text-[#757575] text-sm times">{variant.foodType}</p>
        </div>
    
        {/* Add to Cart Button - Improved Positioning */}
        <button
          className="absolute left-0 bottom-0 w-full bg-[#BD9153] text-white py-3 font-medium text-sm uppercase tracking-wider transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out hover:bg-[#e6b46d]"
          aria-label="Add to cart"
        >
          Add To Cart
        </button>
      </div>
    </NavLink>

    );
  })}
</div>

  )}

  {/* Pagination */}
  {filteredProducts.length > 0 && (
    <div className="flex justify-center items-center mt-8 space-x-2">
      <Button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className={`px-3 py-1 border rounded times ${
          currentPage === 1
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "hover:bg-gray-200"
        }`}
        disabled={currentPage === 1}
      >
        Prev
      </Button>
      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 border rounded times ${
            currentPage === i + 1
              ? "bg-[#BD9153] text-white"
              : "hover:bg-gray-200"
          }`}
        >
          {i + 1}
        </Button>
      ))}
      <Button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className={`px-3 py-1 border rounded times ${
          currentPage === totalPages
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "hover:bg-gray-200"
        }`}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  )}
</div>

  );
};

export default AllProduct;