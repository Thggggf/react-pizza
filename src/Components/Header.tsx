import React from "react"
import {Link, useLocation} from "react-router-dom"

import {Label,CartVidget,Search} from "../Components"


export const Header: React.FC = () => {
  return (
    <div className="header">
    <div className="container">
       <Link to = "/">
          <Label/>
        </Link>
        <Search/>
      
        <div className="header__cart">
        <Link to = "/cart" className="button button--cart">
          <CartVidget/>
        </Link>
    </div>
      
    </div>
    </div>
  )
}