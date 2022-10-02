import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { actionLogOut } from "../../../reducers/reducerLogin/reducerLogin";
import { useNavigate } from "react-router-dom";

export default function Topbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Grow!T</span>
        </div>
        <div className="topRight">
          <div>
            <Button onClick={() => {
              navigate('/')
              dispatch(actionLogOut())}}>Log Out</Button>
          </div>
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <img src="https://localhost:5000/images/OrchidPlant.png" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}