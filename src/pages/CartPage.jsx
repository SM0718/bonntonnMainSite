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
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [baseSubtotal, setBaseSubtotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubtotal = async () => {
      const response = { subtotal: 800 };
      setBaseSubtotal(response.subtotal);
      setSubtotal(response.subtotal);
    };
    fetchSubtotal();
  }, []);

  const handleNoteChange = (e) => {
    const value = e.target.value.trim();
    setNote(value);
    setSubtotal(baseSubtotal + (value ? 10 : 0));
  };

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

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Cart Table */}
      <div className="w-full lg:w-3/4 overflow-x-auto">
        <Table
          aria-label="Cart Table"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
          className="text-sm md:text-base"
        >
          <TableHeader>
            <TableColumn>Product</TableColumn>
            <TableColumn>Quantity</TableColumn>
            <TableColumn>Price</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>
                <div className="flex items-center gap-2 md:gap-4">
                  <img
                    src="./homeImages/1.jpg"
                    alt="Product"
                    className="w-14 h-14 md:w-20 md:h-20 object-cover rounded-md"
                  />
                  <span className="text-[12px] md:text-base">Hazelnut Chocolate</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 md:gap-2">
                  <Button
                    size="sm"
                    variant="flat"
                    className="min-w-6 md:min-w-8 h-6 md:h-8 px-1 md:px-2"
                    onClick={decrement}
                    isIconOnly
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={handleInputChange}
                    className="w-12 md:w-16"
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
                    className="min-w-6 md:min-w-8 h-6 md:h-8 px-1 md:px-2"
                    onClick={increment}
                    isIconOnly
                  >
                    +
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-[12px] md:text-base">Rs 800</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Summary Section */}
      <div className="w-full lg:w-1/4">
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between text-sm md:text-base">
            <span className="font-medium">Subtotal:</span>
            <span className="font-medium">Rs {subtotal}</span>
          </div>
          <Textarea
            fullWidth
            bordered
            color="default"
            placeholder="Order Notes"
            rows="4"
            value={note}
            onChange={handleNoteChange}
            className="text-sm md:text-base"
          />
          <div className="flex items-start gap-2 text-xs md:text-sm">
            <Checkbox size="sm" />
            <span>
              I have read and agree to Terms and Conditions, Shipping and Return Policy
            </span>
          </div>
          <Button
            shadow
            color="error"
            className="bg-[#CE0067] w-full text-white px-4 py-2 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067] hover:shadow-lg text-sm md:text-base"
          >
            Checkout
          </Button>
          <Button
            onClick={() => navigate("/")}
            flat
            auto
            className="hover:bg-[#CE0067] w-full hover:text-white px-4 py-2 rounded-md transition duration-500 bg-transparent outline outline-[1px] outline-[#CE0067] text-[#CE0067] hover:shadow-lg text-sm md:text-base"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
