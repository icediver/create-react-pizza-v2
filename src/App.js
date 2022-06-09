import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import MainLayout from "./layouts/MainLayout";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import "./scss/app.scss";
// import pizzas from './assets/pizzas.json';
// export const SearchContext = React.createContext('');
function Parent({ children }) {
  return (
    <div>
      <h1>Заголовок</h1>
      {children}
      <h4>12324323</h4>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
