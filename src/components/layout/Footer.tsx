const Footer = () => {
  return (
    <div>
      <>
        <div className="card border-dark w-100">
          <div className="card-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-1">
                  <img src="/ninja.svg" alt="" style={{ height: "45px" }} />
                </div>
                <div className="col-3 mt-2">
                  <p>© 2025 Ninja Cart, Inc.</p>
                </div>
                <div className="col-8">
                  <ul className="nav justify-content-end">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        Privacy
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Terms
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Sitemap
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Company Details
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Footer;
