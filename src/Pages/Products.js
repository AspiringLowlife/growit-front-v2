import React, { useEffect, useState } from "react";
import { Button, Dropdown, Card } from "react-bootstrap";
import ReactSlider from "react-slider";
import AxiosService from "../API/AxiosService";
import ItemCard from "../Elements/ItemCard";

export default function Products() {

    async function getAllItems() {
        const response = await AxiosService.getAllItems()
        return response
    }

    const [products, updateProducts] = useState([])

    useEffect(() => {
        getAllItems().then((response) => {
            updateProducts(response.data)
        })
    }, [])

    async function getbyCategory(category) {
        debugger
        const response = await AxiosService.getCategoryItems(category)
        return response
    }

    function setProductsList(category) {
        getbyCategory(category).then((response) => {
            updateProducts(response.data)
        })
    }

    return (
        <div className="body">
            <div id="home">
                <div className="my-col">
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Categories
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setProductsList("Plant")}>Plant</Dropdown.Item>
                            <Dropdown.Item href="/#">Soil</Dropdown.Item>
                            <Dropdown.Item href="/#">Tools</Dropdown.Item>
                            <Dropdown.Item href="/#">Pots</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <>
                        <h2>Sort By</h2>

                    </>
                </div>
                <h1>Plant</h1>

                <div className="item-flex">
                    {products.map((product) => {
                        return (
                            <ItemCard item_Name={product.item_Name} description={product.description} />
                        )
                    })}
                </div>
            </div>
        </div>

    )
}