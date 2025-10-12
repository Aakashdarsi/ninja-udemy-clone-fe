import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import Cart from "../Cart";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Logout } from "../Logout";
import { useUserDetails } from "../../data_store/user_store";

function NavbarC() {
  const navigate = useNavigate();
  const isLoggedIn = useUserDetails((state) => state.loggedIn);

  return (
    <Navbar expand="lg" className="bg-body-tertiary mr-2">
      <Container fluid>
        <Link
          to="/"
          style={{ height: "30px" }}
          className="text-decoration-none"
        >
          <Navbar.Brand>
            <div className="d-flex align-items-center gap-2">
              <Image src="/ninja.svg" style={{ width: "30px" }} />
              <span className="text-decoration-none">NinjaCart</span>
            </div>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="text-decoration-none">
              <Nav.Link as="span">Home</Nav.Link>
            </Link>

            {isLoggedIn && (
              <>
                <Link to="/products" className="text-decoration-none">
                  <Nav.Link as="span">Products</Nav.Link>
                </Link>
                <Link to="/orders" className="text-decoration-none">
                  <Nav.Link as="span">Orders</Nav.Link>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div className="d-flex gap-2 mx-4">
        {isLoggedIn ? (
          <Logout />
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}

        {isLoggedIn && <Cart />}
      </div>
    </Navbar>
  );
}

export default NavbarC;
