import React, { useRef, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AxiosService from '../../../API/AxiosService';
import ImageDropper from "../../components/imagedropper/ImageDropper"

export default function AddProducts() {

  const [image, setImage] = useState(null);
  const [newProduct, setNewProduct] = useState(null);

  function submitForm(event) {
    debugger
    event.preventDefault();
    if (event.target.elements.category.value === "Choose A Category"){
      toast.error("Please Select a category");
      return
    }
    let request ={
      item_Name: event.target.elements.item_Name.value,
      price: event.target.elements.price.value,
      description: event.target.elements.description.value,
      quantity_on_Hand: event.target.elements.quantity_on_Hand.value,
      category: event.target.elements.category.value,
      imageURL: `https://localhost:5000/Images/${image?.name}`,
      hotDeal: event.target.elements.hotDeal.value === "on" ? true : false,
    }
    if (image !== null) {
      AxiosService.CreateItem(request)
        .then(function (response) {
          toast.success("Item Successfully Added")
          setNewProduct(response.data);
        })
        .catch(function (response) {
          toast.success("Unable to Add product")
          return
        })
    }else{
      toast.error("Image file needed for product")
      return
    }
    uploadImage(newProduct);
    setImage(null)
    event.target.reset();
  }

  function uploadImage(item) {
    debugger
    const formData = new FormData();
    formData.append('formFile', image);
    formData.append('fileName', image.name);
    formData.append('itemID', item.itemID);
    formData.append('item_Name', item.item_Name);
    formData.append('price', parseFloat(item.price.toString().replace(".", ",")));
    formData.append('description', item.description);
    formData.append('quantity_on_Hand', item.quantity_on_Hand);
    formData.append('category', item.category);
    formData.append('imageURL', item.imageURL);
    if (item.hotDeal === null) {
      formData.append('hotDeal', false);
    } else {
      formData.append('hotDeal', item.hotDeal);
    }
    AxiosService.SaveImage(formData);
  }

  function setImageForUpload(image){
    setImage(image)
  }

  return (
    <Card className='m-4'>
      <Card.Header>
        <h1>Add Product</h1>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={submitForm}>
          <Form.Group className="mb-3">
            <Form.Label for="item_Name" >Item Name</Form.Label>
            <Form.Control required type="text" name="item_Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label for="price" >Price</Form.Label>
            <Form.Control required type="number" name="price" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label for="description" >Description</Form.Label>
            <Form.Control required type="text" name="description" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label for="quantity_on_Hand" >quantity On Hand</Form.Label>
            <Form.Control required type="number" name="quantity_on_Hand" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label for="category" >Category</Form.Label>
            <Form.Select required name="category" >
              <option>Choose A Category</option>
              <option>Plant</option>
              <option>Soil</option>
              <option>Tool</option>
              <option>Pot</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" name="hotDeal" label="Hot Deal" />
          </Form.Group>
          <Form.Group className="mb-3">
            <ImageDropper setImage={setImageForUpload} />
          </Form.Group>
          <div>
            <Button type='submit'>Add Product</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
