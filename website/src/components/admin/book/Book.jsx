import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./Book.css";

import { Link } from "react-router-dom";

import { RiDeleteBin5Fill, RiEditBoxFill } from "react-icons/ri";

const Book = () => {
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
                    variant="danger"
                    onClick={() => deleteBook(book.BOOK_ID)}
                  >
                    <RiDeleteBin5Fill />
                  </Button> {" "}
                  <Button
                    variant="warning"
                  >
                    <Link to={`/adminhome/editbook/${book.BOOK_ID}`}><RiEditBoxFill /></Link>
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <button>
          <Link to="/adminhome/addbook">Add New Book</Link>
        </button>
      </div>
    </>
  );
};

export default Book;
