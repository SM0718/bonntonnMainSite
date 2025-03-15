import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="bg-gradient-to-b from-white to-[#faf9f6] py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif italic text-[#BD9153] mb-6">The Story of Bonntonn</h1>
          <div className="w-24 h-1 bg-[#BD9153] mx-auto mb-6"></div>
          <p className="text-gray-800 max-w-2xl mx-auto text-lg font-light">
            Where passion meets artistry, and every creation tells a story of dedication and love.
          </p>
        </motion.div>

        {/* Section 1 */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          variants={fadeIn}
          className="flex flex-col md:flex-row gap-12 mb-24 items-center"
        >
          <div className="md:w-2/5 w-full">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#d5b27c] rounded-lg"></div>
              <img
                src="/path-to-image1.jpg"
                alt="Tanya portrait"
                className="rounded-lg shadow-xl object-cover w-full h-96 relative z-10"
              />
              <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-[#faf9f6] rounded-full flex items-center justify-center">
                <span className="font-serif italic text-[#BD9153]">Founder</span>
              </div>
            </div>
          </div>
          <div className="md:w-3/5 w-full">
            <h2 className="text-3xl font-serif italic text-[#BD9153] mb-4">Hi There, I am Tanya</h2>
            <div className="w-16 h-1 bg-[#BD9153] mb-6"></div>
            <p className="text-gray-700 leading-loose text-lg mb-6">
              A wife, baker, entrepreneur, mother, and art geek, Tanya is the heart and soul behind Bonntonn. With a passion for creating sweet indulgences, she brings magic to every bite. Whether baking at home or expanding the business, Tanya remains deeply committed to her craft.
            </p>
            <div className="flex space-x-4">
              <div className="w-16 h-16 rounded-full bg-[#faf9f6] flex items-center justify-center">
                <span className="text-[#BD9153] font-medium">Baker</span>
              </div>
              <div className="w-16 h-16 rounded-full bg-[#faf9f6] flex items-center justify-center">
                <span className="text-[#BD9153] font-medium">Mother</span>
              </div>
              <div className="w-16 h-16 rounded-full bg-[#faf9f6] flex items-center justify-center">
                <span className="text-[#BD9153] font-medium">Artist</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          variants={fadeIn}
          className="flex flex-col md:flex-row-reverse gap-12 mb-24 items-center"
        >
          <div className="md:w-2/5 w-full">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[#d5b27c] rounded-lg"></div>
              <img
                src="/path-to-image2.jpg"
                alt="Tanya in the kitchen"
                className="rounded-lg shadow-xl object-cover w-full h-96 relative z-10"
              />
              <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 w-12 h-36 bg-[#e8d8b3] flex items-center justify-center">
                <span className="font-serif italic text-[#BD9153] transform -rotate-90">Dreamer</span>
              </div>
            </div>
          </div>
          <div className="md:w-3/5 w-full">
            <h2 className="text-3xl font-serif italic text-[#BD9153] mb-4">Life Beyond The Kitchen</h2>
            <div className="w-16 h-1 bg-[#BD9153] mb-6"></div>
            <p className="text-gray-700 leading-loose text-lg">
              When Tanya isn't in the kitchen, she's busy cooking up ideas to inspire others. Her love of creating sweets is matched by her desire to share that joy with her customers and community.
            </p>
            <div className="mt-8 p-6 bg-white bg-opacity-60 rounded-lg shadow-sm border border-[#e8d8b3]">
              <p className="text-[#BD9153] italic font-serif text-lg">
                "Baking isn't just about creating food—it's about crafting moments and memories."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          variants={fadeIn}
          className="flex flex-col md:flex-row gap-12 mb-24 items-center"
        >
          <div className="md:w-2/5 w-full">
            <div className="relative">
              <div className="h-full w-full grid grid-cols-2 gap-4">
                <img
                  src="/path-to-image3.jpg"
                  alt="Tanya holding dessert"
                  className="rounded-lg shadow-xl object-cover h-48 w-full col-span-2"
                />
                <img
                  src="/path-to-image3-detail1.jpg"
                  alt="Dessert closeup"
                  className="rounded-lg shadow-xl object-cover h-48 w-full"
                />
                <img
                  src="/path-to-image3-detail2.jpg"
                  alt="Baking process"
                  className="rounded-lg shadow-xl object-cover h-48 w-full"
                />
              </div>
            </div>
          </div>
          <div className="md:w-3/5 w-full">
            <h2 className="text-3xl font-serif italic text-[#BD9153] mb-4">Step Into My World</h2>
            <div className="w-16 h-1 bg-[#BD9153] mb-6"></div>
            <p className="text-gray-700 leading-loose text-lg mb-6">
              From a hobby baker to a renowned creator of delicacies, Tanya's journey showcases her resilience and creativity. Through Bonntonn, she continues to innovate, building a legacy one dessert at a time.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-2 bg-[#faf9f6] rounded-full text-[#BD9153]">Passion</div>
              <div className="px-6 py-2 bg-[#faf9f6] rounded-full text-[#BD9153]">Creativity</div>
              <div className="px-6 py-2 bg-[#faf9f6] rounded-full text-[#BD9153]">Dedication</div>
              <div className="px-6 py-2 bg-[#faf9f6] rounded-full text-[#BD9153]">Excellence</div>
            </div>
          </div>
        </motion.div>

        {/* Section 4 */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          variants={fadeIn}
          className="flex flex-col md:flex-row-reverse gap-12 mb-24 items-center"
        >
          <div className="md:w-2/5 w-full">
            <div className="relative">
              <div className="absolute inset-0 border-8 border-[#faf9f6] rounded-lg transform rotate-3"></div>
              <img
                src="/path-to-image4.jpg"
                alt="Tanya with desserts"
                className="rounded-lg shadow-xl object-cover w-full h-96 relative z-10 transform -rotate-3"
              />
              <div className="absolute -bottom-6 right-12 w-32 h-32 bg-[#e8d8b3] rounded-full flex items-center justify-center transform rotate-6">
                <span className="font-serif italic text-[#BD9153]">Sweet<br/>Magic</span>
              </div>
            </div>
          </div>
          <div className="md:w-3/5 w-full">
            <h2 className="text-3xl font-serif italic text-[#BD9153] mb-4">Sweet Magic In Every Bite</h2>
            <div className="w-16 h-1 bg-[#BD9153] mb-6"></div>
            <p className="text-gray-700 leading-loose text-lg mb-8">
              Tanya's sweet creations are her way of bringing happiness to the world. Each bite of her delicacies carries a touch of her passion and dedication.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div className="aspect-square bg-[#faf9f6] rounded-lg flex items-center justify-center p-4">
                <span className="text-[#BD9153] text-center font-medium">Quality Ingredients</span>
              </div>
              <div className="aspect-square bg-[#e8d8b3] rounded-lg flex items-center justify-center p-4">
                <span className="text-[#BD9153] text-center font-medium">Artisanal Crafting</span>
              </div>
              <div className="aspect-square bg-[#faf9f6] rounded-lg flex items-center justify-center p-4">
                <span className="text-[#BD9153] text-center font-medium">Love in Every Bite</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          variants={fadeIn}
          className="text-center mt-12 mb-12"
        >
          <h2 className="text-3xl font-serif italic text-[#BD9153] mb-4">Faces Behind Bonntonn</h2>
          <div className="w-24 h-1 bg-[#BD9153] mx-auto mb-12"></div>
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute -top-6 -left-6 -right-6 -bottom-6 border-2 border-[#e8d8b3] rounded-xl"></div>
            <div className="aspect-w-16 aspect-h-9 relative z-10">
              <iframe
                className="w-full h-[500px] rounded-xl shadow-xl"
                src="https://www.youtube.com/embed/example-video-id"
                title="Bonntonn Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="mt-16 bg-white bg-opacity-70 rounded-xl p-8 max-w-2xl mx-auto shadow-lg border border-[#e8d8b3]">
            <p className="text-gray-700 leading-relaxed italic mb-4">
              "We don't just make desserts. We craft experiences, memories, and moments of joy."
            </p>
            <p className="text-[#BD9153] font-medium">— Tanya, Founder of Bonntonn</p>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2 }}
          variants={fadeIn}
          className="bg-gradient-to-r from-[#faf9f6] to-[#e8d8b3] p-12 rounded-2xl text-center mb-8"
        >
          <h2 className="text-3xl font-serif italic text-[#BD9153] mb-6">Let's Connect</h2>
          <p className="text-gray-800 max-w-2xl mx-auto mb-8 text-lg">
            Want to learn more about our story or discuss how we can bring sweetness to your special occasion?
          </p>
          <button className="px-8 py-3 bg-[#BD9153] text-white rounded-full hover:bg-[#d5b27c] transition-colors duration-300">
            Reach Out
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;