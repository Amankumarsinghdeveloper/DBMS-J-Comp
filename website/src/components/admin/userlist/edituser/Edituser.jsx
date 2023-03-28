import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useParams } from "react-router-dom";

import "./Edituser.css";

const Edituser = () => {
  const { id } = useParams();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${id}`);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, [id]);

  const [Eusers, setEusers] = useState({
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

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${id}`);
        setUsers(res.data);
        setEusers({
          registration_no: res.data[0].REG_NO,
          email: res.data[0].UNI_EMAIL,
          f_name: res.data[0].F_NAME,
          f_middle: res.data[0].F_MIDDLE,
          f_last: res.data[0].F_LAST,
          school: res.data[0].SCHOOL,
          branch: res.data[0].BRANCH,
          contact_no: res.data[0].CONTACT_NO,
          password: res.data[0].PASSWORD,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, [id]);

  const handleChange = (e) => {
    setEusers((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(e);
  };

  const updateBook = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // append user details to form data
    formData.append("registration_no", Eusers.registration_no);
    formData.append("email", Eusers.email);
    formData.append("f_name", Eusers.f_name);
    formData.append("f_middle", Eusers.f_middle);
    formData.append("f_last", Eusers.f_last);
    formData.append("school", Eusers.school);
    formData.append("branch", Eusers.branch);
    formData.append("contact_no", Eusers.contact_no);
    formData.append("password", Eusers.password);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        `http://localhost:5000/api/users/${id}`,
        formData,
        config
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="ebook_container">
        <div className="user">
          {users.map((user) => (
            <div key={user.REG_NO}>
              <Card style={{ width: "60rem" }}>
                <Card.Body>
                  <div className="ebook">
                    <label htmlFor="registration_no">Registration No:</label>
                    <input
                      type="text"
                      placeholder="Registration No"
                      name="registration_no"
                      onChange={handleChange}
                      id="registration_no"
                      value={
                        Eusers.registration_no !== ""
                          ? Eusers.registration_no
                          : user.REG_NO
                      }
                    />
                  </div>
                  <div className="ebook">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      id="email"
                      value={
                        Eusers.email !== "" ? Eusers.email : user.UNI_EMAIL
                      }
                    />
                  </div>
                  <div className="ebook">
                    <label htmlFor="f_name">First Name:</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      name="f_name"
                      onChange={handleChange}
                      id="f_name"
                      value={Eusers.f_name !== "" ? Eusers.f_name : user.F_NAME}
                    />{" "}
                  </div>
                  <div className="ebook">
                    <label htmlFor="f_middle">Middle Name:</label>
                    <input
                      type="text"
                      placeholder="Middle Name"
                      name="f_middle"
                      onChange={handleChange}
                      id="f_middle"
                      value={
                        Eusers.f_middle !== "" ? Eusers.f_middle : user.F_MIDDLE
                      }
                    />{" "}
                  </div>
                  <div className="ebook">
                    <label htmlFor="f_last">Last Name:</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="f_last"
                      onChange={handleChange}
                      id="f_last"
                      value={Eusers.f_last !== "" ? Eusers.f_last : user.F_LAST}
                    />{" "}
                  </div>
                  <div className="ebook">
                    <label htmlFor="school">School:</label>
                    <input
                      type="text"
                      placeholder="School"
                      name="school"
                      onChange={handleChange}
                      id="school"
                      value={Eusers.school !== "" ? Eusers.school : user.SCHOOL}
                    />{" "}
                  </div>
                  <div className="ebook">
                    <label htmlFor="branch">Branch</label>
                    <select
                      type="text"
                      placeholder="Branch"
                      name="branch"
                      onChange={handleChange}
                      id="branch"
                      value={Eusers.branch !== "" ? Eusers.branch : user.BRANCH}
                    >
                      <option value="">B.Tech - Biotechnology</option>
                      <option value="">B.Tech - Chemical Engineering</option>
                      <option value="">B.Tech - Civil Engineering</option>
                      <option value="B.Tech - Computer Science and Engineering">
                        B.Tech - Computer Science and Engineering
                      </option>
                      <option value="Computer Science and Engineering (Bioinformatics)">
                        B.Tech - Computer Science and Engineering
                        (Bioinformatics)
                      </option>
                      <option value="B.Tech - Computer Science and Engineering (Information Security)">
                        B.Tech - Computer Science and Engineering (Information
                        Security)
                      </option>
                      <option value="B.Tech - Computer Science and Engineering (Internet of Things)">
                        B.Tech - Computer Science and Engineering (Internet of
                        Things)
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
                        B.Tech - Electronics and Communication Engineering
                        (Biomedical Engineering)
                      </option>
                      <option value="B.Tech. Electronics Engineering (VLSI Design and Technology)">
                        B.Tech. Electronics Engineering (VLSI Design and
                        Technology)
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
                        B.Tech - Mechanical Engineering (Manufacturing
                        Engineering)
                      </option>
                    </select>
                  </div>
                  <div className="ebook">
                    <label htmlFor="contact_no">Contact No:</label>
                    <input
                      type="text"
                      placeholder="Contact Number"
                      name="contact_no"
                      onChange={handleChange}
                      id="contact_no"
                      value={
                        Eusers.contact_no !== ""
                          ? Eusers.contact_no
                          : user.CONTACT_NO
                      }
                    />
                  </div>
                  <div className="ebook">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="text"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      id="password"
                      value={
                        Eusers.password !== "" ? Eusers.password : user.PASSWORD
                      }
                    />
                  </div>

                  <Button variant="warning" onClick={updateBook}>
                    UPDATE
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Edituser;
