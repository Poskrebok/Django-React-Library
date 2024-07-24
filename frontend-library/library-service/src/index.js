import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Layout from "./components/layout";

import "./assets/scss/argon-dashboard-react.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/plugins/nucleo/css/nucleo.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/Main/*" element={<Layout />} />
        <Route path="*" element={<Navigate to="/Main/books" replace />} />
      </Routes>
    </BrowserRouter>
);
