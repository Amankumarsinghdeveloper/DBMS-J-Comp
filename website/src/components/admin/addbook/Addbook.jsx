import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Addbook.css";

import Button from "react-bootstrap/Button";

const Addbook = () => {
  const [books, setBooks] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    edition: "",
    price: "",
    quantity: "",
    call_no: "",
    image: null,
  });

  const handleChange = (e) => {
    setBooks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    // update the 'image' field in the 'books' state with the selected file
    setBooks((prev) => ({ ...prev, image: event.target.files[0] }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // append image file to form data
    formData.append("image", selectedFile);

    // append book details to form data
    formData.append("title", books.title);
    formData.append("author", books.author);
    formData.append("isbn", books.isbn);
    formData.append("publisher", books.publisher);
    formData.append("edition", books.edition);
    formData.append("price", books.price);
    formData.append("quantity", books.quantity);
    formData.append("call_no", books.call_no);

    try {
      //Add book
      await axios.post("http://localhost:5000/api/books", formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="Addbook__container">
        <div className="form">
          <h1>ADD NEW BOOK</h1>
          <div className="addbook-contentbox">
            <div className="addbook">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                placeholder="TITLE"
                name="title"
                onChange={handleChange}
                id=""
              />
            </div>
            <div className="addbook">
              <label htmlFor="author">Author:</label>
              <input
                type="text"
                placeholder="AUTHOR"
                name="author"
                onChange={handleChange}
                id=""
              />
            </div>
            <div className="addbook">
              <label htmlFor="isbn">ISBN:</label>
              <input
                type="text"
                placeholder="ISBN"
                name="isbn"
                onChange={handleChange}
                id=""
              />
            </div>
            <div className="addbook">
              <label htmlFor="publisher">Publisher:</label>
              <input
                type="text"
                placeholder="PUBLISHER"
                name="publisher"
                onChange={handleChange}
                id=""
              />
            </div>
            <div className="addbook">
              <label htmlFor="edition">Edition:</label>
              <input
                type="text"
                placeholder="EDITION"
                name="edition"
                onChange={handleChange}
                id=""
              />
            </div>
            <div className="addbook">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                placeholder="PRICE"
                name="price"
                onChange={handleChange}
                id=""
              />
            </div>
            <div className="addbook">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                placeholder="QUANTITY"
                name="quantity"
                onChange={handleChange}
                id=""
              />
            </div>
            <div className="addbook">
              <label htmlFor="call_no">Call No:</label>
              <input
                type="text"
                placeholder="CALL_NO"
                name="call_no"
                onChange={handleChange}
                id=""
              />
            </div>
            <div className="addbook">
              <label htmlFor="image">Book Image:</label>
              <input
                type="file"
                placeholder="PIC"
                name="image"
                onChange={handleFileChange}
                id=""
              />
            </div>
            {/* <button onClick={handleUpload}>Upload</button> */}
          </div>
        </div>
        <Button variant="success" onClick={handleClick}>Add Book</Button>
      </div>
    </>
  );
};

export default Addbook;
