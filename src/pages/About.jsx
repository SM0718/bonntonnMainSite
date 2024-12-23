import React from 'react';

const AboutSection = () => {
  return (
    <div className="bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section 1 */}
        <div className="flex flex-col md:flex-row gap-8 mb-12 items-center md:items-start">
          <div className="md:w-1/3 w-full flex justify-center">
            <img
              src="/path-to-image1.jpg"
              alt="Tanya portrait"
              className="rounded-md shadow-md object-cover h-64 w-64"
            />
          </div>
          <div className="md:w-2/3 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Hi There, I am Tanya</h2>
            <p className="text-gray-600 leading-relaxed">
              A wife, baker, entrepreneur, mother, and art geek, Tanya is the founder of Bonntonn. With a passion for creating sweet indulgences, she brings magic to every bite. Whether baking at home or expanding the business, Tanya remains deeply committed to her craft.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col md:flex-row-reverse gap-8 mb-12 items-center md:items-start">
          <div className="md:w-1/3 w-full flex justify-center">
            <img
              src="/path-to-image2.jpg"
              alt="Tanya in the kitchen"
              className="rounded-md shadow-md object-cover h-64 w-64"
            />
          </div>
          <div className="md:w-2/3 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Life Beyond The Kitchen</h2>
            <p className="text-gray-600 leading-relaxed">
              When Tanya isn’t in the kitchen, she’s busy cooking up ideas to inspire others. Her love of creating sweets is matched by her desire to share that joy with her customers and community.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col md:flex-row gap-8 mb-12 items-center md:items-start">
          <div className="md:w-1/3 w-full flex justify-center">
            <img
              src="/path-to-image3.jpg"
              alt="Tanya holding dessert"
              className="rounded-md shadow-md object-cover h-64 w-64"
            />
          </div>
          <div className="md:w-2/3 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Step Into My World</h2>
            <p className="text-gray-600 leading-relaxed">
              From a hobby baker to a renowned creator of delicacies, Tanya’s journey showcases her resilience and creativity. Through Bonntonn, she continues to innovate, building a legacy one dessert at a time.
            </p>
          </div>
        </div>

        {/* Section 4 */}
        <div className="flex flex-col md:flex-row-reverse gap-8 mb-12 items-center md:items-start">
          <div className="md:w-1/3 w-full flex justify-center">
            <img
              src="/path-to-image4.jpg"
              alt="Tanya with desserts"
              className="rounded-md shadow-md object-cover h-64 w-64"
            />
          </div>
          <div className="md:w-2/3 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sweet Magic In Every Bite</h2>
            <p className="text-gray-600 leading-relaxed">
              Tanya's sweet creations are her way of bringing happiness to the world. Each bite of her delicacies carries a touch of her passion and dedication.
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 times">Faces Behind Bonntonn</h2>
          <div className="aspect-w-16 aspect-h-9 mx-auto max-w-full h-[400px]">
            <iframe
              className="w-full h-full rounded-xl shadow-md"
              src="https://www.youtube.com/embed/example-video-id"
              title="Bonntonn Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
