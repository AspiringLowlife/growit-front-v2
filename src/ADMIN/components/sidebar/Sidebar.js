import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {

  const [activeLink, setActiveLink] = useState('admin');

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin" className="link" onClick={() => setActiveLink('admin')}>
              <li className={activeLink === 'admin' ? `sidebarListItem active` : `sidebarListItem`} >
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/orders" className="link" onClick={() => setActiveLink('orders')}>
              <li className={activeLink === 'orders' ? `sidebarListItem active` : `sidebarListItem`}>
                <TrendingUp className="sidebarIcon" />
                Orders
              </li>
            </Link>
            <Link to="/manageproducts" className="link" onClick={() => setActiveLink('manageproducts')}>
              <li className={activeLink === 'manageproducts' ? `sidebarListItem active` : `sidebarListItem`}>
                <Storefront className="sidebarIcon" />
                Manage Products
              </li>
            </Link>
            <Link to="/addproducts" className="link" onClick={() => setActiveLink('addproducts')}>
              <li className={activeLink === 'addproducts' ? `sidebarListItem active` : `sidebarListItem`}>
                <AttachMoney className="sidebarIcon" />
                Add Products
              </li>
            </Link>
            <li className={activeLink === '' ? `sidebarListItem active` : `sidebarListItem`}>
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}