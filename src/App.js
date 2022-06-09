


import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";


import { RootState } from './redux/store'
import { Header } from './Components/Header';
import { Home } from "./pages/Home";
import { NotFound } from './pages/NotFound';
import { Cart } from "./pages/Cart"
import { AppContext } from "./Context"



import logo from './logo.svg';
import "./scss/app.scss"



function App() {
  const [searchValue, setSearchValue] = React.useState("")


  return (
    <AppContext.Provider value={{ setSearchValue, searchValue }}>
      <div className="wrapper">

        <Header />
        <div className="content">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="*" exact element={<NotFound />} />
            <Route path="/cart.html" exact element={<Cart />} />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
