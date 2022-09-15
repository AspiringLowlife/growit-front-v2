import React from "react";
import '../custom.css';
import pic from '../Images/ots1.jpg'
import pic1 from '../Images/Pots.jpg'
import banner from '../Images/plantBanner.jpg'
import { Button, Dropdown, Card } from "react-bootstrap";
import ItemCard from "../Elements/ItemCard";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate()

    function toProducts(){
        navigate("/Products")
    }

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
                        <ItemCard imageURL={pic}/>
                        <ItemCard imageURL={pic}/>
                        <ItemCard imageURL={pic}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

