import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Brian Grevy",
      role: "Hunk Moller CEO",
      image: "/hunk.jpg",
      rating: 5,
      title: "Elegant Gifts",
      description:
        "Presentation of Gifts is beautiful, Nice assortment of goodies that everyone will enjoy. Delivery is on time or early",
    },
    {
      id: 2,
      name: "Tushar Choudhary",
      role: "Motovolt CEO",
      image: "/motovolt.jpg",
      rating: 5,
      title: "Elegant Gifts",
      description:
        "Presentation of Gifts is beautiful, Nice assortment of goodies that everyone will enjoy. Delivery is on time or early",
    },
    {
      id: 3,
      name: "Eraldo Poletto",
      role: "Diesel CEO",
      image: "/diesel.png",
      rating: 5,
      title: "Elegant Gifts",
      description:
        "Presentation of Gifts is beautiful, Nice assortment of goodies that everyone will enjoy. Delivery is on time or early",
    },
  ];

  // Custom hook for intersection observer animation
  const useInView = (options) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = React.useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setIsVisible(entry.isIntersecting);
      }, options);

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [ref, options]);

    return [ref, isVisible];
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    },
    hover: { 
      y: -10, 
      boxShadow: "0 20px 25px -5px rgba(189, 145, 83, 0.2), 0 10px 10px -5px rgba(189, 145, 83, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const starVariants = {
    initial: { scale: 0 },
    animate: (i) => ({
      scale: 1,
      transition: { delay: i * 0.1, type: "spring", stiffness: 200 }
    })
  };

  const [sectionRef, inView] = useInView({ threshold: 0.1 });

  return (
    <div ref={sectionRef} className="bg-white md:py-16 px-4 md:px-5 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-[#BD9153] opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 md:w-80 md:h-80 bg-[#BD9153] opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.7 }}
        className="trajan text-[28px] md:text-[40px] text-center pb-8 relative"
      >
        <span className="relative inline-block">
          Testimonials
          <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#BD9153]"></span>
        </span>
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={testimonial.id}
            variants={cardVariants}
            whileHover="hover"
            custom={idx}
            className="border border-[#BD9153] rounded-lg p-6 md:p-8 shadow-lg flex flex-col items-center justify-evenly text-center h-auto md:h-[550px] backdrop-blur-sm bg-white bg-opacity-90 relative overflow-hidden group"
          >
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#BD9153] opacity-60 transform -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#BD9153] opacity-60 transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></div>

            {/* Profile Image and Info */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2 + 0.3, duration: 0.5 }}
              className="w-full flex flex-col sm:flex-row items-center sm:items-start sm:justify-start gap-4 sm:gap-8 mb-6"
            >
              <div className="relative rounded-full">
                <div className="absolute inset-0 rounded-full bg-[#BD9153] opacity-20 animate-pulse"></div>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 sm:w-[133px] sm:h-[133px] rounded-full object-cover border-2 border-[#BD9153] relative z-10 shadow-md"
                />
              </div>
              
              {/* Name and Role */}
              <div className="flex flex-col items-center sm:items-start justify-start mt-3 sm:mt-6">
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-start trajan text-gray-800 tracking-wide">
                  {testimonial.name}
                </h3>
                <p className="text-gray-500 text-lg sm:text-xl lg:text-[22px] times italic">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>

            {/* Rating */}
            <div className="w-full flex items-center justify-center sm:justify-start gap-2 mb-5">
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={starVariants}
                  initial="initial"
                  animate="animate"
                  className="text-[#BD9153] text-xl sm:text-2xl lg:text-[28px] filter drop-shadow-sm"
                >
                  ★
                </motion.span>
              ))}
            </div>

            {/* Title */}
            <motion.h4
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 + 0.5, duration: 0.5 }}
              className="text-[#BD9153] w-full text-center sm:text-start font-semibold mb-3 trajan text-xl sm:text-2xl lg:text-[28px] tracking-wide relative"
            >
              {testimonial.title}
            </motion.h4>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.2 + 0.7, duration: 0.5 }}
              className="text-gray-700 w-full text-center sm:text-start text-base sm:text-lg lg:text-[20px] mb-4 times leading-relaxed"
            >
              "{testimonial.description}"
            </motion.p>

            {/* Decorative quote mark */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#BD9153] opacity-5 text-9xl font-serif">❝</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Testimonials;