


import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";

import { Header } from './Components/Header';
import { Home } from "./pages/Home";
import { NotFound } from './pages/NotFound';
import {Cart} from "./pages/Cart"




import logo from './logo.svg';
import "./scss/app.scss"



function App() {

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" exact element = {<Home/>}/>
            <Route  path="*" exact element = {<NotFound/>} />
            <Route  path="/cart.html" exact element = {<Cart/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
