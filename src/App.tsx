import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Registration from "./pages/Registration/Registration";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/newUserRegistration" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:productID" element={<ProductPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
