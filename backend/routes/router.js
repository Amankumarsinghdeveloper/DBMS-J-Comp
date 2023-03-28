import express from "express";
import db from "../db/conn.js";
import multer from "multer";
import fs from "fs";

const router = express.Router();

// Create uploads folder if it doesn't exist
const UPLOADS_DIR = "./uploads";
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// img storgae config
var imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, UPLOADS_DIR);
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`); // image-1234567890.jpg
  },
});

//img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

router.post("/upload", upload.single("image"), (req, res) => {
  res.json({ message: "Image has been Uploaded" });
});

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

router.get("/books", (req, res) => {
  const b = "SELECT * FROM books";
  db.query(b, (err, data) => {
    if (err) {
      res.json({ message: "Error in fetching books" });
    } else {
      res.json(data);
    }
  });
});

router.post("/books", upload.single("image"), (req, res) => {
  const b =
    "INSERT INTO books(`TITLE`, `AUTHOR`, `ISBN`, `PUBLISHER`, `EDITION`, `PRICE`, `QUANTITY`, `CALL_NO`, `BOOK_IMAGE`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.author,
    req.body.isbn,
    req.body.publisher,
    req.body.edition,
    req.body.price,
    req.body.quantity,
    req.body.call_no,
    req.file.filename,
  ];

  db.query(b, [values], (err, data) => {
    if (err) {
      res.json({ message: "Error in adding book" });
    } else {
      res.json({ message: "Book added successfully" });
    }
  });
});

//Delete books data
router.delete("/books/:id", (req, res) => {
  const { id } = req.params;

  try {
    db.query(`DELETE FROM books WHERE BOOK_ID = ${id}`, (err, data) => {
      if (err) {
        res.json({ message: "Error in deleting book" });
      } else {
        res.json({ message: "Book deleted successfully" });
      }
    });
  } catch (error) {
    res.json({ message: "Error in deleting book" });
  }
});

//Get single book data
router.get("/books/:id", (req, res) => {
  const { id } = req.params;

  try {
    db.query(`SELECT * FROM books WHERE BOOK_ID = ${id}`, (err, data) => {
      if (err) {
        res.json({ message: "Error in fetching book" });
      } else {
        res.json(data);
      }
    });
  } catch (error) {
    res.json({ message: "Error in fetching book" });
  }
});

// Update a book
router.put("/books/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.body)
  const { title, author, isbn, publisher, edition, price, quantity, call_no } =
    req.body;

  try {
    db.query(
      `UPDATE books SET TITLE='${title}', AUTHOR='${author}', ISBN='${isbn}', PUBLISHER='${publisher}', EDITION='${edition}', PRICE='${price}', QUANTITY='${quantity}', CALL_NO='${call_no}' WHERE BOOK_ID=${id}`,
      (err, data) => {
        if (err) {
          res.json({ message: "Error in updating book" });
          console.log(err)
        } else {
          res.json({ message: "Book updated successfully" });
        }
      }
    );
  } catch (error) {
    res.json({ message: "Error in updating book" });
  }
});

// New User Registration
router.post("/newuser", (req, res) => {
  const b =
    "INSERT INTO student(`REG_NO`, `UNI_EMAIL`, `F_NAME`, `F_MIDDLE`, `F_LAST`, `SCHOOL`, `BRANCH`, `CONTACT_NO`, `PASSWORD`) VALUES (?)";

  const values = [
    req.body.registration_no,
    req.body.email,
    req.body.f_name,
    req.body.f_middle,
    req.body.f_last,
    req.body.school,
    req.body.branch,
    req.body.contact_no,
    req.body.password,
  ];

  db.query(b, [values], (err, data) => {
    if (err) {
      res.status(500).json({ error: "Error in User Registration" });
    } else {
      res.status(201).json({ message: "User Registered successfully" });
    }
  });
});

// Get Student Details
router.get("/student", (req, res) => {
  const b = "SELECT * FROM student";
  db.query(b, (err, data) => {
    if (err) {
      res.json({ message: "Error in fetching books" });
    } else {
      res.json(data);
    }
  });
});

//Get single Student Details
router.get("/users/:id", (req, res) => {
  const { id } = req.params;

  try {
    db.query(`SELECT * FROM student WHERE REG_NO = '${id}'`, (err, data) => {
      if (err) {
        res.json({ message: "Error in fetching book" });
      } else {
        res.json(data);
      }
    });
  } catch (error) {
    res.json({ message: "Error in fetching book" });
  }
});

// Update a User
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const {
    registration_no,
    email,
    f_name,
    f_middle,
    f_last,
    school,
    branch,
    contact_no,
    password,
  } = req.body;

  try {
    db.query(
      `UPDATE student SET REG_NO='${registration_no}', UNI_EMAIL='${email}', F_NAME='${f_name}', F_MIDDLE='${f_middle}', F_LAST='${f_last}', SCHOOL='${school}', BRANCH='${branch}', CONTACT_NO='${contact_no}', PASSWORD='${password}' WHERE REG_NO='${id}'`,
      (err, data) => {
        if (err) {
          res.json({ message: "Error in updating book" });
        } else {
          res.json({ message: "Book updated successfully" });
        }
      }
    );
  } catch (error) {
    res.json({ message: "Error in updating book" });
  }
});


// Issue a book
router.post("/issuebook", (req, res) => {
  const b =
    "INSERT INTO issue_status(`BOOK_ID`, `ISSUE_DATE`, `DUE_DATE`, `REG_NO`) VALUES (?)";

  const values = [
    req.body.book_id,
    req.body.issue_date,
    req.body.return_date,
    req.body.reg_no,
  ];

  db.query(b, [values], (err, data) => {
    if (err) {
      res.status(500).json({ error: "Error in Book Issuing" });
    } else {
      res.status(201).json({ message: "Book Issued successfully" });
    }
  });
});



// Update Book Quantity Issue
router.put("/issuebookquantity/:id", (req, res) => {
  const { id } = req.params;
  const {
    quantity,
  } = req.body;

  try {
    db.query(
      `UPDATE books SET QUANTITY='${quantity}' WHERE BOOK_ID='${id}'`,
      (err, data) => {
        if (err) {
          res.json({ message: "Error in updating book" });
        } else {
          res.json({ message: "Book updated successfully" });
        }
      }
    );
  } catch (error) {
    res.json({ message: "Error in updating book" });
  }
});

//Get Issue Status
router.get("/issuestatus", (req, res) => {

  try {
    db.query(`SELECT * FROM issue_status`, (err, data) => {
      if (err) {
        res.json({ message: "Error in fetching book" });
      } else {
        res.json(data);
      }
    });
  } catch (error) {
    res.json({ message: "Error in fetching book" });
  }
});

//Get Return Status
router.get("/returnstatus", (req, res) => {

  try {
    db.query(`SELECT * FROM return_status`, (err, data) => {
      if (err) {
        res.json({ message: "Error in fetching book" });
      } else {
        res.json(data);
      }
    });
  } catch (error) {
    res.json({ message: "Error in fetching book" });
  }
});



// Update Book Quantity Return
router.put("/returnquantity/:id", (req, res) => {
  const { id } = req.params;
  const {
    quantity,
  } = req.body;

  try {
    db.query(
      `UPDATE books SET QUANTITY='${quantity}' WHERE BOOK_ID='${id}'`,
      (err, data) => {
        if (err) {
          res.json({ message: "Error in updating book" });
        } else {
          res.json({ message: "Book updated successfully" });
        }
      }
    );
  } catch (error) {
    res.json({ message: "Error in updating book" });
  }
});


// Post Return Status
router.post("/returnstatus", (req, res) => {
  const b =
    "INSERT INTO return_status(`RETURN_DATE`, `ISSUE_ID`) VALUES (?)";

  const values = [
    req.body.return_date,
    req.body.issue_id
  ];

  db.query(b, [values], (err, data) => {
    if (err) {
      res.status(500).json({ error: "Error in Book Issuing" });
    } else {
      res.status(201).json({ message: "Book Issued successfully" });
    }
  });
});


// Post Invoice
router.post("/invoice", (req, res) => {
  const b =
    "INSERT INTO invoice(`AMOUNT`, `ISSUE_ID`) VALUES (?)";

  const values = [
    req.body.amount,
    req.body.issueid
  ];

  db.query(b, [values], (err, data) => {
    if (err) {
      res.status(500).json({ error: "Error in Book Issuing" });
    } else {
      res.status(201).json({ message: "Book Issued successfully" });
    }
  });
});









export default router;
