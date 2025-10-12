import Partition from "./Partition";

import Carousell from "./Carousell";

const Home = () => {
  return (
    <div>
      <>
        <Carousell />
        <div className="mt-3">
          <Partition />
        </div>
      </>
    </div>
  );
};

export default Home;
