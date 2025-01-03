import React, { useState, useEffect } from "react";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { NavLink } from "react-router-dom";

const AccountPage = () => {

  const [user, setUser] = useState(null)
  const token = localStorage.getItem('accessToken');

  const currentUser = async () => {
    try {
      const data = await getCurrentUser();
      if (data.statusCode === 200) {
        console.log(data); // Logs user data for verification
        setUser(data.data); // Store the user data in state
      } else {
        setUser(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    try {
      const request = await fetch(`http://localhost:4000/api/v1/users/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      })

      if(request.ok) {
        const data = await request.json()
        if(data.statusCode === 200) {
          window.location.reload(); 
        }
      }

    } catch (error) {
      console.log(error) 
    }
  }

  useEffect(() => {
    currentUser()
  }, []);
  
  return (
    <div className="flex justify-evenly items-start p-10">
      {/* Left Section */}
      <div className="flex flex-col gap-4">

        {
          user ? <div>
          <h1 className="text-2xl font-semibold text-[#757575] trajan">{user && user.fullName}</h1>
          <p className="text-gray-600 times">{user && user.email}</p>
        </div> : <div className={"text-2xl trajan"}>Login To See Account Details</div>
        }
        
        {
          user? <button onClick={() => logout()} className="text-[#757575] hover:underline font-lg trajan text-start">Sign Out</button>
          : <NavLink to={'/login'} className={"text-[#757575] hover:underline font-lg trajan text-start"}>Login</NavLink>
        }
        
        <div className="flex flex-col gap-2">
          <p className="text-gray-600 times">
            Address <span>(0)</span>
          </p>
          <button className="bg-[#CE0067] w-[150px] mr-auto text-white py-2 rounded-md transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]">
            View Address
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div>
        <h1 className="text-xl font-bold trajan text-[#757575]">ACCOUNT</h1>
        <h2 className="mt-4 text-lg font-semibold trajan text-[#757575]">Order History</h2>
        <p className="text-gray-800 times">You haven't placed any Orders yet</p>
      </div>
    </div>
  );
};

export default AccountPage;
