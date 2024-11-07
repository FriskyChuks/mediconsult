import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContextProvider";

const CartItem = ({ item }) => {
  const { data, dispatch } = useContext(CartContext);
  const handleIncrease = (id) => {
    const Index = data.findIndex((p) => p.id === id);
    if (data[Index].quantity < 10) {
      dispatch({ type: "IncreaseQuantity", id });
    }
  };
  const handleDecrease = (id) => {
    const Index = data.findIndex((p) => p.id === id);
    if (data[Index].quantity > 10) {
      dispatch({ type: "DecreaseQuantity", id });
    }
  };
  return (
    <div className="d-flex">
      <div className="detail">
        <h4>{item.title}</h4>
        <h4>&#8358;{item.price}</h4>
        <div className="buttons">
          <button onClick={() => handleDecrease(item.id)}>
            <b>-</b>
          </button>
          <button className="p-2">{data.quantity}</button>
          {/* <input type="number" value={quantity} readOnly /> */}
          <button onClick={() => handleIncrease(item.id)}>
            <b>+</b>
          </button>
        </div>
        <button onClick={() => dispatch({ type: "Remove", id: item.id })}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
