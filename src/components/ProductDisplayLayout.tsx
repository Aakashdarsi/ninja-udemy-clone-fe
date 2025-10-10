import { Accordion, Image } from "react-bootstrap";

export const ProductDisplayLayout = () => {
  return (
    <div className="w-100 h-100 mt-5">
      <div className="container-fluid card">
        <div className="row">
          <div className="col-6">
            <img
              src="/nnneon.svg"
              className="img-thumbnail mt-4"
              alt="..."
              style={{ width: "90px", height: "90px" }}
            />
          </div>
          <div className="col-6">
            <div className="mt-2">
              <p>Original Price</p>
              <p>Discounted Price</p>
              <p>Quantity Available</p>
              <div className="d-flex">
                <button className="btn btn-primary">Add To Cart</button>
                <button className="btn btn-success mx-2">Buy now</button>
              </div>
            </div>
          </div>
          <caption>A Product by : </caption>
        </div>
      </div>
      <Accordion defaultActiveKey="0" className="mt-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Image Details</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="0" className="mt-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Tags</Accordion.Header>
          <Accordion.Body className="d-flex justify-content-space-between">
            <span className="badge text-bg-secondary">New</span>
            <span className="badge text-bg-primary mx-2">New</span>
            <span className="badge text-bg-success mx-2">New</span>
            <span className="badge text-bg-info mx-2">New</span>
            <span className="badge text-bg-danger mx-2">New</span>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
