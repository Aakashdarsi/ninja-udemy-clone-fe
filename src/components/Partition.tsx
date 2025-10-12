import { ImageCard } from "./shared/ImageCard";

const Partition = () => {
  const categories = [
    {
      src: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=fill&w=225&h=150&q=80",
      title: "Electronics",
      body: "Latest tech gadgets",
    },
    {
      src: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=fill&w=225&h=150&q=80",
      title: "Groceries",
      body: "Fresh daily essentials",
    },
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=fill&w=225&h=150&q=80",
      title: "Sports",
      body: "Fitness gear equipment",
    },
    {
      src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=fill&w=225&h=150&q=80",
      title: "Medical",
      body: "Healthcare wellness products",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 justify-content-center">
          <b>Shop smarter with modern features</b>
          <p>
            Our platform helps you discover amazing products with AI-powered
            recommendations and shop confidently with augmented reality
            previews.
          </p>
        </div>
        <div className="col-9">
          <div className="container-fluid">
            <div className="d-flex flex-wrap justify-content-between">
              {categories.map((category, index) => (
                <ImageCard
                  key={index}
                  src={category.src}
                  title={category.title}
                  body={category.body}
                  imgReq={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partition;
