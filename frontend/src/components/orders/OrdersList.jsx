import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';

import api from '../../AxiosInstance'

const OrdersList = ({ baseURL }) => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const token = localStorage.getItem('access_token')
    const userId = localStorage.getItem('user_id')

  if(token === null){                            
      navigate('/login')
  } 

    const fetchOrders = async()=>{
        await api.get(`${baseURL}/orders/`, {
                headers: {"Authorization": `FRISKY ${token}`}
            }).then(res=>{
              const filteredOrders = res.data.filter((order)=>order.customer === parseInt(userId))
              setData(filteredOrders)
            })
      }
    
      useEffect(()=>{
        fetchOrders()
      },[])

  return (
    <>
      { data.length > 0 ? 
        <>
          <div className='container-fluid p-5'>
          <h2>Pending Orders  
            <span style={{fontSize:"small"}}>
              ({data.length} {data.length > 1 ? "Orders" : "order"})
            </span>
          </h2>
            <div className='table-responsive'>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Order Date</th>
                    <th>Discount</th>
                    <th>VAT</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(order=>(
                    <>
                      <tr key={order.id}>
                        <td>
                          <div className='d-flex align-orders-center'>
                              <Link to={ `/order_detail/${order.id}`}>
                                <div className='ms-3'>
                                  <p className='fw-bold mb-1'>{order.id}</p>
                                </div>
                              </Link>
                          </div>
                        </td>
                        <td>{order.customer_info.name} </td>
                        <td>{order.order_date.split('T')[0]}</td>
                        <td>N{new Intl.NumberFormat().format(order.discount)}.00</td>
                        <td>N{new Intl.NumberFormat().format(order.VAT)}.00</td>
                        <td> { 
                            order.billed ? 'billed' : 
                            order.processing ? 'Processing' : 'Pending'
                          }
                         </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        
        </> : 
        <>
          <h3 className="text-center"> There is no matching record to display</h3>
        </>
      }
    </>
  )
}

export default OrdersList