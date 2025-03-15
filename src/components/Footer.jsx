import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/BonnTonnGourmet/', icon: '/./facebook.jpg' },
    { name: 'Instagram', url: 'https://www.instagram.com/bonn.tonn/', icon: '/./instagram.jpg' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/bonntonn/?originalSubdomain=in', icon: '/./linkdin.jpg' }
  ];

  const brandLinks = [
    { name: 'About Us', url: '/about' },
    { name: 'Return Policy', url: '#' },
    { name: 'Shipping Info', url: '#' },
    { name: 'Privacy Policy', url: '/privacy' }
  ];

  return (
    <div className="bg-[#BD9153] relative overflow-hidden">
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">
          {/* Logo and Order Section */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start space-y-8">
            <div className="w-52 transform transition hover:opacity-90 duration-300">
              <img src="/./whiteLogo.png" alt="Bonntonn Logo" className="w-full drop-shadow-md" />
            </div>
            
            <div className="w-full space-y-5">
              <h3 className="text-white text-lg font-semibold tracking-wider text-center md:text-left trajan">
                ORDER WITH US
              </h3>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {/* Swiggy */}
                <NavLink to="https://www.swiggy.com/city/kolkata/bonn-tonn-gourmet-opposite-papillon-flower-shop-alipore-rest705986" 
                  className="transform transition duration-300 hover:scale-105">
                  <div className="bg-white rounded-xl flex justify-center items-center p-2.5 shadow-md w-24 h-12">
                    <img className="w-20 object-contain" src="/./swiggy-logo.png" alt="Swiggy" />
                  </div>
                </NavLink>
                
                {/* Zomato */}
                <NavLink to="https://www.zomato.com/kolkata/bonntonn-gourmet-gift-studio-alipore" 
                  className="transform transition duration-300 hover:scale-105">
                  <div className="bg-white rounded-xl flex justify-center items-center p-2.5 shadow-md w-24 h-12">
                    <img className="w-20 object-contain" src="/./zomato-logo.png" alt="Zomato" />
                  </div>
                </NavLink>
                
                {/* Order Direct */}
                <NavLink to="https://bonntonn.petpooja.com" 
                  className="transform transition duration-300 hover:scale-105">
                  <div className="bg-white rounded-xl flex justify-center items-center p-2.5 shadow-md w-48 h-12">
                    <img className="w-full object-contain" src="/./orderkolk.webp" alt="Order Direct" />
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
          
          {/* Brand Section */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
            <h3 className="text-white text-xl font-bold mb-8 tracking-wider trajan">THE BRAND</h3>
            
            <ul className="flex flex-col space-y-5">
              {brandLinks.map((link, index) => (
                <li key={index}>
                  <NavLink 
                    to={link.url}
                    className="text-white times text-lg relative group"
                  >
                    <span className="group-hover:text-[#f8ecd9] transition-colors duration-300">{link.name}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/70 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Section */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <h3 className="text-white text-xl font-bold mb-8 tracking-wider trajan">CONTACT US</h3>
            
            <div className="flex flex-col space-y-5 text-center md:text-left">
              <p className="times text-white text-lg hover:text-[#f8ecd9] transition-colors duration-300 cursor-pointer">
                9874451300
              </p>
              
              <p className="times text-white text-lg hover:text-[#f8ecd9] transition-colors duration-300 cursor-pointer">
                bonntonn.kolkata@gmail.com
              </p>
              
              <div className="flex justify-center md:justify-start space-x-6 mt-6">
                {socialLinks.map((social, index) => (
                  <NavLink 
                    key={index}
                    to={social.url} 
                    className="transition duration-300 transform hover:scale-110"
                    aria-label={social.name}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-lg">
                      <img 
                        className="w-full h-full object-cover" 
                        src={social.icon} 
                        alt={social.name} 
                      />
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section with elegant divider */}
        <div className="mt-16 pt-8 relative">
          {/* Decorative divider */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/90 times text-base">
              &copy; {currentYear} Bonntonn Gourmet Gift Studio. All Rights Reserved.
            </p>
            
            <div className="text-white/80 times text-base italic">
              Crafted with elegance for the finest gourmet experience
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;