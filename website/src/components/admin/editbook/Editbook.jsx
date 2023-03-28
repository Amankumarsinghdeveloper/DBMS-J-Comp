import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useParams } from "react-router-dom";


import "./Editbook.css";

const Editbook = () => {
  const { id } = useParams();

  const [books, setBooks] = useState([]);
  
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

  const [Ebooks, setEBooks] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    edition: "",
    price: "",
    quantity: "",
    call_no: "",
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBooks(res.data);
        setEBooks({
          title: res.data[0].TITLE,
          author: res.data[0].AUTHOR,
          isbn: res.data[0].ISBN,
          publisher: res.data[0].PUBLISHER,
          edition: res.data[0].EDITION,
          price: res.data[0].PRICE,
          quantity: res.data[0].QUANTITY,
          call_no: res.data[0].CALL_NO,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, [id]);

  const handleChange = (e) => {
    setEBooks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(e);
  };

  const updateBook = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // append book details to form data
    formData.append("title", Ebooks.title);
    formData.append("author", Ebooks.author);
    formData.append("isbn", Ebooks.isbn);
    formData.append("publisher", Ebooks.publisher);
    formData.append("edition", Ebooks.edition);
    formData.append("price", Ebooks.price);
    formData.append("quantity", Ebooks.quantity);
    formData.append("call_no", Ebooks.call_no);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        `http://localhost:5000/api/books/${id}`,
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
        <div className="books">
          {books.map((book) => (
            <div key={book.BOOK_ID}>
              <Card style={{ width: "30rem" }}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/uploads/${book.BOOK_IMAGE}`}
                />

                <Card.Body>
                  <div className="ebook">
                    <label htmlFor="title">Title:</label>
                    <input
                      type="text"
                      placeholder="Title"
                      name="title"
                      onChange={handleChange}
                      id="title"
                      value={Ebooks.title !== "" ? Ebooks.title : book.TITLE}
                    />
                  </div>
                  <div className="ebook">
                    <label htmlFor="author">Author:</label>
                    <input
                      type="text"
                      placeholder="AUTHOR"
                      name="author"
                      onChange={handleChange}
                      id="author"
                      value={Ebooks.author !== "" ? Ebooks.author : book.AUTHOR}
                    />
                  </div>
                  <div className="ebook">
                    <label htmlFor="call_no">ISBN:</label>
                    <input
                      type="text"
                      placeholder="ISBN"
                      name="isbn"
                      onChange={handleChange}
                      id=""
                      value={Ebooks.isbn !== "" ? Ebooks.isbn : book.ISBN}
                    />{" "}
                  </div>
                  <div className="ebook">
                    <label htmlFor="publisher">Publisher:</label>
                    <input
                      type="text"
                      placeholder="PUBLISHER"
                      name="publisher"
                      onChange={handleChange}
                      id=""
                      value={
                        Ebooks.publisher !== ""
                          ? Ebooks.publisher
                          : book.PUBLISHER
                      }
                    />{" "}
                  </div>
                  <div className="ebook">
                    <label htmlFor="edition">Edition:</label>
                    <input
                      type="text"
                      placeholder="EDITION"
                      name="edition"
                      onChange={handleChange}
                      id="edition"
                      value={
                        Ebooks.edition !== "" ? Ebooks.edition : book.EDITION
                      }
                    />{" "}
                  </div>
                  <div className="ebook">
                    <label htmlFor="price">Price:</label>
                    <input
                      type="number"
                      placeholder="PRICE"
                      name="price"
                      onChange={handleChange}
                      id="price"
                      value={Ebooks.price !== "" ? Ebooks.price : book.PRICE}
                    />{" "}
                  </div>
                  <div className="ebook">
                    <label htmlFor="quantity">Qunatity</label>
                    <input
                      type="number"
                      placeholder="QUANTITY"
                      name="quantity"
                      onChange={handleChange}
                      id="quantity"
                      value={
                        Ebooks.quantity !== "" ? Ebooks.quantity : book.QUANTITY
                      }
                    />{" "}
                  </div>
                  <div className="ebook">
                    <label htmlFor="call_no">CALL NO:</label>
                    <input
                      type="text"
                      placeholder="CALL_NO"
                      name="call_no"
                      onChange={handleChange}
                      id="call_no"
                      value={
                        Ebooks.call_no !== "" ? Ebooks.call_no : book.CALL_NO
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

export default Editbook;
