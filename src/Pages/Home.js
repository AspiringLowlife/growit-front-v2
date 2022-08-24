import React from "react";
import '../custom.css';
import pic from '../Images/ots1.jpg'
import pic1 from '../Images/Pots.jpg'
import banner from '../Images/plantBanner.jpg'

export default function Home() {
    return (
        <div className="body">
            <div id="home">
                {/* left column containing 
                categories dropdown and 2 images */}
                <div id="col-left">
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown button
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                    <div id="img-col">
                    <img src={pic} width="250" height="300"/><br/>
                    <img src={pic1} width="250" height="300"/>
                    </div>                    
                </div>
                {/* right colum with banner, text, three images of products */}
                <div id="col-right">
                    <img class="banner" src={banner} width="1000"/>
                </div>
            </div>
        </div>
    )
}