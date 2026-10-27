// import Api from "./api/Api";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./component/Home";
import Login from "./component/Login/Login";

function App() {
  return (
    <div className="justify-center flex flex-col items-center min-h-screen">
      {/* <Api /> */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
