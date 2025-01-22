import React, { useState, useEffect } from 'react';

function FeaturedItem() {
  const [product, setProduct] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const productId = "your-product-id"; // Replace with the actual productId or dynamic prop/state

  useEffect(() => {
    // Fetch product details on component mount
    const getProduct = async () => {
      try {
        const response = await fetch(`https://bonnbackend.up.railway.app/api/v1/products/product?productId=678b4f58b21d5ebb8e128417`, {
          method: 'GET',
        });

        const data = await response.json();
        if (response.status === 201) {
          const productData = data?.data;
          setProduct(productData?.variant[0]);
          console.log(product)
          const productVariants = productData?.variant[0] || [];
          setThumbnails([productVariants.variantPic_1, productVariants.variantPic_2, productVariants.variantPic_3, productVariants.variantPic_4]);
          setMainImage(productVariants.variantPic_1);
        } else {
          console.error(data?.message || 'Failed to fetch product');
        }
      } catch (error) {
        console.error(error);
      }
    };

    getProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white text-black py-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 justify-between bg-white text-black py-12">
        <p className="trajan text-[28px] md:text-[40px] text-center">Featured Product</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-center md:justify-evenly items-start p-4 gap-8 bg-white text-black">
        {/* Left Section: Product Images */}
        <div className="w-full md:w-[50%] lg:w-[500px] flex flex-col gap-4 px-4">
          {/* Main Image */}
          <div className="w-full h-[250px] md:h-[300px] lg:h-[400px]">
            <img
              src={mainImage}
              alt="Main Product"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 md:gap-4 justify-center">
            {thumbnails.map((src, idx) => (
              <div
                key={idx}
                className={`w-[75px] h-[75px] md:w-[100px] md:h-[100px] lg:w-[125px] lg:h-[120px] cursor-pointer ${
                  mainImage === src ? 'border-4 border-pink-600 rounded-xl' : ''
                }`}
                onClick={() => setMainImage(src)}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="flex flex-col justify-start gap-4 w-full md:w-[50%] px-4 md:px-0">
          {/* Product Title and Price */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-lg md:text-xl font-bold trajan">{product?.variantName || 'Molten choco lava'}</h2>
            <p className="text-md md:text-lg font-semibold text-gray-700 trajan mt-2 md:mt-0">
              INR {product.variantPrice}
            </p>
          </div>

          {/* Product Description */}
          <div className="py-4 rounded-lg text-gray-700">
            <p className="times text-sm md:text-base leading-relaxed">
              {product?.variantDesc ||
                'Lorem ipsum dolor sit amet consectetur. Semper sed volutpat egestas consectetur dui lorem. Consectetur aliquet cursus dignissim eget mi elementum feugiat sagittis. Iaculis nam aliquam vulputate egestas nisl et vel ornare. Tristique phasellus faucibus sit commodo cursus quam. Maecenas non amet turpis enim enim in odio tellus mattis. Pulvinar ut pellentesque diam nunc est.'}
            </p>
          </div>

          {/* Proceed to Checkout Button */}
          <button className="bg-[#CE0067] w-full text-white px-4 py-2 rounded-md times transition duration-500 hover:bg-white hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]">
            SEE MORE
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedItem;
