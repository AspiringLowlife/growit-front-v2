import React, { useEffect, useRef, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import AxiosService from '../../../API/AxiosService';
import MaterialReactTable from 'material-react-table';
import { Box } from '@mui/system';
import ElementGenericModal from '../../../Elements/ElementGenericModal/ElementGenericModal';
import { toast } from 'react-toastify';

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

  const [showModal, toggleShowModal] = useState(false);
  const [selectedOrderID, setSelectedOrderID] = useState(null);
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
                Cell: ({ cell }) => <Box>
                  <Button onClick={() => { toggleShowModal(true) }}>Change Image</Button>
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
        <Button onClick={() => toggleShowModal(!showModal)}>Cancel</Button>
      </ElementGenericModal>
    </div>
  )
}
