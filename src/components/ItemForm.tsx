import React from "react";
import { Button, Container, Form } from "react-bootstrap";

const ItemForm = () => {
  return (
    <div>
      <Container fluid className="mt-4">
        <Container className="row align-items-center">
          <Form>
            <h3>Product Store </h3>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name of the Product</Form.Label>
              <Form.Control type="email" placeholder="Product Name" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Product Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group className="d-flex justify-content-between mt-3">
              <Form.Group>
                <Form.Label>Original Price</Form.Label>
                <Form.Control type="number" placeholder="Original Price" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Discounted Price</Form.Label>
                <Form.Control type="number" placeholder="Discounted Price" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" placeholder="Image" />
              </Form.Group>
            </Form.Group>

            <Button variant="primary mt-5" type="submit">
              Add Item to Store
            </Button>
          </Form>
        </Container>
      </Container>
    </div>
  );
};

export default ItemForm;
