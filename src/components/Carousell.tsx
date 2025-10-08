import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "./ExampleCarouselImage";
import { Card } from "react-bootstrap";

function Carousell() {
  return (
    <Carousel>
      <Carousel.Item>
        <ExampleCarouselImage src="/carous-1.webp" alt="First slide" />
        <Carousel.Caption
          style={{
            color: "black",
            backgroundColor: "lightgrey",
            opacity: "0.7",
            borderRadius: "10px",
          }}
        >
          <h3>Master Tomorrow Skills</h3>
          <p>
            Power up your AI, career, and life skills with the most up-to-date,
            expert-led learning.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage src="/carous-2.webp" alt="Second slide" />

        <Carousel.Caption
          style={{
            color: "black",
            backgroundColor: "lightgrey",
            opacity: "0.7",
            borderRadius: "10px",
          }}
        >
          <h3>Get ahead, stay ahead</h3>
          <p>Thrive with the latest skills from ₹519. Sale ends tonight!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousell;
