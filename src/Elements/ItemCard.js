import '../custom.css';
import pic from '../Images/ots1.jpg'
import { Button, Dropdown, Card } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionSetSelectedProduct } from '../reducers/reducerSelectedProduct/reducerSelectedProduct';

export default function ItemCard(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    //customer's cart array

    function addToCart(product) {
        props.addItemToCart(product)
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img onClick={() => {
                debugger
                dispatch(actionSetSelectedProduct(props))
                navigate('/ProductDetails')
            }}
                variant="top" height={200} src={props.imageURL} alt="Prod Image" />
            <Card.Body>
                <Card.Title>{props.item_Name}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>
                <Button className="btn btn-info btn-md" onClick={() => addToCart(props)}>Add to Cart</Button>
            </Card.Body>
        </Card>
    )
}