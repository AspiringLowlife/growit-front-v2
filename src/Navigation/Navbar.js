import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import '../custom.css'

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light background">
      <Link class="navbar-brand" to="/">Grow IT</Link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link class="nav-link" to="/Support">Support</Link>
          </li>
          <li>
          <Link to="/Products">TEST</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/Login">Login</Link>
          </li>
          {/* wishlist */}
          <li>
            <Link class="nav-link" to="/MaintainWishlist"><i class="bi bi-heart"></i></Link>
          </li>
          {/* profile */}
          <li>
            <Link class="nav-link" to="/MaintainProfile"><i class="bi bi-person"></i></Link>
          </li>
          {/* cart */}
          <li>
            <Link class="nav-link" to="/MaintainCart"><i class="bi bi-cart"></i></Link>
          </li>
        </ul>
      </div>
    </nav>)
}
export default Navbar
function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to}{...props}>
        {children}
      </Link>
    </li>
  )
}