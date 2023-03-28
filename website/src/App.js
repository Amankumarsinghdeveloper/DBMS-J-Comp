import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/user/home/Home";
import Adminhome from "./components/admin/Adminhome";
import Book from "./components/admin/book/Book";
import Addbook from "./components/admin/addbook/Addbook";
import Editbook from "./components/admin/editbook/Editbook";
import Register from "./components/user/register/Register";
import Login from "./components/user/login/Login";
import Regbook from "./components/admin/regbook/Regbook";
import Takebook from "./components/admin/regbook/takebook/Takebook";
import Issuelist from "./components/admin/issuelist/Issuelist";
import Userlist from "./components/admin/userlist/Userlist";
import Edituser from "./components/admin/userlist/edituser/Edituser";
import Tranjection from "./components/user/tranjection/Tranjection";
import AdminH from "./components/admin/AdminH";
import Userhome from "./components/user/Userhome";
import UserH from "./components/user/UserH";
import Booksava from "./components/user/bookavaliable/Booksava";
import Borrow from "./components/user/bookavaliable/borrow/Borrow";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adminhome" element={<Adminhome />}>
            <Route path="*" element={<AdminH />} />
            <Route path="books" element={<Book />} />
            <Route path="regbook" element={<Regbook />} />
            <Route path="addbook" element={<Addbook />} />
            <Route path="editbook/:id" element={<Editbook />} />
            <Route path="userlist" element={<Userlist />} />
            <Route path="edituser/:id" element={<Edituser />} />
            <Route path="takebook/:id" element={<Takebook />} />
            <Route path="issuelist" element={<Issuelist />} />
            <Route path="borrowbook/:id" element={<Borrow />} />
          </Route>

          <Route path="/userhome" element={<Userhome />}>
            <Route path="register" element={<Register />} />
            <Route path="*" element={<UserH />} />
            <Route path="tranjection" element={<Tranjection />} />
            <Route path="bookavaliable" element={<Booksava />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
