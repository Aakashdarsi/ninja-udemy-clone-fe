import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { getCountries } from "@yusifaliyevpro/countries";

interface AddressFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  addressType: "home" | "work" | "other";
  saveAddress: boolean;
}

interface AddressFormProps {
  onSubmit: (data: AddressFormData) => void;
  initialData?: Partial<AddressFormData>;
  isLoading?: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<AddressFormData>({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    addressLine1: initialData?.addressLine1 || "",
    addressLine2: initialData?.addressLine2 || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    zipCode: initialData?.zipCode || "",
    country: initialData?.country || "United States",
    addressType: initialData?.addressType || "home",
    saveAddress: initialData?.saveAddress || false,
  });

  const [validated, setValidated] = useState(false);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    onSubmit(formData);
  };

  useEffect(() => {
    fetch_countries();
  }, []);

  const filter_json = (data: any) => {
    return data.map((item: any) => item.name.common).sort();
  };

  const fetch_countries = async () => {
    try {
      const fetched_data = await getCountries({
        fields: ["name"],
      });
      const filter_data = await filter_json(fetched_data);
      setCountries(filter_data);
    } catch (error) {
      console.log(error);
    }
  };

  const [countries, setCountries] = useState<string[]>([]);

  return (
    <Card className="p-4">
      <Card.Body>
        <Card.Title className="mb-4">Shipping Address</Card.Title>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {/* Personal Information */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a first name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a last name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Contact Information */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label>Email Address *</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email address.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="phone">
                <Form.Label>Phone Number *</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  placeholder="Enter phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a phone number.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Address Line 1 */}
          <Form.Group className="mb-3" controlId="addressLine1">
            <Form.Label>Street Address *</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter street address"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a street address.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Address Line 2 */}
          <Form.Group className="mb-3" controlId="addressLine2">
            <Form.Label>Apartment, Suite, Unit (Optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apartment, suite, unit, etc."
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* City, State, Zip Code */}
          <Row className="mb-3">
            <Col md={5}>
              <Form.Group controlId="city">
                <Form.Label>City *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a city.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="state">
                <Form.Label>State *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a state.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="zipCode">
                <Form.Label>ZIP Code *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="ZIP code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a ZIP code.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Country and Address Type */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="country">
                <Form.Label>Country *</Form.Label>
                <Form.Select
                  required
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  {countries.map((country, index) => {
                    return (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="addressType">
                <Form.Label>Address Type</Form.Label>
                <Form.Select
                  name="addressType"
                  value={formData.addressType}
                  onChange={handleInputChange}
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Save Address Checkbox */}
          <Form.Group className="mb-4" controlId="saveAddress">
            <Form.Check
              type="checkbox"
              label="Save this address for future orders"
              name="saveAddress"
              checked={formData.saveAddress}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Submit Button */}
          <div className="d-grid">
            <Button
              variant="primary"
              type="submit"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Continue to Payment"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddressForm;
