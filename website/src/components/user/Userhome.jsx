import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./Userhome.css";

import Usernav from "./usernav/Usernav";
import AdminH from "../admin/AdminH";
import Tranjection from "./tranjection/Tranjection";
import Booksava from "./bookavaliable/Booksava";
import Borrow from "./bookavaliable/borrow/Borrow";
import Register from "./register/Register";
import Login from "./login/Login";



const Userhome = () => {
  return (
    <>
      <Usernav />

      <Routes>
        <Route path="*" element={<AdminH />} />
        <Route path="tranjection" element={<Tranjection />} />
        <Route path="register" element={<Register />} />
        <Route path="bookavaliable" element={<Booksava />} />
        <Route path="borrowbook/:id" element={<Borrow />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
};

export default Userhome;
