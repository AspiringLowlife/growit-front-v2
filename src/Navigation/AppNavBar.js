import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AxiosService from '../API/AxiosService';
import '../custom.css'
import ElementSearchProducts from '../Elements/ElementSearchProducts';
import '../Navigation/pierre.css'

export default function AppNavBar() {
    const username = useSelector((state) => state.reducerLogin.username);
    const [id, setId] = useState(null);

    async function getUserDetails() {
        if (username !== "") {
            await AxiosService.getUserDetails(username)
                .then(function (response) {
                    setId(response.data.id)
                })
        }
    }

    useEffect(() => {
        getUserDetails();
    }, [username])

    const cart = useSelector((state) => state.reducerCart.cart)
    return (
        <Navbar className='background' expand="lg">
            <Container>
                <Navbar.Brand><Link class="navbar-brand" to="/">Grow IT</Link></Navbar.Brand>
                <Navbar.Toggle />
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
                                <Link className="nav-link" to="/MaintainWishlist"><i className="bi bi-heart"></i></Link>
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
                        <NavDropdown title="Shop" id="basic-nav-dropdown">
                            <NavDropdown.Item>
                                <Link class="nav-link" to="/Products">Products</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <div className='justify-content-end'>
                    <ElementSearchProducts />
                </div>
            </Container>
        </Navbar>
    )
}