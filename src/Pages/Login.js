import React from "react";
import '../custom.css';

export default function Login() {
  return (
    <div id="login">
      <div class="container">
        <div id="login-row" class="row justify-content-center align-items-center">
          <div id="login-column" class="col-md-6">
            <div id="login-box" class="cold-md-12">
              <form id="login-form" class="form" action="" method="post">
                <h3 class="text-center">Login</h3>
                <div class="form-group">
                  <label for="username" >Username:</label><br />
                  <input type="text" name="username" id="username" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="password">Password:</label><br />
                  <input type="text" name="password" id="password" class="form-control" />
                </div>
                <input type="submit" name="submit" class="btn btn-info btn-md" id="but" value="Login"></input><br/>
                <span>New to Grow IT? </span><span id="register-link"><a href="/Register" id="link" >Create an Account</a></span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}