import React from "react";
import '../custom.css';
import pic from '../Images/ots1.jpg'
import pic1 from '../Images/Pots.jpg'
import banner from '../Images/plantBanner.jpg'
import { Dropdown } from "react-bootstrap";

export default function Home() {
    return (
        <div className="body">
            <div id="home">
                {/* left column containing 
                categories dropdown and 2 images */}
                <div id="col-left">
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Categories
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/#">Plant</Dropdown.Item>
                            <Dropdown.Item href="/#">Soil</Dropdown.Item>
                            <Dropdown.Item href="/#">Tools</Dropdown.Item>
                            <Dropdown.Item href="/#">Pots</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div id="img-col">
                        <img src={pic} width="250" height="300" /><br />
                        <img src={pic1} width="250" height="300" />
                    </div>
                </div>
                {/* right colum with banner, text, three images of products */}
                <div id="col-right">
                    <img class="banner" src={banner} width="1000" />
                </div>
            </div>
        </div>
    )
}