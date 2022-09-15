import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosService from "../API/AxiosService";
import '../custom.css';

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

    function itemBox(imageURL, description, price, itemID) {
        return (
            <div className="my-row border border-success">
                <img src={imageURL} alt="prodImage" />
                <p>{description}</p>
                <div>
                    <h5>R {price}</h5>
                    <input type="submit" name="submit" class="btn btn-info btn-md" id="but" value="Add to Cart"></input>
                    <Button onClick={() => { DeleteWishListItem(itemID) }}>Remove</Button>
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
                            itemBox(item.imageURL, item.description, item.price, item.itemID)
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
