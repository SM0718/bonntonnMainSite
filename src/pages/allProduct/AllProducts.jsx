import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { NavLink, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Input, Slider } from "@nextui-org/react"; 
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

import { toast } from 'react-toastify';

const AllProduct = () => {
  const [categoryInfo, setCategoryInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  
  // Filter states
  const [sliderValue, setSliderValue] = useState([100, 9999]);
  const [foodType, setFoodType] = useState("");
  const productsPerPage = 3;
  const { slug } = useParams();

  function Spinner() {
    return (
      <svg aria-hidden="true" className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-300 fill-blue-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
    );
  }

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
      const response = await fetch(`/api/v1/products/all-products?catagoryId=${slug}`);
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
      filtered = filtered.filter(product => 
        product.variant[0].variantPrice >= minPrice && 
        product.variant[0].variantPrice <= maxPrice
      );
    }

    // Apply food type filter
    if (foodType) {
      filtered = filtered.filter(product => 
        product.variant[0].foodType === foodType
      );
    }

    // Apply search filter
    if (productName) {
      filtered = filtered.filter(product =>
        product.variant[0].variantName.toLowerCase().includes(productName.toLowerCase())
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
    setCurrentPage(1);
  };

  const getCategoryData = async () => {
    try {
      const response = await fetch(`https://bonntonn.up.railway.app/api/v1/catagory/current-catagory?catagoryId=${slug}`, {
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
  <div className="flex flex-wrap lg:flex-nowrap justify-between items-center bg-gradient-to-r from-[#CE0067] to-[#ed3682] p-6 rounded-lg shadow-lg">
    <div className="w-full lg:w-2/3 flex flex-col items-start justify-center text-white space-y-4">
      <h1 className="text-4xl lg:text-5xl font-bold mb-2 trajan">
        {categoryInfo?.catagory}
      </h1>
      <p className="text-base lg:text-md text-gray-100/90 leading-relaxed times">
        {categoryInfo?.catagoryDesc}
      </p>
    </div>

    <div className="w-full lg:w-1/3 flex justify-center mt-2">
      {categoryInfo && products.length > 0 && (
        <img
          alt={`${categoryInfo.catagory}.webp`}
          src={categoryInfo.catagoryPic}
          className="h-[250px] lg:h-[350px] w-full lg:w-[350px] rounded-lg mt-2 object-cover shadow-md"
        />
      )}
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
      placeholder="Enter product name"
      className="w-full sm:w-[200px] px-4 py-3 rounded-md"
    />
  </div>

  {/* Action Buttons */}
  <div className="flex gap-2 w-full sm:w-auto">
    <Button
      style={{
        backgroundColor: "#5C0977",
        color: "#FFFFFF",
        border: "none",
      }}
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
      <Spinner />
    </div>
  ) : filteredProducts.length === 0 ? (
    <NoProduct />
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-4">
      {currentProducts.map((product) => (
        <NavLink
          key={product._id}
          className="h-[450px] border rounded-lg p-4 shadow-sm hover:shadow-lg transition transform cursor-pointer bg-white"
          to={`/product-page/${product._id}`}
          onMouseEnter={() => setHoveredProduct(product._id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          <div className="h-3/4 w-full mb-4 bg-gray-100 rounded-md overflow-hidden relative">
            <Image
              alt={`${product.variant[0].variantName}.webp`}
              src={
                hoveredProduct === product._id
                  ? product.variant[0].variantPic_2
                  : product.variant[0].variantPic_1
              }
              className="h-full w-full object-cover transition-transform duration-300"
            />
          </div>

          <div className="w-full flex flex-col justify-between space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold times text-gray-800">
                {product.variant[0].variantName}
              </h3>
              <p className="text-xl font-bold text-[#CE0067] times">
                ₹{product.variant[0].variantPrice}
              </p>
            </div>

            <p className="text-gray-600 text-sm times capitalize">
              {product.variant[0].foodType}
            </p>
          </div>
        </NavLink>
      ))}
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