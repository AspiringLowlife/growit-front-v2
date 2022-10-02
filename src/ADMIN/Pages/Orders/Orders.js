import React, { useEffect, useRef, useState } from 'react'
import MaterialReactTable from 'material-react-table';
import { Button, Card, Spinner } from 'react-bootstrap'
import AxiosService from '../../../API/AxiosService';
import ElementGenericModal from '../../../Elements/ElementGenericModal/ElementGenericModal';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const tableInstanceRef = useRef(null);

  //Loading States
  const [Loading, setLoading] = useState(false);

  function sanetizeDate(date) {
    return date.substring(0, 10)
  }

  async function getUserOrders() {
    setLoading(true);
    await AxiosService.GetAllOrders()
      .then(function (response) {
        setOrders(response.data)
        setLoading(false);
      })
      .catch(function (response) {
        setLoading(false);
      })
  }

  useEffect(() => {
    getUserOrders();
  }, [])

  const [showModal, toggleShowModal] = useState(false);
  const [selectedOrderID, setSelectedOrderID] = useState(null);

  async function CompleteOrder() {
    await AxiosService.CompleteOrder(selectedOrderID)
      .then(function (response) {
        toast.success(response.message)
        toggleShowModal(!showModal)
        setSelectedOrderID(null)
        getUserOrders()
      })
      .catch(function (response) {
        toast.error(response.message)
        toggleShowModal(!showModal)
        setSelectedOrderID(null)
      })

  }

  return (
    <div className='p-3'>
      {Loading &&
        <Card>
          <Card.Body>
            <Spinner animation="border" />
          </Card.Body>
        </Card>
      }
      {!Loading &&
        <Card>
          <Card.Header>
            <h1>ManageOrders</h1>
          </Card.Header>
          <Card.Body>
            <MaterialReactTable
              //Adding features
              enableRowActions
              renderRowActions={({ cell, row, table }) => (
                <Box>
                  <Button disabled={row.original.date_Completed !== null} onClick={() => {
                    toggleShowModal(true)
                    setSelectedOrderID(row.original.ordersID)
                  }}>CompleteOrder</Button>
                </Box>
              )}
              positionActionsColumn="last"
              columns={[
                {
                  accessorKey: 'ordersID', //simple recommended way to define a column
                  header: 'Order ID',
                  muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
                },
                {
                  accessorKey: 'date_Started', //simple recommended way to define a column
                  header: 'Date Started',
                  muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
                  Cell: ({ cell }) => {
                    return <div>{sanetizeDate(cell.getValue())}</div>
                  },
                },
                {
                  accessorKey: 'date_Completed', //simple recommended way to define a column
                  header: 'Date Completed',
                  muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
                  Cell: ({ cell }) => {
                    if (cell.getValue() === null) return <div>In Progress</div>
                    return <div>{(sanetizeDate(cell.getValue()))}</div>
                  },
                },
              ]}
              data={orders}
              renderDetailPanel={({ row }) => (
                <MaterialReactTable
                  columns={[
                    {
                      accessorKey: 'itemID', //simple recommended way to define a column
                      header: 'Item ID',
                      muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
                    },
                    {
                      accessorKey: 'item_Name', //simple recommended way to define a column
                      header: 'Item Name',
                      muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
                    },
                    {
                      accessorKey: 'price', //simple recommended way to define a column
                      header: 'Price',
                      muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
                      Footer: () => (<strong>Total: R {row.original.itemsInOrder.reduce((accumulator, object) => accumulator + (object.price * object.quantity), 0)}</strong>)
                    },
                    {
                      accessorKey: 'quantity', //simple recommended way to define a column
                      header: 'Quantity',
                      muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
                    }
                  ]}
                  data={row.original.itemsInOrder}

                  //turn off a feature like so
                  enableRowSelection={false}
                  enableColumnOrdering={false}
                  enableGlobalFilter={false}
                  renderTopToolbar={false}
                />

              )}

              tableInstanceRef={tableInstanceRef}
              //turn off a feature like so
              enableRowSelection={false}
              enableGlobalFilter={false}
              renderTopToolbar={false}
            />
          </Card.Body>
        </Card>
      }

      <ElementGenericModal isOpen={showModal} title={"Complete Order"}>
        <h1>Are you sure you want to complete this order</h1>
        <Button onClick={() => toggleShowModal(!showModal)}>Cancel</Button>
        <Button onClick={() => {
          CompleteOrder()
        }
        }>Complete Order</Button>
      </ElementGenericModal>
    </div>
  )
}
