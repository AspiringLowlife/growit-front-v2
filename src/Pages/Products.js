import { Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Card, Dropdown, DropdownButton, Form, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import AxiosService from "../API/AxiosService";
import ItemCard from "../Elements/ItemCard";
import { actionAddProductToCart } from '../reducers/reducerCart/reducerCart'

export default function Products() {

    const [products, updateProducts] = useState([])
    const [title, makeTitle] = useState("All Products")

    const dispatch = useDispatch();

    function addItemToCart(product) {
        dispatch(actionAddProductToCart(product));
    }

    async function getAllItems() {
        const response = await AxiosService.getAllItems()
        return response
    }

    useEffect(() => {
        getAllItems().then((response) => {
            updateProducts(response.data)
        })
    }, [])

    async function getbyCategory(category) {
        const response = await AxiosService.getCategoryItems(category)
        return response
    }

    //called in the body this result displays the category of items
    function setProductsList(category) {
        getbyCategory(category).then((response) => {
            updateProducts(response.data)
            makeTitle(category)
        })
    }

    //make page display all products again
    function setToDefault() {
        getAllItems().then((response) => {
            updateProducts(response.data)
        })
        makeTitle("All Products")
    }

    // Code for price slider
    const [value, setValue] = useState([0, 10000]);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10000);

    function valueLabelFormat(value) {
        const units = ['R'];

        let unitIndex = 0;
        let scaledValue = value;

        while (scaledValue >= 1024 && unitIndex < units.length - 1) {
            unitIndex += 1;
            scaledValue /= 1024;
        }

        return `${units[unitIndex]} ${scaledValue}`;
    }

    const handleChange = (event, newValue) => {
        debugger
        setValue(newValue);
        setMin(newValue[0]);
        setMax(newValue[1]);
        // TODO: Write Code here to filter 
        const priceFilterdProducts = products.filter(product => (product.price > min && product.price < max))
        updateProducts(priceFilterdProducts)
    };

    return (
        <div className="flex-products-page">
            <div className="filter-region">
                <h1 style={{ borderBottom: "1px solid black", margin: "1rem" }}>Filters</h1>
                <ListGroup style={{ margin: "1rem" }} as="ul">
                    <ListGroup.Item as="li"><strong>Categories</strong></ListGroup.Item>
                    <ListGroup.Item as="li" active={title === "All Products"} onClick={() => setToDefault()} style={{ cursor: "pointer" }}>All Products</ListGroup.Item>
                    <ListGroup.Item as="li" active={title === "Plant"} onClick={() => setProductsList("Plant")} style={{ cursor: "pointer" }}>Plant</ListGroup.Item>
                    <ListGroup.Item as="li" active={title === "Soil"} onClick={() => setProductsList("Soil")} style={{ cursor: "pointer" }}>Soil</ListGroup.Item>
                    <ListGroup.Item as="li" active={title === "Tool"} onClick={() => setProductsList("Tool")} style={{ cursor: "pointer" }}>Tools</ListGroup.Item>
                    <ListGroup.Item as="li" active={title === "Pot"} onClick={() => setProductsList("Pot")} style={{ cursor: "pointer" }}>Pots</ListGroup.Item>
                </ListGroup>
                <Form>
                    <Card style={{ margin: "1rem" }}>
                        <Card.Header>
                            <h2>Price</h2>
                        </Card.Header>
                        <Card.Body>
                            <Slider
                                step={100}
                                value={value}
                                min={0}
                                max={10000}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valueLabelFormat}
                                valueLabelFormat={valueLabelFormat}
                                aria-labelledby="non-linear-slider"
                            />
                        </Card.Body>
                        <div style={{ display: "flex" }}>
                            <div style={{ flex: "50%", margin: "5px" }}>
                                Min : R {min}
                            </div>
                            <div style={{ flex: "50%", margin: "5px" }}>
                                Max : R {max}
                            </div>
                        </div>
                    </Card>
                </Form>
            </div>
            <div className="product-region">
                <h1>{title}</h1>
                <div className="item-flex">
                    {products.map((product) => {
                        return (
                            <>
                                <ItemCard item_Name={product.item_Name} description={product.description}
                                    imageURL={product.imageURL} addItemToCart={addItemToCart} itemID={product.itemID} Quantity={1} isFromProductPage={true} />
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}