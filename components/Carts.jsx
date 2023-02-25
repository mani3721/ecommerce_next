import React, { useRef } from "react";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti'
import { toast } from "react-hot-toast";
import { urlFor } from "../lib/client";
import { useStateContext } from "../context/statecontext";
import Link from "next/link";
import getStripe from "../lib/getStripe";
const Carts = () => {
    const cartRef = useRef()


    const { showCart, setShowCart, cartItem, totalPrice, totalQuantities,toggleCartItem,onremove } = useStateContext()





    const handleCheckout = async () => {
        const stripe = await getStripe();
    
        const response = await fetch('/api/stripe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItem),
        });
    
        if(response.statusCode === 500) return;
        
        const data = await response.json();
    
        toast.loading('Redirecting...');
    
        stripe.redirectToCheckout({ sessionId: data.id });
      }






    return (
        <>
            <div className="cart-wrapper" ref={cartRef}>
                <div className="cart-container">
                    <button type="button" className="cart-heading" onClick={() => setShowCart(false)}>
                        <AiOutlineLeft />
                        <span className="heading">Your Cart</span>
                        <span className="cart-num-items">({totalQuantities}item)</span>
                    </button>
                    {
                        cartItem.length < 1 && (
                            <div className="empty-cart">
                                <AiOutlineShopping size={150} />
                                <h3>Your Shopping bag is empty</h3>
                                <Link href='/' >
                                    <button type="button" onClick={() => setShowCart(false)} className='btn'>
                                        Continue Shopping
                                    </button>


                                </Link>
                            </div>
                        )
                    }
                    <div className="product-container">
                        {
                            cartItem.length >= 1 && cartItem.map((item, index) => (
                                <div className="product" key={item._id}>

                                    <img src={urlFor(item?.image[0])} alt="" className="cart-product-image" />
                                    <div className="item-desc">
                                        <div className="flex top">
                                            <h5>{item.name}</h5>
                                            <h5>${item.price}</h5>
                                        </div>
                                        <div className="flex bottom">
                                            <div>
                                                <p className="quantity-desc">
                                                    <span className="minus" onClick={()=>toggleCartItem(item._id,"dec")} >
                                                        <AiOutlineMinus />
                                                    </span>
                                                    <span className="num" >
                                                        {item.quantity}
                                                    </span>
                                                    <span className="plus" onClick={()=>toggleCartItem(item._id,"inc")}>
                                                        <AiOutlinePlus />
                                                    </span>
                                                </p>
                                            </div>
                                            <button type="button" className="remove-item" onClick={()=>onremove(item)}>
                                                 <TiDeleteOutline/>
                                            </button >
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {cartItem.length >=1 && (
                        <div className=" cart-bottom"> 

                           <div className="total">
                       <h3>SubTotal:</h3>
                              <h3>${totalPrice}</h3>
                           </div>
                           <div className="btn-container">
                             <button className="btn" type="button" onClick={handleCheckout}>
                                Pay With Stripe
                             </button>
                             </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Carts;