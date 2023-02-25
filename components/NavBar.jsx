import React from "react";
import Link from "next/link";
// import {AiOutShopping} from 'react-icons/ai'
import { AiOutlineShopping } from 'react-icons/ai'

import { useStateContext } from "../context/statecontext";
import Carts from "./Carts";
const NavBar=()=>{

    const {showCart,setShowCart,totalQuantities}=useStateContext()
    return (
        <>
        <div className="navbar-container">
           <p className="logo">
            <Link href='./' > Mani</Link>
           </p>
           <button type="button" className="cart-icon" onClick={()=>setShowCart(true)}>
           <AiOutlineShopping/>
           <span className="cart-item-qty"> {totalQuantities}</span>
           </button>
           {showCart && <Carts/>}
        </div>
        </>
    )
}

export default NavBar;