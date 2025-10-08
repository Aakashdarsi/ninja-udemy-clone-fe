import * as React from "react";

export interface ExampleCarouselImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

const ExampleCarouselImage: React.FC<ExampleCarouselImageProps> = ({
  src,
  alt,
  title,
  className = "d-block w-100",
}) => (
  <img
    src={src}
    alt={alt}
    title={title}
    className={className}
    style={{
      width: "100%",
      height: "400px",
      objectFit: "cover",
    }}
  />
);

ExampleCarouselImage.displayName = "ExampleCarouselImage";

export default ExampleCarouselImage;
