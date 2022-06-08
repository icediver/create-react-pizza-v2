import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './scss/app.scss';
// import pizzas from './assets/pizzas.json';
// export const SearchContext = React.createContext('');



function App() {
  return (
    <div className="wrapper">
        <Header />
        <div className="content">
          
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='*' element={<NotFound/>}/>
            </Routes>
          
        </div>
    </div>
    );
}

export default App;
