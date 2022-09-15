import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosService from "../API/AxiosService";
import '../custom.css';
import ItemCard from "../Elements/ItemCard";

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

    function itemBox(item) {
        return (
            <div className="my-row border border-success">
                <ItemCard
                    item_Name={item.item_Name}
                    description={item.description}
                    imageURL={item.imageURL}
                    itemID={item.itemID}
                    Quantity={1}
                    isFromProductPage={true}
                    price={item.price}
                />
                <Button onClick={() => { DeleteWishListItem(item.itemID) }}>Remove</Button>
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
                </div>
            </div>
        </div>
    )
}
