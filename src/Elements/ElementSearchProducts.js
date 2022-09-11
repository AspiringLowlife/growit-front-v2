import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Overlay, Popover } from 'react-bootstrap'
import AxiosService from '../API/AxiosService';
import ItemCard from './ItemCard';
import './ElementSearchProducts.css'

export default function ElementSearchProducts() {
    const [products, updateProducts] = useState([]);
    const [searchresults, setSearchResults] = useState([]);

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        AxiosService.getAllItems().then(function (response) {
            updateProducts(response.data)
        })
    }, [])

    function generateSearchResults(event) {
        event.preventDefault();
        const searchQuery = event.target.value;
        setSearchResults([]);
        
        //  Short circuit when the user has empty search field
        if (searchQuery === "") {
            setSearchResults([]);
            setShow(false);
            return
        }

        setSearchResults(products.filter(product => (
            product.item_Name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 
            || product.category.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)));

        // Short circuit when their are no results for search
        if (searchresults.length === 0) {
            setShow(false)
            return
        }

        setShow(true);
        setTarget(event.target);
    }

    const popout = (
        <div ref={ref}>
            <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref}
                containerPadding={20}
            >
                <Popover className='fade-in' id="popover-contained">
                    <Popover.Header as="h3">Products</Popover.Header>
                    <Popover.Body>
                        {searchresults.map((product) =>
                            <ItemCard item_Name={product.item_Name} description={product.description}
                                imageURL={product.imageURL} itemID={product.itemID} Quantity={1} />
                        )}
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    )

    return (
        <Form className="d-flex">
            <Form.Control
                type="text"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={generateSearchResults}
                onFocus={generateSearchResults}
                name="search"
            //onBlur={}
            />
            {popout}
        </Form>
    )
}
