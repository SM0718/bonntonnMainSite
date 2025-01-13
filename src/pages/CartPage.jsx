import React, { useState, useEffect } from "react";
import { Checkbox, Button, Textarea, Input } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { NavLink, useNavigate } from "react-router-dom";
import useStore from "@/store/store";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = () => {
  const [cartData, setCartData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [updatingProductId, setUpdatingProductId] = useState(null); // Track updating product
  const [hasNote, setHasNote] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const updateCartStatus = useStore(state => state.updateCartStatus);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://bonnbackend.up.railway.app/api/v1/cart/get-user-cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.statusCode === 200) {
        console.log(data.data)
        setCartData(data.data);
        const total = data.data.reduce(
          (acc, item) => acc + item.productPrice * item.productQuantity,
          0
        );
        setSubtotal(total);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setIsLoading(false);
      setUpdatingProductId(null); // Reset updating state
    }
  };

  const updateQuantity = async (cartId, productId, newQuantity) => {
    setUpdatingProductId(productId); // Set product as updating
    console.log(cartId, productId, newQuantity)
    try {
      const response = await fetch(
        "https://bonnbackend.up.railway.app/api/v1/cart/update-cart",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ cartId, productQuantity: newQuantity }),
        }
      );

      const data = await response.json();
      if (data.statusCode === 200) {
        await fetchCartData(); // Re-fetch cart data after updating quantity
      } else {
        console.error("Error updating quantity:", data.message);
        setUpdatingProductId(null); // Reset updating state on error
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      setUpdatingProductId(null); // Reset updating state on error
    }
  };

  const handleIncrement = (cartId, productId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    updateQuantity(cartId, productId, newQuantity);
  };

  const handleDecrement = (cartId, productId, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      updateQuantity(cartId, productId, newQuantity);
    }
  };

  const handleNoteChange = (e) => {
    const value = e.target.value;
    setNote(value);
  
    if (value && !hasNote) {
      // Add the price increase if a note is added and it wasn't already added
      setSubtotal((prev) => prev + 30);
      setHasNote(true);
    } else if (!value && hasNote) {
      // Remove the price increase if the note is removed
      setSubtotal((prev) => prev - 30);
      setHasNote(false);
    }
  };

  const handleDeleteProduct = async (cartId) => {
    try {
      const response = await fetch(
        `https://bonnbackend.up.railway.app/api/v1/cart/remove-from-cart?cartId=${cartId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.statusCode === 200) {
        // Filter out the deleted product from cart data
        updateCartStatus();
        setCartData((prevData) =>
          prevData.filter((item) => item._id !== cartId)
        );
        const updatedSubtotal = cartData.reduce(
          (acc, item) =>
            item._id !== cartId ? acc + item.productPrice * item.productQuantity : acc,
          0
        );
        setSubtotal(updatedSubtotal);
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong while deleting the product.");
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    console.log("Checkbox is now:", e.target.checked);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CE0067]"></div>
      </div>
    );
  }

  if (!cartData.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
        <div className="text-xl text-gray-600">Your cart is empty</div>
        <Button
          onClick={() => navigate("/")}
          className="hover:bg-[#CE0067] hover:text-white px-6 py-2 rounded-md transition duration-500 bg-transparent outline outline-[1px] outline-[#CE0067] text-[#CE0067] hover:shadow-lg text-sm md:text-base"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 max-w-7xl mx-auto">
  {/* Cart Table */}
  <div
    className="overflow-y-auto w-full lg:w-3/4 max-h-[500px] rounded-md custom-scrollbar"
  >
    <Table
      aria-label="Cart Table"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      className="text-sm md:text-base"
    >
      <TableHeader>
        <TableColumn className="text-[#5C0977] font-semibold trajan">Product</TableColumn>
        <TableColumn className="text-[#5C0977] font-semibold trajan">Quantity</TableColumn>
        <TableColumn className="text-[#5C0977] font-semibold trajan">Price</TableColumn>
      </TableHeader>
      <TableBody>
        {cartData.map((item) => (
          <TableRow key={item._id}>
            <TableCell>
              <div className="flex items-center gap-2 md:gap-4">
                <img
                  src={item.productPic}
                  alt={`${item.productName}.webp`}
                  className="w-14 h-14 md:w-20 md:h-20 object-cover rounded-md border border-gray-200"
                />
                <span className="text-[12px] md:text-base times cursor-pointer hover:underline text-[#5C0977] font-medium">
                  <NavLink to={`/product-page/${item.productId}`}>
                    {item.productName}
                  </NavLink>
                </span>
              </div>
            </TableCell>
            <TableCell className="flex flex-col items-start mt-4">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 md:gap-2">
                  <Button
                    size="sm"
                    variant="flat"
                    className="min-w-6 md:min-w-8 h-6 md:h-8 px-1 md:px-2 bg-[#5C0977] text-white hover:bg-[#CE0067]"
                    onClick={() =>
                      handleDecrement(
                        item._id,
                        item.productId,
                        item.productQuantity
                      )
                    }
                    isDisabled={updatingProductId === item.productId}
                    isIconOnly
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={item.productQuantity}
                    readOnly
                    className="w-12 md:w-16 text-center border border-gray-300 rounded-md"
                    size="sm"
                    classNames={{
                      input: [
                        "text-center text-sm md:text-base",
                        "[appearance:textfield]",
                        "[&::-webkit-outer-spin-button]:appearance-none",
                        "[&::-webkit-inner-spin-button]:appearance-none",
                      ],
                      inputWrapper: "h-6 md:h-8 min-w-[3rem]",
                    }}
                    min={1}
                  />
                  <Button
                    size="sm"
                    variant="flat"
                    className="min-w-6 md:min-w-8 h-6 md:h-8 px-1 md:px-2 bg-[#5C0977] text-white hover:bg-[#CE0067]"
                    onClick={() =>
                      handleIncrement(
                        item._id,
                        item.productId,
                        item.productQuantity
                      )
                    }
                    isDisabled={updatingProductId === item.productId}
                    isIconOnly
                  >
                    +
                  </Button>
                </div>
                <p
                  className="times text-xs text-[#757575] cursor-pointer hover:underline"
                  onClick={() => handleDeleteProduct(item._id)}
                >
                  Remove
                </p>
              </div>
            </TableCell>
            <TableCell className="text-[12px] md:text-base times">
              Rs {item.productQuantity * item.productPrice}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>

  {/* Summary Section */}
  <div className="w-full lg:w-1/4">
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between text-sm md:text-base times">
        <span className="font-semibold text-[#5C0977]">Subtotal:</span>
        <span className="font-semibold text-[#CE0067]">Rs {subtotal}</span>
      </div>
      <Textarea
        fullWidth
        bordered
        color="default"
        placeholder="Order Notes"
        rows="4"
        value={note}
        onChange={(e) => handleNoteChange(e)}
        className="text-sm md:text-base times border-[#5C0977] rounded-md focus:ring focus:ring-[#CE0067]"
      />
      <div className="flex items-start gap-2 text-xs md:text-sm times text-[#757575]">
        <span>* Adding a note will increase the total cart value by Rs 30.</span>
      </div>
      <div className="flex items-start gap-2 text-xs md:text-sm times">
        <Checkbox 
        size="sm" 
        color="secondary" 
        onChange={handleCheckboxChange}
        checked={isChecked}
         />
        <span>
          I have read and agree to Terms and Conditions, Shipping and Return Policy
        </span>
      </div>
      <Button
        shadow
        color="error"
        className="bg-[#CE0067] w-full times text-white px-4 py-2 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067] hover:shadow-lg text-sm md:text-base"
        onClick={() => {
          isChecked? navigate("/checkout") : toast.info("Agree to Terms and Conditions to Proceed")
        }}
      >
        Checkout
      </Button>
      <Button
        onClick={() => navigate("/")}
        flat
        auto
        className="hover:bg-[#CE0067] w-full times hover:text-white px-4 py-2 rounded-md transition duration-500 bg-transparent outline outline-[1px] outline-[#CE0067] text-[#CE0067] hover:shadow-lg text-sm md:text-base"
      >
        Continue Shopping
      </Button>
    </div>
  </div>
</div>

  );
};

export default CartPage;















// import React, { useState, useEffect } from "react";
// import { Checkbox, Button, Textarea, Input } from "@nextui-org/react";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableColumn,
//   TableRow,
//   TableCell,
// } from "@nextui-org/table";
// import { NavLink, useNavigate } from "react-router-dom";
// import useStore from "@/store/store";

// const CartPage = () => {
//   const [cartData, setCartData] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [note, setNote] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [updatingProductId, setUpdatingProductId] = useState(null); // Track updating product
//   const [hasNote, setHasNote] = useState(false);
//   const [isTermsChecked, setIsTermsChecked] = useState(false); // Track checkbox state
//   const navigate = useNavigate();
//   const token = localStorage.getItem("accessToken");
//   const updateCartStatus = useStore((state) => state.updateCartStatus);

//   useEffect(() => {
//     fetchCartData();
//   }, []);

//   const fetchCartData = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         "http://localhost:4000/api/v1/cart/get-user-cart",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           credentials: "include",
//         }
//       );
//       const data = await response.json();
//       if (data.statusCode === 200) {
//         setCartData(data.data);
//         const total = data.data.reduce(
//           (acc, item) => acc + item.productPrice * item.productQuantity,
//           0
//         );
//         setSubtotal(total);
//       }
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//     } finally {
//       setIsLoading(false);
//       setUpdatingProductId(null); // Reset updating state
//     }
//   };

//   const handleTermsCheckboxChange = (e) => {
//     setIsTermsChecked(e.target.checked);
//   };

//   const handleNoteChange = (e) => {
//     const value = e.target.value;
//     setNote(value);

//     if (value && !hasNote) {
//       setSubtotal((prev) => prev + 30);
//       setHasNote(true);
//     } else if (!value && hasNote) {
//       setSubtotal((prev) => prev - 30);
//       setHasNote(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CE0067]"></div>
//       </div>
//     );
//   }

//   if (!cartData.length) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
//         <div className="text-xl text-gray-600">Your cart is empty</div>
//         <Button
//           onClick={() => navigate("/")}
//           className="hover:bg-[#CE0067] hover:text-white px-6 py-2 rounded-md transition duration-500 bg-transparent outline outline-[1px] outline-[#CE0067] text-[#CE0067] hover:shadow-lg text-sm md:text-base"
//         >
//           Continue Shopping
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 max-w-7xl mx-auto">
//       <div className="overflow-y-auto w-full lg:w-3/4 max-h-[500px] border border-gray-200 rounded-md custom-scrollbar">
//         {/* Cart Table */}
//       </div>
//       <div className="w-full lg:w-1/4">
//         <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-sm">
//           <div className="flex justify-between text-sm md:text-base times">
//             <span className="font-medium">Subtotal:</span>
//             <span className="font-medium">Rs {subtotal}</span>
//           </div>
//           <Textarea
//             fullWidth
//             bordered
//             color="default"
//             placeholder="Order Notes"
//             rows="4"
//             value={note}
//             onChange={handleNoteChange}
//             className="text-sm md:text-base"
//           />
//           <div className="flex items-start gap-2 text-xs md:text-sm times text-[#757575]">
//             <span>
//               * Adding a note will increase the total cart value by Rs 30.
//             </span>
//           </div>
//           <div className="flex items-start gap-2 text-xs md:text-sm times">
//             <Checkbox
//               size="sm"
//               isSelected={isTermsChecked}
//               onChange={handleTermsCheckboxChange}
//             />
//             <span>
//               I have read and agree to Terms and Conditions, Shipping and Return
//               Policy
//             </span>
//           </div>
//           <Button
//             shadow
//             color="error"
//             className="bg-[#CE0067] w-full times text-white px-4 py-2 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067] hover:shadow-lg text-sm md:text-base"
//             disabled={!isTermsChecked} // Disable button if checkbox is not checked
//           >
//             Checkout
//           </Button>
//           <Button
//             onClick={() => navigate("/")}
//             flat
//             auto
//             className="hover:bg-[#CE0067] w-full times hover:text-white px-4 py-2 rounded-md transition duration-500 bg-transparent outline outline-[1px] outline-[#CE0067] text-[#CE0067] hover:shadow-lg text-sm md:text-base"
//           >
//             Continue Shopping
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

