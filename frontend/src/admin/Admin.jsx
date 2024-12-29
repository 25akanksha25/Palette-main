import {  Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Dashboard from "./pages/Dashboard";
import adminhead from "../assets/admin-head.jpg"

import {
  AdminProtected,
  AdminRoutes,
  AdminPublicRoute,
} from "../auth/Protected";

const App = () => {
  return (
    <>
      <div className="relative">
        <img
          src={adminhead} 
          alt="About Us Banner"
          className="w-full h-[350px] object-cover"
        />
      </div>
      <Routes>
        <Route element={<AdminProtected />}>
          <Route element={<AdminRoutes />}>
            <Route path="/*" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
