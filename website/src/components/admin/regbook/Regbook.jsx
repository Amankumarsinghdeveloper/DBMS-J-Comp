import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./Regbook.css";

import { Link } from "react-router-dom";

const Regbook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      setBooks(books.filter((book) => book.BOOK_ID !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="Books__container">
        <div className="books">
          {books.map((book) => (
            <div key={book.BOOK_ID}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/uploads/${book.BOOK_IMAGE}`}
                />
                {/* <Card.Img variant="top" src={book.cover && <img src={book.cover} alt="" />} /> */}
                <Card.Body>
                  <Card.Title>{book.TITLE}</Card.Title>
                  <h6>Price: {book.PRICE}</h6>
                  <h6>Quantity: {book.QUANTITY}</h6>

                  <Button
                    variant="warning"
                  >
                    <Link to={`/adminhome/takebook/${book.BOOK_ID}`}>Give this Book</Link>
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

export default Regbook;
