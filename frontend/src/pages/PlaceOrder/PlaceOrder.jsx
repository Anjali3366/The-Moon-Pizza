import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmt, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });

  const onchangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmt() === 0 ? 0 : getTotalCartAmt() + 49,
    };
    try {
      const response = await axios.post(url + "/order/place", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      }
    } catch (error) {
      console.error("Error in placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };
  useEffect(() => {
    if (!token) {
      alert("Please login to place an order.");
      navigate("/cart");
    } else if (getTotalCartAmt() === 0) {
      alert("Cart is empty. Please add items to place an order.");
      navigate("/cart");
    }
  }, [token]);
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            type="text"
            name="firstName"
            onChange={onchangeHandler}
            value={data.firstName}
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onchangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onchangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          type="text"
          name="street"
          value={data.street}
          onChange={onchangeHandler}
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            name="city"
            onChange={onchangeHandler}
            value={data.city}
            placeholder="City"
          />
          <input
            required
            type="text"
            name="state"
            onChange={onchangeHandler}
            value={data.state}
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            name="pinCode"
            value={data.pinCode}
            onChange={onchangeHandler}
            placeholder="Pin code"
          />
          <input
            type="text"
            name="country"
            value={data.country}
            onChange={onchangeHandler}
            placeholder="Country"
          />
        </div>
        <input
          required
          type="text"
          name="phone"
          value={data.phone}
          onChange={onchangeHandler}
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p> ₹ {getTotalCartAmt()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹ {getTotalCartAmt() === 0 ? 0 : 49}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹ {getTotalCartAmt() === 0 ? 0 : getTotalCartAmt() + 49}</b>
            </div>
          </div>
          <button type="submit" onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
