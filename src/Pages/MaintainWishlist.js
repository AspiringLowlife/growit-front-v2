import React, { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AxiosService from "../API/AxiosService";
import '../custom.css';
import ItemCard from "../Elements/ItemCard";
import { actionAddProductToCart } from "../reducers/reducerCart/reducerCart";

export default function MaintainWishlist() {

    const [items, setItems] = useState([]);
    const username = useSelector((state) => state.reducerLogin.username);

    async function getWishListContent() {
        return await AxiosService.getWishListContent({ username })
            .then(function (response) {
                setItems(response.data)
            })
    }

    async function DeleteWishListItem(itemID) {
        const request = {
            itemID: itemID,
            username: username
        }
        return await AxiosService.deleteWishListItem(request)
            .then(function (response) {
                toast.success(response.data.Message)
            }).catch(function (response) {
                toast.error(response.data.Message)
            })
    }

    useEffect(() => {
        getWishListContent()

    }, [DeleteWishListItem]) // Cool trick you can add functions as dependecy and if that function runs then this useffect will run aswell. 

    const dispatch = useDispatch();
    function addItemToCart(product) {
        dispatch(actionAddProductToCart(product));
        toast.success(product.item_Name + " has been added to your cart.")
    }

    //Might also like section for items with hot deal tag
    const [products, updateProducts] = useState([])

    async function getAllItems() {
        const response = await AxiosService.getAllItems()
        return response
    }

    useEffect(() => {
        getAllItems().then((response) => {
            updateProducts(response.data)

        })
    }, [])

    function itemBox(item) {
        return (
            <div className="my-row border border-success">
                <Image variant="top" height={150} width={250} src={item.imageURL} alt="Prod Image" />
                <div className="prod-text">
                    {item.description}
                </div>
                <div className="col-group">
                    <h4> R{item.price}</h4>
                    <Button className="btn btn-info btn-md" onClick={() => addItemToCart(item)}>Add to Cart</Button>
                    <Button onClick={() => { DeleteWishListItem(item.itemID) }}>Remove</Button>
                </div>
            </div>
        )
    }

    return (
        <div class="container">
            <div className="col-group">
                <div className="my-col">
                    <div className="row"><h1>Wishlist</h1></div>
                    {items.map((item) => {
                        return (
                            itemBox(item)
                        )
                    })}
                </div>
                <div className="my-col">
                    <div className="row"><h1>You might also like</h1></div>
                    <div className="item-flex">
                        {products.map((product) => {
                            if (product.hotDeal === true)
                                return (
                                    <ItemCard item_Name={product.item_Name} description={product.description}
                                        imageURL={product.imageURL} itemID={product.itemID} Quantity={1} isFromProductPage={true}
                                        price={product.price} />
                                )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
