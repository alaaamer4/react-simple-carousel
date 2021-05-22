import React, { useState } from "react";
import right from "./assets/right.png";
import left from "./assets/left.png";
const Carousel = ({ children }) => {
  // create an array of the children passed
  const carouselArr = [...children];

  // controling the transition
  const [x, setX] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  //************************************************************************** */
  // **************************** helper functions ****************************//
  //************************************************************************** */
  const prev = () => {
    x === 0 ? setX(-100 * (carouselArr.length - 1)) : setX(x + 100);
  };
  const next = () => {
    x === -100 * (carouselArr.length - 1) ? setX(0) : setX(x - 100);
  };
  const handleTouchStart = (e) => {
    console.log(e);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = (e) => {
    if (touchEnd - touchStart > 0) {
      prev();
    } else if (touchEnd - touchStart < 0) {
      next();
    }
  };

  //************************************************************************** */
  // ************************ function component *****************************//
  //************************************************************************** */
  return (
    <div className="carousel">
      {carouselArr.map((slide, index) => (
        <div
          className="carousel__slide"
          key={index}
          style={{ transform: `translateX(${x}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slide}
        </div>
      ))}

      <div className="carousel__dots">
        {carouselArr.map((slide, index) => (
          <div
            className={`carousel__dot ${
              -100 * index === x && "carousel__dot-active"
            }`}
            key={index}
            onClick={() => {
              setX(-100 * index);
            }}
          ></div>
        ))}
      </div>
      <button className="carousel__btn carousel__btn-right" onClick={next}>
        <img src={right} alt="right" />
      </button>
      <button className="carousel__btn carousel__btn-left" onClick={prev}>
        <img src={left} alt="left" />
      </button>
    </div>
  );
};

export default Carousel;
