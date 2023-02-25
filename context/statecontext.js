import product from "ecommerce/schemas/product";
import React, { createContext, useContext, useState } from "react";

import {toast} from 'react-hot-toast'

const context=createContext()

export const StateContext=({children})=>{
   const [showCart, setShowCart]=useState(false)
   const [cartItem, setCarItem]=useState([])
   const [totalPrice, setTotalPrice]=useState(0)
   const [totalQuantities, setTotalQuantities]=useState(0)
   const [qty, setQty]=useState(1)

   let foundProduct;
   let index;
   
const onAdd=(product, quantity)=>{
   const checkProductInCard=cartItem.find((item)=>item._id === product._id)

   setTotalPrice((prevTotalPrice)=>prevTotalPrice + product.price * quantity)
   setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities +quantity)

   if (checkProductInCard) {
       const updatedCartItem=cartItem.map((cartProduct)=>{
        if (cartProduct._id === product._id)  return {
             ...cartProduct, quantity:cartProduct.quantity+quantity
        }
     })
     setCarItem(updatedCartItem)
    
   }else{
     product.quantity =quantity;
     setCarItem([...cartItem,{...product}])
   }
   toast.success(`${qty} ${product.name} add to the Cart`)
}


const onremove=(product)=>{
  foundProduct = cartItem.find((item) => item._id ===product._id)

  const newCartItems = cartItem.filter((item) => item._id !== product._id)

  setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price * foundProduct.quantity)
  setTotalQuantities(prevTotalQuantities=>prevTotalQuantities-foundProduct.quantity)

  setCarItem(newCartItems)
}

const toggleCartItem = (id, value) => {
    foundProduct = cartItem.find((item) => item._id === id)
    index = cartItem.findIndex((product) => product._id === id);
    const newCartItems = cartItem.filter((item) => item._id !== id)

    if(value === 'inc') {
        setCarItem([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCarItem([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

const incQty=()=>{
    setQty((prevQty)=>prevQty +1)
}
const decQty=()=>{
    setQty((prevQty)=>{
         if (prevQty -1 < 1) return 1 
        return prevQty -1
    })
}


   return(
    <context.Provider
    value={{
        showCart,
        setShowCart,
        cartItem,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItem,
        onremove,
        setCarItem,
        setTotalPrice,
        setTotalQuantities,
        setShowCart
    }}
    >

        {children}
    </context.Provider>
   )
}
export const useStateContext=()=>useContext(context)