import React, { useState } from "react";
import '../custom.css';
import { Button } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import AxiosService from "../API/AxiosService";
import ElementGenericModal from "../Elements/ElementGenericModal/ElementGenericModal";
import { useNavigate } from "react-router-dom";
import { actionClearCart } from "../reducers/reducerCart/reducerCart";
import { toast } from "react-toastify";


export default function MaintainCart(props) {

    const cart = useSelector((state) => state.reducerCart.cart)
    const username = useSelector((state) => state.reducerLogin.username);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function itemBox(prodImage, description, price, quantity) {
        return (
            <div className="my-row border border-success">
                <img src={prodImage} alt="prodImage" />
                <p>{description}</p>
                <div>
                    <h5>R {price}</h5>
                    <h5>Quantity {quantity}</h5>
                    <h5>Remove</h5>
                </div>
            </div>
        )
    }

    function CartSummary() {

        const total = cart.reduce((accumlator, object) => accumlator + (object.price * object.Quantity),0);
        const quantity = cart.reduce((accumlator, object) =>  accumlator +  object.Quantity,0);

        return (
            <div className="border border-success">
                <h5>Cart Summary</h5>
                <h5>Total({quantity} items R {total})</h5>
                <input type="submit" name="submit" class="btn btn-info btn-md" id="but" value="Checkout"  onClick={() => { checkOut() }}></input>
            </div>
        )
    }

    function CalculateOrderTotal() {
        debugger
        let total = 0;
        cart.forEach(item => {
            if (item.Quantity === 1) total = total + item.price;
            if (item.Quantity > 1) {
                let amount = item.price * item.Quantity;
                total = total + amount;
            }
        });
        return total;
    }

    const [showModal, toggleShowModal] = useState(false);

    async function checkOut() {
        if (username === "") {
            toggleShowModal(!showModal);
            return
        }
        const today = new Date();
        const request = {
            username: username,
            order_Total: CalculateOrderTotal(),
            date_Started: today,
            items: cart,
        }
        await AxiosService.createOrder(request)
            .then(function (response) {
                dispatch(actionClearCart());
                navigate('/home')
                toast.success(response.data.message)
            })
            .catch(function (response) {
                toast.error(response.message)
            })
    }

    return (
        <div>
            <div class="container">
                <div className="row"><h1>Shopping Cart</h1></div>
                <div className="checkout-page">
                    <div className="product-cart-region">
                        <div>
                            {cart.map((product) => {
                                return (
                                    <div className="cart-flex" style={{ width: "200px", height: "200px" }}>
                                        {itemBox(product.imageURL, product.item_Name, product.price, product.Quantity)}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="product-summary-region">
                        {CartSummary()}
                    </div>
                </div>
            </div>
            <ElementGenericModal isOpen={showModal} title={"Sorry"}>
                <h1>Please login to complete your order</h1>
                <Button onClick={() => toggleShowModal(!showModal)}>Cancel</Button>
                <Button onClick={() => {
                    toggleShowModal(!showModal)
                    navigate("/login")
                }
                }>Log In Now</Button>
            </ElementGenericModal>
        </div>
    )
}

