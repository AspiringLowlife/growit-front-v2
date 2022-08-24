import React from "react";
import '../custom.css';

export default function Register() {
    return (
        <div id="register">
            <div class="container">
                <div id="login-row" class="row justify-content-center align-items-center">
                    <div id="login-column" class="col-md-6">
                        <div id="login-box" class="cold-md-12">
                            <form id="login-form" class="form" action="" method="post">
                                <h3 class="text-center">Register</h3>
                                <div class="form-group">
                                    <label for="first-name" >First Name:</label>
                                    <input type="text" name="first-name" id="first-name" class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="last-name">Last Name:</label><br />
                                    <input type="text" name="last-name" id="last-name" class="form-control" />
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
                                    <input type="text" name="email-address" id="email-address" class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="delivery-address">Delivery Address:</label><br />
                                    <input type="text" name="delivery-address" id="delivery-address" class="form-control" />
                                </div>
                                <input type="submit" name="submit" class="btn btn-info btn-md" id="but" value="Register"></input><br />
                                <span>By Clicking Register you agree to our Terms and Conditions </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}