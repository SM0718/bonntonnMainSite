const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah",
      role: "UX Designer",
      image: "https://via.placeholder.com/100", // Replace with actual image URL
      rating: 5,
      title: "Elegant Gifts",
      description:
        "Presentation of Gifts is beautiful, Nice assortment of goodies that everyone will enjoy. Delivery is on time or early",
    },
    {
      id: 2,
      name: "Sarah",
      role: "UX Designer",
      image: "https://via.placeholder.com/100", // Replace with actual image URL
      rating: 5,
      title: "Elegant Gifts",
      description:
        "Presentation of Gifts is beautiful, Nice assortment of goodies that everyone will enjoy. Delivery is on time or early",
    },
    {
      id: 3,
      name: "Sarah",
      role: "UX Designer",
      image: "https://via.placeholder.com/100", // Replace with actual image URL
      rating: 5,
      title: "Elegant Gifts",
      description:
        "Presentation of Gifts is beautiful, Nice assortment of goodies that everyone will enjoy. Delivery is on time or early",
    },
  ];

  return (
    <div className="bg-white py-16 px-5">
      <h2 className="trajan text-[40px] text-center text-black py-4">Testimonials</h2>
      <div className="h-[550px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="border border-purple-500 rounded-lg p-6 shadow-lg flex flex-col items-center justify-evenly text-center"
          >
            {/* Profile Image */}
            <div className="w-full flex justify-start gap-8">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-[133px ] h-[133px ] rounded-full mb-4"
              />
              {/* Name and Role */}
              <div className="flex flex-col items-start justify-center">
                <h3 className="text-[40px] font-semibold trajan">{testimonial.name}</h3>
                <p className="text-gray-500 text-[25px] times">{testimonial.role}</p>
              </div>
              
            </div>
            

            {/* Rating */}
            <div className="w-full flex items-center justify-start gap-2 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <span key={index} className="text-[#8904B5] text-[32px]">
                  ★
                </span>
              ))}
            </div>

            {/* Title */}
            <h4 className="text-purple-600 w-full text-start font-semibold mb-2 trajan text-[32px]">
              {testimonial.title}
            </h4>

            {/* Description */}
            <p className="text-gray-700 w-full text-start text-[20px] mb-4 times">{testimonial.description}</p>

            {/* Button */}
            <button 
              className="bg-[#CE0067] w-[279px] mr-auto text-white px-4 py-2 rounded-md transition duration-500 hover:bg-white hover:outline hover:outline-[1px] hover:outline-[#CE0067] hover:text-[#CE0067]">
              Shop More
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
