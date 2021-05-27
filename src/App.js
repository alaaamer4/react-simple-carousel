import React from "react";
import Carousel from "./Carousel";
import img1 from "./assets/a.jpg";
import img2 from "./assets/b.jpg";
import img3 from "./assets/c.jpg";
const App = () => {
  return (
    <>
      <Carousel>
        <img src={img1} alt="some description for the img" />
        <img src={img2} alt="some description for the img" />
        <img src={img3} alt="some description for the img" />
        <div>hello world</div>
      </Carousel>
    </>
  );
};

export default App;
