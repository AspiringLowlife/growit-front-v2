import React, { Component } from "react";
import '../custom.css';

export default function MaintainUser() {
    return (
        <div className="body">
            <div id="col-group">
                <div className="col">
                    <div id="row">                        
                        <h5>Your Name:</h5>                        
                        <p>asd</p>
                        <a className="sit-right" href="#">Edit</a>
                    </div>
                    <div className="row"><h1>Personal Details</h1></div>
                    {ProfileBox("Your Name", "asd")}
                </div>
                <div className="col">
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
        <div id="row ">
            <h5>{title}:</h5>            
            <p>{info}</p>
            <a className="sit-right" href="#">Edit</a>
        </div>
    )
}
function OrderBox(OrderNum, Date) {
    return (
        <div className="row border border-success">
            <span>Order No: {OrderNum}</span>
            <a id="link" style={{ paddingLeft: 0 }}>Expand</a>
            <span>Date Completed: {Date}</span>
        </div>
    )
}