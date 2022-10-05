import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AxiosService from '../API/AxiosService';
import '../custom.css'
import ElementSearchProducts from '../Elements/ElementSearchProducts/ElementSearchProducts';
import '../Navigation/AppNavBar.css'
import logo from '../Images/logo.png';

export default function AppNavBar() {
    const username = useSelector((state) => state.reducerLogin.username);
    const role = useSelector((state) => state.reducerLogin.role);

    const [id, setId] = useState(null);
    const [wishID, setWishId] = useState(null);

    async function getUserDetails() {
        if (username !== "") {
            await AxiosService.getUserDetails(username)
                .then(function (response) {
                    setId(response.data.id)
                })
        }
    }

    async function getWishList() {
        if (username !== "" && role !== "Admin") {
            await AxiosService.getWishList({ username })
                .then(function (response) {
                    setWishId(response.data)
                })
        }
    }

    useEffect(() => {
        //Use for user profile page
        getUserDetails();
        //use for user wishlist page
        getWishList();
    }, [username])

    const cart = useSelector((state) => state.reducerCart.cart)
    return (
        <Navbar className='background' expand="lg">
            <Container>
                <Navbar.Brand><Link class="navbar-brand" to="/"><img style={{width: '60px', width: "250px"}} src={logo}/></Link></Navbar.Brand>
                <Navbar.Toggle />
                <div className='justify-content-end'>
                    <ElementSearchProducts />
                </div>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link >
                            <Link className="nav-link" to="/Support">Support</Link>
                        </Nav.Link>
                        {username === "" &&
                            <Nav.Link >
                                <Link className="nav-link" to="/Login">Login</Link>
                            </Nav.Link>
                        }
                        {username !== "" && 
                            <Nav.Link >
                                <Link className="nav-link" to={`/MaintainWishlist/${wishID}`}><i className="bi bi-heart"></i></Link>
                            </Nav.Link>
                        }
                        {username !== "" &&
                            <Nav.Link >
                                <Link className="nav-link" to={`/MaintainProfile/${id}`}><i className="bi bi-person"></i></Link>
                            </Nav.Link>
                        }
                        <Nav.Link >
                            <Link className="nav-link" to="/MaintainCart"><i className={cart.length > 0 ? `bi bi-cart pointer` : `bi bi-cart`}></i></Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link className="nav-link" to="/Products">Products</Link>
                        </Nav.Link>                        
                    </Nav>
                </Navbar.Collapse>               
            </Container>
        </Navbar>
    )
}