import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useParams } from "react-router-dom";

import "./Borrrow.css";

const Borrow = () => {
  const { id } = useParams();

  const [books, setBooks] = useState([]);

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

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, [id]);

  // Current Date & Time
  const issue_date = new Date();
  const formatted_issue_date = issue_date
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  // Add 3 days to the current date
  const return_date = new Date();
  return_date.setDate(return_date.getDate() + 3);
  const formatted_return_date = return_date
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const issueBook = async (e) => {
    e.preventDefault();

    if (books[0].QUANTITY <= 0) {
      alert("Book is not available");
    } else {
      const bookId = books[0].BOOK_ID;

      const formData = new FormData();
      formData.append("book_id", bookId);
      formData.append("issue_date", formatted_issue_date);
      formData.append("return_date", formatted_return_date);
      formData.append("reg_no", document.getElementById("reg_no").value);

      let quantity = books[0].QUANTITY - 1;

      const formData2 = new FormData();
      formData2.append("quantity", quantity);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const res = await axios.put(
          `http://localhost:5000/api/issuebookquantity/${books[0].BOOK_ID}`,
          formData2,
          config
        );
      } catch (err) {
        console.log(err);
      }

      try {
        const res = await axios.post(
          "http://localhost:5000/api/issuebook",
          formData,
          config
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="ebook_container">
        <div className="books">
          {books.map((book) => (
            <div key={book.BOOK_ID}>
              <Card style={{ width: "30rem" }}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/uploads/${book.BOOK_IMAGE}`}
                />

                <Card.Body>
                  <Card.Title>{book.TITLE}</Card.Title>
                  <h6>Price: {book.PRICE}</h6>
                  <h6>Quantity: {book.QUANTITY}</h6>
                  <div className="tregno">
                    <label htmlFor="reg_no">Reg No:</label>
                    <select
                      type="text"
                      placeholder="Registration No"
                      name="reg_no"
                      id="reg_no"
                    >
                      {Student.map((student, index) => (
                        <option key={index + 1} value={student.REG_NO}>
                          {student.REG_NO}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button variant="success" onClick={issueBook}>
                    BORROW NOW
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

export default Borrow;
