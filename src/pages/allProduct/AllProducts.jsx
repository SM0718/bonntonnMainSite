import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { NavLink, useParams } from "react-router-dom";

const AllProduct = () => {
  const [catagoryInfo, setCatagoryInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const productsPerPage = 2;
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
    <div
      className="absolute inset-0 flex items-center justify-center bg-white"
      role="status"
    >
      <div className="flex flex-col items-center justify-center">
        {isLoading ? (
          <>
            <Spinner />
            <span className="mt-4 text-lg font-semibold text-gray-700 times">
              Searching For Products
            </span>
          </>
        ) : (
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-semibold text-gray-900 trajan">No Products Found</h3>
            <p className="mt-1 text-gray-500 times">We couldn't find any products in this category. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  );

  const getAllProducts = async () => {
    try {
      const request = await fetch(`/api/v1/products/all-products?catagoryId=${slug}`, {
        method: "GET",
      });

      if (request.ok) {
        const response = await request.json();
        if (response.statusCode === 200) {
          setProducts(response.data.products);
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getCatagoryData = async () => {
    try {
      const request = await fetch(
        `https://bonntonn.up.railway.app/api/v1/catagory/current-catagory?catagoryId=${slug}`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (request.ok) {
        const response = await request.json();
        if (response.statusCode === 201) {
          setCatagoryInfo(response.data);
          getAllProducts(); // Ensure getAllProducts is called after successful catagoryInfo fetch
        }
      }
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getCatagoryData();

    // Set a timeout for 5 seconds
    const timeoutId = setTimeout(() => {
      if (products.length === 0) {
        setIsLoading(false);
      }
    }, 10000);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts =
    products && products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <div className="relative container mx-auto px-4 py-8">
      {/* Header */}
      <div className="h-[400px] mb-8 flex flex-wrap lg:flex-nowrap justify-between items-center bg-gradient-to-r from-[#CE0067] to-[#ed3682] p-6 rounded-lg shadow-lg">
        {/* Text Section */}
        <div className="w-full lg:w-2/3 flex flex-col items-start justify-center text-white space-y-4">
          <h1 className="text-5xl font-bold mb-2 trajan">
            {catagoryInfo?.catagory}
          </h1>
          <p className="text-base text-gray-100/90 leading-relaxed times">
            {catagoryInfo?.catagoryDesc}
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/3 flex justify-center">
          {catagoryInfo && products.length > 0 && (
            <Image
              alt={`${catagoryInfo.catagory}.webp`}
              src={catagoryInfo.catagoryPic}
              className="h-[350px] w-[350px] rounded-lg object-cover shadow-md"
            />
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? 
          currentProducts.map((product) => (
            <NavLink
              key={product._id}
              className="h-[450px] border rounded-lg p-4 shadow-sm hover:shadow-lg transition transform cursor-pointer bg-white"
              to={`/product-page/${product._id}`}
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Image Section */}
              <div className="h-3/4 w-full mb-4 bg-gray-100 rounded-md overflow-hidden relative">
                <Image
                  alt={`${product.variant[0].variantName}.webp`}
                  src={hoveredProduct === product._id ? product.variant[0].variantPic_2 : product.variant[0].variantPic_1}
                  className="h-full w-full object-cover transition-transform duration-300"
                />
              </div>

              {/* Details Section */}
              <div className="w-full flex flex-col justify-between space-y-2">
                {/* Product Name and Price */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold times text-gray-800">
                    {product.variant[0].variantName}
                  </h3>
                  <p className="text-xl font-bold text-[#CE0067] times">
                    Rs {product.variant[0].variantPrice}
                  </p>
                </div>

                {/* Food Type */}
                <p className="text-gray-600 text-sm times capitalize">
                  {product.variant[0].foodType}
                </p>
              </div>
            </NavLink>
          )) : <NoProduct />}
      </div>

      {/* Pagination */}
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
    </div>
  );
};

export default AllProduct;
