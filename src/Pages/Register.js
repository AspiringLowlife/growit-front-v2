import React from "react";
import { useNavigate } from "react-router-dom";
import axiosService from "../API/AxiosService";
import '../custom.css';
import { toast } from "react-toastify";

export default function Register() {

    const navigate = useNavigate()

    async function register(data) {
        const response = await axiosService.register(data)
    }
    const formSubmission = (event) => {
        event.preventDefault()
        let testData = {
            "fistName": event.target.elements.firstname.value,
            "lastName": event.target.elements.lastname.value,
            "username": event.target.elements.username.value,
            "password": "Password@123",
            "email": event.target.elements.emailaddress.value,
            "address": event.target.elements.deliveryaddress.value
        }
        register(testData).
            then(() => {
                navigate("/")
                toast.success(event.target.elements.username.value+" is succesfully registered")
            }).catch(
                (error) => {
                    console.log(error.response.data.message)
                    toast.error(error.response.data.message)
                }
            )
    }
    return (
        <div id="register">
            <div class="container">
                <div id="login-row" class="row justify-content-center align-items-center">
                    <div id="login-column" class="col-md-6">
                        <div id="login-box" class="cold-md-12">
                            <form id="login-form" class="form" onSubmit={formSubmission}>
                                <h3 class="text-center">Register</h3>
                                <div class="form-group">
                                    <label for="first-name" >First Name:</label>
                                    <input required type="text" name="firstname" id="first-name" class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="last-name">Last Name:</label><br />
                                    <input type="text" name="lastname" id="last-name" class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="username">Username:</label><br />
                                    <input type="text" name="username" id="username" class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="password">Password:</label><br />
                                    <input type="text" name="password" id="password" class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="email-address">Email Address:</label><br />
                                    <input type="text" name="emailaddress" id="email-address" class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="delivery-address">Delivery Address:</label><br />
                                    <input type="text" name="deliveryaddress" id="delivery-address" class="form-control" />
                                </div>
                                <input type="submit" class="btn btn-info btn-md" id="but" value="Register"></input><br />
                                <span>By Clicking Register you agree to our Terms and Conditions </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

