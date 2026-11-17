// import Api from "./api/Api";
import ProtectedRoute from "./component/Helper/ProtectedRoute";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./component/Home";
import Login from "./component/Login/Login";
import { UserStorage } from "./UserStorage";
import User from "./component/User/User";

function App() {
  return (
    <div className="justify-center flex flex-col items-center pt-20">
      {/* <Api /> */}
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <Route
              path="conta/*"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
