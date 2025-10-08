import ProductCard from "./ProductCard";

const Partition = () => {
  return (
    <div className="container-fluid card">
      <div className="row">
        <div className="col-3">
          <b>Learn essential career and life skills</b>
          <p>
            Udemy helps you build in-demand skills fast and advance your career
            in a changing job market.
          </p>
        </div>
        <div className="col-9">
          <div className="container">
            <div className="d-flex">
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partition;
