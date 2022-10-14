import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AxiosService from '../API/AxiosService';
import ItemCard from "../Elements/ItemCard";

export default function ProductDetails() {
  const [product, setProduct] = useState({});

  const { id } = useParams()

  useEffect(() => {
    AxiosService.getSelectedItem(id).then(function (response) {
      setProduct(response.data)
    })
  }, [id])


  return (
    <div className='body'>      
      <div className="prod-details">
        <ItemCard disableNav={true} item_Name={product.item_Name} description={product.description}
          imageURL={product.imageURL} itemID={product.itemID} Quantity={1} isFromProductPage={true} price={product.price} />
        <div className='prod-text'>
          <h1>Description</h1>
          {product.description}
          <h1>See what people Say</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    </div>
  )
}
