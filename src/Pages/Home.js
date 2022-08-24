import React from "react";
import '../custom.css';


export default function Home() {
    return (
        <div id="home">
            {/* left column containing 
            categories dropdown and 2 images */}
            <div id="col-left">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown button
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </div>

            {/* right colum with banner, text, three images of products */}
            <div id="col-right">
                <h1>Banner</h1>
            </div>
        </div>
    )
}