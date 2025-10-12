import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "./ExampleCarouselImage";

function Carousell() {
  return (
    <Carousel>
      <Carousel.Item>
        <ExampleCarouselImage
          src="https://firebasestorage.googleapis.com/v0/b/deft-epoch-474415-h3.firebasestorage.app/o/public%2Fcarous-1.webp?alt=media"
          alt="First slide"
        />
        <Carousel.Caption
          style={{
            color: "black",
            backgroundColor: "lightgrey",
            opacity: "0.7",
            borderRadius: "10px",
          }}
        >
          <h3>Master Everyday Excellence</h3>
          <p>
            Elevate your daily routine with premium, quality-tested products
            selected by lifestyle experts.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage
          src="https://firebasestorage.googleapis.com/v0/b/deft-epoch-474415-h3.firebasestorage.app/o/carous-2.webp?alt=media"
          alt="Second slide"
        />

        <Carousel.Caption
          style={{
            color: "black",
            backgroundColor: "lightgrey",
            opacity: "0.7",
            borderRadius: "10px",
          }}
        >
          <h3>Shop smarter, save bigger</h3>
          <p>
            {" "}
            Grab the hottest deals starting from ₹519. Limited time offer ends
            tonight!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousell;
