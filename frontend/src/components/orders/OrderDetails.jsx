import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Spinner } from '../layouts/Spinner';

import api from '../../AxiosInstance';

import { useMessage } from "../contexts/MessageContext";

const OrderDetails = ({ baseURL, loading, setLoading }) => {
    const { showMessage } = useMessage();
    const [data, setData] = useState([]);
    const [singleOder, setSingleOrder] = useState([]);
    const [totalCost, setTotalCost] = useState(0);  // State to track total cost
    const [isEditing, setIsEditing] = useState(null); // New state for tracking edit mode
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access_token');
    const {id} = useParams();
    const userGroup = localStorage.getItem('user_group');

    const fetchOrderDetails = async() => {
        const res = await api.get(`${baseURL}/orders/order_details/${id}/`, {
            headers:{"Authorization":`FRISKY ${accessToken}`}
        });
        setData(res.data);
        console.log(data)
        calculateTotal(res.data);  // Calculate total cost initially

        const orderRes = await api.get(`${baseURL}/orders/get_single_order/${id}/`, {
            headers:{"Authorization":`FRISKY ${accessToken}`}
        });
        setSingleOrder(orderRes.data) 
        console.log(singleOder)
    };

    const handleEdit = (index) => {
        setIsEditing(index); // Enable edit mode for the selected item
    };

    // Handler to update the local state when user modifies a field
    const handleChange = (index, field, value) => {
        const updatedData = [...data];
        updatedData[index][field] = value;  // Update the specific field

        // Calculate the updated subtotal for the modified row
        updatedData[index].subtotal = updatedData[index].quantity * updatedData[index].price;
        
        setData(updatedData);
        calculateTotal(updatedData);  // Recalculate total cost
    };

    // Function to calculate the total cost
    const calculateTotal = (updatedData) => {
        const total = updatedData.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        setTotalCost(total);  // Update total cost state
    };

    const OrderDetailAvailability = async (itemId) => {
        try {
            const { available } = data.find(item => item.id === itemId);
            const updateDate = { available: !available };
            await api.patch(`${baseURL}/orders/update_delete_order_detail/${itemId}/`, updateDate, {
                headers: { "Authorization": `FRISKY ${accessToken}` }
            });

            const updatedData = data.map(item => 
                item.id === itemId ? { ...item, available: !available } : item
            );
            setData(updatedData);
            fetchOrderDetails();

            showMessage('Item Updated', 'success');
        } catch (error) {
            console.error("Error updating item availability:", error);
            showMessage('Error updating item', 'error');
        }
    };

    const billOrder = async () => {
        await api.patch(`${baseURL}/orders/update_delete_order/${id}/`, {billed:true}, {
            headers: { "Authorization": `FRISKY ${accessToken}` }
        });
    }

    const processOrder = async () => {
        await api.patch(`${baseURL}/orders/update_delete_order/${id}/`, {processing:true}, {
            headers: { "Authorization": `FRISKY ${accessToken}` }
        })
    }

    const DeleteOrderDetail = async (orderDetailId) => {
        if (data.length > 1) {
            const isConfirmed = window.confirm('Are you sure you want to delete this item?')
            if(!isConfirmed){
                return;
            }
            await api.delete(`${baseURL}/orders/update_delete_order_detail/${orderDetailId}/`, {
                headers: {"Authorization": `FRISKY ${accessToken}`}
            }).then(() => {
                fetchOrderDetails();
                showMessage('An Item has been deleted from your order', 'success');
            });
        } else {
            handleDeleteOrder();
        }
    };

    const handleDeleteOrder = () => {
        const isConfirmed = window.confirm(
            'Are you sure you want to delete this Order? Every item in this order will be deleted. This action is IRREVERSIBLE')
            if(!isConfirmed){
                return;
            }
        api.delete(`${baseURL}/orders/update_delete_order/${id}/`, {
            headers:{"Authorization":`FRISKY ${accessToken}`}
        }).then(() => {
            fetchOrderDetails();
            showMessage('Order deleted', 'info');
            navigate('/orders');
        });
    };

    // Handler to save changes back to the database
      const handleSave = async () => {
        const isConfirmed = window.confirm(
            'Are you sure you want to perform this action? This action is IRREVERSIBLE')
            if(!isConfirmed){
                return;
            }
        setLoading(true)
        try {
            // Iterate over each order detail in the data array
            const updatePromises = data.map(async (item) => {
                const dataForUpdata =  { 
                    quantity:parseInt(item.quantity), price:parseFloat(item.price) 
                } 
            // Make an individual API call for each order detail
            const item_id = parseInt(item.id)
            await api.patch(`${baseURL}/orders/update_delete_order_detail/${item_id}/`, dataForUpdata, {
                headers: { "Authorization": `FRISKY ${accessToken}` }
            });
            });
            // Wait for all the update requests to complete
            await Promise.all(updatePromises);

            if(userGroup==='manager'){
                { singleOder.billed ? processOrder() : billOrder() }
            }
            

            // Success feedback to the user
            showMessage('All order details saved successfully!', 'success');

            setLoading(false)
            // Refresh the order details after saving
            fetchOrderDetails();
        
        } catch (error) {
            showMessage('Error saving order details', 'error');
        }
    };


    const handleSaveEdit = async (index) => {
        const itemToUpdate = data[index];
        try {
            await api.patch(`${baseURL}/orders/update_delete_order_detail/${itemToUpdate.id}/`, 
            { item: itemToUpdate.item }, {
                headers: { "Authorization": `FRISKY ${accessToken}` }
            });
            showMessage('Item name updated successfully!', 'success');
        } catch (error) {
            console.error("Error saving item:", error);
            showMessage('Error saving item', 'error');
        } finally {
            setIsEditing(null); // Disable edit mode
            fetchOrderDetails(); // Refresh data after save
        }
    };

    const handleItemChange = (index, newValue) => {
        const updatedData = [...data];
        updatedData[index].item = newValue;
        setData(updatedData);
    };
    

    useEffect(() => {
        fetchOrderDetails();
    }, [id, accessToken]);

    return (
        <>
        <div className="container p-3">
            <h5>{data.length > 0 ? data[0].customer : ""}</h5>
            <h6>{data.length > 0 ? data[0].order_date.split("T")[0] : ""}</h6>

            <div className="table-responsive shopping-cart">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product Name <span style={{fontSize:"small"}}>({data.length} items)</span></th>
                            <th className="">Quantity</th>
                            <th className="">Price</th>
                            <th className="">Subtotal</th>
                            { userGroup !== 'manager' ?
                            <th className="text-center">
                                <button className="btn btn-sm btn-outline-danger" 
                                onClick={handleDeleteOrder}>
                                    Delete Order
                                </button>
                            </th> :
                            <th className="text-center">
                                <button className="btn btn-sm btn-outline-danger">
                                    Disable Order
                                </button>
                            </th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((order, index) => (
                            <tr key={index}>
                                <td>
                                    {isEditing === index ? (
                                        <input
                                            type="text" className='form-control'
                                            value={order.item}
                                            onChange={(e) => handleItemChange(index, e.target.value)}
                                            onBlur={() => handleSaveEdit(index)}
                                            autoFocus
                                        />
                                    ) : (
                                        <div className="product-info">
                                            <h5 className="product-title">{order.item}</h5>
                                            {userGroup === 'manager' ? 
                                            (<button className='btn btn-sm btn-outline-primary'
                                                onClick={() => handleEdit(index)}>
                                                Edit
                                            </button>) 
                                            : ''} 
                                        </div>
                                    )}
                                </td>
                                <td className="text-center">
                                        <input type="number" className='quantity-tweak form-control' 
                                            value={order.quantity}
                                            onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                            readOnly={userGroup === 'manager' ? true : singleOder.processing ? true : false}
                                        />
                                </td>
                                <td className="text-center">
                                    <input type="number" className='tweak form-control' 
                                        value={order.price}
                                        onChange={(e) => handleChange(index, 'price', e.target.value)}
                                        readOnly={singleOder.processing ? true :userGroup  === 'manager' ? false : true}
                                    />
                                </td>
                                <td className="text-center">
                                    {`₦${(order.quantity * order.price).toLocaleString('en-NG', {minimumFractionDigits: 2})}`}
                                </td>
                                <td className="text-center">
                                    {userGroup === 'manager' ? 
                                        (!order.available ? 
                                            <i className="fa-solid fa-ban" title='Click to Enable Item'
                                                onClick={() => OrderDetailAvailability(order.id)}></i> 
                                            : 
                                            <i className="fa-solid fa-check" title='Click to Disable Item'
                                                onClick={() => OrderDetailAvailability(order.id)}></i>
                                        )
                                    :   (!order.available ? 'Out of Stock' :
                                        <i className="fa fa-trash" style={{color:'red'}}
                                            onClick={() => DeleteOrderDetail(order.id)}
                                        ></i>
                                    )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="shopping-cart-footer text-center">
            <h4>Total Cost: <span className="text-medium">
                ₦{totalCost.toLocaleString('en-NG', {minimumFractionDigits: 2})}</span>
            </h4>

            </div>

            <div className="shopping-cart-footer"><br />
                <div className="column">
                    <Link className="btn btn-outline-secondary" to='/orders'>
                        Back to Orders
                    </Link>
                    { singleOder.processing ? '' :
                        userGroup === 'manager' ?
                            <Link className="btn btn-success" to="" style={{float:"right"}}
                                onClick={handleSave}
                            > {!singleOder.billed ? 'Bill Order' : 'Process Order'}
                            </Link>
                        :
                            <Link className="btn btn-success" to="" style={{float:"right"}}
                                onClick={handleSave}> 
                                Update Order 
                            </Link> 
                    }
                    {loading && <Spinner/>}
                </div>
            </div>
        </div>
        </>
    );
}

export default OrderDetails;
