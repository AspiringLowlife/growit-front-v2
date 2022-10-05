import React, { useEffect, useState } from "react";
import '../custom.css';
import pic from '../Images/ots1.jpg'
import pic1 from '../Images/Pots.jpg'
import banner from '../Images/plantBanner.jpg'
import { Button } from "react-bootstrap";
import ItemCard from "../Elements/ItemCard";
import { useNavigate } from "react-router-dom";
import AxiosService from "../API/AxiosService";

export default function Home() {


    const navigate = useNavigate()

    function toProducts() {
        navigate("/Products")
    }
    //hot deals
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

    return (
        <div className="body">
            <div id="home">
                {/* left column containing 
                categories dropdown and 2 images */}
                <div id="home-col">
                    <Button onClick={toProducts} className="btn btn-info btn-md" id="but" >Go to Products</Button><br />
                    <div id="img-col">
                        <img src={pic} width="250" height="300" /><br />
                        <img src={pic1} width="250" height="300" />
                    </div>
                </div>
                {/* right colum with banner, text, three images of products/Generate items use case */}
                <div id="home-col">
                    <img class="banner" src={banner} width="1400" />
                    <h1 className="bottom-border rainbow">Hot Deals</h1>
                    <div className="item-flex">
                        {products.map((product) => {
                            if (product.hotDeal === true)
                                return (
                                    <ItemCard item_Name={product.item_Name} description={product.description}
                                        imageURL={product.imageURL} itemID={product.itemID} Quantity={1}
                                        price={product.price} />
                                )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

