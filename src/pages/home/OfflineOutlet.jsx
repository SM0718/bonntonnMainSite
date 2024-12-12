import React from "react";

const OfflineOutlet = () => {
  return (
<div className="text-center px-24 py-12 w-full h-[500px] flex flex-col justify-center items-center bg-white">
  <div className="w-full h-[500px] flex justify-center items-center mb-4">
    <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.8816140565674!2d88.33139981504826!3d22.524464285208842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277d0875e3897%3A0xa17c93567b75a1d2!2sBonn%20Tonn%20Gourmet!5e0!3m2!1sen!2sin!4v1697057983738!5m2!1sen!2sin"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="rounded-lg"
  ></iframe>

  </div>
  <a
    href="https://www.google.com/maps/dir//Flat+2B,+Alipore+Residency,+3,+Burdwan+Rd,+Near+State+Bank,+Alipore,+Kolkata,+West+Bengal+700027/@22.5219197,88.2464206,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3a02776db8bc1bd7:0xd2040572368df3b1!2m2!1d88.3288222!2d22.5219407?entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 underline"
  >
    Get Directions on Google Maps
  </a>
</div>

  );
};

export default OfflineOutlet;
