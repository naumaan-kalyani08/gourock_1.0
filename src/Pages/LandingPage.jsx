import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';

function VerticalMode() {
  const sliderRef = useRef(null);

  useEffect(() => {
    const sliderElement = sliderRef.current;

    const handleSwipe = (e) => {
      if (e.changedTouches && e.changedTouches.length > 0) {
        const startY = e.changedTouches[0].pageY;
        const endY = e.changedTouches[e.changedTouches.length - 1].pageY;

        if (startY > endY) {
          // Swipe up, move to next slide
          sliderElement.slickNext();
        } else {
          // Swipe down, move to previous slide
          sliderElement.slickPrev();
        }
      }
    };

    const handleMouseWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        // Scroll down, move to next slide
        sliderElement.slickNext();
      } else {
        // Scroll up, move to previous slide
        sliderElement.slickPrev();
      }
    };

    // Attach event listeners
    const container = document.querySelector('.slider-container');
    container.addEventListener('wheel', handleMouseWheel);
    container.addEventListener('touchstart', handleSwipe);

    // Clean up event listeners on component unmount
    return () => {
      container.removeEventListener('wheel', handleMouseWheel);
      container.removeEventListener('touchstart', handleSwipe);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    beforeChange: function (currentSlide, nextSlide) {
      console.log('before change', currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      console.log('after change', currentSlide);
    },
  };

  return (
    <div className="slider-container">
      <Slider ref={sliderRef} {...settings} >
        <div className='slider-wrapper'>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
}

export default VerticalMode;
