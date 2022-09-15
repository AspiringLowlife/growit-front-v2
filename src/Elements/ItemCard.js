import '../custom.css';
import pic from '../Images/ots1.jpg'
import { Button, Dropdown, Card } from "react-bootstrap";
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { actionAddProductToCart } from '../reducers/reducerCart/reducerCart';
import AxiosService from '../API/AxiosService';

export default function ItemCard(props) {

    const username = useSelector((state) => state.reducerLogin.username);
    const dispatch = useDispatch();

    function addItemToCart(product) {
        dispatch(actionAddProductToCart(product));
        toast.success(props.item_Name + " has been added to your cart.")
    }

    async function createWishListItem(item) {
        const request = {
            username: username,
            itemID: item.itemID
        }

        await AxiosService.createWishListItem(request)
            .then(function (response) {
                if (response.data.status === "Fail") {
                    toast.error(response.data.message)
                } else {
                    toast.info(item.item_Name + " has been added to your wish list.")
                }
            }).catch(function (response) {
                toast.error(response.data.Message)
            })
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Link to={props.isFromProductPage ? `${props.itemID}` : `Products/${props.itemID}`}>
                <Card.Img variant="top" height={200} src={props.imageURL} alt="Prod Image" />
            </Link>
            <Card.Body className='custom-background-color'>
                <Card.Title>{props.item_Name}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>
                <Button className="btn btn-info btn-md" onClick={() => addItemToCart(props)}>Add to Cart</Button>
                {username !== "" &&
                    <i onClick={() => { createWishListItem(props) }} className="bi bi-heart-fill give-mouse-pointer"></i>
                }
            </Card.Body>
        </Card >
    )
}