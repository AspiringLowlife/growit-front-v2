import React from "react";
import '../custom.css';
import { Button } from "react-bootstrap";

export default function MaintainCart() {     

    //const [cartItems, dispatch] = useReducer(reducer, initialCartItems)

    return (
        <div class="container">
            <div>
                <div>
                    <div className="row"><h1>Shopping Cart</h1></div>
                    <div className="cart-flex" >
                        {itemBox("Your Name", "Bill Hetherington")}
                        {CartSummary(3, 590.50)}
                        <Button>CLICK FUCJK ME</Button>
                    </div>                    
                </div>
            </div>
        </div>
    )
}
function itemBox(prodImage, description, price) {
    return (
        <div className="my-row border border-success">
            <img src={prodImage} alt="prodImage" />
            <p>{description}</p>
            <div>
                <h5>R {price}</h5>                
                <h5>Remove</h5>
            </div>
        </div>
    )
}
function CartSummary(noOfItems, total) {
    return (
        <div className="border border-success">
            <h5>Cart Summary</h5>
            <h5>Total({noOfItems} items R {total})</h5>
            <input type="submit" name="submit" class="btn btn-info btn-md" id="but" value="Checkout"></input>
        </div>
    )
}
