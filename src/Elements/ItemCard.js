import '../custom.css';
import pic from '../Images/ots1.jpg'
import { Button, Dropdown, Card } from "react-bootstrap";

export default function ItemCard(props) {

    //customer's cart array
    
    function addToCart(product) {
        props.addItemToCart(product)
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" height={200} src={props.imageURL} alt="Prod Image" />
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