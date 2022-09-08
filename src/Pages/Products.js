import React, { useEffect, useReducer, useState } from "react";
import { Button, Dropdown, Card, FormCheck } from "react-bootstrap";
import ReactSlider from "react-slider";
import AxiosService from "../API/AxiosService";
import ItemCard from "../Elements/ItemCard";

export default function Products() {

    const [products, updateProducts] = useState([])
    const [title, makeTitle] = useState("All Products")
    //const [cartItems, dispatch] = useReducer(reducer, initialCartItems)

    // function addItemToCart(product){
    //     dispatch({type:"ADD_ITEM_TO_CART",payload:product})        
    //     console.log({cartItems})
    // }

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
    }

    //const temp = products.map((product) => <ItemCard item_Name={product.item_Name} description={product.description} />)   

    return (
        <div className="body">
            <div>
                <div className="home-col">
                    <Dropdown >
                        <Dropdown.Toggle className="btn btn-info btn-md" id="dropdown-basic">
                            Categories
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setToDefault()}>All Products</Dropdown.Item>
                            <Dropdown.Item onClick={() => setProductsList("Plant")}>Plant</Dropdown.Item>
                            <Dropdown.Item onClick={() => setProductsList("Soil")}>Soil</Dropdown.Item>
                            <Dropdown.Item onClick={() => setProductsList("Tool")}>Tools</Dropdown.Item>
                            <Dropdown.Item onClick={() => setProductsList("Pot")}>Pots</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className="border border-success">
                        <h2>Sort By</h2>
                        <div className="test">
                            <p>Price Min</p>
                            {ReactSlider}
                        </div>
                    </div>
                </div>
                <div className="home-col">
                    <h1>{title}</h1>
                    <div className="item-flex">
                        {products.map((product) => {
                            return (
                                <>
                                    <ItemCard item_Name={product.item_Name} description={product.description} imageURL={product.imageURL} />
                                </>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}
