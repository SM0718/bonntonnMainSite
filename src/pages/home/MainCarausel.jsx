import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Slider from "react-slick";

function MainCarousel() {

    const [slideActive, setSlideActive] = useState(0)
    const [slideIndex, setSlideIndex] = useState(0);
    const [updateCount, setUpdateCount] = useState(0);
    let sliderRef = useRef(null);

  const carouselItems = [
    {
      name: 'Gourmet Gifts',
      img: '/./homeImages/mainBanner.webp',
      desc: 'Curated with care, our artisanal treats are perfect for every occasion—from festive hampers to everyday indulgences.',
      buttonSlug: '#',
    },
    {
      name: 'Delicious Hampers',
      img: '././homeImages/mainBanner.webp',
      desc: 'Discover the perfect gifts filled with gourmet treats, thoughtfully curated for your special moments.',
      buttonSlug: '#',
    },
    {
      name: 'Festive Indulgences',
      img: './homeImages/mainBanner.webp',
      desc: 'Celebrate every occasion with our luxurious range of handcrafted gourmet delights, carefully selected to delight and impress.',
      buttonSlug: '#',
    },
  ];

  const updateFunc = (e) => {
    setSlideActive(e)
    setUpdateCount(updateCount + 1)
  }

  function SampleNextArrow(props) {
    const {style, onClick } = props;
    return (
      <div
        className={`absolute right-0`}
        style={{ ...style,opacity:"0",}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const {style, onClick } = props;
    return (
      <div
        className={`absolute left-0`}
        style={{ ...style,opacity:"0",}}
        onClick={onClick}
      />
    );
  }

  const settings = {
    className: "center",
    infinite: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    centerPadding: "60px",
    slidesToShow: 1,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: function(e) {
      updateFunc(e)
    },
    beforeChange: (next) => setSlideIndex(next)
  };

  const SliderInfo = React.forwardRef(function SliderCarInfo({className, name, desc, backgroundImg, key, currentSlide}, ref) {

    return (
      <div key={key} className={`${className} w-full h-[700px] flex justify-center bg-cover bg-center bg-no-repeat relative`} 
      style={{backgroundImage: `url(${backgroundImg})`}}>
          <div className={` ${currentSlide? "flex" : "hidden"} flex flex-col justify-start gap-12 absolute left-24 top-24`}>
              
              <div className='flex flex-col justify-between md:justify-start gap-4 text-white hiddenClass_3 showContent'>
                <p className='font-semibold trajan text-[34px]'>{name}</p>
                <p className='w-[500px] times text-[24px]'>{desc}</p>
              </div>
              <div className='flex flex-col md:flex-row gap-4 mt-4 hiddenClass_4 showContent'>
              <Button className="text-[20px] bg-[#BD9153] w-[225px] mr-auto times text-white px-2 py-2 rounded-full transition duration-500 hover:bg-transparent hover:outline hover:outline-[1px] hover:outline-[#BD9153] hover:text-[#BD9153] hover:shadow-lg">
              Order Now
            </Button></div>
               </div>
          
      </div>
    )
  }
  )

  return (
    <div className="slider-container relative">
    <Slider ref={slider => {
        sliderRef = slider;
    }}
    {...settings}>
    {
        carouselItems.map((item, index) => <SliderInfo key={item.name} index={index} currentSlide={index === slideActive ? true : false} name={item.name} desc={item.desc} backgroundImg={item.img}/>)
    }
    </Slider>
    <div className="absolute w-full flex gap-2 justify-center bottom-8 z-50">
        {
        Array(carouselItems.length).fill().map((_, index) => (
            <span
                key={index}
                onClick={() => sliderRef.slickGoTo(index)}
                className={`
                    ${index === slideActive 
                        ? "bg-[#BD9153] border-[#BD9153]" 
                        : "bg-white/25 border-white"}
                    size-4 cursor-pointer
                    rounded-full border-2 
                    hover:bg-[#BD9153]/75 hover:border-[#BD9153]
                `}
            />
        ))
        }
    </div>
</div>
  );
}

export default MainCarousel;