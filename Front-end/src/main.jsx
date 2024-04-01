import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./Users";
import App from "./App";
import View from "./View";
import Edit from "./Edit";
import Navbar from "./Components/Navbar";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
  
          <Route path="/" element={<Users />} />
          <Route path="/add" element={<App />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/edit/:id" element={<Edit />} />
    

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
       
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
