import Carousel from "./components/Carousel";
import AppLayout from "./components/layout/AppLayout";
import Partition from "./components/Partition";
import ProductCard from "./components/ProductCard";
import "./scss/styles.scss";

function App() {
  return (
    <>
      <AppLayout>
        <Carousel />
        <Partition />
        <p className="text-center">Trending Courses</p>
        <div className="d-flex justify-content-between">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
        <div className="d-flex justify-content-between">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </AppLayout>
    </>
  );
}

export default App;
