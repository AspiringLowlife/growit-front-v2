import React from "react";
import '../custom.css';

export default function MaintainWishlist() {
    return (
        <div class="container">
            <div className="col-group">
                <div className="my-col">
                    <div className="row"><h1>Wishlist</h1></div>
                    {itemBox("Image Name", <p>Super Nice plant thing big WOW. WWOWOOWO wowoow wowoasdadasdasdasdasdasd<br />asdad</p>, 500)}
                </div>
                <div className="my-col">
                    <div className="row"><h1>You might also like</h1></div>
                </div>
            </div>
        </div>
    )
}
function itemBox(prodImage, description, price) {
    return (
        <div className="my-row border border-success">
            <img src={prodImage} alt="prodImage" />
            <p>{description}</p>
            <div>
                <h5>R {price}</h5>
                <input type="submit" name="submit" class="btn btn-info btn-md" id="but" value="Add to Cart"></input>
                <h5>Remove</h5>
            </div>
        </div>
    )
}