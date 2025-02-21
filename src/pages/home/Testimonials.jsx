const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah",
      role: "UX Designer",
      image: "/api/placeholder/100/100",
      rating: 5,
      title: "Elegant Gifts",
      description:
        "Presentation of Gifts is beautiful, Nice assortment of goodies that everyone will enjoy. Delivery is on time or early",
    },
    {
      id: 2,
      name: "Sarah",
      role: "UX Designer",
      image: "/api/placeholder/100/100",
      rating: 5,
      title: "Elegant Gifts",
      description:
        "Presentation of Gifts is beautiful, Nice assortment of goodies that everyone will enjoy. Delivery is on time or early",
    },
    {
      id: 3,
      name: "Sarah",
      role: "UX Designer",
      image: "/api/placeholder/100/100",
      rating: 5,
      title: "Elegant Gifts",
      description:
        "Presentation of Gifts is beautiful, Nice assortment of goodies that everyone will enjoy. Delivery is on time or early",
    },
  ];

  return (
    <div className="bg-white md:py-16 px-4 md:px-5">
      <h2 className="trajan text-[28px] md:text-[40px] text-center pb-4">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="border border-[#BD9153] rounded-lg p-4 md:p-6 shadow-lg flex flex-col items-center justify-evenly text-center h-auto md:h-[550px]"
          >
            {/* Profile Image and Info */}
            <div className="w-full flex flex-col sm:flex-row items-center sm:items-start sm:justify-start gap-4 sm:gap-8 mb-4 md:mb-0">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 sm:w-[133px] sm:h-[133px] rounded-full"
              />
              {/* Name and Role */}
              <div className="flex flex-col items-center sm:items-start justify-center">
                <h3 className="text-2xl sm:text-3xl lg:text-[40px] font-semibold trajan">
                  {testimonial.name}
                </h3>
                <p className="text-gray-500 text-lg sm:text-xl lg:text-[25px] times">
                  {testimonial.role}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="w-full flex items-center justify-center sm:justify-start gap-2 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <span key={index} className="text-[#BD9153] text-xl sm:text-2xl lg:text-[32px]">
                  ★
                </span>
              ))}
            </div>

            {/* Title */}
            <h4 className="text-[#BD9153] w-full text-center sm:text-start font-semibold mb-2 trajan text-xl sm:text-2xl lg:text-[32px]">
              {testimonial.title}
            </h4>

            {/* Description */}
            <p className="text-gray-700 w-full text-center sm:text-start text-base sm:text-lg lg:text-[20px] mb-4 times">
              {testimonial.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;