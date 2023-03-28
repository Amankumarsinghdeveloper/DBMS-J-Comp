import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import { RiEditBoxFill } from "react-icons/ri";

import "./Userlist.css";

import { Link } from "react-router-dom";

const Userlist = () => {
  const [Student, setStudent] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/student");
        setStudent(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className="Books__container">
        <div className="books">
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Registration No</th>
                <th>Name</th>
                <th>Branch</th>
                <th>Contact No</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {Student.map((Student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{Student.REG_NO}</td>
                  <td>
                    {Student.F_NAME +
                      " " +
                      Student.F_MIDDLE +
                      " " +
                      Student.F_LAST}
                  </td>
                  <td>{Student.BRANCH}</td>
                  <td>{Student.CONTACT_NO}</td>
                  <td>
                    <Link to={`/adminhome/edituser/${Student.REG_NO}`}>
                      <Button variant="warning">
                        <RiEditBoxFill />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Userlist;
