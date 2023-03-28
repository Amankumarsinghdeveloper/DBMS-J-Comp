import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./Register.css";

const Register = () => {
  const [User, SetUser] = useState({
    registration_no: "",
    email: "",
    f_name: "",
    f_middle: "",
    f_last: "",
    school: "",
    branch: "",
    contact_no: "",
    password: "",
  });

  const handleChange = (e) => {
    SetUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // append user details to form data
    formData.append("registration_no", User.registration_no);
    formData.append("email", User.email);
    formData.append("f_name", User.f_name);
    formData.append("f_middle", User.f_middle);
    formData.append("f_last", User.f_last);
    formData.append("school", User.school);
    formData.append("branch", User.branch);
    formData.append("contact_no", User.contact_no);
    formData.append("password", User.password);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      //Add book
      await axios.post("http://localhost:5000/api/newuser", formData, config);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="Register__container">
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="registration_no">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Registration No"
                name="registration_no"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="f_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="f_name"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="f_middle">
              <Form.Label>Middle Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Middle Name"
                name="f_middle"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="f_last">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="f_last"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="School">
              <Form.Label>School</Form.Label>
              <Form.Control
                type="text"
                placeholder="School"
                name="school"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="branch">
              <Form.Label>Branch</Form.Label>
              <Form.Select
                type="text"
                placeholder="Branch"
                name="branch"
                onChange={handleChange}
              >
                <option value="">B.Tech - Biotechnology</option>
                <option value="">B.Tech - Chemical Engineering</option>
                <option value="">B.Tech - Civil Engineering</option>
                <option value="B.Tech - Computer Science and Engineering">
                  B.Tech - Computer Science and Engineering
                </option>
                <option value="Computer Science and Engineering (Bioinformatics)">
                  B.Tech - Computer Science and Engineering (Bioinformatics)
                </option>
                <option value="B.Tech - Computer Science and Engineering (Information Security)">
                  B.Tech - Computer Science and Engineering (Information
                  Security)
                </option>
                <option value="B.Tech - Computer Science and Engineering (Internet of Things)">
                  B.Tech - Computer Science and Engineering (Internet of Things)
                </option>
                <option value="B.Tech - Computer Science and Engineering and Business Systems(in collaboration with TCS)">
                  B.Tech - Computer Science and Engineering and Business
                  Systems(in collaboration with TCS)
                </option>
                <option value="B.Tech - Computer Science and Engineering (Data Science)">
                  B.Tech - Computer Science and Engineering (Data Science)
                </option>
                <option value="B.Tech - Computer Science and Engineering (Block Chain Technology)">
                  B.Tech - Computer Science and Engineering (Block Chain
                  Technology)
                </option>
                <option value="B.Tech - Electrical and Electronics Engineering">
                  B.Tech - Electrical and Electronics Engineering
                </option>
                <option value="B.Tech - Electronics and Communication Engineering">
                  B.Tech - Electronics and Communication Engineering
                </option>
                <option value="B.Tech - Electronics and Instrumentation Engineering">
                  B.Tech - Electronics and Instrumentation Engineering
                </option>
                <option value="B.Tech - Electronics and Communication Engineering (Biomedical Engineering)">
                  B.Tech - Electronics and Communication Engineering (Biomedical
                  Engineering)
                </option>
                <option value="B.Tech. Electronics Engineering (VLSI Design and Technology)">
                  B.Tech. Electronics Engineering (VLSI Design and Technology)
                </option>
                <option value="B.Tech - Information Technology">
                  B.Tech - Information Technology
                </option>
                <option value="B.Tech - Mechanical Engineering">
                  B.Tech - Mechanical Engineering
                </option>
                <option value="B.Tech - Mechanical Engineering (Automobile Engineering)">
                  B.Tech - Mechanical Engineering (Automobile Engineering)
                </option>
                <option value="B.Tech - Mechanical Engineering (Manufacturing Engineering)">
                  B.Tech - Mechanical Engineering (Manufacturing Engineering)
                </option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="contact_no">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Contact No"
                name="contact_no"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit" onClick={handleClick}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Register;
