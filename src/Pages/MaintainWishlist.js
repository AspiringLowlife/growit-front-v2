import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AxiosService from "../API/AxiosService";
import '../custom.css';

export default function MaintainWishlist() {

    const [items, setItems] = useState([]);
    const username = useSelector((state) => state.reducerLogin.username);

    async function getWishListContent(){
        return await  AxiosService.getWishListContent({username})
        .then(function (response){
            setItems(response.data)
        })
    }
    useEffect(() => {
        getWishListContent()
    }, [])

    return (
        <div class="container">
            <div className="col-group">
                <div className="my-col">
                    <div className="row"><h1>Wishlist</h1></div>
                    {items.map((item) => {
                        return (
                            itemBox(item.imageURL, item.description, item.price)
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
function itemBox(imageURL, description, price) {
    return (
        <div className="my-row border border-success">
            <img src={imageURL} alt="prodImage" />
            <p>{description}</p>
            <div>
                <h5>R {price}</h5>
                <input type="submit" name="submit" class="btn btn-info btn-md" id="but" value="Add to Cart"></input>
                <h5>Remove</h5>
            </div>
        </div>
    )
}