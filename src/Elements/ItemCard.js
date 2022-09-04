import '../custom.css';
import pic from '../Images/ots1.jpg'
import { Button, Dropdown, Card } from "react-bootstrap";

export default function ItemCard(props) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" height={200} src={pic} alt="Prod Image"/>
            <Card.Body>
                <Card.Title>{props.item_Name}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>
                <Button className="btn btn-info btn-md">Add to Cart</Button>
            </Card.Body>
        </Card>
    )
}