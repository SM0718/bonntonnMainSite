import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { NavLink, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Input, Slider, Card, Spinner } from "@nextui-org/react"; 
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

import { toast } from 'react-toastify';

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
  const productsPerPage = 6;
  const { slug } = useParams();

  const LoadingState = () => {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Card className="p-8 flex flex-col items-center gap-4 bg-white/10 backdrop-blur-sm">
          <Spinner 
            size="lg"
            color="primary"
            labelColor="primary"
          />
          <p className="text-base text-default-600">Loading Products...</p>
        </Card>
      </div>
    );
  };

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
      const response = await fetch(`http://bonnbackend.up.railway.app/api/v1/products/all-products?catagoryId=${slug}`, {
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
      const response = await fetch(`http://bonnbackend.up.railway.app/api/v1/catagory/current-catagory?catagoryId=${slug}`, {
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
<div className="relative container mx-auto px-4 py-4">
  {/* Header */}
  <div className="relative container mx-auto lg:px-4 py-8">
  {/* Header */}
  <div className="relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
  {/* Background Image */}
  {categoryInfo && products.length > 0 && (
    <div className="absolute inset-0">
      <img
        alt={`${categoryInfo.catagory}.webp`}
        src={categoryInfo.catagoryPic}
        className="w-full h-full object-cover"
      />
      {/* Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#CE0067]/90 via-[#e41b75]/85 to-[#ed3682]/80"></div> */}
    </div>
  )}

  {/* Content */}
  <div className="relative w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
    <div className="max-w-3xl">
      <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight trajan text-[#757575] drop-shadow-lg shadow-black animate-fade-in">
        {categoryInfo?.catagory}
      </h1>
      <div className="w-16 sm:w-20 h-1 bg-white/25 rounded-full my-4 sm:my-6 shadow-md"></div>
      <div className="max-w-sm"> {/* Add a max-width container here */}
        <p className="text-base sm:text-lg lg:text-xl text-[#757575] font-medium leading-relaxed times drop-shadow-md shadow-black backdrop-blur-sm bg-white/10 p-3 rounded-lg">
          {categoryInfo?.catagoryDesc}
        </p>
      </div>
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
        filledTrack: "bg-[#5C0977]",
        thumb: "bg-white border-[#5C0977] border-2 hover:bg-[#5C0977] hover:border-[#5C0977] transition-colors",
        label: "text-[#5C0977] font-medium",
        value: "text-[#5C0977]",
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
            border: `2px solid #5C0977`,
            backgroundColor: "transparent",
            color: "#5C0977",
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
          className="px-4 py-2 hover:bg-[#F3E5F5] text-[#5C0977] transition"
        >
          Veg
        </DropdownItem>
        <DropdownItem
          key="NON-VEG"
          className="px-4 py-2 hover:bg-[#F3E5F5] text-[#5C0977] transition"
        >
          Non-Veg
        </DropdownItem>
        <DropdownItem
          key="EGG"
          className="px-4 py-2 hover:bg-[#F3E5F5] text-[#5C0977] transition"
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
            border: `2px solid #5C0977`,
            backgroundColor: "transparent",
            color: "#5C0977",
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
        <DropdownItem key="none" className="px-4 py-2 hover:bg-[#F3E5F5] text-[#5C0977] transition">
          None
        </DropdownItem>
        <DropdownItem key="priceLowToHigh" className="px-4 py-2 hover:bg-[#F3E5F5] text-[#5C0977] transition">
          Price: Low to High
        </DropdownItem>
        <DropdownItem key="priceHighToLow" className="px-4 py-2 hover:bg-[#F3E5F5] text-[#5C0977] transition">
          Price: High to Low
        </DropdownItem>
        <DropdownItem key="alphabetical" className="px-4 py-2 hover:bg-[#F3E5F5] text-[#5C0977] transition">
          Alphabetical
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>

  {/* Action Buttons */}
  <div className="flex gap-2 w-full sm:w-auto">
    <Button
      style={{
        backgroundColor: "#5C0977",
        color: "#FFFFFF",
        border: "none",
      }}
      size="lg"
      className="w-full sm:w-auto px-4 py-3 rounded-md hover:bg-[#490559] transition"
      type="submit"
    >
      Apply
    </Button>
    <Button
      style={{
        backgroundColor: "transparent",
        color: "#CE0067",
        border: "1px solid #CE0067",
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
    const variant = product.variant[0]; // Destructure for clarity
    const isHovered = hoveredProduct === product._id;

    return (
      <NavLink
        key={product._id}
        className="block"
        to={`/product-page/${product._id}`}
        onMouseEnter={() => setHoveredProduct(product._id)}
        onMouseLeave={() => setHoveredProduct(null)}
      >
        <div className="relative cursor-pointer overflow-hidden transition-transform transform hover:scale-105 border rounded-lg shadow-lg p-4 bg-white">
          {/* Product Image */}
          <div className="relative h-60 w-full mb-4 bg-gray-100 rounded-md overflow-hidden">
            <img
              alt={`${variant.variantName}.webp`}
              src={isHovered ? variant.variantPic_2 : variant.variantPic_1}
              className="w-full h-full object-cover transition-transform duration-300"
            />
          </div>


          {/* Product Details */}
          <div className="px-4 py-2 flex justify-between items-center times">
            <h3 className="text-lg font-semibold">{variant.variantName}</h3>
            <p className="text-lg text-[#CE0067] font-bold">₹{variant.variantPrice}</p>
          </div>
          <div className="px-4 times text-[#757575]">
            <p>{variant.foodType}</p>
          </div>

          {/* Add to Cart Button */}
          <button
            className="absolute left-0 bottom-[-50px] w-full bg-[#CE0067] text-white px-4 py-2 rounded-md transition-all duration-500 ease-in-out hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067] 
            sm:group-hover:bottom-4 sm:opacity-0 sm:group-hover:opacity-100 
            sm:transition-opacity sm:duration-300 sm:ease-in-out
            sm:visible hidden"
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
              ? "bg-[#CE0067] text-white"
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