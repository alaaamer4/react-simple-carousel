import React, { useState } from "react";
import right from "./assets/right.png";
import left from "./assets/left.png";
const Carousel = ({ children }) => {
  // create an array of the children passed
  const carouselArr = [...children];

  // controling the transition
  const [x, setX] = useState(0);
  const screen = window.screen.width;
  let isDown = false;
  let startX;
  let scrollLeft;
  const [scrollX, setScrollX] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const prev = () => {
    x === 0 ? setX(-100 * (carouselArr.length - 1)) : setX(x + 100);
  };
  const next = () => {
    x === -100 * (carouselArr.length - 1) ? setX(0) : setX(x - 100);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].pageX);
  };
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].pageX);
    setScrollX(touchEnd - touchStart);

    console.log({ scrollX, screen });
  };
  const handleTouchEnd = (e) => {
    if (scrollX > 70 && scrollX !== touchStart) {
      prev();
    }
    if (scrollX < -70 && scrollX !== touchStart) {
      next();
    }
  };

  const onMouseDown = (e) => {
    isDown = true;
    startX = e.pageX;
    console.log(startX);
  };
  const onMouseUp = (e) => {
    isDown = false;
    // call the scroll func here
    if (scrollLeft > 120) {
      prev();
    }
    if (scrollLeft < -120) {
      next();
    }
  };
  const onMouseLeave = (e) => {
    isDown = false;
  };
  const onMouseMove = (e) => {
    if (isDown) {
      e.preventDefault();
      scrollLeft = e.pageX - startX;
    }
  };
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
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
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
