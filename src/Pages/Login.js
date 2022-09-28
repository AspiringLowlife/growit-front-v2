import React, { useEffect } from "react";
import '../custom.css';
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogin } from "../reducers/reducerLogin/reducerLogin";

export default function Login() {

  const navigate = useNavigate()
  //logic send user details to reducer
  const dispatch = useDispatch()
  //get user who is logged in from reducer
  const username = useSelector((state) => state.reducerLogin.username)
  const role = useSelector((state) => state.reducerLogin.role)

  const formSubmission = (event) => {
    event.preventDefault()
    let testData = {
      "username": event.target.elements.username.value,
      "password": "Password@123",
    }
    dispatch(thunkLogin(testData))
  }
  //navigate to home page after succesful login
  useEffect(() => {
    if (role === "Admin") {
      navigate("/admin")
    }
    else if (username !== "") {
      navigate("/")
    }
  }, [username, role])

  return (
    <div id="login">
      <div class="container">
        <div id="login-row" class="row justify-content-center align-items-center">
          <div id="login-column" class="col-md-6">
            <div id="login-box" class="cold-md-12">
              <Form id="login-form" class="form" onSubmit={formSubmission}>
                <h3 class="text-center">Login</h3>
                <Form.Group controlId="usernameGroup" className="form-group">
                  <Form.Label for="username" >Username:</Form.Label><br />
                  <Form.Control required type="text" name="username" className="form-control" />
                </Form.Group>
                <Form.Group controlId="passwordGroup" className="form-group">
                  <Form.Label for="password">Password:</Form.Label><br />
                  <Form.Control type="text" name="password" class="form-control" />
                </Form.Group>
                <Button type="submit" name="submit" className="btn btn-info btn-md" id="but" >Login</Button><br />
                <span>New to Grow IT? </span><span id="register-link"><Link to="/Register" id="link" >Create an Account</Link></span>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}