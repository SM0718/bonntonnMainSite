import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import { Spinner, Button, Card } from '@nextui-org/react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    try {
      setError(null);
      const request = await fetch('https://bonnbackend.up.railway.app/api/v1/wishlists/get-wishlist', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (request.ok) {
        const response = await request.json();
        console.log(response.data[0].productDetails.variant[0].foodType)
        setWishlist(response.data);
      } else {
        const errorData = await request.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch wishlist');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message || 'An error occurred while fetching your wishlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleMouseEnter = (itemId) => {
    setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const deleteFromWishlist = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDeleting) return;

    // Optimistic UI Update
    const updatedWishlist = wishlist.filter((item) => item._id !== id);
    setWishlist(updatedWishlist);

    try {
      setIsDeleting(true);
      const endpoint = `https://bonnbackend.up.railway.app/api/v1/wishlists/delete-from-wishlist?productId=${id}`;

      const request = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (request.ok) {
        toast.success('Product Removed From Wishlist', {
          position: 'top-right',
          autoClose: 1000,
          theme: 'dark',
        });
      } else {
        throw new Error('Failed to delete item from wishlist');
      }
    } catch (error) {
      console.error('Error deleting from wishlist:', error);
      toast.error('Failed to remove product from wishlist', {
        position: 'top-right',
        autoClose: 1000,
        theme: 'dark',
      });
      // No need to revert optimistic update here
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
        <Spinner size="lg" className="mb-4" />
        <p className="text-gray-600 text-lg">Loading your wishlist...</p>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
  //       <p className="text-red-600 text-lg mb-4">{error}</p>
  //       <Button 
  //         onClick={fetchWishlist}
  //         className="bg-[#CE0067] text-white px-4 py-2 rounded-md"
  //       >
  //         Try Again
  //       </Button>
  //     </div>
  //   );
  // }

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2 trajan">Your wishlist is empty</h3>
          <p className="text-gray-600 mb-4 times">Start adding items to your wishlist to save them for later!</p>
          <Button 
            onClick={() => navigate('/')} 
            className="bg-[#CE0067] w-1/2 text-white px-4 py-2 times rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]"
          >
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 trajan">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => {
          const variant = item.productDetails.variant[0];
          const isHovered = hoveredItem === item._id;

          return (
            <NavLink 
              to={`/product-page/${item.productDetails._id}`} 
              key={item._id}
              className="block"
            >
              <Card 
                className="relative cursor-pointer overflow-hidden transition-transform transform hover:scale-105"
                onMouseEnter={() => handleMouseEnter(item._id)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={isHovered ? variant.variantPic_2 : variant.variantPic_1}
                  alt={variant.variantName}
                  className="w-full h-48 object-cover"
                />
                <div>
                  <div className="px-4 py-2 flex justify-between items-center times">
                    <h3 className="text-lg font-semibold">{variant.variantName}</h3>
                    <p className="text-lg text-gray-600">Rs {variant.variantPrice}</p>
                  </div>
                  <div className='px-4 times text-[#757575]'>
                    <p>{variant.foodType}</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    onClick={(e) => deleteFromWishlist(e, item._id)}
                    isIconOnly 
                    className="bg-white min-w-unit-8 h-unit-8 rounded-full"
                    size="sm"
                    disabled={isDeleting}
                  >
                    <X size={16} />
                  </Button>
                </div>

                <Button className="bg-[#CE0067] mx-auto w-5/6 text-white px-4 py-2 my-4 times rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]">
                  Add To Cart
                </Button>
              </Card>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
