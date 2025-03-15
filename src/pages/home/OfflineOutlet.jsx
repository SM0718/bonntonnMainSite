import React from "react";
import { MapPin, Navigation, Phone, Clock } from "lucide-react";

const OfflineOutlet = () => {
  const storeDetails = {
    address: "Flat 2B, Alipore Residency, 3, Burdwan Rd, Near State Bank, Alipore, Kolkata, West Bengal 700027",
    phone: "+91 98765 43210",
    hours: "Mon-Sat: 10AM-8PM | Sun: 11AM-6PM",
    mapUrl: "https://www.google.com/maps/dir//Flat+2B,+Alipore+Residency,+3,+Burdwan+Rd,+Near+State+Bank,+Alipore,+Kolkata,+West+Bengal+700027/@22.5219197,88.2464206,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3a02776db8bc1bd7:0xd2040572368df3b1!2m2!1d88.3288222!2d22.5219407?entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D"
  };

  return (
    <div className="relative py-16 bg-white text-black overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#BD9153]/10 rounded-full -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#BD9153]/10 rounded-full translate-x-1/3 translate-y-1/3 z-0"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
        {/* Elegant section header */}
        <div className="text-center mb-10">
          <h2 className="trajan text-3xl md:text-4xl font-light mb-4 tracking-wide">Visit Our Store</h2>
          <div className="w-16 h-[2px] bg-[#BD9153] mx-auto my-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium times">Experience the full range of our delightful chocolate creations in person at our flagship store.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">
          {/* Map section with enhanced styling */}
          <div className="w-full md:w-3/5 h-[350px] md:h-[500px] overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.8816140565674!2d88.33139981504826!3d22.524464285208842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277d0875e3897%3A0xa17c93567b75a1d2!2sBonn%20Tonn%20Gourmet!5e0!3m2!1sen!2sin!4v1697057983738!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl"
              title="Store Location"
            ></iframe>
          </div>
          
          {/* Store details section with elegant formatting */}
          <div className="w-full md:w-2/5 flex flex-col justify-center space-y-8 p-6 bg-gray-50 rounded-xl shadow-md">
            <div className="text-center md:text-left">
              <h3 className="trajan text-2xl mb-2 font-light tracking-wide">Our Flagship Store</h3>
              <div className="w-12 h-px bg-gray-300 mx-auto md:mx-0 mb-6"></div>
            </div>
            
            {/* Contact details with icons */}
            <div className="space-y-6 times">
              <div className="flex items-start space-x-4">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <MapPin size={18} className="text-gray-700" />
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-700 mb-1">ADDRESS</p>
                  <p className="text-gray-600 font-light">{storeDetails.address}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Phone size={18} className="text-gray-700" />
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-700 mb-1">PHONE</p>
                  <p className="text-gray-600 font-light">{storeDetails.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Clock size={18} className="text-gray-700" />
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-700 mb-1">OPENING HOURS</p>
                  <p className="text-gray-600 font-light">{storeDetails.hours}</p>
                </div>
              </div>
            </div>
            
            {/* Elegant call-to-action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={storeDetails.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-white text-gray-800 border border-gray-300 hover:border-gray-800 transition-colors duration-300 py-3 px-6 rounded-md text-sm tracking-wide shadow-sm"
              >
                <Navigation size={16} />
                <span className="times">Get Directions</span>
              </a>
              
              <a
                href={`tel:${storeDetails.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-800 border border-gray-200 hover:bg-white transition-colors duration-300 py-3 px-6 rounded-md text-sm tracking-wide shadow-sm"
              >
                <Phone size={16} />
                <span className="times">Call Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineOutlet;