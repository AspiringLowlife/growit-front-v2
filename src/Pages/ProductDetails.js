import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AxiosService from '../API/AxiosService';

export default function ProductDetails() {
  const [product, setProduct] = useState({});

  const { id } = useParams()

  useEffect(() => {
    AxiosService.getSelectedItem(id).then(function (response) {
      setProduct(response.data)
    })
  }, [id])


  return (
    <div>
      <h1>Product Details</h1>
      {product.item_Name}
    </div>
  )
}
