import React from "react";
import Carousel from "./carousel/Carousel";
import img1 from "../utils/img1.jpg";
import img2 from "../utils/img2.jpg";
import img3 from "../utils/img3.jpg";
import img4 from "../utils/img4.jpg";
import "./App.scss";
const App = () => {
  return (
    <div className="container">
      <Carousel>
        <img src={img1} alt="img1 desc" />
        <img src={img2} alt="img1 desc" />
        <img src={img3} alt="img1 desc" />
        <img src={img4} alt="img1 desc" />
        <section>slide 5</section>
      </Carousel>
    </div>
  );
};

export default App;
