import React, { Component } from "react";
import '../custom.css';

export default function MaintainUser() {
    return (
        <div class="container">
            <div className="col-group">
                <div className="my-col">
                    <div className="row"><h1>Personal Details</h1></div>
                    {ProfileBox("Your Name", "Bill Hetherington")}
                    {ProfileBox("Email Address", "billh890@gmail.com")}
                    {ProfileBox("Username", "MeagerSpender97")}
                    {ProfileBox("Password", "*******")}
                    {ProfileBox("Delivery Details", "27 Water Avenue Summerstrand")}
                </div>
                <div className="my-col">
                    <div className="row"><h1>Past Orders</h1></div>
                    {OrderBox("#1324", "07/12/2022")}
                </div>
            </div>
        </div>
    )
}
//this function breaks the flex inline display

function ProfileBox(title, info) {
    return (
        //border border-success
        <div className="my-row border border-success ">
            <h5>{title}:</h5>
            <p>{info}</p>
            <a id="link"className="sit-right" href="#">Edit</a>
        </div>
    )
}
function OrderBox(OrderNum, Date) {
    return (
        <div className="my-row border border-success">
            <span>Order No: {OrderNum}</span>            
            <span>Date Completed: {Date}</span>
            <a id="link" style={{ paddingLeft: 0 }}>Expand</a>
        </div>
    )
}