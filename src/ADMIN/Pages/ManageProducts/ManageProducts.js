import React, { useEffect, useRef, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import AxiosService from '../../../API/AxiosService';
import MaterialReactTable from 'material-react-table';
import { Box } from '@mui/system';
import ElementGenericModal from '../../../Elements/ElementGenericModal/ElementGenericModal';
import { toast } from 'react-toastify';
import ImageDropper from '../../components/imagedropper/ImageDropper';
import { delay } from 'lodash';

export default function ManageProducts() {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    AxiosService.getAllItems()
      .then(function (response) {
        setProducts(response.data)
      })
  }, [])

  const handleSaveRow = async ({ exitEditingMode, row, values }) => {

    const request =
    {
      itemID: values.itemID,
      item_Name: values.item_Name,
      price: values.price,
      description: values.description,
      quantity_on_Hand: values.quantity_on_Hand,
      category: values.category,
      imageURL: values.imageURL,
    }

    await AxiosService.UpdateItem(request)
      .then(function (response) {
        toast.success(response.message)
        AxiosService.getAllItems()
          .then(function (response) {
            setProducts(response.data)
          })
        exitEditingMode();
      })
      .catch(function (response) {
        toast.error(response.message)
        exitEditingMode();
      })

  };

  const [selectedProduct, setSelectedProduct] = useState(null);

  function updateImage(image) {
    debugger
    setImage(image)
  }

  function uploadImage() {
    const formData = new FormData();
    formData.append('formFile', image);
    formData.append('fileName', image.name);
    formData.append('itemID', selectedProduct.itemID);
    formData.append('item_Name', selectedProduct.item_Name);
    formData.append('price', parseFloat(selectedProduct.price.toString().replace(".", ",")));
    formData.append('description', selectedProduct.description);
    formData.append('quantity_on_Hand', selectedProduct.quantity_on_Hand);
    formData.append('category', selectedProduct.category);
    formData.append('imageURL', selectedProduct.imageURL);
    if (selectedProduct.hotDeal === null) {
      formData.append('hotDeal', false);
    } else {
      formData.append('hotDeal', selectedProduct.hotDeal);
    }
    AxiosService.SaveImage(formData)
    .then(function (response){
      AxiosService.getAllItems()
      .then(function (response) {
        setProducts(response.data)
      })
    })
    
  }

  const [image, setImage] = useState(null);
  const [showModal, toggleShowModal] = useState(false);
  const [showModal2, toggleShowModal2] = useState(false);
  const tableInstanceRef = useRef(null);

  return (
    <div className='p-3'>
      <Card>
        <Card.Header>
          <h1>Manage Products</h1>
        </Card.Header>
        <Card.Body>
          <MaterialReactTable
            editingMode="modal" //default
            enableEditing
            onEditingRowSave={handleSaveRow}
            columns={[
              {
                accessorKey: 'itemID', //simple recommended way to define a column
                header: 'Item ID',
                enableEditing: false,
                muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
              },
              {
                accessorKey: 'item_Name', //simple recommended way to define a column
                header: 'Item Name',
                enableEditing: true,
                muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
              },
              {
                accessorKey: 'price', //simple recommended way to define a column
                header: 'Price',
                enableEditing: true,
                muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
              },
              {
                accessorKey: 'quantity_on_Hand', //simple recommended way to define a column
                header: 'Quantity on Hand',
                enableEditing: true,
                muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
              },
              {
                accessorKey: 'category', //simple recommended way to define a column
                header: 'Category',
                enableEditing: true,
                muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
              },
              {
                accessorKey: 'imageURL', //simple recommended way to define a column
                header: 'Image',
                Cell: ({ cell }) => <img style={{ width: '100px', heigh: '100x' }} src={cell.getValue()} />,
                enableEditing: false,
                muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
              },
              {
                header: 'Actions',
                Cell: ({ cell, row }) => <Box>
                  <Button className='m-1' onClick={() => {
                    setSelectedProduct(row.original)
                    toggleShowModal(true)
                  }}>Change Image</Button>
                  <Button className='m-1' variant='danger' onClick={() => {
                    setSelectedProduct(row.original)
                    toggleShowModal2(true)
                  }}>Delete</Button>
                </Box>,
                enableEditing: false,
                muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
              },
            ]}
            data={products}
            tableInstanceRef={tableInstanceRef}

            //turn off a feature like so
            enableRowSelection={false}
            enableColumnOrdering={false}
            enableGlobalFilter={false}
            renderTopToolbar={false}
          />
        </Card.Body>
      </Card>
      <ElementGenericModal isOpen={showModal} title={"Upload a image for this product"}>
        <ImageDropper setImage={updateImage} selectedProduct={selectedProduct} />
        <br />
        <br />
        <div className='d-flex justify-content-center'>
          <Button className='m-1' onClick={() => toggleShowModal(!showModal)}>Cancel</Button>
          <Button className='m-1' onClick={() => {
            uploadImage();
            toggleShowModal(!showModal)
          }}>Update Image</Button>
        </div>
      </ElementGenericModal>
      <ElementGenericModal isOpen={showModal2} title={"Are you sure you want to delete this product"}>

        <div className='d-flex justify-content-center'>
          <Button className='m-1' onClick={() => toggleShowModal2(!showModal2)}>Cancel</Button>
          <Button className='m-1' variant='danger' onClick={() => {
            AxiosService.DeleteItem(selectedProduct)
              .then(function (response) {
                toast.info(selectedProduct.item_Name + "has been deleted")
                AxiosService.getAllItems()
                  .then(function (response) {
                    setProducts(response.data)
                  })
              })
            toggleShowModal2(!showModal2)
          }}>Delete Product</Button>
        </div>
      </ElementGenericModal>
    </div>
  )
}
