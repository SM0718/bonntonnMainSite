import React from "react";

const AccountPage = () => {
  return (
    <div className="flex justify-evenly items-start p-10">
      {/* Left Section */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#757575] trajan">Sagnik Majumder</h1>
          <p className="text-gray-600 times">sagnik@gmail.com</p>
        </div>
        <button className="text-[#757575] hover:underline font-lg trajan text-start">Sign Out</button>
        
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
