import React, { Component, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AxiosService from "../API/AxiosService";
import '../custom.css';
import MaterialReactTable from 'material-react-table';

export default function MaintainProfile() {

    const username = useSelector((state) => state.reducerLogin.username)
    const [userDetails, updateUserDetails] = useState({})
    const [orders, setOrders] = useState([]);

    async function getUserDetails() {
        const response = await AxiosService.getUserDetails(username)
        return response
    }
    async function getUserOrders() {
        await AxiosService.GetUserOrders(username)
            .then(function (response) {
                setOrders(response.data)
            })
    }

    useEffect(() => {
        getUserDetails().then((response) => {
            updateUserDetails(response.data)
        })

        // getting user orders
        getUserOrders()
    }, [])


    // Showcasing table things you can do
    // see documentation for features: https://www.material-react-table.com/docs/examples/basic
    const tableInstanceRef = useRef(null);

    function sanetizeDate(date) {
        return date.substring(0, 10)
    }

    return (
        <div class="container">
            <div className="col-group">
                <div className="my-col">
                    <div className="row"><h1>Personal Details</h1></div>
                    {ProfileBox("Your Name", userDetails?.fistName)}
                    {ProfileBox("Email Address", userDetails?.email)}
                    {ProfileBox("Username", userDetails?.userName)}
                    {ProfileBox("Password", "*******")}
                    {ProfileBox("Delivery Details", userDetails?.address)}
                </div>
                <h1>Your Orders</h1>
                <MaterialReactTable
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
                                return <div>{(cell.getValue())}</div>
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
                                    Footer: () => (<strong>Total: R {row.original.itemsInOrder.reduce((accumulator, object) => accumulator + object.price, 0)}</strong>)
                                },
                                {
                                    accessorKey: 'quantity', //simple recommended way to define a column
                                    header: 'Quantity',
                                    muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
                                },
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
                    enableColumnOrdering={false}
                    enableGlobalFilter={false}
                    renderTopToolbar={false}
                />
            </div>
        </div>
    )
}
//this function breaks the flex inline display

function ProfileBox(title, info) {
    return (
        //border border-success
        <div className="my-row border border-success ">
            <h5>{title}:</h5>
            <p>{info}</p>
            <a id="link" className="sit-right" href="#">Edit</a>
        </div>
    )
}
function OrderBox(OrderNum, Date) {
    return (
        <div className="my-row border border-success">
            <span>Order No: {OrderNum}</span>
            <span>Date Completed: {Date}</span>
            <a id="link" style={{ paddingLeft: 0 }}>Expand</a>
        </div>
    )
}