import React from "react";

import "./Login.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



const Login = () => {
  return (
    <>
      <div className="Login__container">
        <Form className="Login-form" >
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control type="text" placeholder="Registration No" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
