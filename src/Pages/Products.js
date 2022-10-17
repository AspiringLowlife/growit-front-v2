import { Slider } from "@mui/material";
import { entries } from "lodash";
import React, { useEffect, useState } from "react";
import { Card, Dropdown, DropdownButton, Form, ListGroup } from "react-bootstrap";
import AxiosService from "../API/AxiosService";
import ItemCard from "../Elements/ItemCard";
import { actionAddProductToCart } from '../reducers/reducerCart/reducerCart'

export default function Products() {

    const [products, updateProducts] = useState([])
    const [title, makeTitle] = useState("All Products")

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
    const [value, setValue] = useState([0, 5000]);

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
        setValue(newValue);
        // TODO: Write Code here to filter 

    };

    function getFilterProducts() {
        return products.filter(product => (product.price > value[0] && product.price < value[1]))
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show')
            }else{
                entry.target.classList.remove('show')
            }
        })
    })

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    return (
        <div className="flex-products-page">
            <div className="filter-region custom-background-color">
                <div>
                    <h1 style={{ borderBottom: "1px solid black", margin: "1rem" }}>Filters</h1>
                </div>
                <ListGroup style={{ margin: "1rem" }} as="ul">
                    <ListGroup.Item as="li"><strong>Categories</strong></ListGroup.Item>
                    <ListGroup.Item as="li" active={title === "All Products"} onClick={() => setToDefault()} style={{ cursor: "pointer" }}>All Products</ListGroup.Item>
                    <ListGroup.Item as="li" active={title === "Plant"} onClick={() => setProductsList("Plant")} style={{ cursor: "pointer" }}>Plant</ListGroup.Item>
                    <ListGroup.Item as="li" active={title === "Soil"} onClick={() => setProductsList("Soil")} style={{ cursor: "pointer" }}>Soil</ListGroup.Item>
                    <ListGroup.Item as="li" active={title === "Tool"} onClick={() => setProductsList("Tool")} style={{ cursor: "pointer" }}>Tools</ListGroup.Item>
                    <ListGroup.Item as="li" active={title === "Pot"} onClick={() => setProductsList("Pot")} style={{ cursor: "pointer" }}>Pots</ListGroup.Item>
                </ListGroup>
                <Form >
                    <Card style={{ margin: "1rem" }}>
                        <Card.Header>
                            <h2>Price</h2>
                        </Card.Header>
                        <Card.Body>
                            <Slider
                                step={50}
                                value={value}
                                min={0}
                                max={3000}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valueLabelFormat}
                                valueLabelFormat={valueLabelFormat}
                                aria-labelledby="non-linear-slider"
                            />
                        </Card.Body>
                        <div style={{ display: "flex" }}>
                            <div style={{ flex: "50%", margin: "5px" }}>
                                <Form.Label for="username" >Min : R</Form.Label>
                                <Form.Control defaultValue={value[0]} value={value[0]} type='number' label onChange={(event) => {
                                    setValue([event.target.value, value[1]])

                                }} />
                            </div>
                            <div style={{ flex: "50%", margin: "5px" }}>
                                <Form.Label for="username" >Max : R</Form.Label>
                                <Form.Control defaultValue={value[1]} value={value[1]} type='number' label onChange={(event) => {
                                    setValue([value[0], event.target.value])
                                }} />
                            </div>
                        </div>
                    </Card>
                </Form>
            </div>
            <div className="product-region">
                <div>
                    <h1 style={{ borderBottom: "1px solid black", margin: "1rem" }}>{title}</h1>
                </div>
                <div className="item-flex hidden">
                    {getFilterProducts().map((product) => {
                        return (
                            <div className="hidden" style={{transitionDelay : }}>
                                <ItemCard item_Name={product.item_Name} description={product.description}
                                    imageURL={product.imageURL}  itemID={product.itemID} Quantity={1} isFromProductPage={true} price={product.price}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}