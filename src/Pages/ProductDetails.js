import React from 'react'
import { useSelector } from 'react-redux'

export default function ProductDetails() {

  const product = useSelector((state) => state.reducerSelectedProduct.product)
  return (
    <div>{product.item_Name}</div>
  )
}
