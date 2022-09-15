import React, { Component, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AxiosService from "../API/AxiosService";
import '../custom.css';

export default function MaintainProfile() {

    const username = useSelector((state) => state.reducerLogin.username)
    const [userDetails, updateUserDetails] = useState({})
    const [orders, setOrders] = useState([]);

    async function getUserDetails() {        
        const response = await AxiosService.getUserDetails(username)
        return response
    }
    async function getUserOrders(){
        await AxiosService.GetUserOrders(username)
        .then(function (response){
            setOrders(response.data)
        })
    }
        
    useEffect(() => {
        getUserDetails().then((response) => {
            updateUserDetails(response.data)
        })

        // getting user orders
        getUserOrders()
    }, [])
    
    return (
        <div class="container">
            <div className="col-group">
                <div className="my-col">
                    <div className="row"><h1>Personal Details</h1></div>
                    {ProfileBox("Your Name", userDetails?.fistName)}
                    {ProfileBox("Email Address", userDetails?.email)}
                    {ProfileBox("Username", userDetails?.userName)}
                    {ProfileBox("Password", "*******")}
                    {ProfileBox("Delivery Details", userDetails?.address)}
                </div>
                <div className="my-col">
                    <div className="row"><h1>Past Orders</h1></div>
                    {orders.map((order) => {
                        return (
                            OrderBox(order.ordersID, order.date_Started)
                        )
                    })}
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