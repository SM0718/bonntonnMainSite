import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Image, Select, SelectItem, Input, Button } from "@nextui-org/react";
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import Options from "./Options";
import Tick from "@/svg/Tick";
import Cross from "@/svg/Cross";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State for the large image
  const [selectedBox, setSelectedBox] = useState("");
  const [selected, setSelected] = useState("");
  const { productId } = useParams();

  const getProduct = async () => {
    try {
      const response = await fetch(`https://bonntonn.up.railway.app/api/v1/products/product?productId=${productId}`, {
        method: "GET"
      });
      
      const data = await response.json();
      if (response.status === 201) {
        console.log(data)
        setProduct(data?.data);
        const defaultVariant = data?.data?.variant?.[0];
        setSelectedVariant(defaultVariant);
        setSelectedImage(defaultVariant?.variantPic_1); // Set the first image of the default variant
      } else {
        console.error(data?.message || "Failed to fetch product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setSelectedImage(variant?.variantPic_1); // Update the large image when variant changes
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc); // Update the large image when a small image is clicked
  };

  if (!product) return <div>Loading...</div>;

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
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  const handleSelect = (box) => {
    setSelectedBox(box.boxId);
    console.log("Selected Box:", box.boxType);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="w-full flex flex-col gap-2 lg:gap-6 lg:px-4 space-y-4">
          {/* Big Image Container */}
          <div className="group w-full aspect-[4/3] gap-2 overflow-hidden">
            <img
              src={selectedImage || "/api/placeholder/400/300"}
              alt={selectedVariant?.variantName || "Product"}
              className="w-full h-full object-fit rounded-lg group-hover:scale-110 transition duration-500"
            />
          </div>

          {/* Small Images Grid */}
          <div className="grid grid-cols-4 gap-2">
            {[selectedVariant?.variantPic_1, selectedVariant?.variantPic_2, selectedVariant?.variantPic_3, selectedVariant?.variantPic_4].map(
              (src, index) =>
                src && (
                  <div
                    key={index}
                      className={`${selectedImage === src && "border-3 border-[#CE0067] rounded-xl  "} aspect-square w-full cursor-pointer`}
                    onClick={() => handleImageClick(src)} // Update large image on click
                  >
                    <img
                      src={src}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg hover:opacity-80 transition-opacity"
                    />
                  </div>
                )
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-8">
          {/* Title and Description */}
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold trajan">{selectedVariant?.variantName || "Product"}</h1>
            <p className="text-lg text-[#CE0067] font-semibold mt-2 times">
              Price - {selectedVariant?.variantPrice || 0} INR
            </p>
            <p className="text-gray-700 mt-1 times">
              {tags?.join(" | ") || "No Tags Available"}
            </p>
          </div>

          {/* Variant Selector */}
          <div>
            <label className="block text-sm font-bold mb-2 times">Choose Variant</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.variant?.map((variant, index) => (
                <Button
                  key={index}
                  className={`py-2 px-4 rounded-md times ${
                    selectedVariant === variant ? "bg-[#CE0067] text-white" : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => handleVariantChange(variant)}
                >
                  {variant.variantName}
                </Button>
              ))}
            </div>
          </div>


          {/* Options and Delivery */}
          <div className="space-y-6">
            {/* Box Type */}
           
            <div className="w-full dropdown dropdown-hover space-x-6">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 w-full bg-white text-[#757575] border-gray-300 hover:bg-gray-100"
              >
                {selectedBox
                  ? `${
                      boxSize.find((box) => box.boxId === selectedBox)?.boxType
                    }`
                  : "Box Type"}
              </div>
              <ul
                tabIndex={0}
                className="w-full dropdown-content menu bg-white text-black rounded-box z-[1] p-2 shadow"
              >
                {boxSize.map((box) => (
                  <li key={box.boxId}>
                    <a
                      onClick={() => handleSelect(box)}
                      className="flex justify-between hover:bg-gray-100"
                    >
                      {box.boxType} - {box.boxPrice} INR
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          

            {/* Quantity */}
            <div className="flex items-center gap-4">
      <span className="text-sm font-bold text-gray-700 times">Quantity</span>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="flat"
          className="min-w-8 h-8 px-2"
          onClick={decrement}
          isIconOnly
        >
          -
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          className="w-16"
          size="sm"
          classNames={{
            input: [
              "text-center",
              // Hide spinner buttons
              "[appearance:textfield]",
              "[&::-webkit-outer-spin-button]:appearance-none",
              "[&::-webkit-inner-spin-button]:appearance-none"
            ],
            inputWrapper: "h-8"
          }}
          min={1}
        />
        <Button
          size="sm"
          variant="flat"
          className="min-w-8 h-8 px-2"
          onClick={increment}
          isIconOnly
        >
          +
        </Button>
      </div>
            </div>

            {/* Gift Tag */}
            {/* <div>
              <label className="block text-sm font-medium times">Message for Gift Tag</label>
              <textarea
                className="w-full border rounded-md p-2 mt-1"
                rows="3"
                placeholder="Put your message here..."
              ></textarea>
            </div> */}

            {/* Delivery Option */}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 lg:items-center">
              <span className="flex items-center gap-2 text-sm font-medium times">
                <Tick />
                Local Delivery
              </span>
              <span className="flex items-center gap-2 text-sm font-medium times">
                {allIndiaDelivery ? <Tick /> : <Cross />}
                Pan India Delivery
              </span>
            </div>

            {/* Add to Cart Button */}
            <Button className="bg-[#CE0067] w-full text-white px-4 py-2 times rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]">
              Add To Cart
            </Button>
          </div>
        </div>
      </div>


      <div className="flex flex-col md:flex-row gap-4">

              <div>
                <Options />
              </div>

            {/* Additional Information Section */}
          
          <Accordion>

            {
              selectedVariant && (
                <AccordionItem key="1" aria-label="Accordion 1" title="Description" className="times">
                  {selectedVariant.variantDesc}
                </AccordionItem>
              )
            }

          {storage && (
              <AccordionItem key="2" aria-label="Accordion 2" title="Storage Info" className="times">
                {storage}
              </AccordionItem>
            )}
            
            {allergens && (
              <AccordionItem key="3" aria-label="Accordion 3" title="Allergens" className="times">
              {allergens}
            </AccordionItem>
            )}
            
            {ingredients && (
              <AccordionItem key="4" aria-label="Accordion 4" title="Ingredients" className="times">
              {ingredients}
            </AccordionItem>
            )}

            {size && (
              <AccordionItem key="5" aria-label="Accordion 5" title="Size Info" className="times">
              {size}
            </AccordionItem>
            )}
            
          </Accordion>
      </div>
      

    </div>
  );
};

export default ProductPage;
