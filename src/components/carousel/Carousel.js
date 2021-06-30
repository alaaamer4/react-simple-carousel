import React, { useRef, useState } from "react";
import rightArrow from "../../utils/right-arrow.png";
import leftArrow from "../../utils/left-arrow.png";
import "./carousel.scss";
const Carousel = ({ children }) => {
  const viewArray = [children[children.length - 1], ...children, children[0]];
  const pointArray = [...children];
  const slider = useRef(null);
  const carousel = useRef(null);
  const [startX, setStartX] = useState(null);
  const [isDown, setIsDown] = useState(false);
  const [scrollX, setScrollX] = useState(null);
  const [counter, setCounter] = useState(1);
  const scrollRight = () => {
    if (counter >= viewArray.length - 1) return;
    setCounter(counter + 1);
  };
  const scrollLeft = () => {
    if (counter <= 0) return;
    setCounter(counter - 1);
  };
  const onTransitionEnd = () => {
    if (counter === viewArray.length - 1) {
      slider.current.style.transition = "none";
      setCounter(1);
      setTimeout(() => {
        slider.current.style.transition = "all 0.3s";
      }, false);
    } else if (counter === 0) {
      slider.current.style.transition = "none";
      setCounter(viewArray.length - 2);
      setTimeout(() => {
        slider.current.style.transition = "all 0.3s";
      }, false);
    }
  };
  const onTouchStart = (e) => {
    setIsDown(true);
    slider.current.style.cursor = "grabbing";
    slider.current.style.transition = "none";
    if (e.type === "mousedown") {
      setStartX(e.pageX);
    } else {
      setStartX(e.targetTouches[0].pageX);
    }
  };
  const onTouchMove = (e) => {
    if (isDown === true) {
      if (e.type === "mousemove") {
        e.preventDefault();
        setScrollX(((e.pageX - startX) * 100) / carousel.current.clientWidth);

        console.log(counter * -100 + scrollX);
      } else {
        setScrollX(
          ((e.targetTouches[0].pageX - startX) * 100) /
            carousel.current.clientWidth
        );
      }
    }
  };
  const onTouchEnd = () => {
    setIsDown(false);
    slider.current.style.transition = "all 0.3s";
    slider.current.style.cursor = "grab";
    if (scrollX < -20) {
      scrollRight();
    } else if (scrollX > 20) {
      scrollLeft();
    }
    setScrollX(0);
  };

  return (
    <div className="carousel" ref={carousel}>
      <div
        className="slider"
        style={
          isDown
            ? { transform: `translateX(${counter * -100 + scrollX}%)` }
            : { transform: `translateX(${counter * -100}%)` }
        }
        ref={slider}
        onTransitionEnd={onTransitionEnd}
        onMouseDown={onTouchStart}
        onMouseMove={onTouchMove}
        onMouseUp={onTouchEnd}
        onMouseLeave={onTouchEnd}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
      >
        {viewArray}
      </div>
      <button className="arrow left" onClick={scrollLeft}>
        <img src={leftArrow} alt="left arrow" />
      </button>
      <button className="arrow right" onClick={scrollRight}>
        <img src={rightArrow} alt="right arrow" />
      </button>
      <div className="dots">
        {pointArray.map((dot, i) => (
          <div
            className="dot"
            key={i + 1}
            style={
              counter === i + 1
                ? { background: "#636060" }
                : { background: "#e4dede" }
            }
            onClick={() => setCounter(i + 1)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
