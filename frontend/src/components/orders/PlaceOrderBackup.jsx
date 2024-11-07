import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

export default function PlaceOrders({ baseURL }) {
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch items
  useEffect(() => {
    const getItems = () => {
      axios.get(`${baseURL}/items/`).then(res => {
        setItems(res.data);
        setOriginalItems(res.data);
      });
    };
    getItems();
  }, [baseURL]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter data based on search term
    if (value === '') {
      setItems(originalItems);
    } else {
      const filteredData = originalItems.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setItems(filteredData);
    }
  };

  return (
    <> <br /><br /><br /><br /><br />
      <div className="container">
        <form action="">
          <input type="text" placeholder="Search by name"
          value={searchTerm} onChange={handleSearchChange} />
        </form>
      </div>
      <MDBTable className="container" align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>Item</th>
            <th scope='col'>Description</th>
            <th scope='col'>Price</th>
            <th scope='col'>Status</th>
            <th scope='col'>Actions</th>
          </tr>
        </MDBTableHead>
      <MDBTableBody>
        { items.map(item=>(
          <>
          <tr>
            <td>
              <div className='d-flex align-items-center'>
                <img
                  src='/src/assets/img/item_default.png'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>{item.title}</p>
                  <MDBBadge color='primary' pill>
                    {item.category}
                  </MDBBadge>
                </div>
              </div>
            </td>
            <td>
              <p className='fw-normal mb-1'>{item.title}</p>
              <p className='text-muted mb-0'> {item.description} </p>
            </td>
            <td>
              <MDBBadge color='primary' pill>
                N{item.price}
              </MDBBadge>
            </td>
            <td>{item.status} Available</td>
            <td>
              <MDBBtn color='success' rounded size='sm'>
                Add to cart
              </MDBBtn>
            </td>
          </tr>
          </>
        )) }
      </MDBTableBody>
      </MDBTable>
    </>
  );
}
