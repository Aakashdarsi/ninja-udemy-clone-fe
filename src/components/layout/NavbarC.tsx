import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import GoogleButton from "react-google-button";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cart from "../Cart";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../state";

function NavbarC() {
  const navigate = useNavigate();
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

            <Link to="/login" className="text-decoration-none ">
              <Nav.Link as="span">Login</Nav.Link>
            </Link>
            <Link to="/addr" className="text-decoration-none ">
              <Nav.Link as="span">Address</Nav.Link>
            </Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div className="d-flex gap-2 mx-4">
        <>
          <Form>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                />
              </Col>
            </Row>
          </Form>
        </>
        <>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </>
        <>
          <Cart />
        </>
      </div>
    </Navbar>
  );
}

export default NavbarC;
