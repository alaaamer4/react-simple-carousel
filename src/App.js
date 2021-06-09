import React from "react";
import Carousel from "./Carousel";
import img1 from "./assets/a.jpg";
import img2 from "./assets/b.jpg";
import img3 from "./assets/c.jpg";
const App = () => {
  return (
    <>
      <Carousel>
        <img src={img1} alt="" />
        <img src={img2} alt="" />
        <img src={img3} alt="" />
        <div>hello world</div>
      </Carousel>
    </>
  );
};

export default App;
