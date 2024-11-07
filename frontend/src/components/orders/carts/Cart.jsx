import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContextProvider";
import CartItem from "./CartItem";
import { totalPrice } from "../../contexts/CartReducer";
import {MDBBtn,MDBCard,MDBCardBody,MDBCardImage,MDBCardText,MDBCol,MDBContainer,
         MDBIcon,MDBInput,MDBRow,MDBTypography,} from "mdb-react-ui-kit";

export default function Cart() {
  const [qty, setQty] = useState(1);
  const { data, dispatch } = useContext(CartContext);

  const handleIncrease = (id, qty, item) => {
    item.id === id ? setQty(qty+1):setQty(qty)
  };
  
  const handleDecrease = () => {
    setQty > 1 ? qty(qty - 1) : 1
  };

  return (
    <>
      <br /><br /><br /><br />
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol size="12">
              <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                <MDBCardBody className="p-0">
                  <MDBRow className="g-0">
                    <MDBCol lg="8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                            Shopping Cart
                          </MDBTypography>
                          <MDBTypography className="mb-0 text-muted">
                          {data.length} items
                          </MDBTypography>
                        </div>

                        <hr className="my-4" />

                        <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                          {data.map((item)=>(
                            <>
                              <MDBCol md="2" lg="2" xl="2">
                                <MDBCardImage
                                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
                                  fluid className="rounded-3" alt="Cotton T-shirt" />
                              </MDBCol>
                              <MDBCol md="3" lg="3" xl="3">
                                <MDBTypography tag="h6" className="text-muted">
                                  {item.category}
                                </MDBTypography>
                                <MDBTypography tag="h6" className="text-black mb-0">
                                  {item.title}
                                </MDBTypography>
                              </MDBCol>
                              <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                                <span color="link" className="px-2">
                                  <MDBIcon onClick={handleDecrease} fas icon="minus" />
                                </span>
                                <MDBInput type="number" min="0" value={qty} size="sm" />
                                <btn color="link" className="px-2">
                                <MDBIcon fas icon="plus" />
                                </btn>
                              </MDBCol>
                              <MDBCol md="3" lg="2" xl="2" className="text-end">
                                <MDBTypography tag="h6" className="mb-0">
                                  € {item.price}
                                </MDBTypography>
                              </MDBCol>
                              <MDBCol md="1" lg="1" xl="1" className="text-end">
                                <MDBIcon fas icon="trash" onClick={() => dispatch({ type: "Remove", id: item.id })} />
                              </MDBCol>
                              <hr className="my-4" />
                            </>
                          ))}
                        </MDBRow>
                        
                        <div className="pt-5">
                          <MDBTypography tag="h6" className="mb-0">
                            <MDBCardText tag="a" href="#!" className="text-body">
                              <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                              to shop
                            </MDBCardText>
                          </MDBTypography>
                        </div>
                      </div>
                    </MDBCol>
                    <MDBCol lg="4" className="bg-grey">
                      <div className="p-5">
                        <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                          Summary
                        </MDBTypography>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-4">
                          <MDBTypography tag="h5" className="text-uppercase">
                            items ({data.length})
                          </MDBTypography>
                          <MDBTypography tag="h5">€ {totalPrice(data)}.00</MDBTypography>
                        </div>

                        {/* <MDBTypography tag="h5" className="text-uppercase mb-3">
                          Shipping
                        </MDBTypography>

                        <div className="mb-4 pb-2">
                          <select className="select p-2 rounded bg-grey" style={{ width: "100%" }}>
                            <option value="1">Standard-Delivery- €5.00</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            <option value="4">Four</option>
                          </select>
                        </div> */}

                        <MDBTypography tag="h5" className="text-uppercase mb-3">
                          Give code
                        </MDBTypography>

                        <div className="mb-5">
                          <MDBInput size="lg" label="Enter your code" />
                        </div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-5">
                          <MDBTypography tag="h5" className="text-uppercase">
                            Total price
                          </MDBTypography>
                          <MDBTypography tag="h5">€ {totalPrice(data)}.00</MDBTypography>
                        </div>

                        <button className="btn btn-success" color="dark" block size="lg">
                          Check Out
                        </button>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
