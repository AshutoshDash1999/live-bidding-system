import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import LandingPage from "../pages/LandingPage/LandingPage";
import Login from "../pages/Login/Login";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import ProductPage from "../pages/ProductPage/ProductPage";
import Registration from "../pages/Registration/Registration";
import Signup from "../pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* protected routes */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/newUserRegistration" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:productID" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
