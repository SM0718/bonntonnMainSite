import React, { useState, useEffect } from "react";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { NavLink } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import Trash2 from "@/svg/Trash2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStore from "@/store/store";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [newAddress, setNewAddress] = useState({
    houseName: "",
    houseNumber: "",
    streetName: "",
    city: "",
    pincode: "",
    landmark: "",
    phone: ""
  });
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const navigate = useNavigate()
  const token = localStorage.getItem('accessToken');

  const currentUser = async () => {

    try {
      const [userData, addressResponse] = await Promise.all([
        getCurrentUser(),
        fetch('https://bonnbackend.up.railway.app/api/v1/address/get-address', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        })
      ]);

      if (userData.statusCode === 200) {
        setUser(userData.data);
      } else {
        setUser(null);
      }

      if (addressResponse.ok) {
        const addressData = await addressResponse.json();
        if (addressData.statusCode === 200) {
          console.log(addressData)
          setAddresses(addressData.data);
        } else {
          setAddresses([]);
        }
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setUser(null);
      setAddresses([]);
    }
  };

  const handleAddAddress = async (e) => {
    console.log(newAddress)
    e.preventDefault();
    try {
      const response = await fetch('https://bonnbackend.up.railway.app/api/v1/address/add-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(newAddress),
      });

      if (response.ok) {
        console.log(response)
        if(response.status === 200) {
          toast.success("Address added successfully", {
            position: "top-right"
          })
          console.log(await response.json())
          setShowAddressModal(false);
          currentUser();
          setNewAddress({
            houseName: "",
            houseNumber: "",
            streetName: "",
            city: "",
            pincode: "",
            landmark: "",
            phone: ""
          });
        } else if(response.status === 204) {
          toast.info("Address already exist", {
            position: "top-right"
          })
          console.log(await response.json())
          setNewAddress({
            houseName: "",
            houseNumber: "",
            streetName: "",
            city: "",
            pincode: "",
            landmark: "",
            phone: ""
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    console.log(addressId)
    try {
      const response = await fetch(`https://bonnbackend.up.railway.app/api/v1/address/delete-address?addressId=${addressId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        currentUser();
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const logout = async () => {
    try {
      const request = await fetch(`https://bonnbackend.up.railway.app/api/v1/users/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (request.ok) {
        const data = await request.json();
        if (data.statusCode === 200) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-evenly items-start p-4 md:p-10">
      {/* Left Section */}
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        {user ? (
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-[#757575] trajan">{user.fullName}</h1>
            <p className="text-gray-600 times">{user.email}</p>
          </div>
        ) : (
          <div className="text-xl md:text-2xl trajan">Login To See Account Details</div>
        )}

        {user ? (
          <button
            onClick={logout}
            className="text-[#757575] hover:underline text-lg trajan text-start"
          >
            Sign Out
          </button>
        ) : (
          <NavLink
            to="/login"
            className="text-[#757575] hover:underline text-lg trajan text-start"
          >
            Login
          </NavLink>
        )}

        <div className="flex flex-col gap-2">
          <p className="text-gray-600 times">
            Address <span>({addresses.length})</span>
          </p>
          {addresses.length > 0 && (
            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto custom-scrollbar">
              {addresses.map((addr) => (
                <div key={addr._id} className="p-3 border rounded-md bg-white flex justify-between items-start">
                  <div>
                    <p className="times font-semibold">{addr.houseName}</p>
                    <p className="times">{`${addr.houseNumber}, ${addr.streetName}`}</p>
                    <p className="times">{`${addr.city} - ${addr.pincode}`}</p>
                    {addr.landmark && (
                      <p className="times text-gray-600">Landmark: {addr.landmark}</p>
                    )}
                    <p className="times text-gray-600">Phone: {addr.phone}</p>
                  </div>
                  <Button
                    onClick={() => handleDeleteAddress(addr._id)}
                    className="text-[#BD9153]"
                    variant="light"
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <Button
            // onClick={() => setShowAddressModal(true)}
            onPress={onOpen}
            className="bg-[#BD9153] times w-[150px] text-white py-2 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#BD9153] hover:text-[#BD9153]"
          >
            Add Address
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full mt-8 md:mt-0 md:w-1/3">
        <h1 className="text-lg md:text-xl font-bold trajan text-[#757575]">ACCOUNT</h1>
        <h2 className="mt-4 text-md md:text-lg font-semibold trajan text-[#757575]">Order History</h2>
        <p className="text-gray-800 times">You haven't placed any Orders yet</p>
      </div>

      {/* Add Address Modal */}
      <Modal 
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        // onClose={() => setShowAddressModal(false)}
        size="md"
      >
        <ModalContent>
          {(onClose) => (
            <>
          <ModalHeader>
            <h3 className="text-xl trajan text-[#757575]">Add New Address</h3>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleAddAddress} className="flex flex-col gap-4">
              <Input
                label="House Name"
                value={newAddress.houseName}
                onChange={(e) => setNewAddress({...newAddress, houseName: e.target.value})}
                required
              />
              <Input
                label="House/Flat Number"
                value={newAddress.houseNumber}
                onChange={(e) => setNewAddress({...newAddress, houseNumber: e.target.value})}
                required
              />
              <Input
                label="Street Name"
                value={newAddress.streetName}
                onChange={(e) => setNewAddress({...newAddress, streetName: e.target.value})}
                required
              />
              <Input
                label="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                required
              />
              <Input
                label="PIN Code"
                value={newAddress.pincode}
                onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                required
              />
              <Input
                label="Landmark"
                value={newAddress.landmark}
                onChange={(e) => setNewAddress({...newAddress, landmark: e.target.value})}
              />
              <Input
                label="Phone Number"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                required
              />
              <ModalFooter className="flex justify-end gap-2">
                <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit" className="bg-[#CE0067] text-white">
                    Save Address
                  </Button>
                
              </ModalFooter>
            </form>
          </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AccountPage;
