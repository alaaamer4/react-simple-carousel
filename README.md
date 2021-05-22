# react-simple-carousel

a react component for building a carousel from it's child components

it's a component for building awsome carousel 

it was built to be completely reusable

the styling was done by using sass and it follows BEM naming convention 

# usage
```javascript
import React from 'react';
import imgOne from "..."
import imgTwo from "..."
import imgThree from "..."
const NewCarousel = () => (
  <Carousel plugins={['arrows']}>
    <img src={imgOne} />
    <img src={imgTwo} />
    <img src={imgThree} />
  // by default the text will get a grey background and will be in the middle of the screen
  <div> hello world </div>
  </Carousel>
);
```
export default NewCarousel;


# here is a demo 

https://react-simple-carousel-demo.netlify.app/
