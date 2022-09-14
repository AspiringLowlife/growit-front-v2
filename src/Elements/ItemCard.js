import '../custom.css';
import pic from '../Images/ots1.jpg'
import { Button, Dropdown, Card } from "react-bootstrap";
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ItemCard(props) {

    const navigate = useNavigate();

    function addToCart(product) {
        props.addItemToCart(product)
        toast.success(props.item_Name + " has been added to your cart.")
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
                <Button className="btn btn-info btn-md" onClick={() => addToCart(props)}>Add to Cart</Button>
            </Card.Body>
        </Card>
    )
}