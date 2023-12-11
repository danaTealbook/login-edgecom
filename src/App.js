import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import NewArticle from "./pages/NewArticle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { PrivateRoute } from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute element={<Main />} />} />
        <Route
          path="/new"
          element={<PrivateRoute element={<NewArticle />} />}
        />
        <Route path="*" element={<h3>404 Page not found</h3>} />
      </Routes>
    </BrowserRouter>
  );
}
