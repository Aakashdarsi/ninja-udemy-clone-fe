import { useEffect, useState } from "react";
import ShimmerPlaceHolder from "./layout/ShimmerPlaceHolder";
import Partition from "./Partition";
import ProductCard from "./shared/ProductCard";
import { getCountries } from "@yusifaliyevpro/countries";
import Carousell from "./Carousell";

const Home = () => {
  const [countries, setCountries] = useState<string[]>([]);
  useEffect(() => {
    fetch_countries();
  }, []);

  const filter_json = (data) => {
    return data.map((item) => item.name.common).sort();
  };

  const fetch_countries = async () => {
    try {
      const fetched_data = await getCountries({
        fields: ["name"],
      });
      const filter_data = await filter_json(fetched_data);
      await setTimeout(() => {
        setCountries(filter_data);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {countries.length == 0 ? (
        <ShimmerPlaceHolder />
      ) : (
        <>
          <Carousell />
          <div className="mt-3">
            <Partition />
          </div>
          <div className="mt-2">
            <h4 className="text-center roboto-regular">Trending Images</h4>

            <div className="d-flex justify-content-between">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
