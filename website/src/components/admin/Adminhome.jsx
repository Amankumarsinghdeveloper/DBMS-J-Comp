import React from "react";
import { Routes, Route, Link } from 'react-router-dom';

import "./Adminhome.css";

import AdminNav from "../admin/adminNav/AdminNav";
import AdminH from "./AdminH";
import Book from "./book/Book";
import Userlist from "./userlist/Userlist";
import Regbook from "./regbook/Regbook";
import Addbook from "./addbook/Addbook";
import Editbook from "./editbook/Editbook";
import Edituser from "./userlist/edituser/Edituser";
import Takebook from "./regbook/takebook/Takebook";
import Issuelist from "./issuelist/Issuelist";







const Adminhome = () => {
  return (
    <>
      <AdminNav />

      <Routes>
        <Route path="*" element={<AdminH />} />
        <Route path="books" element={<Book />} />
        <Route path="userlist" element={<Userlist />} />
        <Route path="regbook" element={<Regbook />} />
        <Route path="addbook" element={<Addbook />} />
        <Route path="editbook/:id" element={<Editbook />} />
        <Route path="edituser/:id" element={<Edituser />} />
        <Route path="takebook/:id" element={<Takebook />} />
        <Route path="issuelist" element={<Issuelist />} />
      </Routes>
    </>
  );
};

export default Adminhome;
