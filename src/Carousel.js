import React, { useState, useEffect } from "react";
import right from "./assets/right.png";
import left from "./assets/left.png";
const Carousel = ({ children }) => {
  // create an array of the children passed
  const carouselArr = [...children];
  // calc the width of the screen
  const screenWidth = window.screen.width;
  // controling the transition
  const [index, setIndex] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null);

  // functions resbonsible for swipes
  const moveLeft = () => {
    index === 0 ? setIndex(carouselArr.length - 1) : setIndex(index - 1);
  };
  const moveRight = () => {
    index === carouselArr.length - 1 ? setIndex(0) : setIndex(index + 1);
  };
  // handeling mouse click & drag
  const onMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX);
    setScrollLeft(index * -100);
  };
  const onMouseMove = (e) => {
    e.preventDefault();
    if (isDown) {
      setScrollLeft(index * -100 + ((e.pageX - startX) * 100) / screenWidth);
    }
  };
  const onMouseUp = (e) => {
    setIsDown(false);
    setScrollLeft(index * -100);
    //  TODO write the logic for scroll
    if (scrollLeft < index * -100 - 25) {
      moveRight();
    }
    if (scrollLeft > index * -100 + 25) {
      moveLeft();
    }
  };

  const onMouseLeave = (e) => {
    setIsDown(false);
    setScrollLeft(index * -100);
  };
  // handeling Touch and drag events
  const onTouchStart = (e) => {
    setIsDown(true);
    setStartX(e.targetTouches[0].pageX);
    setScrollLeft(index * -100);
  };
  const onTouchMove = (e) => {
    if (isDown) {
      setScrollLeft(
        index * -100 + ((e.targetTouches[0].pageX - startX) * 100) / screenWidth
      );
    }
  };
  const onTouchEnd = (e) => {
    setIsDown(false);
    setScrollLeft(index * -100);
    //  TODO write the logic for scroll
    if (scrollLeft < index * -100 - 25) {
      moveRight();
    }
    if (scrollLeft > index * -100 + 25) {
      moveLeft();
    }
  };

  return (
    <div className="carousel">
      {carouselArr.map((slide, i) => (
        <div
          className="carousel__slide"
          key={i}
          style={
            // styles while dragging and after the drag
            isDown
              ? { transform: `translateX(${scrollLeft}%)`, transition: "0.2s" }
              : { transform: `translateX(${index * -100}%)` }
          }
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
        >
          {slide}
        </div>
      ))}

      <div className="carousel__dots">
        {carouselArr.map((slide, i) => (
          <div
            className={`carousel__dot ${i === index && "carousel__dot-active"}`}
            key={i}
            onClick={() => {
              setIndex(i);
            }}
          ></div>
        ))}
      </div>
      <button className="carousel__btn carousel__btn-right" onClick={moveRight}>
        <img src={right} alt="right" />
      </button>
      <button className="carousel__btn carousel__btn-left" onClick={moveLeft}>
        <img src={left} alt="left" />
      </button>
    </div>
  );
};

export default Carousel;
