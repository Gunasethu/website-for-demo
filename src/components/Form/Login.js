import BaseComponent from '../BaseComponent';
import React from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";

class Login extends BaseComponent {
  constructor(props) {
    super();
  }
  
  render() {
    return (
      <div className="main-container">
        <Container fluid className="gray">
          <Row>
            <Col lg={8} className="border-primary m-auto">
              <h6 className="bg-info p-3 text-white">LOGIN OR SIGNUP</h6>

              <Card>
                <Card.Body>
                <Form onSubmit={this.onSubmit}>
                    <h3>Login</h3>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Mobile number</Form.Label>
                        <Form.Control type="number" placeholder="Enter mobile number" required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required/>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                </Card.Body>
            </Card>

              <section className="d-sm-flex justify-content-around my-auto bg-light">
                <div className="m-3 p-2">
                  <p>Dont have an account?</p>
                  <Button variant="secondary" ><a href="/register">Register</a></Button>
                </div>

              </section>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;