// src/pages/SearchResults.js
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from './SearchContext';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const SearchResults = ({ baseURL }) => {
  const { search, user } = useContext(SearchContext);
  const [searchQuery] = search;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/items/`); 
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <> <br /><br /><br /><br />
    { items.length > 1 ? 
      <>
      
        <div className='container'>
          <div className='table-responsive'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item=>(
                  <>
                    <tr key={item.id}>
                      <td>
                      <div className='d-flex align-items-center'>
                          <Link to={ `/update_request/${item.id}`}>
                            <img
                              src='/src/assets/img/item_default.png'
                              alt=''
                              style={{ width: '45px', height: '45px' }}
                              className='rounded-circle'
                            />
                          </Link>
                          <Link to={ `/item_detail/${item.id}`}>
                            <div className='ms-3'>
                              <p className='fw-bold mb-1'>{item.title}</p>
                              <p className='text-muted mb-0'>({item.category})</p>
                            </div>
                          </Link>
                      </div>
                      </td>
                      <td>N{new Intl.NumberFormat().format(item.price)}</td>
                      <td color='primary'>{item.description}</td>
                      <td>
                        <button className='btn btn-secondary'
                          onClick={()=> dispatch({ type: 'Add', item: item })}
                          >Add to Cart
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      
      </> : <p> There is no matching record to display</p>
    }
        
      
    </>
  );
};

export default SearchResults;