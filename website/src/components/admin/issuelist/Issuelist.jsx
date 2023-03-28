import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import "./Issuelist.css";

const Issuelist = () => {
  const [books, setBooks] = useState([]);
  const [issues, setissue] = useState([]);
  const [breturn, setbreturn] = useState([]);
  const [cost, setCost] = useState(0);

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

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/issuestatus");
        setissue(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/returnstatus");
        setbreturn(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, []);

  // Current Date & Time
  const return_date = new Date();
  const formatted_return_date = return_date
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  // Returen book
  const returnBook = async (e, issueId, bookId, deudate) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("return_date", formatted_return_date);
    formData.append("issue_id", issueId);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // Retrieve the book details from the API
      const bookRes = await axios.get(
        `http://localhost:5000/api/books/${bookId}`
      );

      // Get the book quantity from the response
      const bookQuantity = bookRes.data[0].QUANTITY;

      // Update the quantity in the formData2
      const formData2 = new FormData();
      formData2.append("quantity", bookQuantity + 1);

      // Update the book quantity using the bookId
      await axios.put(
        `http://localhost:5000/api/returnquantity/${bookId}`,
        formData2,
        config
      );
      console.log(formData2.get("quantity"));
    } catch (err) {
      console.log(err);
    }

    try {
      await axios.post(
        "http://localhost:5000/api/returnstatus",
        formData,
        config
      );
    } catch (err) {
      console.log(err);
    }

    // Calculate the Trajection
    const dueDateMs = new Date(deudate).getTime();
    const returnDateMs = new Date(formatted_return_date).getTime();
    const daysLate = Math.floor(
      (returnDateMs - dueDateMs) / (1000 * 60 * 60 * 24)
    );



    try {
      if (daysLate >= 0) {
        setTimeout(() => {
          setCost(daysLate * 10);
        }, 1000); // Wait for 1 second (1000 milliseconds) before setting cost state
      } else {
        setTimeout(() => {
          setCost(0);
        }, 1000); // Wait for 1 second (1000 milliseconds) before setting cost state
      }
  
      // Creating a Tranjection
      const formData3 = new FormData();
      formData3.append("amount", cost);
      formData3.append("issueid", issueId);

      await axios.post("http://localhost:5000/api/invoice", formData3, config);
    } catch (err) {
      console.log(err);
    }

    // Reload the page
    window.location.reload();
  };

  return (
    <>
      <div className="Books__container">
        <div className="books">
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>TITLE</th>
                <th>ISSUE BY</th>
                <th>ISSUE DATE</th>
                <th>DUE DATE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, index) => {
                const book = books.find(
                  (book) => issue.BOOK_ID === book.BOOK_ID
                );
                return (
                  <tr key={index}>
                    <td className="Issue-bookimg">
                      <img
                        src={`http://localhost:5000/uploads/${book.BOOK_IMAGE}`}
                        alt=""
                      />
                    </td>
                    <td>{book.TITLE}</td>
                    <td>{issue.REG_NO}</td>
                    <td>{new Date(issue.ISSUE_DATE).toLocaleDateString()}</td>
                    <td>{new Date(issue.DUE_DATE).toLocaleDateString()}</td>
                    <td>
                      {breturn.find((br) => br.ISSUE_ID === issue.ISSUE_ID) ? (
                        <Button variant="success">Returned</Button>
                      ) : (
                        <Button
                          variant="warning"
                          onClick={(e) =>
                            returnBook(
                              e,
                              issue.ISSUE_ID,
                              book.BOOK_ID,
                              issue.DUE_DATE
                            )
                          }
                        >
                          Return Now
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Issuelist;
