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
import { motion } from "framer-motion";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
  const navigate = useNavigate();
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
        if (response.status === 200) {
          toast.success("Address added successfully", { position: "top-right" });
          currentUser();
          setNewAddress({
            houseName: "", houseNumber: "", streetName: "", city: "", pincode: "", landmark: "", phone: ""
          });
          onOpenChange(false);
        } else if (response.status === 204) {
          toast.info("Address already exists", { position: "top-right" });
          setNewAddress({
            houseName: "", houseNumber: "", streetName: "", city: "", pincode: "", landmark: "", phone: ""
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
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
        toast.info("Address deleted", { position: "top-right" });
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
    <div className="relative min-h-screen bg-gradient-to-b from-white to-[#faf9f6] px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 rounded-3xl shadow-xl p-8 border border-[#BD9153]/10 backdrop-blur-sm mb-12"
        >
          <h1 className="text-4xl trajan font-bold text-gray-800 tracking-wide">Your Account</h1>
          <div className="w-24 h-1 bg-[#BD9153] rounded-full my-4"></div>
          {user ? (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <p className="text-xl times font-semibold text-[#BD9153]">{user.fullName}</p>
                <p className="text-gray-600 times mt-1">{user.email}</p>
              </div>
              <Button
                onClick={logout}
                className="mt-4 sm:mt-0 bg-transparent border-2 border-[#BD9153] text-[#BD9153] rounded-xl hover:bg-[#BD9153] hover:text-white transition-all duration-300"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-xl times text-gray-600 italic">Please log in to view your account details.</p>
              <NavLink to="/login">
                <Button className="bg-[#BD9153] text-white rounded-xl hover:bg-[#d5b27c] transition-all duration-300">
                  Login
                </Button>
              </NavLink>
            </div>
          )}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Addresses Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 rounded-3xl shadow-xl p-8 border border-[#BD9153]/10 backdrop-blur-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl trajan font-semibold text-gray-800 tracking-wide">Saved Addresses ({addresses.length})</h2>
              {user && (
                <Button
                  onPress={onOpen}
                  className="bg-[#BD9153] text-white rounded-xl hover:bg-[#d5b27c] transition-all duration-300 shadow-md"
                >
                  Add New Address
                </Button>
              )}
            </div>
            {addresses.length > 0 ? (
              <div className="space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                {addresses.map((addr) => (
                  <motion.div 
                    key={addr._id}
                    whileHover={{ y: -3 }}
                    className="p-5 bg-white rounded-2xl shadow-md border border-[#BD9153]/10 flex justify-between items-start transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="space-y-1">
                      <p className="times font-semibold text-gray-800 text-lg">{addr.houseName}</p>
                      <p className="times text-gray-700">{`${addr.houseNumber}, ${addr.streetName}`}</p>
                      <p className="times text-gray-700">{`${addr.city} - ${addr.pincode}`}</p>
                      {addr.landmark && (
                        <p className="times text-gray-600 italic">Landmark: {addr.landmark}</p>
                      )}
                      <p className="times text-gray-600">Phone: {addr.phone}</p>
                    </div>
                    <Button
                      onClick={() => handleDeleteAddress(addr._id)}
                      className="text-[#BD9153] bg-transparent hover:bg-[#BD9153]/10 rounded-full p-2 transition-all duration-300"
                      variant="light"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 times italic">No saved addresses yet.</p>
            )}
          </motion.div>

          {/* Order History Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/90 rounded-3xl shadow-xl p-8 border border-[#BD9153]/10 backdrop-blur-sm"
          >
            <h2 className="text-2xl trajan font-semibold text-gray-800 tracking-wide mb-6">Order History</h2>
            <p className="text-gray-600 times italic">You haven't placed any orders yet.</p>
          </motion.div>
        </div>
      </div>

      {/* Add Address Modal */}
      <Modal 
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        className="rounded-3xl"
        backdrop="blur"
      >
        <ModalContent className="bg-white/95 backdrop-blur-md border border-[#BD9153]/10 shadow-2xl">
          {(onClose) => (
            <>
              <ModalHeader className="p-6">
                <h3 className="text-2xl trajan font-bold text-gray-800 tracking-wide">Add New Address</h3>
              </ModalHeader>
              <ModalBody className="p-6">
                <form onSubmit={handleAddAddress} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="House Name"
                    value={newAddress.houseName}
                    onChange={(e) => setNewAddress({...newAddress, houseName: e.target.value})}
                    required
                    className="rounded-xl border-[#BD9153]/20 focus:ring-[#BD9153] times"
                  />
                  <Input
                    label="House/Flat Number"
                    value={newAddress.houseNumber}
                    onChange={(e) => setNewAddress({...newAddress, houseNumber: e.target.value})}
                    required
                    className="rounded-xl border-[#BD9153]/20 focus:ring-[#BD9153] times"
                  />
                  <Input
                    label="Street Name"
                    value={newAddress.streetName}
                    onChange={(e) => setNewAddress({...newAddress, streetName: e.target.value})}
                    required
                    className="rounded-xl border-[#BD9153]/20 focus:ring-[#BD9153] times"
                  />
                  <Input
                    label="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                    required
                    className="rounded-xl border-[#BD9153]/20 focus:ring-[#BD9153] times"
                  />
                  <Input
                    label="PIN Code"
                    value={newAddress.pincode}
                    onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                    required
                    className="rounded-xl border-[#BD9153]/20 focus:ring-[#BD9153] times"
                  />
                  <Input
                    label="Landmark (Optional)"
                    value={newAddress.landmark}
                    onChange={(e) => setNewAddress({...newAddress, landmark: e.target.value})}
                    className="rounded-xl border-[#BD9153]/20 focus:ring-[#BD9153] times"
                  />
                  <Input
                    label="Phone Number"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                    required
                    className="rounded-xl border-[#BD9153]/20 focus:ring-[#BD9153] times"
                  />
                </form>
              </ModalBody>
              <ModalFooter className="p-6 flex justify-end gap-4">
                <Button 
                  color="danger" 
                  variant="light" 
                  onPress={onClose}
                  className="rounded-xl text-[#BD9153] hover:bg-[#BD9153]/10 transition-all duration-300"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  onClick={handleAddAddress}
                  className="bg-[#BD9153] text-white rounded-xl hover:bg-[#d5b27c] transition-all duration-300 shadow-md"
                >
                  Save Address
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AccountPage;